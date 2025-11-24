import type LoxCallable from './lox-callable.js';
import type Interpreter from './interpreter.js';
import LoxFunction from './lox-function.js';
import LoxInstance from './lox-instance.js';

/**
 * Represents a user-defined class in Lox.
 */
class LoxClass implements LoxCallable {
    readonly name: string;
    private readonly methods: Map<string, LoxFunction>;

    constructor(name: string, methods: Map<string, LoxFunction>) {
        this.name = name;
        this.methods = methods;
    }

    /**
     * Returns the number of parameters the class constructor expects.
     * Currently returns 0 as we haven't implemented constructors yet.
     */
    arity(): number {
        return 0;
    }

    /**
     * Calls the class constructor and returns a new instance.
     * 
     * @param interpreter The interpreter instance executing the call
     * @param args The argument values passed to the constructor
     * @returns A new instance of this class
     */
    call(interpreter: Interpreter, args: any[]): any {
        const instance = new LoxInstance(this);
        return instance;
    }

    /**
     * Find a method by name in this class.
     * 
     * @param name The name of the method to find
     * @returns The method if found, null otherwise
     */
    findMethod(name: string): LoxFunction | null {
        if (this.methods.has(name)) {
            return this.methods.get(name)!;
        }
        return null;
    }

    /**
     * Returns a string representation of this class.
     */
    toString(): string {
        return this.name;
    }
}

export default LoxClass;
