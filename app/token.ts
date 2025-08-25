import { TokenType } from "./token-type.js";

export class Token {
    type: TokenType;
    lexeme: string;
    literal: any;

    constructor(type: TokenType, lexeme: string, literal: any) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
    }

    toString(): string {
        return `${this.type} ${this.lexeme} ${this.literal}`;
    }
}
