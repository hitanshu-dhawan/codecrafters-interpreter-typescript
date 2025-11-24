import * as fs from 'fs';
import Scanner from './scanner.js';
import Parser from './parser.js';
import AstPrinter from './ast-printer.js';
import Interpreter, { RuntimeError } from './interpreter.js';
import Resolver from './resolver.js';
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
        } else if (command === "parse") {
            if (args.length !== 2) {
                console.log("Usage: ./your_program.sh parse <filename>");
                process.exit(64);
            }
            this.runFile(args[1], command);
        } else if (command === "evaluate") {
            if (args.length !== 2) {
                console.log("Usage: ./your_program.sh evaluate <filename>");
                process.exit(64);
            }
            this.runFile(args[1], command);
        } else if (command === "run") {
            if (args.length !== 2) {
                console.log("Usage: ./your_program.sh run <filename>");
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

        // Scan the source code into tokens
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();

        if (command === "tokenize") {
            for (const token of tokens) {
                console.log(token.toString());
            }
        } else if (command === "parse") {

            // Parse the tokens into an AST
            const parser = new Parser(tokens);
            const expression = parser.parseExpression();

            if (expression) {
                console.log(new AstPrinter().print(expression));
            }
        } else if (command === "evaluate") {

            // Parse the tokens into an AST
            const parser = new Parser(tokens);
            const expression = parser.parseExpression();

            if (expression) {
                // Evaluate the AST
                const interpreter = new Interpreter();
                const result = interpreter.interpretExpression(expression);
                if (result !== undefined) {
                    console.log(interpreter.stringify(result));
                }
            }
        } else if (command === "run") {

            // Parse the tokens into statements
            const parser = new Parser(tokens);
            const statements = parser.parse();

            // Stop if there was a syntax error
            if (this.hadError) return;

            const interpreter = new Interpreter();

            const resolver = new Resolver(interpreter);
            resolver.resolve(statements);

            // Stop if a resolution error was encountered
            if (this.hadError) return;

            // Interpret the statements
            interpreter.interpret(statements);
        }
    }

    /**
     * Reports an error at the specified line.
     * @param line The line number where the error occurred
     * @param message The error message
     */
    static error(line: number, message: string): void;
    /**
     * Reports an error at a given token.
     * @param token The token where the error occurred
     * @param message The error message
     */
    static error(token: Token, message: string): void;
    static error(lineOrToken: number | Token, message: string): void {
        if (lineOrToken instanceof Token) {
            const token = lineOrToken;
            if (token.type === TokenType.EOF) {
                this.report(token.line, " at end", message);
            } else {
                this.report(token.line, ` at '${token.lexeme}'`, message);
            }
        } else {
            this.report(lineOrToken, "", message);
        }
    }

    /**
     * Reports a runtime error.
     * @param error The runtime error that occurred
     */
    static runtimeError(error: RuntimeError): void {
        console.error(`${error.message}\n[line ${error.token.line}]`);
        this.hadRuntimeError = true;
    }

    /**
     * Reports an error with detailed location information.
     * @param line The line number where the error occurred
     * @param where Additional location context (e.g., "", " at end", " at 'token'")
     * @param message The error message
     */
    private static report(line: number, where: string, message: string): void {
        console.error(`[line ${line}] Error${where}: ${message}`);
        this.hadError = true;
    }

}

export default Lox;
