# bollette-ui

User Interface made with React and Redux in JavaScript.

Bollette Calcio is a web app where user can place some ticket on main football championships, with fake money.

App is divided in 4 main pages:

- **_home page_**, which has 3 sections: 1) market buttons: to select current market (premier league, la liga, ligue one, serie a, eredivisie etc) 2) bet table: all programmed games for selected market (default is italy's serie a). Here you can choose to bet final result[1,x,2] or total number of goals, by selecting a button on top of it. Default is final result. 3) Ranking table, where user can see current ranking of top balances or best wins among all users.
- **_user page_** , which shows all current user's tickets, divided by their status (won, lost or ongoing), must be logged to see it

- **_log in / register_** : two different screens used to log in or create a new account, needed to store a ticket.

- **_about me/credits_**: static screens where I introduce myself and technologies used to build this web app.

Main Components are:

- navbar
- footer
- modal
- ticketComponent
- total container
- betQuota Component
