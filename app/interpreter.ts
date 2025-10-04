import type { ExprVisitor } from './expr.js';
import Expr, { Binary, Grouping, Literal, Unary } from './expr.js';
import Token from './token.js';
import TokenType from './token-type.js';
import Lox from './lox.js';

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
class Interpreter implements ExprVisitor<any> {

    /**
     * Interpret an expression and return its value.
     */
    interpret(expression: Expr): any {
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
     * Visit a literal expression and return its value.
     */
    visitLiteralExpr(expr: Literal): any {
        return expr.value;
    }

    /**
     * Visit a grouping expression and evaluate the inner expression.
     */
    visitGroupingExpr(expr: Grouping): any {
        return this.evaluate(expr.expression);
    }

    /**
     * Visit a unary expression and apply the unary operator.
     */
    visitUnaryExpr(expr: Unary): any {
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
    visitBinaryExpr(expr: Binary): any {
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
