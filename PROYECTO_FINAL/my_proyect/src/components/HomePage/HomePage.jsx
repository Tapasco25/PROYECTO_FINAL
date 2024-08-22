import React from "react";
import "../../../src/App.css";
import img from "../../assets/logo.png"

export default function HomePage() {
  return (
    <div className="homepage">
      <header className="homepageHeader">
        <img src={img} alt="Logo" className="homepageLogo" />
        <h1 className="homepageTitle">STYLES AND FASHION NICOL</h1>
      </header>
    </div>
    
  );
}
