import Expr from './expr.js';
import Stmt from './stmt.js';
import type Interpreter from './interpreter.js';

/**
 * Resolver that performs static analysis on the AST to resolve variable bindings.
 * This pass happens between parsing and interpretation to catch certain errors
 * and optimize variable lookups.
 */
class Resolver implements Expr.Visitor<void>, Stmt.Visitor<void> {
    private readonly interpreter: Interpreter;

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

    visitLiteralExpr(expr: Expr.Literal): void { }
    visitLogicalExpr(expr: Expr.Logical): void { }
    visitSetExpr(expr: Expr.SetExpr): void { }
    visitSuperExpr(expr: Expr.Super): void { }
    visitThisExpr(expr: Expr.This): void { }
    visitUnaryExpr(expr: Expr.Unary): void { }
    visitBinaryExpr(expr: Expr.Binary): void { }
    visitGetExpr(expr: Expr.Get): void { }
    visitCallExpr(expr: Expr.Call): void { }
    visitGroupingExpr(expr: Expr.Grouping): void { }
    visitVariableExpr(expr: Expr.Variable): void { }
    visitAssignExpr(expr: Expr.Assign): void { }

    // #endregion

    // #region Stmt.Visitor methods

    visitExpressionStmt(stmt: Stmt.Expression): void { }
    visitFunctionStmt(stmt: Stmt.Function): void { }
    visitIfStmt(stmt: Stmt.If): void { }
    visitBlockStmt(stmt: Stmt.Block): void { }
    visitClassStmt(stmt: Stmt.Class): void { }
    visitPrintStmt(stmt: Stmt.Print): void { }
    visitReturnStmt(stmt: Stmt.Return): void { }
    visitVarStmt(stmt: Stmt.Var): void { }
    visitWhileStmt(stmt: Stmt.While): void { }

    // #endregion

}

export default Resolver;
