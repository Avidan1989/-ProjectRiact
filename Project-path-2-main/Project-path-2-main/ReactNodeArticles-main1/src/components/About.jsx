import React from 'react';
import "../assets/styles/About.css";

function About() {
  return (
    <div className="about-container">
      <section className="intro-section">
        <h1>About Us</h1>
        <p>
          Welcome to our world! We believe in pushing the boundaries of innovation 
          and delivering exceptional value through our products and services.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          Our vision is to create a future where technology empowers individuals and businesses
          to reach their full potential. We are committed to sustainability, innovation, and
          making a positive impact on the world.
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide cutting-edge solutions that solve real-world problems,
          while maintaining a customer-centric approach in everything we do.
        </p>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have any questions? Feel free to <a href="/contact">contact us</a>!</p>
      </section>
    </div>
  );
}

export default About;
