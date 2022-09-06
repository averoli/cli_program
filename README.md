# CLI program developed with node.js

## Description

In this project we create a command-line interface for fetching data from an API.

We create a custom commands so we can access different data from [The Movie Database ](https://www.themoviedb.org/), once we display it on the terminal.

## Getting Started

#### First of all you need to register in the [API](https://www.themoviedb.org/) in order to get an valid api key

- Save your key in an .env file as an environment variable, you will access the key every time you make a call to the api.

The key has to be stored like following example:

```bash
API_KEY=0000fG00000EE0E0E2E2E0E2
```

## Dependencies

- Must have node.js installed in your project.

- In this project we use the following packages:
  - [commander.js](https://github.com/tj/commander.js#readme)
  - [chalk](https://github.com/chalk/chalk)
  - [ora](https://github.com/sindresorhus/ora)
  - [dotenv](https://www.npmjs.com/package/dotenv)

## Installing

- Install all modules that are listed on package.json file and their dependencies, writing the command in your terminal.

```bash
npm install
```

## Usage

- Open your terminal in the right path otherwise it won't work.

- Write some of the following commands in your terminal and you will be able to see the information according to the command.

  - Some command options are required, remember to write them down!

```python
"Terminal path"
/nodeJS/cli_program/src

"Terminal Commands"
#  Popular persons
> node moviedb.js get-persons --page 1 --popular

#  Person details
> node moviedb get-person --id XXXXXXXX

# Movies
> node moviedb.js get-movies --popular --page 2
> node moviedb.js get-movies --now-playing --page 2


#  Single Movie details
> node moviedb.js get-movie --id XXXXX
> moviedb.js get-movie --id movieId --reviews


```

## Authors

- [Volha](https://github.com/averoli)

- [Miguel Dominguez](https://github.com/Dejahar)
- [Reduan SJ](https://github.com/reduansj)
