import Token from './token.js';
import TokenType from './token-type.js';
import Expr from './expr.js';
import Stmt from './stmt.js';
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
    parseExpression(): Expr | null {
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
     * Parse the tokens and return a list of statements.
     */
    parse(): Stmt[] {
        const statements: Stmt[] = [];
        while (!this.isAtEnd()) {
            const stmt = this.declaration();
            if (stmt !== null) {
                statements.push(stmt);
            }
        }
        return statements;
    }

    /**
     * Parse an expression.
     */
    private expression(): Expr {
        return this.assignment();
    }

    /**
     * Parse a declaration.
     * declaration → classDecl | funDecl | varDecl | statement
     */
    private declaration(): Stmt | null {
        try {
            if (this.match(TokenType.CLASS))
                return this.classDeclaration();
            if (this.match(TokenType.FUN))
                return this.function("function");
            if (this.match(TokenType.VAR))
                return this.varDeclaration();

            return this.statement();
        } catch (error) {
            if (error instanceof ParseError) {
                // Move to the next declaration.
                this.synchronize();
                return null;
            }
            throw error;
        }
    }

    /**
     * Parse a class declaration.
     * classDecl → "class" IDENTIFIER "{" function* "}"
     */
    private classDeclaration(): Stmt {
        const name = this.consume(TokenType.IDENTIFIER, "Expect class name.");
        this.consume(TokenType.LEFT_BRACE, "Expect '{' before class body.");

        const methods: Stmt.Function[] = [];
        while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
            methods.push(this.function("method"));
        }

        this.consume(TokenType.RIGHT_BRACE, "Expect '}' after class body.");

        return new Stmt.Class(name, null, methods);
    }

    /**
     * Parse a function declaration.
     * funDecl → "fun" function
     * function → IDENTIFIER "(" parameters? ")" block
     * parameters → IDENTIFIER ( "," IDENTIFIER )*
     */
    private function(kind: string): Stmt.Function {
        const name = this.consume(TokenType.IDENTIFIER, `Expect ${kind} name.`);
        this.consume(TokenType.LEFT_PAREN, `Expect '(' after ${kind} name.`);
        const parameters: Token[] = [];

        if (!this.check(TokenType.RIGHT_PAREN)) {
            // The function has parameters
            do {
                if (parameters.length >= 255) {
                    this.error(this.peek(), "Can't have more than 255 parameters.");
                }

                parameters.push(this.consume(TokenType.IDENTIFIER, "Expect parameter name."));

            } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after parameters.");

        // Parse function body
        this.consume(TokenType.LEFT_BRACE, `Expect '{' before ${kind} body.`);
        const body = this.block();
        return new Stmt.Function(name, parameters, body);
    }

    /**
     * Parse a variable declaration.
     * varDecl → "var" IDENTIFIER ( "=" expression )? ";"
     */
    private varDeclaration(): Stmt {
        const name = this.consume(TokenType.IDENTIFIER, "Expect variable name.");

        let initializer: Expr | null = null;
        if (this.match(TokenType.EQUAL)) {
            initializer = this.expression();
        }

        this.consume(TokenType.SEMICOLON, "Expect ';' after variable declaration.");
        return new Stmt.Var(name, initializer);
    }

    /**
     * Parse a statement.
     * statement → exprStmt | forStmt | ifStmt | printStmt | returnStmt | whileStmt | block
     */
    private statement(): Stmt {
        if (this.match(TokenType.FOR))
            return this.forStatement();
        if (this.match(TokenType.IF))
            return this.ifStatement();
        if (this.match(TokenType.PRINT))
            return this.printStatement();
        if (this.match(TokenType.RETURN))
            return this.returnStatement();
        if (this.match(TokenType.WHILE))
            return this.whileStatement();
        if (this.match(TokenType.LEFT_BRACE))
            return new Stmt.Block(this.block());

        return this.expressionStatement();
    }

    /**
     * Parse a for statement.
     * forStmt → "for" "(" ( varDecl | exprStmt | ";" ) expression? ";" expression? ")" statement
     * 
     * Desugars the for loop into a while loop:
     * for (initializer; condition; increment) { body }
     * becomes:
     * { initializer; while (condition) { body; increment; } }
     */
    private forStatement(): Stmt {
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'for'.");

        let initializer: Stmt | null;
        if (this.match(TokenType.SEMICOLON)) {
            // No initializer
            initializer = null;
        } else if (this.match(TokenType.VAR)) {
            // varDecl initializer
            initializer = this.varDeclaration();
        } else {
            // exprStmt initializer
            initializer = this.expressionStatement();
        }

        // Loop condition
        let condition: Expr | null = null;
        if (!this.check(TokenType.SEMICOLON)) {
            condition = this.expression();
        }
        this.consume(TokenType.SEMICOLON, "Expect ';' after loop condition.");

        let increment: Expr | null = null;
        if (!this.check(TokenType.RIGHT_PAREN)) {
            increment = this.expression();
        }

        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after for clauses.");
        let body = this.statement();

        // Desugar the for loop into a while loop
        if (increment !== null) {
            body = new Stmt.Block([
                body,
                new Stmt.Expression(increment)
            ]);
        }

        if (condition === null)
            condition = new Expr.Literal(true);
        body = new Stmt.While(condition, body);

        if (initializer !== null) {
            body = new Stmt.Block([
                initializer,
                body
            ]);
        }

        return body;
    }

    /**
     * Parse an if statement.
     * ifStmt → "if" "(" expression ")" statement ( "else" statement )?
     */
    private ifStatement(): Stmt {
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'if'.");
        const condition = this.expression();
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after if condition.");

        const thenBranch = this.statement();
        let elseBranch: Stmt | null = null;
        if (this.match(TokenType.ELSE)) {
            elseBranch = this.statement();
        }

        return new Stmt.If(condition, thenBranch, elseBranch);
    }

    /**
     * Parse a print statement.
     * printStmt → "print" expression ";"
     */
    private printStatement(): Stmt {
        const value = this.expression();
        this.consume(TokenType.SEMICOLON, "Expect ';' after value.");
        return new Stmt.Print(value);
    }

    /**
     * Parse a return statement.
     * returnStmt → "return" expression? ";"
     */
    private returnStatement(): Stmt {
        const keyword = this.previous();
        let value: Expr | null = null;
        if (!this.check(TokenType.SEMICOLON)) {
            value = this.expression();
        }

        this.consume(TokenType.SEMICOLON, "Expect ';' after return value.");
        return new Stmt.Return(keyword, value);
    }

    /**
     * Parse a while statement.
     * whileStmt → "while" "(" expression ")" statement
     */
    private whileStatement(): Stmt {
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'while'.");
        const condition = this.expression();
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after condition.");
        const body = this.statement();

        return new Stmt.While(condition, body);
    }

    /**
     * Parse a block of statements.
     * block → "{" declaration* "}"
     */
    private block(): Stmt[] {
        const statements: Stmt[] = [];

        while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
            const stmt = this.declaration();
            if (stmt !== null) {
                statements.push(stmt);
            }
        }

        this.consume(TokenType.RIGHT_BRACE, "Expect '}' after block.");
        return statements;
    }

    /**
     * Parse an expression statement.
     * exprStmt → expression ";"
     */
    private expressionStatement(): Stmt {
        const expr = this.expression();
        this.consume(TokenType.SEMICOLON, "Expect ';' after expression.");
        return new Stmt.Expression(expr);
    }

    /**
     * Parse an assignment expression.
     * assignment → ( call "." )? IDENTIFIER "=" assignment | or
     */
    private assignment(): Expr {
        const expr = this.or();

        if (this.match(TokenType.EQUAL)) {
            const equals = this.previous();
            const value = this.assignment();

            if (expr instanceof Expr.Variable) {
                const name = expr.name;
                return new Expr.Assign(name, value);
            } else if (expr instanceof Expr.Get) {
                const get = expr;
                return new Expr.SetExpr(get.object, get.name, value);
            }

            this.error(equals, "Invalid assignment target.");
        }

        return expr;
    }

    /**
     * Parse logical OR expressions.
     * or → and ( "or" and )*
     */
    private or(): Expr {
        let expr = this.and();

        while (this.match(TokenType.OR)) {
            const operator = this.previous();
            const right = this.and();
            expr = new Expr.Logical(expr, operator, right);
        }

        return expr;
    }

    /**
     * Parse logical AND expressions.
     * and → equality ( "and" equality )*
     */
    private and(): Expr {
        let expr = this.equality();

        while (this.match(TokenType.AND)) {
            const operator = this.previous();
            const right = this.equality();
            expr = new Expr.Logical(expr, operator, right);
        }

        return expr;
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
            expr = new Expr.Binary(expr, operator, right);
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
            expr = new Expr.Binary(expr, operator, right);
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
            expr = new Expr.Binary(expr, operator, right);
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
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    /**
     * Parse unary expressions.
     * unary → ( "!" | "-" ) unary | call
     */
    private unary(): Expr {
        if (this.match(TokenType.BANG, TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.unary();
            return new Expr.Unary(operator, right);
        }

        return this.call();
    }

    /**
     * Parse call expressions.
     * call → primary ( "(" arguments? ")" | "." IDENTIFIER )*
     */
    private call(): Expr {
        let expr = this.primary();

        while (true) {
            if (this.match(TokenType.LEFT_PAREN)) {
                expr = this.finishCall(expr);
            } else if (this.match(TokenType.DOT)) {
                const name = this.consume(TokenType.IDENTIFIER, "Expect property name after '.'.");
                expr = new Expr.Get(expr, name);
            } else {
                break;
            }
        }

        return expr;
    }

    /**
     * Finish parsing a call expression after the '(' has been consumed.
     * arguments → expression ( "," expression )*
     */
    private finishCall(callee: Expr): Expr {
        const args: Expr[] = [];
        if (!this.check(TokenType.RIGHT_PAREN)) {
            do {
                if (args.length >= 255) {
                    this.error(this.peek(), "Can't have more than 255 arguments.");
                }
                args.push(this.expression());
            } while (this.match(TokenType.COMMA));
        }

        const paren = this.consume(TokenType.RIGHT_PAREN, "Expect ')' after arguments.");

        return new Expr.Call(callee, paren, args);
    }

    /**
     * Parse primary expressions: literals, identifiers, and grouped expressions.
     * primary → "true" | "false" | "nil" | NUMBER | STRING | IDENTIFIER | "(" expression ")"
     */
    private primary(): Expr {

        if (this.match(TokenType.FALSE)) return new Expr.Literal(false);
        if (this.match(TokenType.TRUE)) return new Expr.Literal(true);
        if (this.match(TokenType.NIL)) return new Expr.Literal(null);

        if (this.match(TokenType.NUMBER, TokenType.STRING)) {
            return new Expr.Literal(this.previous().literal);
        }

        if (this.match(TokenType.THIS)) {
            return new Expr.This(this.previous());
        }

        if (this.match(TokenType.IDENTIFIER)) {
            return new Expr.Variable(this.previous());
        }

        if (this.match(TokenType.LEFT_PAREN)) {
            const expr = this.expression();
            this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
            return new Expr.Grouping(expr);
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

    /**
     * Synchronize the parser after an error by discarding tokens until
     * we reach a statement boundary.
     */
    private synchronize(): void {
        this.advance();

        while (!this.isAtEnd()) {
            if (this.previous().type === TokenType.SEMICOLON)
                return;

            switch (this.peek().type) {
                case TokenType.CLASS:
                case TokenType.FUN:
                case TokenType.VAR:
                case TokenType.FOR:
                case TokenType.IF:
                case TokenType.WHILE:
                case TokenType.PRINT:
                case TokenType.RETURN:
                    return;
            }

            this.advance();
        }
    }

}

export default Parser;
