import { get } from "node:https";
import { readFile, writeFile } from "fs";

import ora from "ora";
const spinner = ora("Loading unicorns");

export function getPersons(page, apiKey) {
  spinner.start();
  get(
    `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`,
    (res) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", (d) => {
        process.stdout.write(d);
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
    spinner.text = "Loading rainbows";
  }, 1000);
}

export function getDetails() {
  console.log("details");
}
