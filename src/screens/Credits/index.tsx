import "./index.scss";

export const Credits = () => (
  <section className="flex flex-col py-8 items-center justify-center">
    <h1 className="credits__title my-12">3rd party services</h1>
    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img
          src="/img/the_odds_api.png"
          alt="react logo"
          className="tech_logo"
        />

        <div className="credits__card p-8">
          <a href="https://the-odds-api.com/">
            <h1 className="credits__card__title mb-4">The odds api</h1>
          </a>
          <p className="credits__card__paragraph">
            A well-structured API which provides any kind of sport odds updated
            in real time. Try it by clicking
            <a
              href="https://the-odds-api.com/"
              className="pl-1 credits__card__link"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <div className="credits__card p-8">
          <a href="https://www.livescore.cz/">
            <h1 className="credits__card__title mb-4">Livescore.cz</h1>
          </a>
          <p className="credits__card__paragraph">
            Reliable site which gives real time updates about soccer match
            results, see it{" "}
            <a
              href="https://www.livescore.cz/"
              className="pl-1 credits__card__link"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
    <h1 className="credits__title my-12">Technological stack - FRONT END</h1>
    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/react.png" alt="react logo" className="tech_logo" />
        <div className="credits__card p-8">
          <a href="https://reactjs.org/">
            <h1 className="credits__card__title mb-4">React.js</h1>
          </a>

          <p className="credits__card__paragraph">
            An open-source JavaScript library for building user interfaces or UI
            components. It is maintained by Facebook and a community of
            individual developers and companies.
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/redux.png" alt="redux logo" className="tech_logo" />

        <div className="credits__card p-8">
          <a href="https://redux.js.org/">
            <h1 className="credits__card__title mb-4">Redux</h1>
          </a>

          <p className="credits__card__paragraph">
            A small library with a simple API designed to be a predictable
            container for application state.
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <img
          src="/img/htmlcss.png"
          alt="html and css logo"
          className="tech_logo"
        />
        <div className="credits__card p-8">
          <a href="https://www.w3.org/">
            <h1 className="credits__card__title mb-4">Html and Css</h1>
          </a>

          <p className="credits__card__paragraph">
            I've choose to not use Bootstrap purposely to test my skills on
            building a responsive UI without "shortcuts".
          </p>
        </div>
      </div>
    </div>
    <h1 className="credits__title my-12">Technological stack - BACK END</h1>

    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/node.png" alt="node.js logo" className="tech_logo" />
        <div className="credits__card p-8">
          <a href="https://nodejs.org/">
            <h1 className="credits__card__title mb-4">
              Node.js and Express.js
            </h1>
          </a>
          <p className="credits__card__paragraph">
            The standard technologies designed for building web applications and
            APIs with JavaScript.
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/mysql.png" alt="mysql logo" className="tech_logo" />

        <div className="credits__card p-8">
          <a href="https://www.mysql.com/">
            <h1 className="credits__card__title mb-4">MySql</h1>
          </a>

          <p className="credits__card__paragraph">
            An open-source relational database management system (RDBMS).
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/redis.png" alt="redis logo" className="tech_logo" />

        <div className="credits__card p-8">
          <a href="https://redis.io/">
            <h1 className="credits__card__title mb-4">Redis</h1>
          </a>

          <p className="credits__card__paragraph">
            An open source, in-memory data structure store, used as a database,
            cache, and message broker.
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/python.png" alt="python logo" className="tech_logo" />

        <div className="credits__card p-8">
          <a href="https://www.python.org/">
            <h1 className="credits__card__title mb-4">Python</h1>
          </a>
          <p className="credits__card__paragraph">
            An interpreted, high-level and general-purpose programming language.
            I used its library BeautifulSoup to scrape livescore.cz
          </p>
        </div>
      </div>
    </div>
    <div className="tech_cont my-8 lg:m-8">
      <h1 className="credits__card__title">
        Take a look at source code:{" "}
        <a href="https://github.com/Mirkotorrisi/bollette-ui">React App (UI)</a>{" "}
        -
        <a href="https://github.com/Mirkotorrisi/bollette-server">
          Express Server
        </a>
      </h1>
    </div>
  </section>
);
