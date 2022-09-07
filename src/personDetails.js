import { get } from "node:https";
import chalk from "chalk";

const log = console.log;

import ora from "ora";
const spinner = ora("Loading popular persons data");

export const getPersonDetails = (id, apiKey) => {
  spinner.start();
  get(
    `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`,
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
};

const setChalkColors = (personDetails) => {
  log(
    chalk.white(`\n----------------------------------------------------- \n`) +
      chalk.white(`Person: \n\n`) +
      chalk.white(`ID: ${personDetails.id} \n`) +
      chalk.white(`Name: `) +
      chalk.blue.bold(` ${personDetails.name} \n`) +
      chalk.white(`Birthday: `) +
      chalk.white(` ${personDetails.birthday}  `) +
      chalk.grey("| ") +
      chalk.white(` ${personDetails.place_of_birth} \n`) +
      (personDetails.known_for_department === "Acting"
        ? chalk.white(`Department: `) +
          chalk.magenta(` ${personDetails.known_for_department} \n`)
        : "") +
      chalk.white(`Biography: `) +
      chalk.blue.bold(` ${personDetails.biography} \n`) +
      chalk.white(`Also known as: \n`) +
      (personDetails.also_known_as.length > 0
        ? personDetails.also_known_as.map((alias) =>
            chalk.white(`\n ${alias} `)
          )
        : chalk.yellow(
            ` ${personDetails.name} doesn't have any alternate names \n`
          ))
  );
};