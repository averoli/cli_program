// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);

// require("dotenv").config();

// import { getPersons } from "./persons.js";

// import { program } from "commander";

// program
//   .command("get-persons")
//   .description("Make a network request to fetch the most popular persons")
//   .requiredOption("-p, --popular", "Fetch the popular persons")
//   .requiredOption(
//     "--page <number>",
//     "The page of persons data results to fetch"
//   )
//   .option("--details")
//   .action((options) => {
//     getPersons(options.page, process.env.API_KEY);
//   });

// program.parse();

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

require("dotenv").config();

import { getPersons } from "./persons.js";
import { program } from "commander";

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page <number>","The page of persons data results to fetch")
  .action((options) => {
    spinner.start();
    setTimeout(() => {
      getPersons(options.page, process.env.API_KEY);
      spinner.stop();
    }, 1000);
  });

  program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the person")
  .action((options) => {
    getPersons(options.page, process.env.API_KEY);
  });

program.parse();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
