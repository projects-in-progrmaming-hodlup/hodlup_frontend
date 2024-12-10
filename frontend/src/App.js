// src/App.js
import React, { useState, useEffect, useCallback } from "react";
import "./styles/App.css";
import NotificationForm from "./components/NotificationForm";
import Confirmation from "./components/Confirmation";
import Header from "./components/Header";
import SentimentAnalysis from "./components/SentimentAnalysis"; // Import the SentimentAnalysis component
import axios from "axios";

function App() {
  const [alertData, setAlertData] = useState(null);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [overallSentiment, setOverallSentiment] = useState({
    score: "Positive",
    reason: "Increased interest in Bitcoin and Ethereum",
    trendingTerms: ["Bitcoin", "Ethereum", "bullish"],
  }); // Dummy overall sentiment data
  const [categorySentiments, setCategorySentiments] = useState([
    {
      flair: "Discussion",
      score: "Neutral",
      reason: "Mixed opinions on market stability",
      trendingTerms: ["volatility", "regulation"],
    },
    {
      flair: "News",
      score: "Positive",
      reason: "Positive news about institutional adoption",
      trendingTerms: ["adoption", "institutional investors"],
    },
  ]); // Dummy category sentiments
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use the REACT_APP_API_URL environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  // Log the API URL to check if it's being pulled correctly
  console.log("API URL: ", API_URL);  // Log the environment variable
  
  const fetchCryptocurrencies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cryptocurrencies/`);
      setCryptocurrencies(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching cryptocurrencies:", err);
      setError("Failed to fetch cryptocurrencies.");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Error handling 
  useEffect(() => {
    if (!API_URL) {
      setError("Backend API URL is not defined. Please check your configuration.");
      return; // Don't proceed if the API URL is not available
    }
    fetchCryptocurrencies();
    // Simulate sentiment analysis data fetching
    // For now, we use dummy data initialized above
  }, [API_URL, fetchCryptocurrencies]);

  const handleSubmit = (data) => {
    setAlertData(data);
    console.log("Alert Data:", data);
  };

  return (
    <div className="App">
      <Header />
      {error && <p className="error-message">{error}</p>}

      {/* Sentiment Analysis Section */}
      {!loading && overallSentiment && categorySentiments.length > 0 && (
        <SentimentAnalysis
          overallSentiment={overallSentiment}
          categorySentiments={categorySentiments}
        />
      )}

      {/* Notification Form */}
      {!loading && (
        <NotificationForm
          onSubmit={handleSubmit}
          cryptocurrencies={cryptocurrencies}
        />
      )}

      {/* Confirmation Section */}
      {alertData && (
        <Confirmation
          alertData={alertData}
          onModify={() => setAlertData(null)}
          onClose={() => setAlertData(null)}
        />
      )}
    </div>
  );
}

export default App;
