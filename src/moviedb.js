import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

require("dotenv").config();

import { getPopularPersons } from "./popularPeople.js";
import { getPersonDetails } from "./personDetails.js";
import { getMovieDetails } from "./movieDetails.js";
import { getPopularMovies } from "./popularMovies.js";
import { program } from "commander";

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page <number>","The page of persons data results to fetch")
  .action((options) => {
    getPopularPersons(options.page, process.env.API_KEY);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the person")
  .action((options) => {
    getPersonDetails(options.id, process.env.API_KEY);
  });

  program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>","The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action((options) => {
    getPopularMovies(options, process.env.API_KEY);
  });

  program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single movie")
  .requiredOption("-i, --id <number>", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action((options) => {
    getMovieDetails(options, process.env.API_KEY);
  });

program.parse();