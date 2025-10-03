import Token from './token.js';
import TokenType from './token-type.js';
import Expr, { Binary, Grouping, Literal, Unary } from './expr.js';
import Lox from './lox.js';

/**
 * Parse error class for handling syntax errors.
 */
class ParseError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'ParseError';
    }
}

/**
 * Recursive descent parser for the Lox programming language.
 * Converts a sequence of tokens into an Abstract Syntax Tree (AST).
 */
class Parser {

    private readonly tokens: Token[];
    private current: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    /**
     * Parse the tokens and return an expression.
     * Returns null if there was a syntax error.
     */
    parse(): Expr | null {
        try {
            return this.expression();
        } catch (error) {
            if (error instanceof ParseError) {
                return null;
            }
            throw error;
        }
    }

    /**
     * Parse an expression.
     * Expression → equality
     */
    private expression(): Expr {
        return this.equality();
    }

    /**
     * Parse equality expressions.
     * equality → comparison ( ( "!=" | "==" ) comparison )*
     */
    private equality(): Expr {
        let expr = this.comparison();

        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            const operator = this.previous();
            const right = this.comparison();
            expr = new Binary(expr, operator, right);
        }

        return expr;
    }

    /**
     * Parse comparison expressions.
     * comparison → term ( ( ">" | ">=" | "<" | "<=" ) term )*
     */
    private comparison(): Expr {
        let expr = this.term();

        while (this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
            const operator = this.previous();
            const right = this.term();
            expr = new Binary(expr, operator, right);
        }

        return expr;
    }

    /**
     * Parse term expressions (addition and subtraction).
     * term → factor ( ( "-" | "+" ) factor )*
     */
    private term(): Expr {
        let expr = this.factor();

        while (this.match(TokenType.MINUS, TokenType.PLUS)) {
            const operator = this.previous();
            const right = this.factor();
            expr = new Binary(expr, operator, right);
        }

        return expr;
    }

    /**
     * Parse factor expressions (multiplication and division).
     * factor → unary ( ( "/" | "*" ) unary )*
     */
    private factor(): Expr {
        let expr = this.unary();

        while (this.match(TokenType.SLASH, TokenType.STAR)) {
            const operator = this.previous();
            const right = this.unary();
            expr = new Binary(expr, operator, right);
        }

        return expr;
    }

    /**
     * Parse unary expressions.
     * unary → ( "!" | "-" ) unary | primary
     */
    private unary(): Expr {
        if (this.match(TokenType.BANG, TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.unary();
            return new Unary(operator, right);
        }

        return this.primary();
    }

    /**
     * Parse primary expressions: literals, identifiers, and grouped expressions.
     * primary → "true" | "false" | "nil" | NUMBER | STRING | "(" expression ")"
     */
    private primary(): Expr {

        if (this.match(TokenType.FALSE)) return new Literal(false);
        if (this.match(TokenType.TRUE)) return new Literal(true);
        if (this.match(TokenType.NIL)) return new Literal(null);

        if (this.match(TokenType.NUMBER, TokenType.STRING)) {
            return new Literal(this.previous().literal);
        }

        if (this.match(TokenType.LEFT_PAREN)) {
            const expr = this.expression();
            this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
            return new Grouping(expr);
        }

        throw this.error(this.peek(), "Expect expression.");
    }

    /**
     * Check if the current token matches any of the given types.
     * If it does, consume the token and return true.
     */
    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    /**
     * Consume a token of the given type or throw an error.
     */
    private consume(type: TokenType, message: string): Token {
        if (this.check(type)) {
            return this.advance();
        }

        throw this.error(this.peek(), message);
    }

    /**
     * Check if the current token is of the given type.
     */
    private check(type: TokenType): boolean {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().type === type;
    }

    /**
     * Consume and return the current token.
     */
    private advance(): Token {
        if (!this.isAtEnd()) {
            this.current++;
        }
        return this.previous();
    }

    /**
     * Check if we've reached the end of the tokens.
     */
    private isAtEnd(): boolean {
        return this.peek().type === TokenType.EOF;
    }

    /**
     * Return the current token without consuming it.
     */
    private peek(): Token {
        return this.tokens[this.current];
    }

    /**
     * Return the previous token.
     */
    private previous(): Token {
        return this.tokens[this.current - 1];
    }

    /**
     * Create a parse error and report it.
     */
    private error(token: Token, message: string): ParseError {
        Lox.error(token, message);
        return new ParseError(message);
    }

}

export default Parser;
