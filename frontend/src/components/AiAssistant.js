import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AiAssistant.css";
import { BotIcon } from "lucide-react";
import "../components/Logone.css";

// 1. Import our standard Layout component
import Layout from "./../Layout/Layout"; // Make sure this path is correct
 

// Markdown + Code Highlighter
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AiAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- All of your existing logic remains exactly the same ---
  useEffect(() => {
    if (window.puter) {
      console.log("✅ Puter.js loaded successfully:", window.puter);
    } else {
      console.error("❌ Puter.js NOT loaded. Make sure index.html has the script tag!");
    }
    (async () => {
      if (window.puter?.kv) {
        const saved = await window.puter.kv.get("stoic_chat_history");
        if (saved) setMessages(JSON.parse(saved));
      }
    })();
  }, []);

  const saveHistory = async (msgs) => {
    if (window.puter?.kv) {
      await window.puter.kv.set("stoic_chat_history", JSON.stringify(msgs));
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", type: "text", text: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    saveHistory(updated);
    setLoading(true);
    try {
      if (!window.puter?.ai) {
        throw new Error("⚠️ Puter.js not loaded");
      }
      console.time("AI Response (Puter)");
      const res = await window.puter.ai.chat(input, { model: "gpt-4.1-mini" });
      console.timeEnd("AI Response (Puter)");
      const responseText =
        typeof res === "string"
          ? res
          : res?.message?.content?.toString?.() || JSON.stringify(res, null, 2);
      const botMsg = { sender: "bot", type: "text", text: responseText };
      const msgs2 = [...updated, botMsg];
      setMessages(msgs2);
      saveHistory(msgs2);
    } catch (err) {
      console.error("❌ Error:", err);
      const errMsg = { sender: "bot", type: "text", text: "⚠️ Error fetching response" };
      const msgs2 = [...updated, errMsg];
      setMessages(msgs2);
      saveHistory(msgs2);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    // 2. Wrap everything in the Layout component
    <Layout>
      {/* 3. The page-specific content and Footer are placed inside */}
      <>
        <div className="assistant-container">
          <div className="assistant-header">
            <h3>
              <span className="fw-bold text-primary"><BotIcon size={32} /> Stoic</span>
              <span className="fw-bold text-dark">
                <img src="/logo-modified.png" alt="O Logo" className="logone-o" />ne
              </span> AI Assistant
            </h3>
          </div>

          {/* Welcome screen */}
          {messages.length === 0 && (
            <div className="welcome-box">
              <h2>Hi Stoican,</h2>
              <h4>What would you like to learn today?</h4>
            </div>
          )}

          {/* Chat Messages */}
          <div className="chat-area">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message-row ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
              >
                <div className="message-bubble">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={coy}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && <p className="thinking">💭 Thinking...</p>}
          </div>

          {/* Input Box */}
          <div className="input-box d-flex align-items-center">
            <textarea
              className="chat-input flex-grow-1"
              placeholder="Ask me anything..."
              rows="2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="send-btn ms-2" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      </>
     
    </Layout>
  );
}