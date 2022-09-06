import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

require("dotenv").config();

import ora from "ora";
import { getPersons } from "./persons.js";
import { program } from "commander";

const spinner = ora('Loading unicorns');

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
    spinner.start();
    setTimeout(() => {
      getPersons(options.number, process.env.API_KEY);
      spinner.stop();
    }, 1000);
  });

program.parse();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
