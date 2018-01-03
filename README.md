# Pipefy Calendar App

## Summary

* [Setup](#setup)
* [Tests](#tests)

### Setup

To prepare your environment just run:

```bash
$ yarn install
```

Then you're up to run the calendar app, to do this you'll need to start the server:

```bash
$ yarn start
```

And compile the application:

```bash
$ yarn compile
```

If you need to keep Webpack watching your changes add `-w`, eg: `yarn compile -w`.

> The Calendar App access the Pipefy's GraphQL API localy (in development environment), so you'll need to run the Pipefy App too (eg. `cd path/to/pipefy/ && rails s`).

### Tests

All files were linted with __ESLint__ and __Flow__ and formated with __Prettier__.

```bash
$ flow
$ eslint ./
$ prettier --config .prettierrc --write '**/*.js' '**/*.jsx'
```

And the app was tested with __Jest__, you can run:

```bash
$ yarn test
```
