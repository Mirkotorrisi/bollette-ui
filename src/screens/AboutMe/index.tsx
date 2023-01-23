import React from "react";
import "./index.scss";

export const AboutMe = () => (
  <section className="flex flex-col py-8 items-center justify-center">
    <div className="about_me">
      <div className="profile_pic m-8">
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
      <h1 className="about_me__title">Mirko Torrisi </h1>

      <p className="about_me__paragraph mb-4">
        Based in Catania, Italy, I began learning to code in Python in early
        2019 and later transitioned to Java after completing a professional
        course.
      </p>
      <p className="about_me__paragraph mb-4">
        From 2019 to 2021, I studied Development and Data Analysis at the
        <a href="https://stevejobs.academy/" target="_blank" rel="noreferrer">
          {" "}
          Steve Jobs Academy
        </a>{" "}
        and earned a diploma with a score of 99/100.
      </p>

      <p className="about_me__paragraph mb-4">
        Since 2020, I have worked as a developer for various companies,
        specializing in React, Angular, and Nest.js.
      </p>
      <p className="about_me__paragraph mb-4">
        I am passionate about full-stack development and also have an interest
        in UX/UI design. Note that my skills in design are limited so if you're
        a designer don't blame me for this site!
      </p>

      <h1 className="about_me__title">
        <a className="pl-2" href="https://github.com/Mirkotorrisi">
          <i className="fab fa-github"></i>
        </a>
        <a className="pl-2" href="https://www.facebook.com/mirko.torrisi92/">
          <i className="fab fa-facebook"></i>
        </a>
        <a className="pl-2" href="https://www.linkedin.com/in/mirko-torrisi/">
          <i className="fab fa-linkedin"></i>
        </a>
        <a className="pl-2" href="mailto:mirko.torrisi92@gmail.com">
          <i className="fas fa-envelope-square"></i>
        </a>
      </h1>
    </div>
  </section>
);
