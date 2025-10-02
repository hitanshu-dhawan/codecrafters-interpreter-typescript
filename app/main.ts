import Lox from "./lox.js";

// Get command line arguments (skip node path and script path)
const args: string[] = process.argv.slice(2);

// Call the main function from Lox class
Lox.main(args);
