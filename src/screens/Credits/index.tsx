import React from "react";
import "./index.scss";

export const Credits = () => (
  <section className="flex flex-col py-8 items-center justify-center">
    <h2 className="text-4xl font-semibold text-gray-800 mb-3">
      Services Overview
    </h2>
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <p className="text-gray-700 mb-6">
        Here you can find a brief overview of the backend architecture used to
        build some services provided in this website.
      </p>

      <p>
        Those services are built using Nest.js or Flask and deployed in a
        scalable
        <span className="font-medium text-gray-900"> Docker container </span>
        environment hosted on
        <span className="font-medium text-gray-900"> Google Cloud</span>. Key
        Google Cloud services include:
      </p>
      <ul className="list-disc list-inside text-gray-700 my-6">
        <li>
          <strong>Cloud Run:</strong> For serverless deployment and execution.
        </li>
        <li>
          <strong>Cloud Build:</strong> For automated container builds and
          CI/CD.
        </li>
        <li>
          <strong>Artifact Registry:</strong> For secure storage and management
          of container images.
        </li>
      </ul>
    </div>
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4" id="bet-assistant">
        <a
          href="https://github.com/Mirkotorrisi/bollette-agent"
          className="credits__card__title"
          target="_blank"
          rel="noreferrer"
        >
          Bet Assistant
        </a>
      </h1>
      <p className="text-gray-700 mb-6">
        The <strong>Bet Assistant</strong> is an AI-powered tool designed to
        simplify your betting experience. Built using
        <span className="font-medium text-gray-900"> LangChain</span> and
        <span className="font-medium text-gray-900"> OpenAI APIs</span>, it
        leverages the compact yet efficient
        <span className="font-medium text-gray-900"> gpt-4o-mini</span> language
        model to handle user inputs with precision and speed.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        How It Works:
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>
          <strong>Intent Recognition:</strong> The Bet Assistant begins by
          identifying the user’s intent—whether it's to add a bet, remove one,
          replace it, or proceed to checkout.
        </li>
        <li>
          <strong>Information Extraction:</strong> Based on the intent, the AI
          extracts key details, including:
          <ul className="list-disc list-inside ml-6">
            <li>
              <strong>Match Identification:</strong> Locating the relevant team
              names from a curated list provided by the platform.
            </li>
            <li>
              <strong>Desired Outcome:</strong> Understanding the betting result
              you wish to place.
            </li>
            <li>
              <strong>Bet Amount:</strong> Capturing the amount you intend to
              wager.
            </li>
          </ul>
        </li>
        <li>
          <strong>Response Delivery:</strong> Once processed, the Bet Assistant
          returns the match ID and the associated betting outcome for seamless
          user interaction.
        </li>
      </ul>

      <p className="text-gray-700">
        This streamlined service ensures that managing bets is fast, intuitive,
        and accurate, all while leveraging cutting-edge AI technology.
      </p>

      <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
        <a
          href="https://github.com/Mirkotorrisi/bollette-server-v2"
          className="credits__card__title"
          target="_blank"
          rel="noreferrer"
        >
          Poker
        </a>
      </h1>
      <p className="text-gray-700 mb-6">
        The <strong>Poker</strong> service allows multiple users to play Poker
        with each other using virtual currency. The system also supports playing
        at multiple tables simultaneously, ensuring a dynamic and engaging
        experience for all players.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        How It Works:
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>
          <strong>Table State Management:</strong> Each table's state is managed
          using <span className="font-medium text-gray-900">XState</span>, a
          finite state machine that controls the flow and phases of every hand
          seamlessly.
        </li>
        <li>
          <strong>Showdown Resolution:</strong> During the showdown, the result
          of each hand is determined with precision using the{" "}
          <span className="font-medium text-gray-900">pokersolver</span>{" "}
          library.
        </li>
        <li>
          <strong>Client-Server Communication:</strong> Real-time communication
          between clients and the server is facilitated by a{" "}
          <span className="font-medium text-gray-900">web socket</span>,
          ensuring smooth and instantaneous interactions.
        </li>
      </ul>

      <p className="text-gray-700">
        Whether you’re playing at a single table or managing multiple games at
        once, this Poker service ensures a seamless and enjoyable experience for
        all participants.
      </p>
    </div>

    <h3 className="credits__title my-12">3rd party services</h3>
    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img
          src="/img/the_odds_api.png"
          alt="react logo"
          className="tech_logo"
        />

        <div className="credits__card p-8">
          <a href="https://the-odds-api.com/" target="_blank" rel="noreferrer">
            <h3 className="credits__card__title mb-4">The odds api</h3>
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
            <h3 className="credits__card__title mb-4">Livescore.cz</h3>
          </a>
          <p className="credits__card__paragraph">
            Reliable site which gives real time updates about soccer match
            results.
          </p>
        </div>
      </div>
    </div>
    <h3 className="credits__title my-12">Technological stack - FRONT END</h3>
    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/react.png" alt="react logo" className="tech_logo" />
        <div className="credits__card p-8">
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            <h3 className="credits__card__title mb-4">React.js</h3>
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
            <h3 className="credits__card__title mb-4">Redux</h3>
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
            <h3 className="credits__card__title mb-4">Tailwind CSS</h3>
          </a>

          <p className="credits__card__paragraph">
            My favorite CSS library. Lightweight and easy to use
          </p>
        </div>
      </div>
    </div>
    <h3 className="credits__title my-12">Technological stack - BACK END</h3>

    <div className="flex flex-col lg:flex-row justify-between w-full px-8">
      <div className="tech_cont my-8 lg:m-8">
        <img src="/img/nestjs.svg" alt="nest.js logo" className="tech_logo" />
        <div className="credits__card p-8">
          <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
            <h3 className="credits__card__title mb-4">Nest.js</h3>
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
            <h3 className="credits__card__title mb-4">MySql</h3>
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
            <h3 className="credits__card__title mb-4">Redis</h3>
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
            <h3 className="credits__card__title mb-4">Flask</h3>
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
