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

Create or edit a file named `.env.sample` with an env var to tell the url of the pipefy, as the following:
```
PIPEFY_URL=http://localhost:3000
```

If you need to keep Webpack watching your changes add `-w`, eg: `yarn compile -w`.

> The Calendar App access the Pipefy's GraphQL API locally (in development environment), so you'll need to run the Pipefy App too (eg. `cd path/to/pipefy/ && rails s`).

#### Pipefy-client

If you need to run calendar using a local instance of pipefy-client you need to add some configurations:

* Change `.env.sample` and add the `PIPEFY_URL` variable, example:
```
PIPEFY_CLIENT_URL=http://localhost:3020/client.js


```


#### Further Setting on Pipefy

To Calendar App access the GraphQL API properly, you need to do some settings on Pipefy too.

* Add the `CALENDAR_APP_URL` ENV var on `.env.local`, for example:

```
CALENDAR_APP_URL=localhost:3001
```

* Start the Pipefy App locally
* Create (or rename) a organization with the name __Pipefy Team__
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
