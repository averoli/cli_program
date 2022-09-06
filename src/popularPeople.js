import { get } from "node:https";
import chalk from "chalk";

import { readFile, writeFile } from "fs";

const log = console.log;

import ora from "ora";
const spinner = ora("Loading popular persons data");

export function getPopularPersons(page, apiKey) {
  spinner.start();
  get(
    `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`,
    (res) => {
      let fetchedData = "";
      res
        .on("data", (d) => {
          fetchedData += d;
        })
        .on("end", () => {
          setChalkColors(JSON.parse(fetchedData));
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

const getPersonData = (personData) => {
  personData.map((person) => {
    log(
      chalk.white(
        `----------------------------------------------------- \n`,
        `Person: \n`,
        `ID: ${person.id} \n`
      ) +
        chalk.white(`Name: `) +
        chalk.blue.bold(` ${person.name} \n`) +
        (person.known_for_department === "Acting"
          ? chalk.white(`Department: `) +
            chalk.magenta(` ${person.known_for_department}  \n`)
          : "")
    );
    person.known_for.length > 0
      ? getPersonMovie(person.known_for)
      : log(chalk.white(`${person.name} doesn't appear in any movie \n`));
  });
};

const getPersonMovie = (movies) => {
  movies.map((movie) => {
    movie.title !== undefined &&
      log(
        `\n` +
          chalk.white(`\t MOVIE: \n`) +
          chalk.white(`\t ID: ${movie.id} \n`) +
          chalk.white(`\t Release Date: ${movie.release_date} \n`) +
          chalk.white(`\t Title: ${movie.title} `) +
          `\n`
      );
  });
};
