require("dotenv").config();
const persons = require("./persons");

const { program } = require("commander");

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .action((options) => {
    persons.getPersons(options.page, process.env.API_KEY);
  });

program.parse();
