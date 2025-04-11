import React from "react";
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <h1>Disaster Assistance Platform</h1>
                <p>Find help, request aid, and stay safe during emergencies.</p>
                <Link to="/find-help" className="cta-button">Get Help Now</Link>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>📍 Search for Help</h3>
                        <p>Use our real-time search with geolocation to find nearby relief centers.</p>
                    </div>
                    <div className="step">
                        <h3>🗺️ View on Map</h3>
                        <p>Locate medical, shelter, and food centers with detailed resources.</p>
                    </div>
                    <div className="step">
                        <h3>🚑 Request Emergency Assistance</h3>
                        <p>Fill out an emergency form or use the SOS button for instant help.</p>
                    </div>
                    <div className="step">
                        <h3>💬 Real-Time Communication</h3>
                        <p>Live chat with responders and volunteers via WebSockets.</p>
                    </div>
                    <div className="step">
                        <h3>📞 Contact & Support</h3>
                        <p>Access emergency contacts, FAQs, and submit feedback.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
