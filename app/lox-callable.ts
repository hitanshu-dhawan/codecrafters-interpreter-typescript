import type Interpreter from './interpreter.js';

/**
 * Interface for callable objects in Lox (functions, classes, etc.)
 */
interface LoxCallable {
    /**
     * Returns the number of arguments this callable expects.
     */
    arity(): number;

    /**
     * Calls this callable with the given arguments.
     * 
     * @param interpreter The interpreter instance
     * @param args The arguments to pass to the callable
     * @returns The result of the call
     */
    call(interpreter: Interpreter, args: any[]): any;

    /**
     * Returns a string representation of this callable.
     */
    toString(): string;
}

export type { LoxCallable as default };
