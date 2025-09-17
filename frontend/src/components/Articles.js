import React, { useEffect, useState } from "react";
import "./Article.css";
import SearchBar from "./SearchBar";
import Layout from "./../Layout/Layout"; // 1. Import the standard Layout
 

function Articles() {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // All your existing logic (demoArticles, useEffect, handleSearch) remains the same
  const demoArticles = [
    {
      title: "Stoic Salamander launches new AI platform",
      description: "The company Stoic Salamander announced its latest AI-based product for enterprises...",
      author: "Tech Journal",
      publishedAt: "2025-09-08",
      url: "https://example.com/stoic-ai",
      image_url: "https://source.unsplash.com/600x400/?ai,technology",
    },
    {
      title: "How Stoic Salamander is transforming cloud computing",
      description: "Stoic Salamander has made breakthroughs in scalable cloud architecture...",
      author: "Cloud Weekly",
      publishedAt: "2025-08-20",
      url: "https://example.com/stoic-cloud",
      image_url: "https://source.unsplash.com/600x400/?cloud,server",
    },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_084d328963c24e3881054d19c6a8bb52&q=technology&language=en`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setArticles(data.results);
          setFiltered(data.results);
        } else {
          setArticles(demoArticles);
          setFiltered(demoArticles);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles(demoArticles);
        setFiltered(demoArticles);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSearch = (word) => {
    if (!word.trim()) {
      setFiltered(articles);
    } else {
      const result = articles.filter(
        (a) =>
          (a.title && a.title.toLowerCase().includes(word.toLowerCase())) ||
          (a.description &&
            a.description.toLowerCase().includes(word.toLowerCase()))
      );
      setFiltered(result);
    }
  };

  return (
    // 2. Wrap everything in the Layout component
    <Layout>
      {/* 3. Place your page-specific content and Footer inside */}
      <>
        <div className="article-page">
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <p className="loading-text">Loading articles...</p>
          ) : (
            <div className="article-list">
              {filtered.length > 0 ? (
                filtered.map((article, index) => (
                  <div key={index} className="article-card">
                    {article.image_url && (
                      <img src={article.image_url} alt={article.title} />
                    )}
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <div className="meta">
                      <span>
                        <b>{article.creator ? article.creator[0] : "Unknown Author"}</b>
                      </span>{" "}
                      •{" "}
                      <span>
                        {new Date(article.pubDate || article.publishedAt).toDateString()}
                      </span>
                    </div>
                    <a
                      href={article.link || article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More →
                    </a>
                  </div>
                ))
              ) : (
                <p>No articles found for your search.</p>
              )}
            </div>
          )}
        </div>
      </>
     </Layout>
  );
}

export default Articles;