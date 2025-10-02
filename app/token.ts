import TokenType from "./token-type.js";

/**
 * Represents a token in the Lox programming language.
 * A token is the smallest unit of meaning in the source code, produced by the lexical analyzer.
 */
class Token {

    /** The type of this token (e.g., IDENTIFIER, NUMBER, STRING, etc.) */
    readonly type: TokenType;

    /**
     * A unit of lexical meaning e.g., var, for, while, class.
     * The raw substring from the source code that this token represents.
     */
    readonly lexeme: string;

    /** 
     * The literal value associated with this token.
     * For example, the actual string content for STRING tokens, 
     * the numeric value for NUMBER tokens, or null for tokens without literals.
     */
    readonly literal: any;

    /** The line number where this token appears in the source code */
    readonly line: number;

    /**
     * Creates a new Token instance.
     * @param type The type of the token
     * @param lexeme The raw text from source code that forms this token
     * @param literal The literal value of the token (null if no literal value)
     * @param line The line number where this token appears in source code
     */
    constructor(type: TokenType, lexeme: string, literal: any, line: number) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }

    /**
     * Returns a string representation of this token in the format: <type, lexeme, literal>
     * @returns A formatted string representation of the token
     */
    toString(): string {
        return `${this.type} ${this.lexeme} ${this.literal}`;
    }
}

export default Token;
