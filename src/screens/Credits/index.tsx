import React from "react";
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
          <a href="https://the-odds-api.com/" target="_blank" rel="noreferrer">
            <h1 className="credits__card__title mb-4">The odds api</h1>
          </a>
          <p className="credits__card__paragraph">
            A well-structured API which provides any kind of sport odds updated
            in real time.
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <div className="credits__card p-8">
          <a href="https://www.livescore.cz/" target="_blank" rel="noreferrer">
            <h1 className="credits__card__title mb-4">Livescore.cz</h1>
          </a>
          <p className="credits__card__paragraph">
            Reliable site which gives real time updates about soccer match
            results.
          </p>
        </div>
      </div>
    </div>
    <h1 className="credits__title my-12">Technological stack - FRONT END</h1>
    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/react.png" alt="react logo" className="tech_logo" />
        <div className="credits__card p-8">
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
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
          <a href="https://redux.js.org/" target="_blank" rel="noreferrer">
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
          src="/img/tailwind.png"
          alt="html and css logo"
          className="tech_logo"
        />
        <div className="credits__card p-8">
          <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
            <h1 className="credits__card__title mb-4">Tailwind CSS</h1>
          </a>

          <p className="credits__card__paragraph">
            My favorite CSS library. Lightweight and easy to use
          </p>
        </div>
      </div>
    </div>
    <h1 className="credits__title my-12">Technological stack - BACK END</h1>

    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/nestjs.svg" alt="nest.js logo" className="tech_logo" />
        <div className="credits__card p-8">
          <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
            <h1 className="credits__card__title mb-4">Nest.js</h1>
          </a>
          <p className="credits__card__paragraph">
            Since I discovered this back-end framework based on Express (or
            Fastify if needed) I refused to try any other framework or language
            to build APIs. It is really powerful and easy to use.
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/mysql.png" alt="mysql logo" className="tech_logo" />

        <div className="credits__card p-8">
          <a href="https://www.mysql.com/" target="_blank" rel="noreferrer">
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
          <a href="https://redis.io/" target="_blank" rel="noreferrer">
            <h1 className="credits__card__title mb-4">Redis</h1>
          </a>

          <p className="credits__card__paragraph">
            An open source, in-memory data structure store, used as a database,
            cache, and message broker.
          </p>
        </div>
      </div>
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/flask.png" alt="flask logo" className="tech_logo" />

        <div className="credits__card p-8">
          <a
            href="https://flask.palletsprojects.com/en/2.2.x/"
            target="_blank"
            rel="noreferrer"
          >
            <h1 className="credits__card__title mb-4">Flask</h1>
          </a>
          <p className="credits__card__paragraph">
            A Python micro-framework useful to build web applications. I used it
            to create a web scraper (with BeautifulSoup) that provides me every
            day soccer results that I use to update user's bets.
          </p>
        </div>
      </div>
    </div>
    <div className="tech_cont my-8 lg:m-8">
      <div className="text-center">
        <p className="credits__card__paragraph"> Take a look at source code:</p>
        <p>
          <a
            href="https://github.com/Mirkotorrisi/bollette-ui"
            className="credits__card__title"
            target="_blank"
            rel="noreferrer"
          >
            React App (UI)
          </a>
        </p>
        <p>
          <a
            href="https://github.com/Mirkotorrisi/bollette-server-v2"
            className="credits__card__title"
            target="_blank"
            rel="noreferrer"
          >
            Nest Server
          </a>
        </p>
        <p>
          <a
            href="https://github.com/Mirkotorrisi/soccer_results_scraper"
            className="credits__card__title"
            target="_blank"
            rel="noreferrer"
          >
            Flask web scraper
          </a>
        </p>
      </div>
    </div>
  </section>
);
