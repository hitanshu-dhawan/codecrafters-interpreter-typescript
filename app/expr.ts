import Token from './token.js';

/**
 * Visitor interface for expression nodes.
 */
export interface ExprVisitor<R> {
    visitBinaryExpr(expr: Binary): R;
    visitGroupingExpr(expr: Grouping): R;
    visitLiteralExpr(expr: Literal): R;
    visitUnaryExpr(expr: Unary): R;
}

/**
 * Base abstract class for all expression nodes in the AST.
 */
abstract class Expr {
    /**
     * Visitor pattern method to accept a visitor.
     */
    abstract accept<R>(visitor: ExprVisitor<R>): R;
}

/**
 * Binary expression node (e.g., 1 + 2, 3 * 4).
 */
export class Binary extends Expr {
    readonly left: Expr;
    readonly operator: Token;
    readonly right: Expr;

    constructor(left: Expr, operator: Token, right: Expr) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitBinaryExpr(this);
    }
}

/**
 * Grouping expression node (e.g., (expression)).
 */
export class Grouping extends Expr {
    readonly expression: Expr;

    constructor(expression: Expr) {
        super();
        this.expression = expression;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitGroupingExpr(this);
    }
}

/**
 * Literal expression node (e.g., 42, "hello", true, false, nil).
 */
export class Literal extends Expr {
    readonly value: any;

    constructor(value: any) {
        super();
        this.value = value;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitLiteralExpr(this);
    }
}

/**
 * Unary expression node (e.g., -42, !true).
 */
export class Unary extends Expr {
    readonly operator: Token;
    readonly right: Expr;

    constructor(operator: Token, right: Expr) {
        super();
        this.operator = operator;
        this.right = right;
    }

    accept<R>(visitor: ExprVisitor<R>): R {
        return visitor.visitUnaryExpr(this);
    }
}

export default Expr;
