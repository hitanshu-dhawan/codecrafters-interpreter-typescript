import { TestRunner } from './test-runner.js';

/**
 * Parser tests based on the CodeCrafters test cases
 */
const parserTests = [
    // Stage #SC2: Parsing Expressions - Booleans & Nil
    {
        name: "Boolean true",
        input: "true",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "true",
        expectedExitCode: 0
    },
    {
        name: "Boolean false",
        input: "false",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "false",
        expectedExitCode: 0
    },
    {
        name: "Nil literal",
        input: "nil",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0
    },

    // Stage #RA8: Parsing Expressions - Number literals
    {
        name: "Integer literal",
        input: "80",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "80.0",
        expectedExitCode: 0
    },
    {
        name: "Zero literal",
        input: "0.0",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "0.0",
        expectedExitCode: 0
    },
    {
        name: "Decimal literal",
        input: "61.93",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "61.93",
        expectedExitCode: 0
    },

    // Stage #TH5: Parsing Expressions - String literals
    {
        name: "Simple string",
        input: '"bar hello"',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "bar hello",
        expectedExitCode: 0
    },
    {
        name: "String with quotes",
        input: "\"'baz'\"",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "'baz'",
        expectedExitCode: 0
    },
    {
        name: "String with comment syntax",
        input: '"// bar"',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "// bar",
        expectedExitCode: 0
    },
    {
        name: "Number as string",
        input: '"54"',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "54",
        expectedExitCode: 0
    },

    // Stage #XE6: Parsing Expressions - Parentheses
    {
        name: "Grouped string",
        input: '("foo")',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group foo)",
        expectedExitCode: 0
    },
    {
        name: "Nested grouping",
        input: "((true))",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group (group true))",
        expectedExitCode: 0
    },
    {
        name: "Grouped nil",
        input: "(nil)",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group nil)",
        expectedExitCode: 0
    },
    {
        name: "Grouped number",
        input: "(43.41)",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group 43.41)",
        expectedExitCode: 0
    },

    // Stage #MQ1: Parsing Expressions - Unary Operators
    {
        name: "Logical not",
        input: "!true",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(! true)",
        expectedExitCode: 0
    },
    {
        name: "Negation",
        input: "-21",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- 21.0)",
        expectedExitCode: 0
    },
    {
        name: "Double negation",
        input: "!!false",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(! (! false))",
        expectedExitCode: 0
    },
    {
        name: "Complex unary with grouping",
        input: "(!!(false))",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group (! (! (group false))))",
        expectedExitCode: 0
    },

    // Stage #WA9: Parsing Expressions - Arithmetic operators (1/2)
    {
        name: "Multiplication and division",
        input: "57 * 64 / 17",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (* 57.0 64.0) 17.0)",
        expectedExitCode: 0
    },
    {
        name: "Left associative division",
        input: "85 / 71 / 95",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (/ 85.0 71.0) 95.0)",
        expectedExitCode: 0
    },
    {
        name: "Complex multiplication and division",
        input: "83 * 25 * 14 / 73",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (* (* 83.0 25.0) 14.0) 73.0)",
        expectedExitCode: 0
    },
    {
        name: "Multiplication with unary and grouping",
        input: "(89 * -18 / (31 * 81))",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group (/ (* 89.0 (- 18.0)) (group (* 31.0 81.0))))",
        expectedExitCode: 0
    },

    // Stage #YF2: Parsing Expressions - Arithmetic operators (2/2)
    {
        name: "String concatenation",
        input: '"hello" + "world"',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(+ hello world)",
        expectedExitCode: 0
    },
    {
        name: "Precedence: multiplication before subtraction",
        input: "79 - 78 * 51 - 46",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- (- 79.0 (* 78.0 51.0)) 46.0)",
        expectedExitCode: 0
    },
    {
        name: "Mixed arithmetic with precedence",
        input: "81 + 19 - 42 / 19",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- (+ 81.0 19.0) (/ 42.0 19.0))",
        expectedExitCode: 0
    },
    {
        name: "Complex arithmetic with grouping",
        input: "(-38 + 62) * (55 * 72) / (62 + 65)",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (* (group (+ (- 38.0) 62.0)) (group (* 55.0 72.0))) (group (+ 62.0 65.0)))",
        expectedExitCode: 0
    },

    // Stage #UH4: Parsing Expressions - Comparison operators
    {
        name: "Greater than",
        input: "86 > 70",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(> 86.0 70.0)",
        expectedExitCode: 0
    },
    {
        name: "Less than or equal",
        input: "16 <= 102",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(<= 16.0 102.0)",
        expectedExitCode: 0
    },
    {
        name: "Chained comparison",
        input: "86 < 102 < 118",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(< (< 86.0 102.0) 118.0)",
        expectedExitCode: 0
    },
    {
        name: "Complex comparison with arithmetic",
        input: "(74 - 54) >= -(14 / 40 + 83)",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(>= (group (- 74.0 54.0)) (- (group (+ (/ 14.0 40.0) 83.0))))",
        expectedExitCode: 0
    },

    // Stage #HT8: Parsing Expressions - Equality operators
    {
        name: "String inequality",
        input: '"world"!="foo"',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(!= world foo)",
        expectedExitCode: 0
    },
    {
        name: "String equality",
        input: '"hello" == "hello"',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== hello hello)",
        expectedExitCode: 0
    },
    {
        name: "Number equality",
        input: "39 == 50",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== 39.0 50.0)",
        expectedExitCode: 0
    },
    {
        name: "Complex equality with comparison",
        input: "(16 != 88) == ((-35 + 29) >= (68 * 36))",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== (group (!= 16.0 88.0)) (group (>= (group (+ (- 35.0) 29.0)) (group (* 68.0 36.0)))))",
        expectedExitCode: 0
    },

    // Stage #WZ8: Parsing Expressions - Syntactic errors
    {
        name: "Unterminated string error",
        input: '"hello',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unterminated string.\n[line 1] Error at end: Expect expression."
    },
    {
        name: "Invalid token in parentheses",
        input: "(foo",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at end: Expect ')' after expression."
    },
    {
        name: "Missing right operand",
        input: "(53 +)",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at ')': Expect expression."
    },
    {
        name: "Invalid start token",
        input: "+",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at '+': Expect expression."
    },

    {
        name: "Empty grouping",
        input: "()",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at ')': Expect expression."
    },
    {
        name: "Multiple operators without operands",
        input: "* /",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at '*': Expect expression."
    },
    {
        name: "Complex nested grouping",
        input: "(((42)))",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group (group (group 42.0)))",
        expectedExitCode: 0
    },
    {
        name: "Mixed operators with correct precedence",
        input: "2 + 3 * 4 - 5 / 2",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- (+ 2.0 (* 3.0 4.0)) (/ 5.0 2.0))",
        expectedExitCode: 0
    },
    {
        name: "Unary operators with grouping",
        input: "-(2 + 3)",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- (group (+ 2.0 3.0)))",
        expectedExitCode: 0
    },
    {
        name: "Multiple comparison operators",
        input: "1 < 2 == 3 > 4",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== (< 1.0 2.0) (> 3.0 4.0))",
        expectedExitCode: 0
    },
    {
        name: "String concatenation with empty string",
        input: '"hello" + ""',
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(+ hello )",
        expectedExitCode: 0
    },
    {
        name: "Complex boolean expression",
        input: "!true == false",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== (! true) false)",
        expectedExitCode: 0
    },
    {
        name: "Nested unary operators",
        input: "---42",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- (- (- 42.0)))",
        expectedExitCode: 0
    },
    {
        name: "All comparison operators",
        input: "1 < 2 <= 3 > 4 >= 5",
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(>= (> (<= (< 1.0 2.0) 3.0) 4.0) 5.0)",
        expectedExitCode: 0
    }
];

/**
 * Run parser tests
 */
async function runParserTests() {
    console.log("🔍 Running Parser Tests...\n");

    const runner = new TestRunner();
    const results = await runner.runTests(parserTests);

    const passed = results.filter(r => r.passed).length;
    const total = results.length;

    console.log(`\n📊 Parser Tests: ${passed}/${total} passed`);

    if (passed !== total) {
        console.log("\n❌ Some parser tests failed!");
        process.exit(1);
    } else {
        console.log("\n✅ All parser tests passed!");
    }

    runner.cleanup();
}

// Export for use in main test runner
export { parserTests, runParserTests };

// Run if this file is executed directly
if (import.meta.main) {
    runParserTests();
}