import { get } from "node:https";
import chalk from "chalk";

const log = console.log;

import ora from "ora";
const spinner = ora("Loading popular persons data \n");

export const getMovieDetails = (options, apiKey) => {
  spinner.start();
  const path = options.reviews
    ? `https://api.themoviedb.org/3/movie/${options.id}/reviews?api_key=${apiKey}&language=en-US`
    : `https://api.themoviedb.org/3/movie/${options.id}?api_key=${apiKey}&language=en-US`;

  get(path, (res) => {
    let fetchedData = "";
    res
      .on("data", (d) => {
        fetchedData += d;
      })
      .on("end", () => {
        !options.reviews
          ? setChalkColors(JSON.parse(fetchedData))
          : setChalkColorsReview(JSON.parse(fetchedData));
        spinner.succeed();
        spinner.stop();
      });
  }).on("error", (e) => {
    console.error(e);
    spinner.fail("error on fetching");
  });

  setTimeout(() => {
    spinner.color = "yellow";
    spinner.text = "Popular Persons data loaded";
  }, 1000);
};

const setChalkColors = (movieDetails) => {
  log(
    chalk.white(`\n----------------------------------------------------- \n`) +
      chalk.white(`movie: \n\n`) +
      chalk.white(`ID: ${movieDetails.id} \n`) +
      chalk.white(`Title: `) +
      chalk.blue.bold(` ${movieDetails.name} \n`) +
      chalk.white(`Release Date: `) +
      chalk.white(` ${movieDetails.release_date}  \n`) +
      chalk.white(`Runtime: `) +
      chalk.white(` ${movieDetails.runtime}  \n`) +
      chalk.white(`Vote Count: `) +
      chalk.white(` ${movieDetails.vote_count}  \n`) +
      chalk.white(`Overview: `) +
      chalk.white(` ${movieDetails.overview} \n\n`) +
      chalk.white(`Genres: `) +
      (movieDetails.genres.length > 0
        ? movieDetails.genres.map((e) => chalk.white(`\n${e.name}`))
        : chalk.yellow(` The movie doesn’t have a declared genre \n`)) +
      chalk.white(`\n\nSpoken Languages:`) +
      (movieDetails.spoken_languages.length > 0
        ? movieDetails.spoken_languages.map((languages) =>
            chalk.white(`\n${languages.name}`)
          )
        : chalk.yellow(
            ` The movie: ${movieDetails.id} doesn’t have any declared languages \n`
          ))
  );
};

const setChalkColorsReview = (reviews) => {
  reviews.results.length > 0
    ? (reviews.total_pages < reviews.page &&
        log(
          chalk.white(
            `\n----------------------------------------------------- \n`
          ) + chalk.white(`Page: ${reviews.page} of ${reviews.total_pages} \n`)
        ),
      reviews.results.map((review) => {
        log(
          chalk.white(
            `\n----------------------------------------------------- \n`
          ) +
            chalk.white(`Reviews: \n\n`) +
            chalk.blue.bold(`Author: ${review.author} \n`) +
            chalk.white(`Content: `) +
            (review.content.length >= 400
              ? chalk.white(` ${review.content.slice(0, 400)}... \n`)
              : chalk.white(` ${review.content} \n`))
        );
      }))
    : log(chalk.yellow(`The movie: ${reviews.id} doesn’t have any reviews`));
};
