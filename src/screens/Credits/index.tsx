import "./index.scss";

export const Credits = () => (
  <section className="credits_component">
    <h1 className="login_title">3rd party services</h1>
    <div className="tickets_container">
      <div className="tech_cont">
        <img
          src="/img/the_odds_api.png"
          alt="react logo"
          className="tech_logo"
        />

        <div className="credits_card">
          <a href="https://the-odds-api.com/">
            <h1>The odds api</h1>
          </a>
          <p>
            A well-structured API which provides any kind of sport odds updated
            in real time. Try it by clicking
            <a href="https://the-odds-api.com/"> here</a>.
          </p>
        </div>
      </div>
      <div className="credits_card">
        <div className="tech_cont">
          <a href="https://www.livescore.cz/">
            <h1>Livescore.cz</h1>
          </a>
          <p>
            Reliable site which gives real time updates about soccer match
            results, see it <a href="https://www.livescore.cz/">here</a>.
          </p>
        </div>
      </div>
    </div>
    <h1 className="login_title">Technological stack - FRONT END</h1>
    <div className="tickets_container">
      <div className="tech_cont">
        <img src="/img/react.png" alt="react logo" className="tech_logo" />
        <div className="react credits_card ">
          <a href="https://reactjs.org/">
            <h1>React.js</h1>
          </a>

          <p>
            An open-source JavaScript library for building user interfaces or UI
            components. It is maintained by Facebook and a community of
            individual developers and companies.
          </p>
        </div>
      </div>
      <div className="tech_cont">
        <img src="/img/redux.png" alt="redux logo" className="tech_logo" />

        <div className="credits_card">
          <a href="https://redux.js.org/">
            <h1>Redux</h1>
          </a>

          <p>
            A small library with a simple API designed to be a predictable
            container for application state.
          </p>
        </div>
      </div>
      <div className="tech_cont">
        <img
          src="/img/htmlcss.png"
          alt="html and css logo"
          className="tech_logo"
        />
        <div className="credits_card">
          <a href="https://www.w3.org/">
            <h1>Html and Css</h1>
          </a>

          <p>
            I've choose to not use Bootstrap purposely to test my skills on
            building a responsive UI without "shortcuts".
          </p>
        </div>
      </div>
    </div>
    <h1 className="login_title">Technological stack - BACK END</h1>

    <div className="tickets_container">
      <div className="tech_cont">
        <img src="/img/node.png" alt="node.js logo" className="tech_logo" />
        <div className="credits_card">
          <a href="https://nodejs.org/">
            <h1>Node.js and Express.js</h1>
          </a>
          <p>
            The standard technologies designed for building web applications and
            APIs with JavaScript.
          </p>
        </div>
      </div>
      <div className="tech_cont">
        <img src="/img/mysql.png" alt="mysql logo" className="tech_logo" />

        <div className="credits_card">
          <a href="https://www.mysql.com/">
            <h1>MySql</h1>
          </a>

          <p>An open-source relational database management system (RDBMS).</p>
        </div>
      </div>
      <div className="tech_cont">
        <img src="/img/redis.png" alt="redis logo" className="tech_logo" />

        <div className=" mysql credits_card">
          <a href="https://redis.io/">
            <h1>Redis</h1>
          </a>

          <p>
            An open source, in-memory data structure store, used as a database,
            cache, and message broker.
          </p>
        </div>
      </div>
      <div className="tech_cont">
        <img src="/img/python.png" alt="python logo" className="tech_logo" />

        <div className=" python credits_card">
          <a href="https://www.python.org/">
            <h1>Python</h1>
          </a>
          <p>
            An interpreted, high-level and general-purpose programming language.
            I used its library BeautifulSoup to scrape livescore.cz
          </p>
        </div>
      </div>
    </div>
    <div className="tech_cont">
      <h1 className="white">
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
