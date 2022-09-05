const https = require("node:https");

module.exports.getPersons = (page, apiKey) => {
  https
    .get(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`,
      (res) => {
        console.log("statusCode:", res.statusCode);
        console.log("headers:", res.headers);

        res.on("data", (d) => {
          process.stdout.write(d);
        });
      }
    )
    .on("error", (e) => {
      console.error(e);
    });
};
