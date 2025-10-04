import type { ExprVisitor } from './expr.js';
import Expr, { Binary, Grouping, Literal, Unary } from './expr.js';

/**
 * AST printer that implements the visitor pattern to convert
 * expression trees into string representations.
 */
class AstPrinter implements ExprVisitor<string> {

    /**
     * Print an expression as a string.
     */
    print(expr: Expr): string {
        return expr.accept(this);
    }

    /**
     * Visit a binary expression and format it as "(operator left right)".
     */
    visitBinaryExpr(expr: Binary): string {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
    }

    /**
     * Visit a grouping expression and format it as "(group expression)".
     */
    visitGroupingExpr(expr: Grouping): string {
        return this.parenthesize("group", expr.expression);
    }

    /**
     * Visit a literal expression and return its string representation.
     */
    visitLiteralExpr(expr: Literal): string {
        if (expr.value === null) {
            return "nil";
        }

        if (typeof expr.value === 'number' && Number.isInteger(expr.value)) {
            return `${expr.value}.0`;
        }

        return expr.value.toString();
    }

    /**
     * Visit a unary expression and format it as "(operator operand)".
     */
    visitUnaryExpr(expr: Unary): string {
        return this.parenthesize(expr.operator.lexeme, expr.right);
    }

    /**
     * Helper method to format expressions with parentheses.
     */
    private parenthesize(name: string, ...exprs: Expr[]): string {
        let result = `(${name}`;
        for (const expr of exprs) {
            result += ` ${expr.accept(this)}`;
        }
        result += ")";
        return result;
    }
}

export default AstPrinter;
