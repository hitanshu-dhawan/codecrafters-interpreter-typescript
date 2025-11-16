import Token from './token.js';
import Expr from './expr.js';

/**
 * Base abstract class for all statement nodes in the AST.
 */
abstract class Stmt {

    /**
     * Visitor pattern method to accept a visitor.
     */
    abstract accept<R>(visitor: Stmt.Visitor<R>): R;

}

namespace Stmt {

    /**
     * Visitor interface for statement nodes.
     */
    export interface Visitor<R> {
        visitExpressionStmt(stmt: Expression): R;
        visitFunctionStmt(stmt: Function): R;
        visitIfStmt(stmt: If): R;
        visitBlockStmt(stmt: Block): R;
        visitClassStmt(stmt: Class): R;
        visitPrintStmt(stmt: Print): R;
        visitReturnStmt(stmt: Return): R;
        visitVarStmt(stmt: Var): R;
        visitWhileStmt(stmt: While): R;
    }

    /**
     * Expression statement node (e.g., print "hello";).
     */
    export class Expression extends Stmt {
        readonly expression: Expr;

        constructor(expression: Expr) {
            super();
            this.expression = expression;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitExpressionStmt(this);
        }
    }

    /**
     * Function statement node (e.g., fun myFunction(a, b) { ... }).
     */
    export class Function extends Stmt {
        readonly name: Token;
        readonly params: Token[];
        readonly body: Stmt[];

        constructor(name: Token, params: Token[], body: Stmt[]) {
            super();
            this.name = name;
            this.params = params;
            this.body = body;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitFunctionStmt(this);
        }
    }

    /**
     * If statement node (e.g., if (condition) { ... } else { ... }).
     */
    export class If extends Stmt {
        readonly condition: Expr;
        readonly thenBranch: Stmt;
        readonly elseBranch: Stmt | null;

        constructor(condition: Expr, thenBranch: Stmt, elseBranch: Stmt | null) {
            super();
            this.condition = condition;
            this.thenBranch = thenBranch;
            this.elseBranch = elseBranch;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitIfStmt(this);
        }
    }

    /**
     * Block statement node (e.g., { statement1; statement2; }).
     */
    export class Block extends Stmt {
        readonly statements: Stmt[];

        constructor(statements: Stmt[]) {
            super();
            this.statements = statements;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitBlockStmt(this);
        }
    }

    /**
     * Class statement node (e.g., class MyClass < Superclass { ... }).
     */
    export class Class extends Stmt {
        readonly name: Token;
        readonly superclass: Expr.Variable | null;
        readonly methods: Stmt.Function[];

        constructor(name: Token, superclass: Expr.Variable | null, methods: Stmt.Function[]) {
            super();
            this.name = name;
            this.superclass = superclass;
            this.methods = methods;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitClassStmt(this);
        }
    }

    /**
     * Print statement node (e.g., print expression;).
     */
    export class Print extends Stmt {
        readonly expression: Expr;

        constructor(expression: Expr) {
            super();
            this.expression = expression;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitPrintStmt(this);
        }
    }

    /**
     * Return statement node (e.g., return value;).
     */
    export class Return extends Stmt {
        readonly keyword: Token;
        readonly value: Expr | null;

        constructor(keyword: Token, value: Expr | null) {
            super();
            this.keyword = keyword;
            this.value = value;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitReturnStmt(this);
        }
    }

    /**
     * Variable declaration statement node (e.g., var x = 10;).
     */
    export class Var extends Stmt {
        readonly name: Token;
        readonly initializer: Expr | null;

        constructor(name: Token, initializer: Expr | null) {
            super();
            this.name = name;
            this.initializer = initializer;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitVarStmt(this);
        }
    }

    /**
     * While statement node (e.g., while (condition) { ... }).
     */
    export class While extends Stmt {
        readonly condition: Expr;
        readonly body: Stmt;

        constructor(condition: Expr, body: Stmt) {
            super();
            this.condition = condition;
            this.body = body;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitWhileStmt(this);
        }
    }

}

export default Stmt;
