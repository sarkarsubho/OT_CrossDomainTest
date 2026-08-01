import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utility function to generate CJA tracking parameters
const generateCJATrackingParams = (campaignData) => {
  const params = new URLSearchParams({
    cja_source: campaignData.platform, // 'google_ads' or 'meta_ads'
    cja_campaign_id: campaignData.campaignId,
    cja_ad_group: campaignData.adGroup,
    cja_placement: campaignData.placement,
    cja_keyword: campaignData.keyword || "",
    cja_device: campaignData.device,
    cja_timestamp: new Date().toISOString(),
    cja_session_id: generateSessionId(),
    utm_source: campaignData.platform,
    utm_medium: "cpc",
    utm_campaign: campaignData.campaignName,
    utm_content: campaignData.adId,
  });
  return params.toString();
};

// Generate unique session ID for tracking
const generateSessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Individual Ad Card Component
const AdCard = ({ ad, onAdClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onAdClick(ad);
    // Simulate ad click tracking
    console.log(`Ad clicked: ${ad.adId}`, ad);
  };

  return (
    <div
      className={`ad-card ${ad.platform}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="ad-header">
        <span className="platform-badge">
          {ad.platform === "google_ads" ? "🔍 Google Ads" : "👥 Meta Ads"}
        </span>
        <span className="ad-status">{ad.status}</span>
      </div>

      <div className="ad-image">
        <img src={ad.imageUrl} alt={ad.headline} />
        {isHovered && <div className="ad-overlay">Click to visit</div>}
      </div>

      <div className="ad-content">
        <h3 className="ad-headline">{ad.headline}</h3>
        <p className="ad-description">{ad.description}</p>
        <div className="ad-metrics">
          <span className="metric">
            <strong>CTR:</strong> {ad.ctr}%
          </span>
          <span className="metric">
            <strong>CPC:</strong> ${ad.cpc}
          </span>
          <span className="metric">
            <strong>Impressions:</strong> {ad.impressions.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="ad-cta">
        <button className="cta-button">{ad.ctaText}</button>
      </div>
    </div>
  );
};

// Post Component (simulating a social feed)
const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.authorAvatar}
          alt={post.author}
          className="author-avatar"
        />
        <div className="author-info">
          <h4>{post.author}</h4>
          <span className="post-time">{post.timestamp}</span>
        </div>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      {post.postImage && (
        <img src={post.postImage} alt="Post content" className="post-image" />
      )}
      <div className="post-engagement">
        <span>👍 {post.likes}</span>
        <span>💬 {post.comments}</span>
        <span>↗️ {post.shares}</span>
      </div>
    </div>
  );
};

// Main Ad Campaign Component
const AdCampaignDemo = () => {
  const [posts, setPosts] = useState([]);
  const [ads, setAds] = useState([]);
  const [clickedAd, setClickedAd] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const navigate = useNavigate();

  const shuffle = function (array) {
    // Create a shallow copy to prevent modifying the original array
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements using ES6 destructuring assignment
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  useEffect(() => {
    // Initialize demo posts
    setPosts([
      {
        id: 1,
        author: "Sarah Marketing",
        authorAvatar:
          "https://cdn-icons-png.flaticon.com/128/16183/16183630.png",
        content: "Just launched our new product line! Check it out 🚀",
        postImage:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        timestamp: "2 hours ago",
        likes: 234,
        comments: 45,
        shares: 12,
      },
      {
        id: 2,
        author: "Tech News Daily",
        authorAvatar:
          "https://cdn-icons-png.flaticon.com/128/14061/14061429.png",
        content: "Industry insights: Digital marketing trends for 2025",
        postImage:
          "https://plus.unsplash.com/premium_photo-1707006301367-3834516f430c?q=80&w=1294&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        timestamp: "4 hours ago",
        likes: 1203,
        comments: 234,
        shares: 89,
      },
      {
        id: 3,
        author: "Sarah Marketing",
        authorAvatar:
          "https://cdn-icons-png.flaticon.com/128/16183/16183630.png",
        content: "Just launched our new product line! Check it out 🚀",
        postImage:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        timestamp: "2 hours ago",
        likes: 234,
        comments: 45,
        shares: 12,
      },
      {
        id: 4,
        author: "Tech News Daily",
        authorAvatar:
          "https://cdn-icons-png.flaticon.com/128/14061/14061429.png",
        content: "Industry insights: Digital marketing trends for 2025",
        postImage:
          "https://plus.unsplash.com/premium_photo-1707006301367-3834516f430c?q=80&w=1294&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        timestamp: "4 hours ago",
        likes: 1203,
        comments: 234,
        shares: 89,
      },
    ]);

    // Initialize demo ads
    const targetUrl = "http://localhost:5174/";
    setAds([
      {
        adId: "google_ad_001",
        platform: "google_ads",
        campaignId: "camp_g001",
        campaignName: "Summer Sale 2025",
        adGroup: "Electronics",
        placement: "Search Network",
        keyword: "best laptops 2025",
        device: "desktop",
        headline: "🔥 Premium Laptops - 40% OFF",
        description:
          "High-performance laptops with latest specs. Free shipping on orders over $500.",
        imageUrl:
          "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ctaText: "Shop Now",
        ctr: "8.5",
        cpc: "1.25",
        impressions: 45230,
        status: "Active",
        targetUrl,
      },
      {
        adId: "meta_ad_001",
        platform: "meta_ads",
        campaignId: "camp_m001",
        campaignName: "Brand Awareness Q3",
        adGroup: "Fashion",
        placement: "Instagram Feed",
        keyword: "",
        device: "mobile",
        headline: "✨ Exclusive Fashion Collection",
        description: "Discover our new summer collection. Limited time offer!",
        imageUrl:
          "https://images.unsplash.com/photo-1706879349328-4a05bb3e16ea?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ctaText: "Explore Collection",
        ctr: "12.3",
        cpc: "0.85",
        impressions: 78900,
        status: "Active",
        targetUrl,
      },
      {
        adId: "google_ad_002",
        platform: "google_ads",
        campaignId: "camp_g002",
        campaignName: "App Downloads",
        adGroup: "Mobile Apps",
        placement: "Display Network",
        keyword: "",
        device: "mobile",
        headline: "📱 Download Our App Today",
        description:
          "Get exclusive deals and early access to new products. Download now!",
        imageUrl:
          "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ctaText: "Download App",
        ctr: "6.2",
        cpc: "0.45",
        impressions: 102340,
        status: "Active",
        targetUrl,
      },
    ]);
  }, []);

  const handleAdClick = (ad) => {
    // Generate CJA tracking parameters
    const trackingParams = generateCJATrackingParams(ad);
    const targetUrlWithTracking = `${ad.targetUrl}?${trackingParams}`;

    // Log tracking data
    const trackingRecord = {
      timestamp: new Date().toISOString(),
      adId: ad.adId,
      platform: ad.platform,
      campaignId: ad.campaignId,
      targetUrl: targetUrlWithTracking,
      trackingParams,
    };

    setTrackingData([...trackingData, trackingRecord]);
    setClickedAd(ad);

    // Simulate redirect (in production, this would actually navigate)
    console.log("Redirecting to:", targetUrlWithTracking);
    // alert(
    //   `Tracking Data:\n\n${trackingParams}\n\nIn production, this would redirect to:\n${targetUrlWithTracking}`,
    // );

    // Uncomment for actual redirect:
    window.location.href = targetUrlWithTracking;
  };

  return (
    <div className="ad-campaign-container">
      <button onClick={() => navigate(-1)}> back </button>
      <header className="campaign-header">
        <h1>Ad Campaign Demo with CJA Tracking</h1>
        <p>
          Click on any ad to see tracking parameters and simulate conversion
          tracking
        </p>
      </header>

      <main className="campaign-main">
        {/* <section className="posts-section">
          <h2>Social Feed</h2>
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="ads-section">
          <h2>Active Ad Campaigns</h2>
          <div className="ads-grid">
            {ads.map((ad) => (
              <AdCard key={ad.adId} ad={ad} onAdClick={handleAdClick} />
            ))}
          </div>
        </section> */}

        <section className="ads-section">
          <h2>Active Ad Campaigns</h2>
          <div className="ads-grid">
            {shuffle([
              ...ads.map((ad) => (
                <AdCard key={ad.adId} ad={ad} onAdClick={handleAdClick} />
              )),
              ...posts.map((post) => <PostCard key={post.id} post={post} />),
            ])}
          </div>
        </section>

        {clickedAd && (
          <section className="tracking-section">
            <h2>📈 Last Click Tracking Data</h2>
            <div className="tracking-card">
              <div className="tracking-info">
                <p>
                  <strong>Ad ID:</strong> {clickedAd.adId}
                </p>
                <p>
                  <strong>Platform:</strong> {clickedAd.platform}
                </p>
                <p>
                  <strong>Campaign:</strong> {clickedAd.campaignName}
                </p>
                <p>
                  <strong> URL:</strong> {clickedAd.targetUrl}
                </p>
              </div>
              <div className="tracking-params">
                <h4>CJA Tracking Parameters:</h4>
                <pre>
                  {trackingData[trackingData.length - 1]?.trackingParams}
                </pre>
              </div>
            </div>
          </section>
        )}

        {trackingData.length > 0 && (
          <section className="tracking-history">
            <h2>📋 Tracking History ({trackingData.length} clicks)</h2>
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Ad ID</th>
                    <th>Platform</th>
                    <th>Campaign ID</th>
                    <th>Session ID</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingData.map((record, index) => {
                    const params = new URLSearchParams(record.trackingParams);
                    return (
                      <tr key={index}>
                        <td>
                          {new Date(record.timestamp).toLocaleTimeString()}
                        </td>
                        <td>{record.adId}</td>
                        <td>{record.platform}</td>
                        <td>
                          {record.platform === "google_ads"
                            ? params.get("cja_campaign_id")
                            : params.get("cja_campaign_id")}
                        </td>
                        <td>{params.get("cja_session_id")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdCampaignDemo;
