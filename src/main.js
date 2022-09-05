require('dotenv').config()
console.log(process.env.API_KEY);

const dotenv = require('dotenv')

const result = dotenv.config()
 if (result.error) {
    throw result.error
 }

 console.log(result.parsed);