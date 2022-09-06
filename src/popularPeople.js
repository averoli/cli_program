import { get } from "node:https";
import chalk from "chalk";

import { readFileSync, writeFileSync } from "fs";

const log = console.log;

import ora from "ora";
const spinner = ora("Loading popular persons data");

export function getPopularPersons(options, apiKey) {
  spinner.start();
  get(
    `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${options.page}`,
    (res) => {
      let fetchedData = "";
      res
        .on("data", (d) => {
          fetchedData += d;
        })
        .on("end", () => {
          options.save
            ? savePersonsData(fetchedData)
            : setChalkColors(JSON.parse(fetchedData));
          spinner.succeed();
          spinner.stop();
        });
    }
  ).on("error", (e) => {
    console.error(e);
    spinner.fail("error on fetching");
  });

  setTimeout(() => {
    spinner.color = "yellow";
    spinner.text = "Popular Persons data loaded";
  }, 1000);
}

const setChalkColors = (popularPersonsData) => {
  popularPersonsData.page < popularPersonsData.total_pages &&
    log(
      chalk.white(
        `----------------------------------------------------- \n Page: ${popularPersonsData.page} of ${popularPersonsData.total_pages}`
      )
    );

  getPersonData(popularPersonsData.results);
};

const getPersonData = (personsData) => {
  personsData.map((person) => {
    log(
      chalk.white(`----------------------------------------------------- \n`) +
        chalk.white(`Person: \n\n`) +
        chalk.white(`ID: ${person.id} \n`) +
        chalk.white(`Name: `) +
        chalk.blue.bold(` ${person.name} \n`) +
        (person.known_for_department === "Acting"
          ? chalk.white(`Department: `) +
            chalk.magenta(` ${person.known_for_department}  \n`)
          : "")
    );
    getPersonMovie(person.known_for, person);
  });
};

const savePersonsData = (personsData) => {
  readFileSync("./storedData/persons/persons.json", (err, data) => {
    if (err) throw err;
  });

  try {
    writeFileSync("./storedData/persons/persons.json", personsData);
  } catch (err) {
    console.error(err);
  }
};

const getPersonMovie = (movies, person) => {
  let hasMovies = 0;
  movies.map((movie) => {
    movie.title !== undefined &&
      (log(
        `\n` +
          chalk.white(`\t MOVIE: \n`) +
          chalk.white(`\t ID: ${movie.id} \n`) +
          chalk.white(`\t Release Date: ${movie.release_date} \n`) +
          chalk.white(`\t Title: ${movie.title} `) +
          `\n`
      ),
      hasMovies++);
  });
  hasMovies <= 0 &&
    log(chalk.white(`${person.name} doesn't appear in any movie \n`));
};
