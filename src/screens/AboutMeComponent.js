import React from "react";

export const AboutMeComponent = () => {
  return (
    <section className="tickets_component">
      <h1 className="login_title">About me</h1>

      <div className="about_me">
        <div className="profile_pic">
          <div className="flip-card-inner">
            <img
              src="/img/io.jpg"
              alt="my_picture"
              className="flip-card-front "
            />
            <img
              src="/img/io_pc.jpg"
              alt="my_picture"
              className="flip-card-back"
            />
          </div>
        </div>
        <h1>Mirko Torrisi </h1>

        <p>
          Born and raised in Catania, I've earned a Bachelor's Degree in
          Economics in the University of my city.
        </p>
        <p>
          After that, I decided that Economics was not my path and I tried to
          study computer science on my own.
        </p>
        <p>
          The first programming language I started with was Python, then I
          switched to Java after attending on a professional course.
        </p>
        <p>
          Since 2019 I'm a student of the
          <a href="https://stevejobs.academy/"> Steve Jobs Academy</a> for
          development and Data Analysis.
        </p>
        <p>
          My ambition is to become a full-stack developer, because I love both
          Back End (Node.js, TypeScript, Flask, Python) and Front End (React,
          React Native).
        </p>
        <h1>
          <a href="https://github.com/Mirkotorrisi">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/mirko.torrisi92/">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.linkedin.com/in/mirko-torrisi/">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:mirko.torrisi92@gmail.com">
            <i className="fas fa-envelope-square"></i>
          </a>
        </h1>
      </div>
    </section>
  );
};
