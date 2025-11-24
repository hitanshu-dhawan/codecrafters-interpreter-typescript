import Expr from './expr.js';
import Stmt from './stmt.js';
import type Interpreter from './interpreter.js';
import Token from './token.js';
import Lox from './lox.js';

enum FunctionType { NONE, FUNCTION, INITIALIZER, METHOD, }
enum ClassType { NONE, CLASS, SUBCLASS, }

/**
 * Resolver that performs static analysis on the AST to resolve variable bindings.
 * This pass happens between parsing and interpretation to catch certain errors
 * and optimize variable lookups.
 */
class Resolver implements Expr.Visitor<void>, Stmt.Visitor<void> {
    private readonly interpreter: Interpreter;

    /** Stack of scopes for tracking variable declarations and their resolution state. */
    private readonly scopes: Map<string, boolean>[] = [];

    /** Keeps track of whether we are inside a function or not. */
    private currentFunction: FunctionType = FunctionType.NONE;

    /** Keeps track of whether we are inside a class or not. */
    private currentClass: ClassType = ClassType.NONE;

    constructor(interpreter: Interpreter) {
        this.interpreter = interpreter;
    }

    resolve(statements: Stmt[]): void;
    resolve(stmt: Stmt): void;
    resolve(expr: Expr): void;
    resolve(input: Stmt[] | Stmt | Expr): void {
        if (Array.isArray(input)) {
            for (const statement of input) {
                statement.accept(this);
            }
        } else if (input instanceof Stmt) {
            input.accept(this);
        } else if (input instanceof Expr) {
            input.accept(this);
        }
    }

    // #region Expr.Visitor methods

    visitLiteralExpr(expr: Expr.Literal): void {
        // Literals do not require any resolution.
    }
    visitLogicalExpr(expr: Expr.Logical): void {
        this.resolve(expr.left);
        this.resolve(expr.right);
    }
    visitSetExpr(expr: Expr.SetExpr): void {
        this.resolve(expr.value);
        this.resolve(expr.object);
    }
    visitSuperExpr(expr: Expr.Super): void {
        if (this.currentClass === ClassType.NONE) {
            Lox.error(expr.keyword, "Can't use 'super' outside of a class.");
        } else if (this.currentClass !== ClassType.SUBCLASS) {
            Lox.error(expr.keyword, "Can't use 'super' in a class with no superclass.");
        }

        this.resolveLocal(expr, expr.keyword);
    }
    visitThisExpr(expr: Expr.This): void {
        if (this.currentClass === ClassType.NONE) {
            Lox.error(expr.keyword, "Can't use 'this' outside of a class.");
            return;
        }

        this.resolveLocal(expr, expr.keyword);
    }
    visitUnaryExpr(expr: Expr.Unary): void {
        this.resolve(expr.right);
    }
    visitBinaryExpr(expr: Expr.Binary): void {
        this.resolve(expr.left);
        this.resolve(expr.right);
    }
    visitGetExpr(expr: Expr.Get): void {
        this.resolve(expr.object);
    }
    visitCallExpr(expr: Expr.Call): void {
        this.resolve(expr.callee);

        for (const argument of expr.args) {
            this.resolve(argument);
        }
    }
    visitGroupingExpr(expr: Expr.Grouping): void {
        this.resolve(expr.expression);
    }
    visitVariableExpr(expr: Expr.Variable): void {
        if (this.scopes.length > 0 && this.peek().get(expr.name.lexeme) === false) {
            Lox.error(expr.name, "Can't read local variable in its own initializer.");
        }

        this.resolveLocal(expr, expr.name);
    }
    visitAssignExpr(expr: Expr.Assign): void {
        this.resolve(expr.value);
        this.resolveLocal(expr, expr.name);
    }

    // #endregion

    // #region Stmt.Visitor methods

    visitExpressionStmt(stmt: Stmt.Expression): void {
        this.resolve(stmt.expression);
    }
    visitFunctionStmt(stmt: Stmt.Function): void {

        // The name is defined before resolving the function body to allow the function to recursively refer to itself.
        this.declare(stmt.name);
        this.define(stmt.name);

        this.resolveFunction(stmt, FunctionType.FUNCTION);
    }
    private resolveFunction(func: Stmt.Function, type: FunctionType): void { // TODO
        this.beginScope();
        for (const param of func.params) {
            this.declare(param);
            this.define(param);
        }
        this.resolve(func.body);
        this.endScope();
    }
    visitIfStmt(stmt: Stmt.If): void {
        this.resolve(stmt.condition);
        this.resolve(stmt.thenBranch);
        if (stmt.elseBranch != null)
            this.resolve(stmt.elseBranch);
    }
    visitBlockStmt(stmt: Stmt.Block): void {
        this.beginScope();
        this.resolve(stmt.statements);
        this.endScope();
    }
    visitClassStmt(stmt: Stmt.Class): void { // TODO
        this.declare(stmt.name);
        this.define(stmt.name);
    }
    visitPrintStmt(stmt: Stmt.Print): void {
        this.resolve(stmt.expression);
    }
    visitReturnStmt(stmt: Stmt.Return): void { // TODO
        if (stmt.value != null) {
            this.resolve(stmt.value);
        }
    }
    visitVarStmt(stmt: Stmt.Var): void {
        // Variable binding ins split into declaring then defining. This handles edge cases like var a = a;
        this.declare(stmt.name);
        if (stmt.initializer !== null) {
            this.resolve(stmt.initializer);
        }
        this.define(stmt.name);
    }
    visitWhileStmt(stmt: Stmt.While): void {
        this.resolve(stmt.condition);
        this.resolve(stmt.body);
    }

    // #endregion

    /** Begins a new scope by pushing a new map onto the stack. */
    private beginScope(): void {
        this.scopes.push(new Map<string, boolean>());
    }

    /** Ends the current scope by popping it off the stack. */
    private endScope(): void {
        this.scopes.pop();
    }

    /** Marks a variable as declared but not yet fully initialized. */
    private declare(name: Token): void {
        if (this.scopes.length === 0) return;

        const scope = this.peek();
        scope.set(name.lexeme, false);
    }

    /** Marks a variable as fully initialized and ready for use. */
    private define(name: Token): void {
        if (this.scopes.length === 0) return;

        this.peek().set(name.lexeme, true);
    }

    private resolveLocal(expr: Expr, name: Token): void {
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (this.scopes[i].has(name.lexeme)) {
                // TODO
                // this.interpreter.resolve(expr, this.scopes.length - 1 - i);
                return;
            }
        }
    }

    /** Returns the current scope without modifying the stack. */
    private peek(): Map<string, boolean> {
        return this.scopes[this.scopes.length - 1];
    }

}

export default Resolver;
