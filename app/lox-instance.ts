import LoxClass from './lox-class.js';

/**
 * Represents an instance of a Lox class.
 */
class LoxInstance {
    private readonly klass: LoxClass;

    constructor(klass: LoxClass) {
        this.klass = klass;
    }

    /**
     * Returns a string representation of this instance.
     */
    toString(): string {
        return `${this.klass.name} instance`;
    }
}

export default LoxInstance;
