import type LoxCallable from './lox-callable.js';
import type Interpreter from './interpreter.js';
import LoxFunction from './lox-function.js';
import LoxInstance from './lox-instance.js';

/**
 * Represents a user-defined class in Lox.
 */
class LoxClass implements LoxCallable {
    readonly name: string;
    readonly superclass: LoxClass | null;
    private readonly methods: Map<string, LoxFunction>;

    constructor(name: string, superclass: LoxClass | null, methods: Map<string, LoxFunction>) {
        this.name = name;
        this.superclass = superclass;
        this.methods = methods;
    }

    /**
     * Returns the number of parameters the class constructor expects.
     * Currently returns 0 as we haven't implemented constructors yet.
     */
    arity(): number {
        const initializer = this.findMethod("init");
        if (initializer === null) return 0;
        return initializer.arity();
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
        const initializer = this.findMethod("init");
        if (initializer !== null) {
            initializer.bind(instance).call(interpreter, args);
        }
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

        if (this.superclass != null) {
            return this.superclass.findMethod(name);
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
