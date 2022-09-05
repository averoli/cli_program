//Declaring program variable
const { program } = require("commander");

program
  .version("-v, 1.0.0")
  .option("-m, --medium", "medium pizza size")
  .option("-p, --pepper", "pizza with pepper")
  .option("-c, --cheese", "pizza with cheese");

program.parse(process.argv);

const options = program.opts();

if(options.medium) console.log("Your pizza size is medium");
if(options.pepper) console.log("Your pizza is Pepper");
if(options.cheese) console.log("Your pizza is Chesse");