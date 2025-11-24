import type LoxCallable from './lox-callable.js';
import Stmt from './stmt.js';
import type Interpreter from './interpreter.js';
import Environment from './environment.js';

/**
 * Represents a user-defined function in Lox.
 */
class LoxFunction implements LoxCallable {

    private readonly declaration: Stmt.Function;

    constructor(declaration: Stmt.Function) {
        this.declaration = declaration;
    }

    /**
     * Returns the number of parameters this function expects.
     */
    arity(): number {
        return this.declaration.params.length;
    }

    /**
     * Calls this function with the given arguments.
     * 
     * This method creates a new environment for each function call, which is crucial for several reasons:
     * 
     * 1. **Parameter Encapsulation**: Each function gets its own environment where parameters are stored.
     *    No code outside the function can see these parameters.
     * 
     * 2. **Dynamic Environment Creation**: Environments are created at call time, not declaration time.
     *    This is essential for recursion - each recursive call needs its own environment to store
     *    its own parameter values independently.
     * 
     * 3. **Recursion Support**: Multiple calls to the same function can exist simultaneously (e.g., in
     *    recursive calls), and each needs separate storage for its parameters. For example:
     *    ```
     *    fun count(n) {
     *      if (n > 1) count(n - 1);
     *      print n;
     *    }
     *    count(3);
     *    ```
     *    When paused at printing 1, there are three separate environments in memory storing
     *    n=3, n=2, and n=1 for the outer, middle, and innermost calls respectively.
     * 
     * 4. **Parameter Binding**: The method walks the parameter and argument lists in lockstep,
     *    creating a new variable for each parameter name and binding it to the corresponding
     *    argument value. This transforms the static function declaration into a living invocation.
     * 
     * The process:
     * - Create a new environment (chained to globals for accessing global variables)
     * - Bind each parameter to its corresponding argument value
     * - Execute the function body in this new environment (teleporting from the call site)
     * - After execution, executeBlock() discards this environment and restores the caller's environment
     * 
     * @param interpreter The interpreter instance executing the function
     * @param args The argument values passed to the function
     * @returns null (nil in Lox) - return values will be added later
     */
    call(interpreter: Interpreter, args: any[]): any {
        const environment = new Environment(interpreter.globals);
        for (let i = 0; i < this.declaration.params.length; i++) {
            environment.define(this.declaration.params[i].lexeme, args[i]);
        }

        interpreter.executeBlock(this.declaration.body, environment);
        return null;
    }

    /**
     * Returns a string representation of this function.
     */
    toString(): string {
        return `<fn ${this.declaration.name.lexeme}>`;
    }
}

export default LoxFunction;
