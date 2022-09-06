import {
    get
} from "node:https";
import chalk from "chalk";

import {
    readFile,
    writeFile
} from "fs";

const log = console.log;

import ora from "ora";
const spinner = ora("Loading popular movies data");

export function getPopularMovies(options, apiKey) {
    const path = options.nowPlaying ?
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${options.page}` :
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&options.page=${options.page}`;

    spinner.start();
    get(
        path,
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
}

const setChalkColors = (popularMovieData) => {

    popularMovieData.page < popularMovieData.total_pages &&
        log( chalk.white(`\n----------------------------------------------------- \n`)+
        chalk.white(`Page: ${popularMovieData.page} of ${popularMovieData.total_pages} \n`));

    getPersonData(popularMovieData.results);
};

const getPersonData = (movieData) => {
    movieData.map((movie) => {
        log(
            chalk.white(`Movie: \n\n`) +
            chalk.white(`ID: ${movie.id} \n`) +
            chalk.white(`Title: `) +
            chalk.blue.bold(` ${movie.original_title} \n`) +
            chalk.white(`Release Date: `) +
            chalk.white(` ${movie.release_date} \n`)
        );
        // getmovieMovie(movie.known_for, movie);
    });
};

const getPersonMovie = (movies, person) => {
    let hasMovies = 0;
    movies.map((movie) => {
        movie.title !== undefined &&
            (log(
                    `\n` +
                    chalk.white(`\t MOVIE: \n`) +
                    chalk.white(`\t ID: ${movie.id} \n`) +
                    chalk.white(`\t Release Date: ${movie.release_date} \n`) +
                    chalk.white(`\t Title: ${movie.title} `) +
                    `\n`
                ),
                hasMovies++);
    });
    hasMovies <= 0 &&
        log(chalk.white(`${person.name} doesn't appear in any movie \n`));
};