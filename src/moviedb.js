import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

require("dotenv").config();

import { getPopularPersons } from "./popularPeople.js";
import { program } from "commander";

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page <number>","The page of persons data results to fetch")
  .action((options) => {
      getPersons(options.page, process.env.API_KEY);
  });

  program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the person")
  .action((options) => {
    getPopularPersons(options.page, process.env.API_KEY);
  });

program.parse();
