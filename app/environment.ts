import Token from './token.js';
import { RuntimeError } from './interpreter.js';

/**
 * Environment class for storing variable bindings.
 * 
 * This class implements a symbol table that maps variable names to their values.
 * It provides methods to define new variables and retrieve their values at runtime.
 * 
 * In Lox, variables are dynamically typed, so values can be of any type.
 * Environments form a chain, where each environment has a reference to its enclosing
 * (parent) environment, enabling lexical scoping.
 */
class Environment {

    /**
     * Reference to the enclosing (parent) environment.
     * This is null for the global scope, and non-null for nested scopes.
     */
    readonly enclosing: Environment | null;

    /**
     * Storage for variable bindings.
     * Maps variable names (strings) to their values (any type).
     */
    private readonly values: Map<string, any> = new Map();

    /**
     * Constructor for creating an environment.
     * If no enclosing environment is provided, this creates the global scope.
     * 
     * @param enclosing The parent environment (null for global scope)
     */
    constructor(enclosing: Environment | null = null) {
        this.enclosing = enclosing;
    }

    /**
     * Define a new variable or reassign an existing one.
     * 
     * In Lox, declaring a variable with the same name shadows the previous one
     * in the same scope. This method stores the variable name and its value
     * in the environment's symbol table.
     * 
     * @param name The name of the variable to define
     * @param value The value to assign to the variable (can be any type)
     */
    define(name: string, value: any): void {
        this.values.set(name, value);
    }

    /**
     * Assign a value to an existing variable.
     * 
     * Unlike define(), this method only works with variables that have already been
     * declared. This enforces Lox's rule that variables must be declared before use.
     * If the variable doesn't exist in this environment, recursively checks the
     * enclosing environments. If not found anywhere, throws a runtime error.
     * 
     * @param name The token containing the variable name to assign to
     * @param value The new value to assign to the variable
     * @throws RuntimeError if the variable is not defined
     */
    assign(name: Token, value: any): void {
        if (this.values.has(name.lexeme)) {
            this.values.set(name.lexeme, value);
            return;
        }

        // If not found in this scope, try the enclosing scope recursively
        if (this.enclosing !== null) {
            this.enclosing.assign(name, value);
            return;
        }

        // Variable not found in any scope - throw a runtime error
        throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }

    /**
     * Retrieve the value of a variable.
     * 
     * Looks up the variable by name in the environment's symbol table.
     * If the variable exists, returns its value. If not found in this environment,
     * recursively searches the enclosing environments. If not found anywhere,
     * throws a runtime error.
     * 
     * @param name The token containing the variable name to look up
     * @returns The value of the variable
     * @throws RuntimeError if the variable is not defined
     */
    get(name: Token): any {
        if (this.values.has(name.lexeme)) {
            return this.values.get(name.lexeme);
        }

        // If not found in this scope, try the enclosing scope recursively
        if (this.enclosing !== null) {
            return this.enclosing.get(name);
        }

        // Variable not found in any scope - throw a runtime error
        throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }

}

export default Environment;
