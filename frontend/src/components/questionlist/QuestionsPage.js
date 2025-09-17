import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout"; // 1. Import the standard Layout
 import QuestionsList from "./QuestionList";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

  // Your data fetching logic remains the same
  useEffect(() => {
    fetch("http://localhost:8080/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    // 2. Wrap the page content and Footer in the Layout component
    <Layout>
      <QuestionsList questions={questions} />
     </Layout>
  );
}