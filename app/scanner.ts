import Token from "./token.js";
import TokenType from "./token-type.js";
import Lox from "./lox.js";

/**
 * Scanner class for lexical analysis of Lox source code.
 * Converts raw source code into a sequence of tokens that can be consumed by the parser.
 */
class Scanner {

    /** The raw source code string to be scanned */
    private readonly source: string;

    /** Collection of tokens produced during scanning */
    private readonly tokens: Token[] = [];

    /**
     * Location of the **first** character of the lexeme being scanned.
     */
    private start: number = 0;

    /**
     * Location of the **current** character being scanned.
     */
    private current: number = 0;

    /** Current line number in the source code for error reporting */
    private line: number = 1;

    /**
     * Reserved keywords in Lox.
     */
    private static readonly keywords: Map<string, TokenType> = new Map([
        ["and", TokenType.AND],
        ["class", TokenType.CLASS],
        ["else", TokenType.ELSE],
        ["false", TokenType.FALSE],
        ["for", TokenType.FOR],
        ["fun", TokenType.FUN],
        ["if", TokenType.IF],
        ["nil", TokenType.NIL],
        ["or", TokenType.OR],
        ["print", TokenType.PRINT],
        ["return", TokenType.RETURN],
        ["super", TokenType.SUPER],
        ["this", TokenType.THIS],
        ["true", TokenType.TRUE],
        ["var", TokenType.VAR],
        ["while", TokenType.WHILE],
    ]);

    /**
     * Creates a new Scanner instance for the given source code.
     * @param source The raw source code string to be tokenized
     */
    constructor(source: string) {
        this.source = source;
    }

    /**
     * Scans the entire source code and returns a list of tokens.
     * @returns Array of tokens representing the tokenized source code
     */
    scanTokens(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        // Add EOF token to mark the end of the token stream
        this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
        return this.tokens;
    }

