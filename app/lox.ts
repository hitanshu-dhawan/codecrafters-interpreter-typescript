import * as fs from 'fs';
import Scanner from './scanner.js';
import Token from './token.js';
import TokenType from './token-type.js';

/**
 * Main Lox interpreter class.
 * Handles command-line arguments and coordinates the interpretation process.
 */
class Lox {

    /** Flag to track if an error occurred during scanning/parsing */
    static hadError: boolean = false;

    /** Flag to track if a runtime error occurred */
    static hadRuntimeError: boolean = false;

    /**
     * Main entry point for the Lox interpreter.
     * @param args Command line arguments
     */
    static main(args: string[]): void {

        if (args.length < 2) {
            console.log("Usage: ./your_program.sh <command> <filename>");
            process.exit(64);
        }

        const command = args[0];

        if (command === "tokenize") {
            if (args.length !== 2) {
                console.log("Usage: ./your_program.sh tokenize <filename>");
                process.exit(64);
            }
            this.runFile(args[1], command);
        } else {
            console.log(`Unknown command: ${command}`);
            process.exit(64);
        }
    }

    /**
     * Reads the provided file from its path then processes it according to the command.
     * @param path The path of the file to process
     * @param command The command to execute (e.g., "tokenize")
     */
    private static runFile(path: string, command: string): void {
        try {
            // Read the entire file content
            const source = fs.readFileSync(path, 'utf8');
            this.run(source, command);

            // Exit with appropriate error codes
            if (this.hadError) {
                process.exit(65);
            }
            if (this.hadRuntimeError) {
                process.exit(70);
            }
        } catch (error) {
            console.error(`Error reading file: ${path}`);
            process.exit(66);
        }
    }

    /**
     * Processes the source code according to the specified command.
     * @param source The source code to process
     * @param command The command to execute
     */
    private static run(source: string, command: string): void {
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();

        if (command === "tokenize") {
            for (const token of tokens) {
                console.log(token.toString());
            }
        }
    }

    /**
     * Reports an error at the specified line.
     * @param line The line number where the error occurred
     * @param message The error message
     */
    static error(line: number, message: string): void;
    /**
     * Reports an error for a specific token.
     * @param token The token where the error occurred
     * @param message The error message
     */
    static error(token: Token, message: string): void;
    static error(lineOrToken: number | Token, message: string): void {
        if (typeof lineOrToken === 'number') {
            this.report(lineOrToken, "", message);
        } else {
            const token = lineOrToken;
            if (token.type === TokenType.EOF) {
                this.report(token.line, " at end", message);
            } else {
                this.report(token.line, ` at '${token.lexeme}'`, message);
            }
        }
    }

    /**
     * Reports an error with detailed location information.
     * @param line The line number where the error occurred
     * @param where Additional location context
     * @param message The error message
     */
    private static report(line: number, where: string, message: string): void {
        console.error(`[line ${line}] Error${where}: ${message}`);
        this.hadError = true;
    }

}

export default Lox;
