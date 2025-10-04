import { TestRunner } from './test-runner.js';

/**
 * Interpreter tests based on the CodeCrafters test cases
 */
const interpreterTests = [
    // Stage #IZ6: Evaluating Expressions - Literals: Booleans & Nil
    {
        name: "Boolean literal true",
        input: "true",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Boolean literal false",
        input: "false",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "false",
        expectedExitCode: 0
    },
    {
        name: "Nil literal",
        input: "nil",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0
    },

    // Stage #LV1: Evaluating Expressions - Literals: Strings & Numbers
    {
        name: "Integer literal",
        input: "50",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "50",
        expectedExitCode: 0
    },
    {
        name: "Decimal literal",
        input: "52.68",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "52.68",
        expectedExitCode: 0
    },
    {
        name: "String literal with spaces",
        input: '"bar quz"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "bar quz",
        expectedExitCode: 0
    },
    {
        name: "Numeric string literal",
        input: '"28"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "28",
        expectedExitCode: 0
    },

    // Stage #OQ9: Evaluating Expressions - Parentheses
    {
        name: "Parenthesized boolean",
        input: "(true)",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Parenthesized number",
        input: "(37)",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "37",
        expectedExitCode: 0
    },
    {
        name: "Parenthesized string",
        input: '("quz bar")',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "quz bar",
        expectedExitCode: 0
    },
    {
        name: "Nested parentheses",
        input: "((false))",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "false",
        expectedExitCode: 0
    },

    // Stage #DC1: Evaluating Expressions - Unary Operators: Negation & Not
    {
        name: "Unary minus on number",
        input: "-37",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "-37",
        expectedExitCode: 0
    },
    {
        name: "Logical not on boolean true",
        input: "!true",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "false",
        expectedExitCode: 0
    },
    {
        name: "Logical not on nil",
        input: "!nil",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Double logical not on number (truthy)",
        input: "(!!77)",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },

    // Stage #BP3: Evaluating Expressions - Arithmetic Operators (1/2)
    {
        name: "Multiplication",
        input: "25 * 60",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "1500",
        expectedExitCode: 0
    },
    {
        name: "Division",
        input: "86 / 5",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "17.2",
        expectedExitCode: 0
    },
    {
        name: "Mixed multiplication and division",
        input: "7 * 4 / 7 / 1",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "4",
        expectedExitCode: 0
    },
    {
        name: "Complex arithmetic with parentheses",
        input: "(18 * 4 / (3 * 6))",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "4",
        expectedExitCode: 0
    },

    // Stage #JY2: Evaluating Expressions - Arithmetic Operators (2/2)
    {
        name: "Subtraction",
        input: "94 - 47",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "47",
        expectedExitCode: 0
    },
    {
        name: "Addition and subtraction",
        input: "96 + 94 - 48",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "142",
        expectedExitCode: 0
    },
    {
        name: "Complex arithmetic with negation",
        input: "51 + 81 - (-(29 - 75))",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "86",
        expectedExitCode: 0
    },
    {
        name: "Zero result arithmetic",
        input: "(-46 + 46) * (85 * 92) / (1 + 4)",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "0",
        expectedExitCode: 0
    },

    // Stage #JX8: Evaluating Expressions - String Concatenation
    {
        name: "Basic string concatenation",
        input: '"hello" + "baz"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "hellobaz",
        expectedExitCode: 0
    },
    {
        name: "String with number concatenation",
        input: '"bar" + "93"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "bar93",
        expectedExitCode: 0
    },
    {
        name: "Multiple string concatenation",
        input: '"hello" + "quz" + "world"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "helloquzworld",
        expectedExitCode: 0
    },
    {
        name: "Parenthesized string concatenation",
        input: '("baz" + "quz") + ("world" + "bar")',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "bazquzworldbar",
        expectedExitCode: 0
    },

    // Stage #ET4: Evaluating Expressions - Relational Operators
    {
        name: "Greater than with negation",
        input: "65 > -138",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Less than or equal",
        input: "65 <= 232",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Greater than or equal",
        input: "94 >= 94",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Complex relational with arithmetic",
        input: "(88 - 17) >= -(130 / 65 + 79)",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },

    // Stage #HW7: Evaluating Expressions - Equality Operators
    {
        name: "String inequality",
        input: '"foo" != "quz"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "String equality",
        input: '"foo" == "foo"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Number string type inequality",
        input: '32 == "32"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "false",
        expectedExitCode: 0
    },
    {
        name: "Arithmetic equality",
        input: "162 == (94 + 68)",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },

    // Stage #GJ9: Evaluating Expressions - Runtime Errors: Unary Operators
    {
        name: "Unary minus on string error",
        input: '-"hello"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },
    {
        name: "Unary minus on boolean true error",
        input: "-true",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },
    {
        name: "Unary minus on boolean false error",
        input: "-false",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },
    {
        name: "Unary minus on concatenated string error",
        input: '-("baz" + "quz")',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },

    // Stage #YU6: Evaluating Expressions - Runtime Errors: Binary Operators (1/2)
    {
        name: "Multiplication with string error",
        input: '44 * "quz"',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "Division with string error",
        input: '"bar" / 15',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "Division with booleans error",
        input: "false / true",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "Multiplication with strings error",
        input: '("quz" + "foo") * ("hello" + "world")',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },

    // Stage #CQ1: Evaluating Expressions - Runtime Errors: Binary Operators (2/2)
    {
        name: "String and boolean addition error",
        input: '"bar" + true',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be two numbers or two strings.\n[line 1]"
    },
    {
        name: "Mixed type addition error",
        input: '41 + "bar" + 14',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be two numbers or two strings.\n[line 1]"
    },
    {
        name: "Number and boolean subtraction error",
        input: "28 - false",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "Boolean and string subtraction error",
        input: 'false - ("world" + "bar")',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },

    // Stage #IB5: Evaluating Expressions - Runtime Errors: Relational Operators
    {
        name: "String and boolean comparison error",
        input: '"baz" < false',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "Boolean and number comparison error",
        input: "true <= (37 + 45)",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "Number and string comparison error",
        input: '47 > ("world" + "quz")',
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "Boolean comparison error",
        input: "true >= false",
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    }
];

/**
 * Run all interpreter tests
 */
async function runInterpreterTests(): Promise<void> {
    console.log("🔍 Running Interpreter Tests...\n");

    const runner = new TestRunner();
    const results = await runner.runTests(interpreterTests);

    const passed = results.filter(r => r.passed).length;
    const total = results.length;

    console.log(`\n📊 Interpreter Tests: ${passed}/${total} passed`);

    if (passed !== total) {
        console.log("\n❌ Some interpreter tests failed!");
        process.exit(1);
    } else {
        console.log("\n✅ All interpreter tests passed!");
    }

    runner.cleanup();
}

// Export for use in main test runner
export { interpreterTests, runInterpreterTests };

// Run if this file is executed directly
if (import.meta.main) {
    runInterpreterTests();
}