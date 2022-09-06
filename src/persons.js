import { get } from "node:https";
import chalk from "chalk";

import { readFile, writeFile } from "fs";

const log = console.log;

import ora from "ora";
const spinner = ora("Loading unicorns");

export function getPopularPersons(page, apiKey) {
  spinner.start();
  get(
    `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`,
    (res) => {
      let fetchedData = "";
      res
        .on("data", (d) => {
          fetchedData += d;

          // process.stdout.write(d);
          spinner.succeed();
        })
        .on("end", () => {
          setChalkColors(JSON.parse(fetchedData));
          spinner.stop();
        });
    }
  ).on("error", (e) => {
    console.error(e);
    spinner.fail("error on fetching");
  });

  setTimeout(() => {
    spinner.color = "yellow";
    spinner.text = "Loading rainbows";
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

const getPersonData = (personData) => {
  personData.map((person) => {
    log(
      chalk.white(
        `----------------------------------------------------- \n`,
        `Person: \n`,
        `ID: ${person.id} \n`
      ) +
        chalk.blue.bold(`Name: ${person.name} \n`) +
        (person.known_for_department === "Acting"
          ? chalk.magenta(`Department: ${person.known_for_department}"  \n`)
          : "")
    );
    getPersonMovie(person.known_for);
  });
};

const getPersonMovie = (movies) => {
  movies.map((movie) => {
    movie.title !== undefined && log(movie.title);
  });
};
