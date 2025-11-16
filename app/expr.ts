import Token from './token.js';

/**
 * Base abstract class for all expression nodes in the AST.
 */
abstract class Expr {

    /**
     * Visitor pattern method to accept a visitor.
     */
    abstract accept<R>(visitor: Expr.Visitor<R>): R;

}

namespace Expr {

    /**
     * Visitor interface for expression nodes.
     */
    export interface Visitor<R> {
        visitLiteralExpr(expr: Literal): R;
        visitLogicalExpr(expr: Logical): R;
        visitSetExpr(expr: SetExpr): R;
        visitSuperExpr(expr: Super): R;
        visitThisExpr(expr: This): R;
        visitUnaryExpr(expr: Unary): R;
        visitBinaryExpr(expr: Binary): R;
        visitGetExpr(expr: Get): R;
        visitCallExpr(expr: Call): R;
        visitGroupingExpr(expr: Grouping): R;
        visitVariableExpr(expr: Variable): R;
        visitAssignExpr(expr: Assign): R;
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

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitLiteralExpr(this);
        }
    }

    /**
     * Logical expression node (e.g., a and b, x or y).
     */
    export class Logical extends Expr {
        readonly left: Expr;
        readonly operator: Token;
        readonly right: Expr;

        constructor(left: Expr, operator: Token, right: Expr) {
            super();
            this.left = left;
            this.operator = operator;
            this.right = right;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitLogicalExpr(this);
        }
    }

    /**
     * Set expression node (e.g., object.property = value).
     */
    export class SetExpr extends Expr {
        readonly object: Expr;
        readonly name: Token;
        readonly value: Expr;

        constructor(object: Expr, name: Token, value: Expr) {
            super();
            this.object = object;
            this.name = name;
            this.value = value;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitSetExpr(this);
        }
    }

    /**
     * Super expression node (e.g., super.method()).
     */
    export class Super extends Expr {
        readonly keyword: Token;
        readonly method: Token;

        constructor(keyword: Token, method: Token) {
            super();
            this.keyword = keyword;
            this.method = method;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitSuperExpr(this);
        }
    }

    /**
     * This expression node (e.g., this.property).
     */
    export class This extends Expr {
        readonly keyword: Token;

        constructor(keyword: Token) {
            super();
            this.keyword = keyword;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitThisExpr(this);
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

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitUnaryExpr(this);
        }
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

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitBinaryExpr(this);
        }
    }

    /**
    * Get expression node (e.g., object.property).
    */
    export class Get extends Expr {
        readonly object: Expr;
        readonly name: Token;

        constructor(object: Expr, name: Token) {
            super();
            this.object = object;
            this.name = name;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitGetExpr(this);
        }
    }

    /**
   * Call expression node (e.g., function(arg1, arg2)).
   */
    export class Call extends Expr {
        readonly callee: Expr;
        readonly paren: Token;
        readonly args: Expr[];

        constructor(callee: Expr, paren: Token, args: Expr[]) {
            super();
            this.callee = callee;
            this.paren = paren;
            this.args = args;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitCallExpr(this);
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

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitGroupingExpr(this);
        }
    }

    /**
     * Variable expression node (e.g., x, myVariable).
     */
    export class Variable extends Expr {
        readonly name: Token;

        constructor(name: Token) {
            super();
            this.name = name;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitVariableExpr(this);
        }
    }

    /**
     * Assignment expression node (e.g., x = 10).
     */
    export class Assign extends Expr {
        readonly name: Token;
        readonly value: Expr;

        constructor(name: Token, value: Expr) {
            super();
            this.name = name;
            this.value = value;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitAssignExpr(this);
        }
    }

}

export default Expr;
