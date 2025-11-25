import { TestRunner } from './test-runner.js';

/**
 * Parser tests based on the CodeCrafters test cases
 */
const parserTests = [
    // Stage #SC2: Parsing Expressions - Booleans & Nil
    {
        name: "[tester::#SC2] [test-1] Parsing Expressions - Booleans & Nil",
        input: `true`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#SC2] [test-2] Parsing Expressions - Booleans & Nil",
        input: `false`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "false",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#SC2] [test-3] Parsing Expressions - Booleans & Nil",
        input: `nil`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #RA8: Parsing Expressions - Number literals
    {
        name: "[tester::#RA8] [test-1] Parsing Expressions - Number literals",
        input: `54`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "54.0",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#RA8] [test-2] Parsing Expressions - Number literals",
        input: `0.0`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "0.0",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#RA8] [test-3] Parsing Expressions - Number literals",
        input: `33.80`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "33.8",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #TH5: Parsing Expressions - String literals
    {
        name: "[tester::#TH5] [test-1] Parsing Expressions - String literals",
        input: `"world hello"`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "world hello",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#TH5] [test-2] Parsing Expressions - String literals",
        input: `"'foo'"`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "'foo'",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#TH5] [test-3] Parsing Expressions - String literals",
        input: `"// baz"`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "// baz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#TH5] [test-4] Parsing Expressions - String literals",
        input: `"99"`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "99",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #XE6: Parsing Expressions - Parentheses
    {
        name: "[tester::#XE6] [test-1] Parsing Expressions - Parentheses",
        input: `("foo")`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group foo)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XE6] [test-2] Parsing Expressions - Parentheses",
        input: `((true))`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group (group true))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XE6] [test-3] Parsing Expressions - Parentheses",
        input: `(nil)`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group nil)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XE6] [test-4] Parsing Expressions - Parentheses",
        input: `(41.22)`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group 41.22)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #MQ1: Parsing Expressions - Unary Operators
    {
        name: "[tester::#MQ1] [test-1] Parsing Expressions - Unary Operators",
        input: `!false`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(! false)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MQ1] [test-2] Parsing Expressions - Unary Operators",
        input: `-14`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- 14.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MQ1] [test-3] Parsing Expressions - Unary Operators",
        input: `!!false`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(! (! false))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MQ1] [test-4] Parsing Expressions - Unary Operators",
        input: `(!!(false))`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group (! (! (group false))))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #WA9: Parsing Expressions - Arithmetic operators (1/2)
    {
        name: "[tester::#WA9] [test-1] Parsing Expressions - Arithmetic operators (1/2)",
        input: `94 * 32 / 88`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (* 94.0 32.0) 88.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#WA9] [test-2] Parsing Expressions - Arithmetic operators (1/2)",
        input: `18 / 45 / 39`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (/ 18.0 45.0) 39.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#WA9] [test-3] Parsing Expressions - Arithmetic operators (1/2)",
        input: `76 * 20 * 95 / 13`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (* (* 76.0 20.0) 95.0) 13.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#WA9] [test-4] Parsing Expressions - Arithmetic operators (1/2)",
        input: `(97 * -52 / (79 * 96))`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(group (/ (* 97.0 (- 52.0)) (group (* 79.0 96.0))))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #YF2: Parsing Expressions - Arithmetic operators (2/2)
    {
        name: "[tester::#YF2] [test-1] Parsing Expressions - Arithmetic operators (2/2)",
        input: `"hello" + "world"`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(+ hello world)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YF2] [test-2] Parsing Expressions - Arithmetic operators (2/2)",
        input: `21 - 54 * 17 - 88`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- (- 21.0 (* 54.0 17.0)) 88.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YF2] [test-3] Parsing Expressions - Arithmetic operators (2/2)",
        input: `24 + 91 - 68 / 81`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(- (+ 24.0 91.0) (/ 68.0 81.0))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YF2] [test-4] Parsing Expressions - Arithmetic operators (2/2)",
        input: `(-20 + 90) * (44 * 76) / (63 + 96)`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(/ (* (group (+ (- 20.0) 90.0)) (group (* 44.0 76.0))) (group (+ 63.0 96.0)))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #UH4: Parsing Expressions - Comparison operators
    {
        name: "[tester::#UH4] [test-1] Parsing Expressions - Comparison operators",
        input: `10 > -10`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(> 10.0 (- 10.0))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#UH4] [test-2] Parsing Expressions - Comparison operators",
        input: `20 <= 30`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(<= 20.0 30.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#UH4] [test-3] Parsing Expressions - Comparison operators",
        input: `10 < 30 < 50`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(< (< 10.0 30.0) 50.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#UH4] [test-4] Parsing Expressions - Comparison operators",
        input: `(29 - 16) >= -(67 / 76 + 39)`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(>= (group (- 29.0 16.0)) (- (group (+ (/ 67.0 76.0) 39.0))))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #HT8: Parsing Expressions - Equality operators
    {
        name: "[tester::#HT8] [test-1] Parsing Expressions - Equality operators",
        input: `"world"!="foo"`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(!= world foo)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#HT8] [test-2] Parsing Expressions - Equality operators",
        input: `"bar" == "bar"`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== bar bar)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#HT8] [test-3] Parsing Expressions - Equality operators",
        input: `39 == 21`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== 39.0 21.0)",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#HT8] [test-4] Parsing Expressions - Equality operators",
        input: `(34 != 90) == ((-37 + 45) >= (22 * 47))`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "(== (group (!= 34.0 90.0)) (group (>= (group (+ (- 37.0) 45.0)) (group (* 22.0 47.0)))))",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #WZ8: Parsing Expressions - Syntactic errors
    {
        name: "[tester::#WZ8] [test-1] Parsing Expressions - Syntactic errors",
        input: `"world`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unterminated string.\n[line 1] Error at end: Expect expression."
    },
    {
        name: "[tester::#WZ8] [test-2] Parsing Expressions - Syntactic errors",
        input: `(foo`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at end: Expect ')' after expression."
    },
    {
        name: "[tester::#WZ8] [test-3] Parsing Expressions - Syntactic errors",
        input: `(31 +)`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at ')': Expect expression."
    },
    {
        name: "[tester::#WZ8] [test-4] Parsing Expressions - Syntactic errors",
        input: `+`,
        command: "./your_program.sh parse test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at '+': Expect expression."
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
