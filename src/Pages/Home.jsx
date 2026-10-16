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
      <button
        type="button"
        class="tc-personalize-coockies"
        href="window.tC.privacyCenter.showPrivacyCenter();return false"
        aria-haspopup="dialog"
        aria-expanded="false"
        onClick={() => alert("button clicked")}
      >
        Personnaliser mes cookies
      </button>
      <a
        href="#"
        onclick="window.tC.privacyCenter.showPrivacyCenter();return false"
      >
        privacy center
      </a>
    </>
  );
};

export default Home;
