import Expr from './expr.js';
import Stmt from './stmt.js';
import Token from './token.js';
import TokenType from './token-type.js';
import Lox from './lox.js';
import Environment from './environment.js';

/**
 * Runtime error class for interpreter errors.
 */
export class RuntimeError extends Error {
    readonly token: Token;

    constructor(token: Token, message: string) {
        super(message);
        this.token = token;
        this.name = 'RuntimeError';
    }
}

/**
 * Interpreter that evaluates expressions using the visitor pattern.
 */
class Interpreter implements Expr.Visitor<any>, Stmt.Visitor<void> {

    /**
     * The environment that stores variable bindings.
     * This is the global environment for the interpreter.
     */
    private environment = new Environment();

    /**
     * Interpret an expression and return its value.
     */
    interpretExpression(expression: Expr): any {
        try {
            return this.evaluate(expression);
        } catch (error) {
            if (error instanceof RuntimeError) {
                Lox.runtimeError(error);
                return undefined;
            }
            throw error;
        }
    }

    /**
     * Interpret a list of statements.
     */
    interpret(statements: Stmt[]): void {
        try {
            for (const statement of statements) {
                this.execute(statement);
            }
        } catch (error) {
            if (error instanceof RuntimeError) {
                Lox.runtimeError(error);
            } else {
                throw error;
            }
        }
    }

    // #region Expr.Visitor methods

    /**
     * Visit a literal expression and return its value.
     */
    visitLiteralExpr(expr: Expr.Literal): any {
        return expr.value;
    }

    /**
     * Visit a unary expression and apply the unary operator.
     */
    visitUnaryExpr(expr: Expr.Unary): any {
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return -right;
            case TokenType.BANG:
                return !this.isTruthy(right);
        }

        // Unreachable
        return null;
    }

    /**
     * Visit a binary expression and apply the binary operator.
     */
    visitBinaryExpr(expr: Expr.Binary): any {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return left > right;
            case TokenType.GREATER_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return left >= right;
            case TokenType.LESS:
                this.checkNumberOperands(expr.operator, left, right);
                return left < right;
            case TokenType.LESS_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return left <= right;
            case TokenType.BANG_EQUAL:
                return !this.isEqual(left, right);
            case TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right);
            case TokenType.MINUS:
                this.checkNumberOperands(expr.operator, left, right);
                return left - right;
            case TokenType.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return left + right;
                }
                if (typeof left === 'string' && typeof right === 'string') {
                    return left + right;
                }
                throw new RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
            case TokenType.SLASH:
                this.checkNumberOperands(expr.operator, left, right);
                return left / right;
            case TokenType.STAR:
                this.checkNumberOperands(expr.operator, left, right);
                return left * right;
        }

        // Unreachable
        return null;
    }

    /**
     * Visit a grouping expression and evaluate the inner expression.
     */
    visitGroupingExpr(expr: Expr.Grouping): any {
        return this.evaluate(expr.expression);
    }

    /**
     * Visit a variable expression and return its value from the environment.
     */
    visitVariableExpr(expr: Expr.Variable): any {
        return this.environment.get(expr.name);
    }

    /**
     * Visit an assignment expression, evaluate the value, and assign it to the variable.
     */
    visitAssignExpr(expr: Expr.Assign): any {
        const value = this.evaluate(expr.value);
        this.environment.assign(expr.name, value);
        return value;
    }

    // #endregion

    // #region Stmt.Visitor methods

    /**
     * Visit an expression statement and evaluate the expression.
     */
    visitExpressionStmt(stmt: Stmt.Expression): void {
        this.evaluate(stmt.expression);
    }

    /**
     * Visit a block statement and execute it in a new environment.
     */
    visitBlockStmt(stmt: Stmt.Block): void {
        this.executeBlock(stmt.statements, new Environment(this.environment));
    }

    /**
     * Execute a block of statements in the given environment.
     * Temporarily switches to the provided environment, executes all statements,
     * then restores the previous environment (even if an error occurs).
     * 
     * @param statements The list of statements to execute
     * @param environment The environment to use for executing the statements
     */
    executeBlock(statements: Stmt[], environment: Environment): void {
        const previous = this.environment;
        try {
            this.environment = environment;

            for (const statement of statements) {
                this.execute(statement);
            }
        } finally {
            this.environment = previous;
        }
    }

    /**
     * Visit a print statement and print the evaluated expression.
     */
    visitPrintStmt(stmt: Stmt.Print): void {
        const value = this.evaluate(stmt.expression);
        console.log(this.stringify(value));
    }

    /**
     * Visit a variable declaration statement.
     * Evaluates the initializer (if present) and stores the variable in the environment.
     */
    visitVarStmt(stmt: Stmt.Var): void {
        let value: any = null;
        if (stmt.initializer !== null) {
            value = this.evaluate(stmt.initializer);
        }

        this.environment.define(stmt.name.lexeme, value);
    }

    // #endregion

    /**
     * Check if an operand is a number, throw error if not.
     */
    private checkNumberOperand(operator: Token, operand: any): void {
        if (typeof operand !== 'number') {
            throw new RuntimeError(operator, "Operand must be a number.");
        }
    }

    /**
     * Check if both operands are numbers, throw error if not.
     */
    private checkNumberOperands(operator: Token, left: any, right: any): void {
        if (typeof left !== 'number' || typeof right !== 'number') {
            throw new RuntimeError(operator, "Operands must be numbers.");
        }
    }

    /**
     * Determine if a value is truthy according to Lox rules.
     */
    private isTruthy(object: any): boolean {
        if (object === null) return false;
        if (typeof object === 'boolean') return object;
        return true;
    }

    /**
     * Check if two values are equal according to Lox rules.
     */
    private isEqual(a: any, b: any): boolean {
        if (a === null && b === null) return true;
        if (a === null) return false;
        return a === b;
    }

    /**
     * Evaluate an expression.
     */
    private evaluate(expr: Expr): any {
        return expr.accept(this);
    }

    /**
     * Execute a statement.
     */
    private execute(stmt: Stmt): void {
        stmt.accept(this);
    }

    /**
     * Convert a value to its string representation.
     */
    stringify(object: any): string {
        if (object === null) return "nil";

        if (typeof object === 'number') {
            let text = object.toString();
            if (text.endsWith('.0')) {
                text = text.substring(0, text.length - 2);
            }
            return text;
        }

        return object.toString();
    }
}

export default Interpreter;
