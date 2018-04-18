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

Or you can run in a specific port, eg: `PORT=3001`:

```bash
$ PORT=3001 yarn start
```

After start the server you'll need to compile the application:

```bash
$ yarn compile
```

If you need to keep Webpack watching your changes add `-w`, eg: `yarn compile -w`.

> The Calendar App access the Pipefy's GraphQL API localy (in development environment), so you'll need to run the Pipefy App too (eg. `cd path/to/pipefy/ && rails s`).

#### Further Setting on Pipefy

To Calendar App access the GraphQL API properly, you need to do some settings on Pipefy too.

* Start the Pipefy App localy
* Create (or rename) a organization with the name **Pipefy Team**
* Access [OAuth2 Provider](http://localhost:3000/oauth/applications/) and create a new application
* Start the Pipefy App's console, eg: `cd path/to/pipefy/ && rails c`
* Run the following commands

```ruby
app = PlatformApp.find(1)
app.url = 'http://localhost:3001/manifest.json'
app.oauth_client_id = 'YOUR_APPLICATION_ID'
app.save!
```

### Tests

All files were linted with **ESLint** and **Flow** and formated with **Prettier**.

```bash
$ flow
$ eslint ./
$ prettier --config .prettierrc --write '**/*.js' '**/*.jsx'
```

And the app was tested with **Jest**, you can run:

```bash
$ yarn test
```
