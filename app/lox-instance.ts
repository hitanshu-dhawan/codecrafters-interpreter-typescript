import LoxClass from './lox-class.js';
import Token from './token.js';
import { RuntimeError } from './interpreter.js';

/**
 * Represents an instance of a Lox class.
 */
class LoxInstance {
    private readonly klass: LoxClass;
    private readonly fields = new Map<string, any>();

    constructor(klass: LoxClass) {
        this.klass = klass;
    }

    /**
     * Get a property value from this instance.
     */
    get(name: Token): any {
        if (this.fields.has(name.lexeme)) {
            return this.fields.get(name.lexeme);
        }

        throw new RuntimeError(name, `Undefined property '${name.lexeme}'.`);
    }

    /**
     * Set a property value on this instance.
     */
    set(name: Token, value: any): void {
        this.fields.set(name.lexeme, value);
    }

    /**
     * Returns a string representation of this instance.
     */
    toString(): string {
        return `${this.klass.name} instance`;
    }
}

export default LoxInstance;
