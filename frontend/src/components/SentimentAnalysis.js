// src/components/SentimentAnalysis.js
import React from "react";
import "../styles/SentimentAnalysis.css";

const SentimentAnalysis = ({ overallSentiment }) => {
  return (
    <div className="sentiment-analysis">
      <div className="sentiment-box">
        <h3 className="section-title">Overall Sentiment</h3>
        <p>
          <strong>Score:</strong> {overallSentiment.score}
        </p>
        <p>
          <strong>Reason:</strong> {overallSentiment.reason}
        </p>
        <p>
          <strong>Trending Terms:</strong>{" "}
          {overallSentiment.trendingTerms.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