    /**
     * Scans a single token from the source code.
     * Handles single-character tokens, multi-character operators, literals, and keywords.
     */
    private scanToken(): void {
        // Parse single character lexemes first.
        const c = this.advance();

        switch (c) {

            // Single-character tokens
            case '(':
                this.addToken(TokenType.LEFT_PAREN);
                break;
            case ')':
                this.addToken(TokenType.RIGHT_PAREN);
                break;
            case '{':
                this.addToken(TokenType.LEFT_BRACE);
                break;
            case '}':
                this.addToken(TokenType.RIGHT_BRACE);
                break;
            case ',':
                this.addToken(TokenType.COMMA);
                break;
            case '.':
                this.addToken(TokenType.DOT);
                break;
            case '-':
                this.addToken(TokenType.MINUS);
                break;
            case '+':
                this.addToken(TokenType.PLUS);
                break;
            case ';':
                this.addToken(TokenType.SEMICOLON);
                break;
            case '*':
                this.addToken(TokenType.STAR);
                break;
            case '"':
                this.string();
                break;

            // Matches 1-3 characters - operators that can be combined
            case '!':
                this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
                break;
            case '=':
                this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
                break;
            case '<':
                this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
                break;
            case '>':
                this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
                break;

            // Matches single line comments or division
            case '/':
                if (this.match('/')) {
                    // It's a comment, consume all characters until the end of the line.
                    while (this.peek() !== '\n' && !this.isAtEnd()) {
                        this.advance();
                    }
                } else {
                    // It represents division
                    this.addToken(TokenType.SLASH);
                }
                break;

            // Whitespace
            case ' ':
            case '\r':
            case '\t':
                // Ignore whitespace
                break;

            // New line - advance line counter
            case '\n':
                this.advanceLine();
                break;

            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } else {
                    Lox.error(this.line, `Unexpected character: ${c}`);
                }
                break;
        }
    }

    /**
     * Consumes an identifier or a keyword.
     * Continues reading characters until a non-alphanumeric character is found.
     */
    private identifier(): void {
        while (this.isAlphaNumeric(this.peek())) {
            this.advance();
        }

        const text = this.source.substring(this.start, this.current);
        const type = Scanner.keywords.get(text) || TokenType.IDENTIFIER;
        this.addToken(type);
    }

    /**
     * Consumes an integer or decimal literal. E.g., 1234, 12.34
     * Handles both integer and floating-point numbers.
     */
    private number(): void {
        // Consume digits for the integer part
        while (this.isDigit(this.peek())) {
            this.advance();
        }

        // Look for a fractional part followed by at least one digit.
        if (this.peek() === '.' && this.isDigit(this.peekNext())) {
            // Consume the "."
            this.advance();

            // Consume digits for the fractional part
            while (this.isDigit(this.peek())) {
                this.advance();
            }
        }

        const value = parseFloat(this.source.substring(this.start, this.current));
        this.addToken(TokenType.NUMBER, value);
    }

    /**
     * Scans the contents of a string literal. Strings are represented via ""
     * Supports multi-line strings and proper escape handling.
     */
    private string(): void {
        while (this.peek() !== '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') {
                this.advanceLine();
            }
            this.advance();
        }

        if (this.isAtEnd()) {
            Lox.error(this.line, "Unterminated string.");
            return;
        }

        // The closing ".
        this.advance();

        // Exclude the surrounding quotes from the token
        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType.STRING, value);
    }

    /**
     * Advances the line counter for newline characters.
     */
    private advanceLine(): void {
        this.line++;
    }

    /**
     * Checks if the current character matches the expected character and consumes it if so.
     * @param expected The character to match against
     * @returns true if the character matches and was consumed, false otherwise
     */
    private match(expected: string): boolean {
        // There is no character at `current`.
        if (this.isAtEnd()) return false;
        // The current character is not the one we're looking for.
        if (this.source.charAt(this.current) !== expected) return false;

        this.current++;
        return true;
    }

    /**
     * Returns the current character without advancing the scanner to the next character.
     * @returns The current character, or '\0' if at end of source
     */
    private peek(): string {
        // \0 is the null character.
        if (this.isAtEnd()) return '\0';
        return this.source.charAt(this.current);
    }

    /**
     * Returns the next character without advancing the scanner.
     * Used for lookahead when parsing multi-character tokens.
     * @returns The next character, or '\0' if beyond end of source
     */
    private peekNext(): string {
        if (this.current + 1 >= this.source.length) return '\0';
        return this.source.charAt(this.current + 1);
    }

    /**
     * Checks if a character is alphabetic (a-z, A-Z) or underscore.
     * @param c The character to check
     * @returns true if the character is alphabetic or underscore
     */
    private isAlpha(c: string): boolean {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    }

    /**
     * Checks if a character is alphanumeric (alphabetic or digit).
     * @param c The character to check
     * @returns true if the character is alphanumeric
     */
    private isAlphaNumeric(c: string): boolean {
        return this.isAlpha(c) || this.isDigit(c);
    }

    /**
     * Checks if a character is a digit (0-9).
     * @param c The character to check
     * @returns true if the character is a digit
     */
    private isDigit(c: string): boolean {
        return c >= '0' && c <= '9';
    }

    /**
     * Checks if the scanner has reached the end of the source code.
     * @returns true if at the end of source, false otherwise
     */
    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    }

    /**
     * Consumes and returns the current character, then advances to the next character.
     * @returns The character that was consumed
     */
    private advance(): string {
        // Gets the character at current then increments current.
        return this.source.charAt(this.current++);
    }

    /**
     * Creates and adds a token with the specified type and optional literal value.
     * The token's lexeme is extracted from the source code between start and current positions.
     * @param type The type of token to create
     * @param literal The literal value associated with the token (e.g., actual string content, number value)
     */
    private addToken(type: TokenType, literal: any = null): void {
        const text = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, text, literal, this.line));
    }

}

export default Scanner;
