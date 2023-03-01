import React, { Component } from "react";
import profileImg from "../img/Narayan.jpg";
import "./style.css";

class Profile extends Component {
  render() {
    return (
      <div className="profile-page">
        <header className="header">
          <h4 style={{ textAlign: "center", margin: 0, padding: 0 }}>My Profile</h4>
        </header>
        <div className="profile-content">
          <div className="profile-picture">
            <img src={profileImg} alt="Profile" />
          </div>
          <div className="profile-details">
            <h2>Narayan Bhattarai</h2>
            <h3>Software Developer</h3>
            <p>
              As a Java developer with a background in Spring Boot, I have experience in developing
              web applications and RESTful APIs using Java and related technologies. I have worked
              extensively with Spring Boot. I have also worked with other Spring projects such as
              Spring Data JPA, Spring Security, and Spring Cloud.
            </p>
            <ul className="profile-skills">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Java</li>
              <li>Springboot</li>
              <li>kafka</li>
              <li>Swagger</li>
              <li>Spring JPA</li>
              <li>SQL</li>
              <li>Amazon Cloud Practitioner</li>
            </ul>
          </div>
        </div>
        <h2 className="exp">Experience</h2>
        <section className="profile-section">
          <div className="profile-container">
            <div className="profile-experience">
              <div className="experience-card">
                <h3 style={{ marginBlock: 0 }}>Software Developer</h3>
                <h4 style={{ marginBlock: 0 }}>Huntington Bank</h4>
                <span className="experience-date">March 2022 - Present</span>

                <p style={{ marginTop: "0.5rem" }}>
                  Responsible for developing and maintaining RESTful APIs that served as the backend
                  for data to publish and subscribe enterprise event-hub. I used Spring Boot to
                  build the APIs and integrated them with a variety of third-party APIs such as
                  Profisee and Huntington internal API. I also implemented Spring Security to secure
                  the APIs with JWT authentication and authorization.
                </p>
              </div>
              <div className="experience-card">
                <h3 style={{ marginBlock: 0 }}>Software Developer</h3>
                <h4 style={{ marginBlock: 0 }}>Accenture</h4>
                <span className="experience-date">Aug 2021 - Present</span>
                <p style={{ marginTop: "0.5rem" }}>
                  I support production for a batch job by monitoring and maintaining the batch job
                  to ensure it runs smoothly and completes within the required time frame. I am
                  responsible for identifying and resolving any issues that arise during batch
                  processing, as well as performing routine maintenance tasks such as cleaning up
                  log files and updating job schedules.
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp; Identifying and resolving defects or issues that arise
                  during batch processing. This include issues related to data input, system errors,
                  or other issues that prevent the batch job from running as expected.
                </p>
              </div>
            </div>
          </div>
        </section>
        <h2 className="ed">Education</h2>
        <section className="profile-section">
          <div className="profile-container">
            <div className="profile-education">
              <div className="education-card">
                <h3 style={{ marginBlock: 0 }}>Bachelor's in Computer Science</h3>
                <h4 style={{ marginBlock: 0 }}>Ohio State University</h4>
                <span className="education-date">2019 - 2023</span>
              </div>
              <div className="education-card">
                <h3 style={{ marginBlock: 0 }}>Associate in Computer Science</h3>
                <h4 style={{ marginBlock: 0 }}>Columbus State Community College</h4>
                <span className="education-date">2014 - 2017</span>
              </div>
              <div className="education-card">
                <h3 style={{ marginBlock: 0 }}>Web Development Bootcamp</h3>
                <h4 style={{ marginBlock: 0 }}>Kenzie Academy</h4>
                <span className="education-date">2018 - 2019</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
