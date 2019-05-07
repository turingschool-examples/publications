# Publications
Is a completed Backend Mod 4 exercise from the [Building an Express App lesson](http://backend.turing.io/module4/lessons/express_knex)

## Getting Started

First start by cloning down this repo.

_With SSH_

`git clone git@github.com:turingschool-examples/publications.git`

_With HTTPS_

`https://github.com/turingschool-examples/publications.git`

This app is setup to work with a PostgreSQL datbase. Please ensure that you have PostgreSQL installed.
If you don't, take a moment to do so. You can start [here](https://www.postgresql.org/docs/9.3/tutorial-install.html) for guidance.

Now let's create the database for our publications app.
Run the following in your terminal:

`psql`

`CREATE DATATBASE publications;`

`\q` (This will exit from psql

Great! Now let's actually get into the app.
From the terminal be sure that you navigate to the `publications` directory.
Run the following commands:

```
npm install
knex migrate:latest
knex seed:run
```

Now that the setup is complete. Let's take a look at the available end points.

## Endpoints
Spin up your local server by running `node index.js` or `npm start` from the command line.

Endpoints will return a JSON response

1. `/`
  - Will return 'Hello Publications'

2. `GET localhost:3000/api/v1/papers`
  - Success: Will return a `200` status and all the papers in the database
  - Fail: Will return a `500` error

3. `GET localhost:3000/api/v1/footnotes`
  - Success: Will return a `200` status and all the footnotes in the database
  - Fail: Will return a `500` error

4. `POST localhost:3000/api/v1/papers`
(The body of the request will need to include key value pairs for title, author, and publisher)
  - Success: Will return a `201` status and the id of the new paper
  - Fail: Will return a `422` status if a validation fails *or* a `500` error

5. `POST localhost:3000/api/v1/footnotes`
(The body of the request will need to include key value pairs for note and paper_id **The paper id must be for an existing paper in the database**)
  - Success: Will return a `201` status and the id of the new footnote
  - Fail: Will return a `422` status if a validation fails *or* a `500` error

6. `GET localhost:3000/api/v1/papers/:id`
  - Success: Will return a `200` status and the information for that specific paper
  - Fail: Will return a `500` error

7. `GET localhost:3000/api/v1/papers/:id/footnotes`
  - Success: Will return a `200` status and the footnotes for that specific paper
  - Fail: Will return a `500` error
