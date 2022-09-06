import https from "node:https";

export function getPersons(page, apiKey) {

  https.get(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`, (res) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", (d) => {
        console.log(d);
        process.stdout.write(d);
      });

    })
    .on("error", (e) => {
      console.error(e);
    });

  // const options = {
  //   hostname: `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`,
  //   port: 443,
  //   path: '/todos',
  //   method: 'GET'
  // };

  // const req = https.request(options, (res) => {999999999999999999999999999999999999999

  //   res.on('data', (d) => {
  //     console.log();
  //     process.stdout.write(d);
  //   });
  // });

  // req.on('error', (e) => {
  //   console.error(e);
  // });
  // req.end();
}