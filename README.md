# Validator API

- [Validator API](#validator-api)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
    - [1. Healthcheck](#1-healthcheck)
    - [2. Validate](#2-validate)
  - [Adding a new Airnode validator version](#adding-a-new-airnode-validator-version)
  - [Testing](#testing)

## Requirements

Before getting started, you will need to have the following tools installed locally:

- [Node.js](https://github.com/nvm-sh/nvm)
- [Docker [Optional]](https://www.docker.com/)

## Installation

Install the dependencies by running the following command:

```sh
npm install
```

## Usage

Once the project dependencies have been installed, you can start the server by running one of the following commands

```sh
# Option 1: Development mode
# The server restarted whenever a file is changed
npm run dev

# Option 2: Production mode
# The files are compiled using TypeScript and run via Node.js
npm run build
npm run start

# Option 3: Docker
docker build -t validator-api:latest .
docker run -it --rm --name validator-api validator-api
```

This will start an HTTP server on the port defined by the environment variable `PORT` (default: `8000`). This can be configured locally by adding a `.env` file to the project root (see `.env.example`).

## Endpoints

Once the server is running the following endpoints are exposed:

### 1. Healthcheck

Accessible at: `GET /`

This endpoint returns a static JSON object indicating that the server is running.

Example:

```sh
curl 'http://localhost:8000/'
# { "status": "alive" }
```

### 2. Validate

Accessible at: `POST /validate`

This endpoint accepts a single parameter (`config`) and returns a JSON object that indicates if the config is valid or not, as well as the specific errors returned by the `airnode-validator` package.

Parameters:

1. `config` - the full Airnode config (usually defined in a config.json file)

Example:

```sh
curl --request POST 'localhost:8000/validate' \
  --header 'Content-Type: application/json' \
  --data-raw '{ "config": { ... } }'
# { valid: false, errors: [...] }
```

## Adding a new Airnode validator version

This package is intended to be kept up-to-date with Airnode releases. When a new Airnode version is released, this will include a new version of the [airnode-validator](https://www.npmjs.com/package/@api3/airnode-validator) package. In order to support a new validator version, the following steps need to be followed:

1. Add the new version using an alias

```sh
# Add support for v1.2 (ignore the patch version in the alias if possible)
npm install validator-1.2@npm:@api3/airnode-validator@1.2.5
```

2. **IMPORTANT**: Add a test fixture

Place a valid `config.json` in the `test/fixtures` directory into a folder identified by the version. e.g. A valid `config.json` file should be copied to `test/fixtures/1.2/config.json`.

3. Add a "case" for the new version

```ts
// ./src/validation.ts
import * as validator12 from 'validator-1.2';

const getVersionValidator = (semver: Semver) => {
  return match(semver)
    ...
    .with({ major: 1, minor: 2 }, () => validator12.parseConfig)
    .otherwise(() => {
      throw new Error(...);
    });
};
```

## Testing

The project tests can be run with the following commands:

```sh
# Runs all tests without any flags
npm run test

# Runs all tests and watches for file changes
npm run test:watch

# Runs all tests and outputs the coverage metrics to /coverage
npm run test:coverage
```
