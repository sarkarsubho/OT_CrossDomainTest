import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome to AXA CMS</h1>
      <h1 className="read-the-docs">
        This is the Demo app for testing Cross domain and cross device consent.
      </h1>
      <button
        onClick={() => {
          navigate("adcampaign");
        }}
      >
        Go to AdCAmpaign Page
      </button>
    </>
  );
};

export default Home;
