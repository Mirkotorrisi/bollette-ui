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

      <p className="about_me__paragraph">
        Born and raised in Catania, I've earned a Bachelor's Degree in Economics
        in the University of my city.
      </p>
      <p className="about_me__paragraph">
        After that, I decided that Economics was not my path and I tried to
        study computer science on my own.
      </p>
      <p className="about_me__paragraph">
        The first programming language I started with was Python, then I
        switched to Java after attending on a professional course.
      </p>
      <p className="about_me__paragraph">
        From 2019 to 2021 I studied at the
        <a href="https://stevejobs.academy/">Steve Jobs Academy</a> for
        development and Data Analysis, and I earned dyploma with 99/100.
      </p>
      <p className="about_me__paragraph">
        Since 2020 I work at <a href="https://paradigma.me/">Paradigma</a> as
        React developer
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
