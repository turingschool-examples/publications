# publications
Is a completed Backend Mod 4 exercise from the Building an Express App lesson.

## Getting Started

First start by cloning down this repo.

_With SSH_
`git clone git@github.com:turing`
_With HTTPS_
`https://github.com/turingschool-examples/publications.git`

This app is setup to work with a PostgreSQL datbase. Please ensure that you have PostgreSQL installed.
If you don't, take a moment to do so. You can start [here](https://www.postgresql.org/docs/9.3/tutorial-install.html) for guidance.

Now let's create the database for our publications app.
Run the following in your terminal:
`psql`
`createdb publications`

Great! Now let's actually get into the app.
From the terminal be sure that you navigate to the `publications` directory.
Run the following commands:

```
npm install
knex migrate:latest
knex seed:run
```
