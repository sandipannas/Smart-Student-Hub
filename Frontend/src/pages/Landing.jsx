import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import '../styles/Landing.css';

const Landing = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Role-Based Access',
      description: 'Customized dashboards for students, faculty, and department heads with role-specific features.'
    },
    {
      icon: '📊',
      title: 'Academic Tracking',
      description: 'Track attendance, marks, projects, and academic progress in one centralized platform.'
    },
    {
      icon: '🏆',
      title: 'Certificate Management',
      description: 'Digital certificate issuance, approval workflows, and secure verification system.'
    },
    {
      icon: '📢',
      title: 'Communication Hub',
      description: 'Stay updated with institutional events, notices, and important announcements.'
    },
    {
      icon: '💼',
      title: 'Project Portfolio',
      description: 'Showcase and manage academic projects with collaboration tools and progress tracking.'
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Access your dashboard anywhere, anytime with our fully responsive design.'
    }
  ];

  return (
    <div className="landing">
      <Navbar />
      
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Student Hub</h1>
          <p>
            Empowering educational institutions with comprehensive student management, 
            academic tracking, and seamless communication between students, faculty, and administration.
          </p>
          <Link to="/login" className="hero-cta">
            Get Started
          </Link>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Smart Student Hub?</h2>
          <p className="section-subtitle">
            Discover the features that make academic management effortless and efficient
          </p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;