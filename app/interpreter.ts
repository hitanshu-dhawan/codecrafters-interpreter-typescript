import Expr from './expr.js';
import Stmt from './stmt.js';
import Token from './token.js';
import TokenType from './token-type.js';
import Lox from './lox.js';
import Environment from './environment.js';
import LoxFunction, { Return } from './lox-function.js';
import LoxClass from './lox-class.js';
import LoxInstance from './lox-instance.js';

import type LoxCallable from './lox-callable.js';

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
     * The global environment that stores top-level variable bindings.
     * This holds a fixed reference to the outermost global environment.
     */
    readonly globals = new Environment();

    /**
     * The current environment for variable bindings.
     * This tracks the current environment and changes as we enter and exit local scopes.
     */
    private environment = this.globals;

    /**
     * Mapping of expressions to their resolved scope depths.
     * This is used to optimize variable lookups by knowing how many environments
     * to traverse when looking up a variable's value.
    */
    private readonly locals = new Map<Expr, number>();

    constructor() {
        // Define native function "clock" in the global environment
        const clockFunction: LoxCallable = {
            arity(): number {
                return 0;
            },
            call(interpreter: Interpreter, args: any[]): any {
                return Date.now() / 1000.0;
            },
            toString(): string {
                return "<native fn>";
            }
        };
        this.globals.define("clock", clockFunction);
    }

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

    resolve(expr: Expr, depth: number): void {
        this.locals.set(expr, depth);
    }

    // #region Expr.Visitor methods

    /**
     * Visit a literal expression and return its value.
     */
    visitLiteralExpr(expr: Expr.Literal): any {
        return expr.value;
    }

    /**
     * Visit a logical expression and handle short-circuit evaluation.
     */
    visitLogicalExpr(expr: Expr.Logical): any {
        const left = this.evaluate(expr.left);

        if (expr.operator.type === TokenType.OR) {
            if (this.isTruthy(left)) return left;
        } else {
            if (!this.isTruthy(left)) return left;
        }

        return this.evaluate(expr.right);
    }

    /**
     * Visit a set expression and assign a value to a property on an instance.
     */
    visitSetExpr(expr: Expr.SetExpr): any {
        const object = this.evaluate(expr.object);

        if (!(object instanceof LoxInstance)) {
            throw new RuntimeError(expr.name, "Only instances have fields.");
        }

        const value = this.evaluate(expr.value);
        object.set(expr.name, value);
        return value;
    }

    /**
     * Visit a super expression and retrieve a method from the superclass.
     */
    visitSuperExpr(expr: Expr.Super): any {
        const distance = this.locals.get(expr)!;
        const superclass = this.environment.getAt(distance, "super") as LoxClass;

        const object = this.environment.getAt(distance - 1, "this") as LoxInstance;

        const method = superclass.findMethod(expr.method.lexeme);

        if (method === null) {
            throw new RuntimeError(expr.method, `Undefined property '${expr.method.lexeme}'.`);
        }

        return method.bind(object);
    }

    /**
     * Visit a this expression and return the current instance.
     */
    visitThisExpr(expr: Expr.This): any {
        return this.lookUpVariable(expr.keyword, expr);
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
     * Visit a get expression and retrieve a property from an instance.
     */
    visitGetExpr(expr: Expr.Get): any {
        const object = this.evaluate(expr.object);
        if (object instanceof LoxInstance) {
            return object.get(expr.name);
        }

        throw new RuntimeError(expr.name, "Only instances have properties.");
    }

    /**
     * Visit a call expression and execute the function call.
     */
    visitCallExpr(expr: Expr.Call): any {
        const callee = this.evaluate(expr.callee);

        const args: any[] = [];
        for (const argument of expr.args) {
            args.push(this.evaluate(argument));
        }

        if (!this.isCallable(callee)) {
            throw new RuntimeError(expr.paren, "Can only call functions and classes.");
        }

        const func = callee as LoxCallable;

        if (args.length !== func.arity()) {
            throw new RuntimeError(expr.paren, `Expected ${func.arity()} arguments but got ${args.length}.`);
        }

        return func.call(this, args);
    }

    /**
     * Check if a value is callable (implements LoxCallable interface).
     */
    private isCallable(value: any): value is LoxCallable {
        return value && typeof value.call === 'function' && typeof value.arity === 'function';
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
        return this.lookUpVariable(expr.name, expr);
    }

    /**
     * Visit an assignment expression, evaluate the value, and assign it to the variable.
     */
    visitAssignExpr(expr: Expr.Assign): any {
        const value = this.evaluate(expr.value);

        const distance = this.locals.get(expr);
        if (distance !== undefined) {
            this.environment.assignAt(distance, expr.name, value);
        } else {
            this.globals.assign(expr.name, value);
        }

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
     * Visit a function declaration statement and define the function in the environment.
     */
    visitFunctionStmt(stmt: Stmt.Function): void {
        const func = new LoxFunction(stmt, this.environment, false);
        this.environment.define(stmt.name.lexeme, func);
    }

    /**
     * Visit an if statement and execute the appropriate branch.
     */
    visitIfStmt(stmt: Stmt.If): void {
        if (this.isTruthy(this.evaluate(stmt.condition))) {
            this.execute(stmt.thenBranch);
        } else if (stmt.elseBranch !== null) {
            this.execute(stmt.elseBranch);
        }
    }

    /**
     * Visit a block statement and execute it in a new environment.
     */
    visitBlockStmt(stmt: Stmt.Block): void {
        this.executeBlock(stmt.statements, new Environment(this.environment));
    }

    /**
     * Visit a class declaration statement and define the class in the environment.
     */
    visitClassStmt(stmt: Stmt.Class): void {

        let superclass: any = null;
        if (stmt.superclass !== null) {
            superclass = this.evaluate(stmt.superclass);
            if (!(superclass instanceof LoxClass)) {
                throw new RuntimeError(stmt.superclass.name, "Superclass must be a class.");
            }
        }

        this.environment.define(stmt.name.lexeme, null);

        if (stmt.superclass != null) {
            this.environment = new Environment(this.environment);
            this.environment.define("super", superclass);
        }

        const methods = new Map<string, LoxFunction>();
        for (const method of stmt.methods) {
            const func = new LoxFunction(method, this.environment, method.name.lexeme === "init");
            methods.set(method.name.lexeme, func);
        }

        const klass = new LoxClass(stmt.name.lexeme, superclass as LoxClass, methods);

        if (superclass != null) {
            this.environment = this.environment.enclosing;
        }

        this.environment.assign(stmt.name, klass);
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
     * Visit a return statement and throw a Return exception with the return value.
     */
    visitReturnStmt(stmt: Stmt.Return): void {
        let value: any = null;
        if (stmt.value !== null) {
            value = this.evaluate(stmt.value);
        }

        throw new Return(value);
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

    /**
     * Visit a while statement and execute the body while the condition is truthy.
     */
    visitWhileStmt(stmt: Stmt.While): void {
        while (this.isTruthy(this.evaluate(stmt.condition))) {
            this.execute(stmt.body);
        }
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
     * Look up a variable's value, first checking resolved local scopes, then globals.
     * Uses the resolver's distance information to optimize lookups by jumping directly
     * to the correct environment depth rather than walking the chain.
     * 
     * @param name The token representing the variable name
     * @param expr The expression being evaluated (used as a key in the locals map)
     * @returns The value of the variable
     */
    private lookUpVariable(name: Token, expr: Expr): any {
        const distance = this.locals.get(expr);
        if (distance !== undefined) {
            return this.environment.getAt(distance, name.lexeme);
        } else {
            return this.globals.get(name);
        }
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
