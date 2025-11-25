import { TestRunner } from './test-runner.js';

/**
 * Interpreter tests based on the CodeCrafters test cases
 */
const interpreterTests = [
    // Stage #IZ6: Evaluating Expressions - Literals: Booleans & Nil
    {
        name: "[tester::#IZ6] [test-1] Evaluating Expressions - Literals: Booleans & Nil",
        input: `true`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#IZ6] [test-2] Evaluating Expressions - Literals: Booleans & Nil",
        input: `false`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "false",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#IZ6] [test-3] Evaluating Expressions - Literals: Booleans & Nil",
        input: `nil`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #LV1: Evaluating Expressions - Literals: Strings & Numbers
    {
        name: "[tester::#LV1] [test-1] Evaluating Expressions - Literals: Strings & Numbers",
        input: `97`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "97",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#LV1] [test-2] Evaluating Expressions - Literals: Strings & Numbers",
        input: `65.81`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "65.81",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#LV1] [test-3] Evaluating Expressions - Literals: Strings & Numbers",
        input: `"bar hello"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "bar hello",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#LV1] [test-4] Evaluating Expressions - Literals: Strings & Numbers",
        input: `"19"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "19",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #OQ9: Evaluating Expressions - Parentheses
    {
        name: "[tester::#OQ9] [test-1] Evaluating Expressions - Parentheses",
        input: `(true)`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OQ9] [test-2] Evaluating Expressions - Parentheses",
        input: `(58)`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "58",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OQ9] [test-3] Evaluating Expressions - Parentheses",
        input: `("baz quz")`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "baz quz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OQ9] [test-4] Evaluating Expressions - Parentheses",
        input: `((true))`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #DC1: Evaluating Expressions - Unary Operators: Negation & Not
    {
        name: "[tester::#DC1] [test-1] Evaluating Expressions - Unary Operators: Negation & Not",
        input: `-54`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "-54",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DC1] [test-2] Evaluating Expressions - Unary Operators: Negation & Not",
        input: `!false`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DC1] [test-3] Evaluating Expressions - Unary Operators: Negation & Not",
        input: `!nil`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DC1] [test-4] Evaluating Expressions - Unary Operators: Negation & Not",
        input: `(!!36)`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #BP3: Evaluating Expressions - Arithmetic Operators (1/2)
    {
        name: "[tester::#BP3] [test-1] Evaluating Expressions - Arithmetic Operators (1/2)",
        input: `95 * 89`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "8455",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BP3] [test-2] Evaluating Expressions - Arithmetic Operators (1/2)",
        input: `92 / 5`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "18.4",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BP3] [test-3] Evaluating Expressions - Arithmetic Operators (1/2)",
        input: `7 * 4 / 7 / 1`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "4",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BP3] [test-4] Evaluating Expressions - Arithmetic Operators (1/2)",
        input: `(18 * 4 / (3 * 6))`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "4",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #JY2: Evaluating Expressions - Arithmetic Operators (2/2)
    {
        name: "[tester::#JY2] [test-1] Evaluating Expressions - Arithmetic Operators (2/2)",
        input: `10 - 40`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "-30",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JY2] [test-2] Evaluating Expressions - Arithmetic Operators (2/2)",
        input: `22 + 97 - 81`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "38",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JY2] [test-3] Evaluating Expressions - Arithmetic Operators (2/2)",
        input: `58 + 28 - (-(92 - 58))`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "120",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JY2] [test-4] Evaluating Expressions - Arithmetic Operators (2/2)",
        input: `(-56 + 56) * (35 * 89) / (1 + 4)`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "0",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #JX8: Evaluating Expressions - String Concatenation
    {
        name: "[tester::#JX8] [test-1] Evaluating Expressions - String Concatenation",
        input: `"quz" + "world"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "quzworld",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JX8] [test-2] Evaluating Expressions - String Concatenation",
        input: `"bar" + "95"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "bar95",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JX8] [test-3] Evaluating Expressions - String Concatenation",
        input: `"bar" + "quz" + "hello"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "barquzhello",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JX8] [test-4] Evaluating Expressions - String Concatenation",
        input: `("bar" + "quz") + ("world" + "baz")`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "barquzworldbaz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #ET4: Evaluating Expressions - Relational Operators
    {
        name: "[tester::#ET4] [test-1] Evaluating Expressions - Relational Operators",
        input: `38 > -110`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ET4] [test-2] Evaluating Expressions - Relational Operators",
        input: `38 <= 169`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ET4] [test-3] Evaluating Expressions - Relational Operators",
        input: `59 >= 59`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ET4] [test-4] Evaluating Expressions - Relational Operators",
        input: `(41 - 23) >= -(76 / 38 + 33)`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #HW7: Evaluating Expressions - Equality Operators
    {
        name: "[tester::#HW7] [test-1] Evaluating Expressions - Equality Operators",
        input: `"quz" != "world"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#HW7] [test-2] Evaluating Expressions - Equality Operators",
        input: `"quz" == "quz"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#HW7] [test-3] Evaluating Expressions - Equality Operators",
        input: `26 == "26"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "false",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#HW7] [test-4] Evaluating Expressions - Equality Operators",
        input: `86 == (15 + 71)`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #GJ9: Evaluating Expressions - Runtime Errors: Unary Operators
    {
        name: "[tester::#GJ9] [test-1] Evaluating Expressions - Runtime Errors: Unary Operators",
        input: `-"world"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },
    {
        name: "[tester::#GJ9] [test-2] Evaluating Expressions - Runtime Errors: Unary Operators",
        input: `-true`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },
    {
        name: "[tester::#GJ9] [test-3] Evaluating Expressions - Runtime Errors: Unary Operators",
        input: `-false`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },
    {
        name: "[tester::#GJ9] [test-4] Evaluating Expressions - Runtime Errors: Unary Operators",
        input: `-"baz" + "baz"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operand must be a number.\n[line 1]"
    },
    // Stage #YU6: Evaluating Expressions - Runtime Errors: Binary Operators (1/2)
    {
        name: "[tester::#YU6] [test-1] Evaluating Expressions - Runtime Errors: Binary Operators (1/2)",
        input: `98 * "world"`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "[tester::#YU6] [test-2] Evaluating Expressions - Runtime Errors: Binary Operators (1/2)",
        input: `"world" / 59`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "[tester::#YU6] [test-3] Evaluating Expressions - Runtime Errors: Binary Operators (1/2)",
        input: `false / true`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "[tester::#YU6] [test-4] Evaluating Expressions - Runtime Errors: Binary Operators (1/2)",
        input: `("world" + "baz") * ("bar" + "bar")`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    // Stage #CQ1: Evaluating Expressions - Runtime Errors: Binary Operators (2/2)
    {
        name: "[tester::#CQ1] [test-1] Evaluating Expressions - Runtime Errors: Binary Operators (2/2)",
        input: `"bar" + false`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be two numbers or two strings.\n[line 1]"
    },
    {
        name: "[tester::#CQ1] [test-2] Evaluating Expressions - Runtime Errors: Binary Operators (2/2)",
        input: `14 + "bar" + 10`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be two numbers or two strings.\n[line 1]"
    },
    {
        name: "[tester::#CQ1] [test-3] Evaluating Expressions - Runtime Errors: Binary Operators (2/2)",
        input: `39 - true`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "[tester::#CQ1] [test-4] Evaluating Expressions - Runtime Errors: Binary Operators (2/2)",
        input: `true - ("foo" + "quz")`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    // Stage #IB5: Evaluating Expressions - Runtime Errors: Relational Operators
    {
        name: "[tester::#IB5] [test-1] Evaluating Expressions - Runtime Errors: Relational Operators",
        input: `"bar" < true`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "[tester::#IB5] [test-2] Evaluating Expressions - Runtime Errors: Relational Operators",
        input: `false <= (47 + 11)`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "[tester::#IB5] [test-3] Evaluating Expressions - Runtime Errors: Relational Operators",
        input: `18 > ("hello" + "world")`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    {
        name: "[tester::#IB5] [test-4] Evaluating Expressions - Runtime Errors: Relational Operators",
        input: `false >= false`,
        command: "./your_program.sh evaluate test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 1]"
    },
    // Stage #XY1: Statements & State - Print: Generate output
    {
        name: "[tester::#XY1] [test-1] Statements & State - Print: Generate output",
        input: `print true;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XY1] [test-2] Statements & State - Print: Generate output",
        input: `print "baz" + "hello" + "quz";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "bazhelloquz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XY1] [test-3] Statements & State - Print: Generate output",
        input: `print (73 * 2 + 89 * 2) / (2);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "162",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XY1] [test-4] Statements & State - Print: Generate output",
        input: `print;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at ';': Expect expression."
    },
    // Stage #OE4: Statements & State - Print: Multiple statements
    {
        name: "[tester::#OE4] [test-1] Statements & State - Print: Multiple statements",
        input: `print "baz" + "quz" + "hello";\nprint 51 - 80;\nprint "hello" == "bar";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "bazquzhello\n-29\nfalse",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OE4] [test-2] Statements & State - Print: Multiple statements",
        input: `print "foo"; print false;\nprint false;\nprint "world"; print 23;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "foo\nfalse\nfalse\nworld\n23",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OE4] [test-3] Statements & State - Print: Multiple statements",
        input: `print 86;\n    print 86 + 32;\n        print 86 + 32 + 67;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "86\n118\n185",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OE4] [test-4] Statements & State - Print: Multiple statements",
        input: `print false != false;\n\nprint "26\n97\n34\n";\n\nprint "There should be an empty line above this.";\n\nprint ("" + "") + "";\n\nprint "non-ascii: ॐ";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: `false\n26\n97\n34\n\nThere should be an empty line above this.\n\nnon-ascii: ॐ`,
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #FI3: Statements & State - Expression statements
    {
        name: "[tester::#FI3] [test-1] Statements & State - Expression statements",
        input: `(59 + 76 - 80) > (22 - 59) * 2;\nprint !true;\n"bar" + "baz" + "foo" == "barbazfoo";\nprint !true;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "false\nfalse",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FI3] [test-2] Statements & State - Expression statements",
        input: `92 - 76 >= -62 * 2 / 62 + 41;\ntrue == true;\n("quz" == "world") == ("baz" != "bar");\nprint true;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FI3] [test-3] Statements & State - Expression statements",
        input: `print "the expression below is invalid";\n88 + "quz";\nprint "this should not be printed";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "the expression below is invalid",
        expectedExitCode: 70,
        expectedStderr: "Operands must be two numbers or two strings.\n[line 2]"
    },
    {
        name: "[tester::#FI3] [test-4] Statements & State - Expression statements",
        input: `print "48" + "foo";\nprint true * (59 + 17);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "48foo",
        expectedExitCode: 70,
        expectedStderr: "Operands must be numbers.\n[line 2]"
    },
    // Stage #YG2: Statements & State - Variables: Declare variables
    {
        name: "[tester::#YG2] [test-1] Statements & State - Variables: Declare variables",
        input: `var bar = 10;\nprint bar;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "10",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YG2] [test-2] Statements & State - Variables: Declare variables",
        input: `var baz = 22;\nvar hello = 22;\nprint baz + hello;\nvar quz = 22;\nprint baz + hello + quz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "44\n66",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YG2] [test-3] Statements & State - Variables: Declare variables",
        input: `var baz = (8 * (73 + 73)) / 4 + 73;\nprint baz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "365",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YG2] [test-4] Statements & State - Variables: Declare variables",
        input: `var bar = 75;\nvar hello = bar;\nprint hello + bar;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "150",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #SV7: Statements & State - Variables: Runtime Errors
    {
        name: "[tester::#SV7] [test-1] Statements & State - Variables: Runtime Errors",
        input: `print 22;\nprint x;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "22",
        expectedExitCode: 70,
        expectedStderr: "Undefined variable 'x'.\n[line 2]"
    },
    {
        name: "[tester::#SV7] [test-2] Statements & State - Variables: Runtime Errors",
        input: `var world = 96;\nprint bar;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Undefined variable 'bar'.\n[line 2]"
    },
    {
        name: "[tester::#SV7] [test-3] Statements & State - Variables: Runtime Errors",
        input: `var world = 50;\nvar result = (world + baz) / quz;\nprint result;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Undefined variable 'baz'.\n[line 2]"
    },
    {
        name: "[tester::#SV7] [test-4] Statements & State - Variables: Runtime Errors",
        input: `var baz = 36;\nvar world = 14;\nvar quz = 13;\nprint baz + world + quz + foo; print 80;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Undefined variable 'foo'.\n[line 4]"
    },
    // Stage #BC1: Statements & State - Variables: Initialize variables
    {
        name: "[tester::#BC1] [test-1] Statements & State - Variables: Initialize variables",
        input: `var quz;\nprint quz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BC1] [test-2] Statements & State - Variables: Initialize variables",
        input: `var hello = "bar";\nvar quz;\nprint quz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BC1] [test-3] Statements & State - Variables: Initialize variables",
        input: `var foo = 72;\nvar hello;\nvar world;\nprint hello;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BC1] [test-4] Statements & State - Variables: Initialize variables",
        input: `var foo = 92 + 39 * 67;\nprint foo;\nvar quz = 39 * 67;\nprint foo + quz;\nvar baz;\nprint baz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "2705\n5318\nnil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #DW9: Statements & State - Variables: Redeclare variables
    {
        name: "[tester::#DW9] [test-1] Statements & State - Variables: Redeclare variables",
        input: `var quz = "before";\nprint quz;\nvar quz = "after";\nprint quz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "before\nafter",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DW9] [test-2] Statements & State - Variables: Redeclare variables",
        input: `var world = "after";\nvar world = "before";\nvar world = world;\nprint world;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "before",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DW9] [test-3] Statements & State - Variables: Redeclare variables",
        input: `var baz = 2;\nprint baz;\nvar baz = 3;\nprint baz;\nvar foo = 5;\nprint foo;\nvar baz = foo;\nprint baz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "2\n3\n5\n5",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DW9] [test-4] Statements & State - Variables: Redeclare variables",
        input: `var quz = hello;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Undefined variable 'hello'.\n[line 1]"
    },
    // Stage #PL3: Statements & State - Assignment operation
    {
        name: "[tester::#PL3] [test-1] Statements & State - Assignment operation",
        input: `var quz;\nquz = 1;\nprint quz;\nprint quz = 2;\nprint quz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "1\n2\n2",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PL3] [test-2] Statements & State - Assignment operation",
        input: `var baz = 91;\nvar hello = 91;\nhello = baz;\nbaz = hello;\nprint baz + hello;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "182",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PL3] [test-3] Statements & State - Assignment operation",
        input: `var bar;\nvar quz;\n\nbar = quz = 42 + 72 * 33;\nprint bar;\nprint quz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "2418\n2418",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PL3] [test-4] Statements & State - Assignment operation",
        input: `var world = 15;\nvar hello;\nvar foo;\n\nworld = hello = foo = world * 2;\nprint world;\nprint hello;\nprint hello;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "30\n30\n30",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #VR5: Statements & State - Block syntax
    {
        name: "[tester::#VR5] [test-1] Statements & State - Block syntax",
        input: `{\n    var baz = \"quz\";\n    print baz;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "quz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#VR5] [test-2] Statements & State - Block syntax",
        input: `{\n    var foo = \"before\";\n    print foo;\n}\n{\n    var foo = \"after\";\n    print foo;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "before\nafter",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#VR5] [test-3] Statements & State - Block syntax",
        input: `{\n    var world = 12;\n    {\n        var baz = 12;\n        print baz;\n    }\n    print world;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "12\n12",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#VR5] [test-4] Statements & State - Block syntax",
        input: `{\n    var foo = 41;\n    var quz = 41;\n    {\n        print foo + quz;\n    }`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 6] Error at end: Expect '}' after block."
    },
    // Stage #FB4: Statements & State - Scopes
    {
        name: "[tester::#FB4] [test-1] Statements & State - Scopes",
        input: `var hello = (49 * 76) - 21;\n{\n    var foo = \"quz\" + \"71\";\n    print foo;\n}\nprint hello;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "quz71\n3703",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FB4] [test-2] Statements & State - Scopes",
        input: `{\n    var hello = \"before\";\n    {\n        var hello = \"after\";\n        print hello;\n    }\n    print hello;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "after\nbefore",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FB4] [test-3] Statements & State - Scopes",
        input: `var hello = \"global hello\";\nvar bar = \"global bar\";\nvar baz = \"global baz\";\n{\n  var hello = \"outer hello\";\n  var bar = \"outer bar\";\n  {\n    var hello = \"inner hello\";\n    print hello;\n    print bar;\n    print baz;\n  }\n  print hello;\n  print bar;\n  print baz;\n}\nprint hello;\nprint bar;\nprint baz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "inner hello\nouter bar\nglobal baz\nouter hello\nouter bar\nglobal baz\nglobal hello\nglobal bar\nglobal baz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FB4] [test-4] Statements & State - Scopes",
        input: `{\n  var quz = \"outer quz\";\n  var bar = \"outer bar\";\n  {\n    quz = \"modified quz\";\n    var bar = \"inner bar\";\n    print quz;\n    print bar;\n  }\n  print quz;\n  print bar;\n}\nprint quz;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "modified quz\ninner bar\nmodified quz\nouter bar",
        expectedExitCode: 70,
        expectedStderr: "Undefined variable 'quz'.\n[line 13]"
    },
    // Stage #NE3: Control Flow - If statements
    {
        name: "[tester::#NE3] [test-1] Control Flow - If statements",
        input: `if (false) print \"quz\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#NE3] [test-2] Control Flow - If statements",
        input: `if (false) {\n  print \"block body\";\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#NE3] [test-3] Control Flow - If statements",
        input: `var a = false;\nif (a = true) {\n  print (a == true);\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#NE3] [test-4] Control Flow - If statements",
        input: `var stage = \"unknown\";\nvar age = 44;\nif (age < 18) { stage = \"child\"; }\nif (age >= 18) { stage = \"adult\"; }\nprint stage;\n\nvar isAdult = age >= 18;\nif (isAdult) { print \"eligible for voting\"; }\nif (!isAdult) { print \"not eligible for voting\"; }`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "adult\neligible for voting",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #ST5: Control Flow - Else statements
    {
        name: "[tester::#ST5] [test-1] Control Flow - Else statements",
        input: `if (false) print \"if\"; else print \"else\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "else",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ST5] [test-2] Control Flow - Else statements",
        input: `var age = 38;\nif (age > 18) print \"adult\"; else print \"child\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "adult",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ST5] [test-3] Control Flow - Else statements",
        input: `if (true) {\n  print \"if block\";\n} else print \"else statement\";\n\nif (true) print \"if statement\"; else {\n  print \"else block\";\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "if block\nif statement",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ST5] [test-4] Control Flow - Else statements",
        input: `var celsius = 99;\nvar fahrenheit = 0;\nvar isHot = false;\n\n{\n  fahrenheit = celsius * 9 / 5 + 32;\n  print celsius; print fahrenheit;\n\n  if (celsius > 30) {\n    isHot = true;\n    print "It's a hot day. Stay hydrated!";\n  } else {\n    print "It's cold today. Wear a jacket!";\n  }\n\n  if (isHot) { print "Use sunscreen!"; }
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: `99\n210.2\nIt's a hot day. Stay hydrated!\nUse sunscreen!`,
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #FH8: Control Flow - Else-if statements
    {
        name: "[tester::#FH8] [test-1] Control Flow - Else-if statements",
        input: `if (false) print \"if branch\";\nelse if (false) print \"else-if branch\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FH8] [test-2] Control Flow - Else-if statements",
        input: `if (false) {\n  print \"baz\";\n} else if (false) print \"baz\";\n\nif (false) print \"baz\"; else if (false) {\n  print \"baz\";\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FH8] [test-3] Control Flow - Else-if statements",
        input: `var age = 20;\nvar stage = \"unknown\";\nif (age < 18) { stage = \"child\"; }\nelse if (age >= 18) { stage = \"adult\"; }\nelse if (age >= 65) { stage = \"senior\"; }\nelse if (age >= 100) { stage = \"centenarian\"; }\nprint stage;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "adult",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#FH8] [test-4] Control Flow - Else-if statements",
        input: `var age = 30;\n\nvar isAdult = age >= 18;\nif (isAdult) { print \"eligible for voting\"; }\nelse { print \"eligible for voting: false\"; }\n\nif (age < 16) { print \"not eligible for driving\"; }\nelse if (age < 18) { print \"learner's permit\"; }\nelse { print \"eligible for driving\"; }\n\nif (age >= 21) { print \"eligible for drinking\"; }\nelse { print \"not eligible for drinking\"; }`,
        command: "./your_program.sh run test.lox",
        expectedOutput: `eligible for voting\neligible for driving\neligible for drinking`,
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #XJ4: Control Flow - Nested if statements
    {
        name: "[tester::#XJ4] [test-1] Control Flow - Nested if statements",
        input: `if (true) if (true) print \"nested true\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "nested true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XJ4] [test-2] Control Flow - Nested if statements",
        input: `if (true) {\n  if (true) print \"world\"; else print \"world\";
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "world",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XJ4] [test-3] Control Flow - Nested if statements",
        input: `var stage = \"unknown\";\nvar age = 99;\nif (age < 18) {\n    if (age < 13) { stage = \"child\"; }\n    else if (age < 16) {\n        stage = \"young teenager\";\n    }\n    else { stage = \"teenager\"; }\n}
else if (age < 65) {\n    if (age < 30) { stage = \"young adult\"; }\n    else if (age < 50) { stage = \"adult\"; }\n    else { stage = \"middle-aged adult\"; }\n}
else { stage = \"senior\"; }\nprint stage;\n\nvar isAdult = age >= 18;\nif (isAdult) {\n    print \"eligible for voting: true\";\n    if (age < 25) {\n        print \"first-time voter: likely\";\n    }
    else { print \"first-time voter: unlikely\"; }\n}
else { print \"eligible for voting: false\"; }\n\nif (age < 16) { print \"not eligible for driving\"; }\nelse if (age < 18) {\n    print \"eligible for driving: learner's permit\";\n    if (age < 17) {\n        print \"supervised driving required\";\n    }
    else {\n        print \"driving allowed with restrictions\";\n    }
}
else { print \"eligible for driving\"; }\n\nif (age < 21) {\n    print \"not eligible for drinking\";\n}
else {\n    print \"eligible for drinking\";\n    if (age < 25) {\n        print \"remember: drink responsibly!\";\n    }
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: `senior
eligible for voting: true
first-time voter: unlikely
eligible for driving
eligible for drinking`,
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XJ4] [test-4] Control Flow - Nested if statements",
        input: `if (true) if (false) print \"baz\";\nelse print \"quz\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "quz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #WK8: Control Flow - Logical OR operator
    {
        name: "[tester::#WK8] [test-1] Control Flow - Logical OR operator",
        input: `if (false or \"ok\") print \"baz\";\nif (nil or \"ok\") print \"baz\";\n\nif (false or false) print \"bar\";\nif (true or \"bar\") print \"bar\";\n\nif (59 or \"hello\") print \"hello\";\nif (\"hello\" or \"hello\") print \"hello\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "baz\nbaz\nbar\nhello\nhello",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#WK8] [test-2] Control Flow - Logical OR operator",
        input: `print false or true;\nprint true or 66;\nprint false or false or true;\n\nprint false or false;\nprint false or false or false;\nprint true or true or true or true;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true\ntrue\ntrue\nfalse\nfalse\ntrue",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#WK8] [test-3] Control Flow - Logical OR operator",
        input: `var a = \"bar\";\nvar b = \"bar\";\n(a = false) or (b = true) or (a = \"bar\");\nprint a;\nprint b;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "false\ntrue",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#WK8] [test-4] Control Flow - Logical OR operator",
        input: `var stage = \"unknown\";\nvar age = 46;\nif (age < 18) { stage = \"child\"; }\nif (age >= 18) { stage = \"adult\"; }\nprint stage;\n\nvar isAdult = age >= 18;\nif (isAdult) { print \"eligible for voting\"; }\nif (!isAdult) { print \"not eligible for voting\"; }`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "adult\neligible for voting",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #JX4: Control Flow - Logical AND operator
    {
        name: "[tester::#JX4] [test-1] Control Flow - Logical AND operator",
        input: `if (false and \"bad\") print \"baz\";\nif (nil and \"bad\") print \"baz\";\n\nif (true and \"quz\") print \"quz\";\nif (54 and \"bar\") print \"bar\";\nif (\"bar\" and \"bar\") print \"bar\";\nif (\"\" and \"world\") print \"world\";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "quz\nbar\nbar\nworld",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JX4] [test-2] Control Flow - Logical AND operator",
        input: `print false and 1;\nprint true and 1;\nprint 50 and \"baz\" and false;\n\nprint 50 and true;\nprint 50 and \"baz\" and 50;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "false\n1\nfalse\ntrue\n50",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JX4] [test-3] Control Flow - Logical AND operator",
        input: `var a = \"bar\";\nvar b = \"bar\";\n(a = true) and (b = false) and (a = \"bad\");\nprint a;\nprint b;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true\nfalse",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#JX4] [test-4] Control Flow - Logical AND operator",
        input: `var stage = \"unknown\";\nvar age = 44;\nif (age < 18) { stage = \"child\"; }\nif (age >= 18) { stage = \"adult\"; }\nprint stage;\n\nvar isAdult = age >= 18;\nif (isAdult) { print \"eligible for voting\"; }\nif (!isAdult) { print \"not eligible for voting\"; }`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "adult\neligible for voting",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #QY3: Control Flow - While statements
    {
        name: "[tester::#QY3] [test-1] Control Flow - While statements",
        input: `var world = 0;\nwhile (world < 3) print world = world + 1;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "1\n2\n3",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QY3] [test-2] Control Flow - While statements",
        input: `var quz = 0;\nwhile (quz < 3) {\n  print quz;\n  quz = quz + 1;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "0\n1\n2",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QY3] [test-3] Control Flow - While statements",
        input: `while (false) { print \"should not print\"; }\n\nvar product = 1;\nvar i = 1;\n\nwhile (i <= 5) {\n  product = product * i;\n  i = i + 1;\n}\n\nprint \"Factorial of 5: \"; print product;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Factorial of 5: \n120",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QY3] [test-4] Control Flow - While statements",
        input: `var n = 10;\nvar fm = 0;\nvar fn = 1;\nvar index = 0;\n\nwhile (index < n) {\n    print fm;\n    var temp = fm;\n    fm = fn;\n    fn = temp + fn;\n    index = index + 1;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "0\n1\n1\n2\n3\n5\n8\n13\n21\n34",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #BW6: Control Flow - For statements
    {
        name: "[tester::#BW6] [test-1] Control Flow - For statements",
        input: `for (var foo = 0; foo < 3;) print foo = foo + 1;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "1\n2\n3",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BW6] [test-2] Control Flow - For statements",
        input: `for (var world = 0; world < 3; world = world + 1) {\n  print world;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "0\n1\n2",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BW6] [test-3] Control Flow - For statements",
        input: `var foo = 0;\nfor (; foo < 2; foo = foo + 1) print foo;\n\nfor (var bar = 0; bar < 2;) {\n  print bar;\n  bar = bar + 1;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "0\n1\n0\n1",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BW6] [test-4] Control Flow - For statements",
        input: `var baz = \"after\";\n{\n  var baz = \"before\";\n\n  for (var baz = 0; baz < 1; baz = baz + 1) {\n    print baz;\n    var baz = -1;\n    print baz;\n  }\n}\n\n{\n  for (var baz = 0; baz > 0; baz = baz + 1) {}
\n  var baz = \"after\";\n  print baz;\n\n  for (baz = 0; baz < 1; baz = baz + 1) {\n    print baz;\n  }
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "0\n-1\nafter\n0",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #VT1: Control Flow - Syntactic errors
    {
        name: "[tester::#VT1] [test-1] Control Flow - Syntactic errors",
        input: `for (;;) var foo;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at 'var': Expect expression."
    },
    {
        name: "[tester::#VT1] [test-2] Control Flow - Syntactic errors",
        input: `for (var a = 1; {}; a = a + 1) {}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at '{': Expect expression.\n[line 1] Error at ')': Expect ';' after expression."
    },
    {
        name: "[tester::#VT1] [test-3] Control Flow - Syntactic errors",
        input: `for (var a = 1; a < 2; {}) {}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at '{': Expect expression."
    },
    {
        name: "[tester::#VT1] [test-4] Control Flow - Syntactic errors",
        input: `for ({}; a < 2; a = a + 1) {}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at '{': Expect expression.\n[line 1] Error at ')': Expect ';' after expression."
    },
    // Stage #AV4: Functions - Native functions
    {
        name: "[tester::#AV4] [test-1] Functions - Native functions",
        input: `print (clock() + 8) > 0;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#AV4] [test-2] Functions - Native functions",
        input: `print (clock() / 1000) > 0;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#AV4] [test-3] Functions - Native functions",
        input: `var startTime = clock();\nvar timeoutSeconds = 2;\n\nvar c1 = clock() >= startTime;\nvar c2 = clock() <= (startTime + timeoutSeconds);\n\nif (c1 and c2) {\n  print "Operation in progress...";\n} else {\n  print "Operation timed out!";\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Operation in progress...",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#AV4] [test-4] Functions - Native functions",
        input: `var startTime = clock();\nvar lastCheck = startTime;\nvar running = true;\n\nprint "Starting timer for 0.2 seconds";\nvar startTime = clock();\n\nwhile (running) {\n  if (clock() > startTime + 0.2) {\n    print "Timer ended";\n    running = false;\n  }\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Starting timer for 0.2 seconds\nTimer ended",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #PG8: Functions - Functions without arguments
    {
        name: "[tester::#PG8] [test-1] Functions - Functions without arguments",
        input: `fun quz() { print 57; }\nquz();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "57",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PG8] [test-2] Functions - Functions without arguments",
        input: `fun f() {}
f();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PG8] [test-3] Functions - Functions without arguments",
        input: `fun foo() {}
print foo;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "<fn foo>",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PG8] [test-4] Functions - Functions without arguments",
        input: `fun cumulative_sum() {
    var n = 10;
    var total = 0;
    var i = 1;
    while (i <= n) {
        total = total + i;
        i = i + 1;
    }
    print "The cumulative sum from 1 to 10 is: ";
    print total;
}

cumulative_sum();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "The cumulative sum from 1 to 10 is: \n55",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #LB6: Functions - Functions with arguments
    {
        name: "[tester::#LB6] [test-1] Functions - Functions with arguments",
        input: `fun f1(a) { print a; }
f1(33);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "33",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#LB6] [test-2] Functions - Functions with arguments",
        input: `fun f3(a, b, c) { print a + b + c; }
f3(77, 77, 77);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "231",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#LB6] [test-3] Functions - Functions with arguments",
        input: `fun f8(a, b, c, d, e, f, g, h) {
  print a - b + c * d + e - f + g - h;
}
f8(82, 82, 82, 82, 82, 82, 82, 82);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "6724",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#LB6] [test-4] Functions - Functions with arguments",
        input: `fun calculateGrade(score, bonus) {
  var finalScore = score + bonus;

  if (finalScore >= 90) {
    print "A";
  } else if (finalScore >= 80) {
    print "B";
  } else if (finalScore >= 70) {
    print "C";
  } else if (finalScore >= 60) {
    print "D";
  } else {
    print "F";
  }
}

var score = 93;
var bonus = 3;
print "Grade for given score is: ";
calculateGrade(score, bonus);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Grade for given score is: \nA",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #PX4: Functions - Syntax errors
    {
        name: "[tester::#PX4] [test-1] Functions - Syntax errors",
        input: `print clock(;,`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at ';': Expect expression."
    },
    {
        name: "[tester::#PX4] [test-2] Functions - Syntax errors",
        input: `print clock)));`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at ')': Expect ';' after value."
    },
    {
        name: "[tester::#PX4] [test-3] Functions - Syntax errors",
        input: `fun f() 53;
print f();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at '53': Expect '{' before function body."
    },
    {
        name: "[tester::#PX4] [test-4] Functions - Syntax errors",
        input: `fun foo(a, b c, d, e, f) {}
foo();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at 'c': Expect ')' after parameters."
    },
    // Stage #RD2: Functions - Return statements
    {
        name: "[tester::#RD2] [test-1] Functions - Return statements",
        input: `fun fib(n) {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
}

var start = clock();
print fib(10) == 55;
print (clock() - start) < 5;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "true\ntrue",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#RD2] [test-2] Functions - Return statements",
        input: `fun f() {
  if (false) return \"no\"; else return \"ok\";
}

print f();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "ok",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#RD2] [test-3] Functions - Return statements",
        input: `fun f() {
  while (!true) return \"ok\";
}

print f();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#RD2] [test-4] Functions - Return statements",
        input: `fun f() {
  return;
  print \"bad\";
}

print f();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "nil",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #EY3: Functions - Higher order functions
    {
        name: "[tester::#EY3] [test-1] Functions - Higher order functions",
        input: `fun makeGreeter() {
  fun greet(name) {
    print "Hello " + name;
  }

  return greet;
}

var sayHello = makeGreeter();

sayHello("Bob");
sayHello("Alice");
sayHello("Eve");`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Hello Bob\nHello Alice\nHello Eve",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#EY3] [test-2] Functions - Higher order functions",
        input: `fun returnArg(arg) {
  return arg;
}

fun returnFunCallWithArg(func, arg) {
  return returnArg(func)(arg);
}

fun printArg(arg) {
  print arg;
}

returnFunCallWithArg(printArg, "quz");`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "quz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#EY3] [test-3] Functions - Higher order functions",
        input: `fun square(x) {
  return x * x;
}

fun applyTimesN(N, f, x) {
  var i = 0;
  while (i < N) {
    x = f(x);
    i = i + 1;
  }
  return x;
}

print applyTimesN(1, square, 3);
print applyTimesN(2, square, 3);
print applyTimesN(3, square, 3);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "9\n81\n6561",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#EY3] [test-4] Functions - Higher order functions",
        input: `fun makeFilter(min) {
  fun filter(n) {
    if (n < min) {
      return false;
    }
    return true;
  }
  return filter;
}

fun applyToNumbers(f, count) {
  var n = 0;
  while (n < count) {
    if (f(n)) {
      print n;
    }
    n = n + 1;
  }
}

var greaterThanX = makeFilter(61);
var greaterThanY = makeFilter(88);

print "Numbers >= 61:";
applyToNumbers(greaterThanX, 61 + 5);

print "Numbers >= 88:";
applyToNumbers(greaterThanY, 88 + 5);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Numbers >= 61:\n61\n62\n63\n64\n65\nNumbers >= 88:\n88\n89\n90\n91\n92",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #FJ7: Functions - Runtime errors
    {
        name: "[tester::#FJ7] [test-1] Functions - Runtime errors",
        input: `86();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Can only call functions and classes.\n[line 1]"
    },
    {
        name: "[tester::#FJ7] [test-2] Functions - Runtime errors",
        input: `fun f(a, b) {\n  print a;\n  print b;\n}\n\nf(1, 2, 3, 4);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Expected 2 arguments but got 4.\n[line 6]"
    },
    {
        name: "[tester::#FJ7] [test-3] Functions - Runtime errors",
        input: `fun f(a, b) {}

f(1);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Expected 2 arguments but got 1.\n[line 3]"
    },
    {
        name: "[tester::#FJ7] [test-4] Functions - Runtime errors",
        input: `(true == true)();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Can only call functions and classes.\n[line 1]"
    },
    // Stage #BZ4: Functions - Function scope
    {
        name: "[tester::#BZ4] [test-1] Functions - Function scope",
        input: `var a = 64;\n\nfun printAndModify() {\n  print a;\n  var a = 56;\n  print a;\n}\n\nprint a;\na = 94;\nprintAndModify();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "64\n94\n56",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BZ4] [test-2] Functions - Function scope",
        input: `var count = 6;\n\nfun tick() {\n  if (count > 0) {\n    print count;\n    count = count - 1;\n    return false;\n  }\n  print \"Blast off!\";\n  return true;\n}\n\nwhile (!tick()) {}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "6\n5\n4\n3\n2\n1\nBlast off!",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BZ4] [test-3] Functions - Function scope",
        input: `var counter = 60;\n\nfun incrementCounter(amount) {\n  counter = counter + amount;\n  print counter;\n}\n\n{\n  counter = 35;\n  incrementCounter(5);\n  print counter;\n}\nprint counter;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "40\n40\n40",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BZ4] [test-4] Functions - Function scope",
        input: `var x = 1;\nvar y = 2;\n\nfun printBoth() {\n  if (x < y) {\n    print \"x is less than y:\";\n    print x;\n    print y;\n  } else {\n    print \"x is not less than y:\";\n    print x;\n    print y;\n  }\n}\n\n{\n  var x = 10;\n  {\n    var y = 20;\n\n    var i = 0;\n    while (i < 3) {\n      x = x + 1;\n      y = y - 1;\n      print \"Local x: \";\n      print x;\n      print \"Local y: \";\n      print y;\n      i = i + 1;\n    }\n\n    if (x > y) {\n      print \"Local x > y\";\n    }\n\n    printBoth();\n  }\n}\n\nif (x == 1 and y == 2) {\n  print \"Globals unchanged:\";\n  printBoth();\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: `Local x: \n11\nLocal y: \n19\nLocal x: \n12\nLocal y: \n18\nLocal x: \n13\nLocal y: \n17\nx is less than y:\n1\n2\nGlobals unchanged:\nx is less than y:\n1\n2`,
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #GG6: Functions - Closures
    {
        name: "[tester::#GG6] [test-1] Functions - Closures",
        input: `fun makeCounter() {\n  var i = 0;\n\n  fun count() {\n    i = i + 3;\n    print i;\n  }\n\n  return count;\n}\n\nvar counter = makeCounter();\ncounter();\ncounter();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "3\n6",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#GG6] [test-2] Functions - Closures",
        input: `{\n  var threshold = 50;\n\n  fun isEven(n) {\n    if (n == 0) return true;\n    if (n > threshold) return false;\n    return isOdd(n - 1);\n  }\n\n  fun isOdd(n) {\n    if (n == 0) return false;\n    if (n > threshold) return false;\n    return isEven(n - 1);\n  }\n\n  print isEven(75);\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "false",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#GG6] [test-3] Functions - Closures",
        input: `fun makeLogger(prefix) {\n  var logCount = 0;\n\n  fun log(message) {\n    logCount = logCount + 1;\n    print prefix + ": " + message;\n\n    if (logCount > 3) {\n      print prefix + ": Too many log lines!";\n      logCount = 0;\n    }\n  }\n\n  return log;\n}\n\nvar debugLog = makeLogger(\"quz\");\nvar errorLog = makeLogger(\"foo\");\n\ndebugLog(\"Starting\");\ndebugLog(\"Processing\");\ndebugLog(\"Finishing\");\ndebugLog(\"Extra line\");\n\nerrorLog(\"Failed!\");\nerrorLog(\"Retrying...\");`,
        command: "./your_program.sh run test.lox",
        expectedOutput: `quz: Starting\nquz: Processing\nquz: Finishing\nquz: Extra line\nquz: Too many log lines!\nfoo: Failed!\nfoo: Retrying...`,
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#GG6] [test-4] Functions - Closures",
        input: `fun makeAccumulator(label) {\n  var sum = 0;\n  var count = 0;\n\n  fun accumulate(value) {\n    sum = sum + value;\n    count = count + 1;\n\n    print label;\n    print count;\n    print sum;\n    print sum;\n\n    if (count > 3) {\n      print \"reset\";\n      sum = 0;\n      count = 0;\n    }\n\n    return sum;\n  }\n\n  return accumulate;\n}\n\nvar acc1 = makeAccumulator(\"First:\");\nvar acc2 = makeAccumulator(\"Second:\");\n\nacc1(6);\nacc1(5);\nacc1(2);\nacc1(4);\n\nacc2(5);\nacc2(4);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: `First:\n1\n6\n6\nFirst:\n2\n11\n11\nFirst:\n3\n13\n13\nFirst:\n4\n17\n17\nreset\nSecond:\n1\n5\n5\nSecond:\n2\n9\n9`,
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #VF4: Classes - Class Declarations
    {
        name: "[tester::#VF4] [test-1] Classes - Class Declarations",
        input: `class Spaceship {}
print Spaceship;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Spaceship",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#VF4] [test-2] Classes - Class Declarations",
        input: `class Robot {}
class Wizard {}
print Robot;
print Wizard;
print "Both classes successfully printed";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Robot\nWizard\nBoth classes successfully printed",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#VF4] [test-3] Classes - Class Declarations",
        input: `{
  class Dinosaur {}
  print "Inside block: Dinosaur exists";
  print Dinosaur;
}
print "Accessing out-of-scope class:";
print Dinosaur;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Inside block: Dinosaur exists\nDinosaur\nAccessing out-of-scope class:",
        expectedExitCode: 70,
        expectedStderr: "Undefined variable 'Dinosaur'.\n[line 7]"
    },
    {
        name: "[tester::#VF4] [test-4] Classes - Class Declarations",
        input: `fun foo() {
  class Superhero {}
  print "Class declared inside function";
  print Superhero;
}

foo();
print "Function called successfully";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Class declared inside function\nSuperhero\nFunction called successfully",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #YK8: Classes - Class Instances
    {
        name: "[tester::#YK8] [test-1] Classes - Class Instances",
        input: `class Spaceship {}
var falcon = Spaceship();
print falcon;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Spaceship instance",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YK8] [test-2] Classes - Class Instances",
        input: `class Robot {}
var r1 = Robot();
var r2 = Robot();

print "Created multiple robots:";
print r1;
print r2;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Created multiple robots:\nRobot instance\nRobot instance",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YK8] [test-3] Classes - Class Instances",
        input: `class Wizard {}
class Dragon {}

fun createCharacters() {
  var merlin = Wizard();
  var smaug = Dragon();
  print "Characters created in fantasy world:";
  print merlin;
  print smaug;
  return merlin;
}

var mainCharacter = createCharacters();
if (mainCharacter) {
  print "The main character is:";
  print mainCharacter;
} else {
  print "Failed to create a main character.";
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Characters created in fantasy world:\nWizard instance\nDragon instance\nThe main character is:\nWizard instance",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YK8] [test-4] Classes - Class Instances",
        input: `class Superhero {}

var count = 0;
while (count < 3) {
  var hero = Superhero();
  print "Hero created:";
  print hero;
  count = count + 1;
}

print "All heroes created!";`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Hero created:\nSuperhero instance\nHero created:\nSuperhero instance\nHero created:\nSuperhero instance\nAll heroes created!",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #YF3: Classes - Getters & Setters
    {
        name: "[tester::#YF3] [test-1] Classes - Getters & Setters",
        input: `class Spaceship {}
var falcon = Spaceship();

falcon.name = "Millennium Falcon";
falcon.speed = 75.5;

print "Ship details:";
print falcon.name;
print falcon.speed;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Ship details:\nMillennium Falcon\n75.5",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YF3] [test-2] Classes - Getters & Setters",
        input: `class Robot {}
var r2d2 = Robot();

r2d2.model = "Astromech";
r2d2.operational = false;

if (r2d2.operational) {
  print r2d2.model;
  r2d2.mission = "Navigate hyperspace";
  print r2d2.mission;
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YF3] [test-3] Classes - Getters & Setters",
        input: `class Superhero {}
var batman = Superhero();
var superman = Superhero();

batman.name = "Batman";
batman.called = 64;

superman.name = "Superman";
superman.called = 28;

print "Times " + superman.name + " was called: ";
print superman.called;
print "Times " + batman.name + " was called: ";
print batman.called;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Times Superman was called: \n28\nTimes Batman was called: \n64",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YF3] [test-4] Classes - Getters & Setters",
        input: `class Wizard {}
var gandalf = Wizard();

gandalf.color = "Grey";
gandalf.power = nil;
print gandalf.color;

fun promote(wizard) {
  wizard.color = "White";
  if (false) {
    wizard.power = 100;
  } else {
    wizard.power = 0;
  }
}

promote(gandalf);
print gandalf.color;
print gandalf.power;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Grey\nWhite\n0",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #QR2: Classes - Instance Methods
    {
        name: "[tester::#QR2] [test-1] Classes - Instance Methods",
        input: `class Robot {
  beep() {
    print "Beep boop!";
  }
}

var r2d2 = Robot();
r2d2.beep();

Robot().beep();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Beep boop!\nBeep boop!",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QR2] [test-2] Classes - Instance Methods",
        input: `{
  class Foo {
    returnSelf() {
      return Foo;
    }
  }

  print Foo().returnSelf();
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Foo",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QR2] [test-3] Classes - Instance Methods",
        input: `class Wizard {
  castSpell(spell) {
    print "Casting a magical spell: " + spell;
  }
}

class Dragon {
  breatheFire(fire, intensity) {
    print "Breathing " + fire + " with intensity: "
    + intensity;
  }
}

var merlin = Wizard();
var smaug = Dragon();

if (true) {
  var action = merlin.castSpell;
  action("Fireball");
} else {
  var action = smaug.breatheFire;
  action("Fire", "100");
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Casting a magical spell: Fireball",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QR2] [test-4] Classes - Instance Methods",
        input: `class Superhero {
  useSpecialPower(hero) {
    print "Using power: " + hero.specialPower;
  }

  hasSpecialPower(hero) {
    return hero.specialPower;
  }

  giveSpecialPower(hero, power) {
    hero.specialPower = power;
  }
}

fun performHeroics(hero, superheroClass) {
  if (superheroClass.hasSpecialPower(hero)) {
    superheroClass.useSpecialPower(hero);
  } else {
    print "No special power available";
  }
}

var superman = Superhero();
var heroClass = Superhero();

if (true) {
  heroClass.giveSpecialPower(superman, "Flight");
} else {
  heroClass.giveSpecialPower(superman, "Strength");
}

performHeroics(superman, heroClass);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Using power: Flight",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #YD7: Classes - The 'this' keyword
    {
        name: "[tester::#YD7] [test-1] Classes - The 'this' keyword",
        input: `class Spaceship {
  identify() {
    print this;
  }
}

Spaceship().identify();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Spaceship instance",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YD7] [test-2] Classes - The 'this' keyword",
        input: `class Calculator {
  add(a, b) {
    return a + b + this.memory;
  }
}

var calc = Calculator();
calc.memory = 44;
print calc.add(29, 1);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "74",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YD7] [test-3] Classes - The 'this' keyword",
        input: `class Animal {
  makeSound() {
    print this.sound;
  }

  identify() {
    print this.species;
  }
}

var dog = Animal();
dog.sound = "Woof";
dog.species = "Dog";

var cat = Animal();
cat.sound = "Meow";
cat.species = "Cat";

cat.makeSound = dog.makeSound;
dog.identify = cat.identify;

cat.makeSound();
dog.identify();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Woof\nCat",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#YD7] [test-4] Classes - The 'this' keyword",
        input: `class Wizard {
  getSpellCaster() {
    fun castSpell() {
      print this;
      print "Casting spell as " + this.name;
    }

    return castSpell;
  }
}

var wizard = Wizard();
wizard.name = "Merlin";

wizard.getSpellCaster()();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Wizard instance\nCasting spell as Merlin",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #DG2: Classes - Invalid usages of 'this'
    {
        name: "[tester::#DG2] [test-1] Classes - Invalid usages of 'this'",
        input: `print this;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at 'this': Can't use 'this' outside of a class."
    },
    {
        name: "[tester::#DG2] [test-2] Classes - Invalid usages of 'this'",
        input: `fun notAMethod() {
  print this;
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 2] Error at 'this': Can't use 'this' outside of a class."
    },
    {
        name: "[tester::#DG2] [test-3] Classes - Invalid usages of 'this'",
        input: `class Person {
  sayName() {
    print this();
  }
}
Person().sayName();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Can only call functions and classes.\n[line 3]"
    },
    {
        name: "[tester::#DG2] [test-4] Classes - Invalid usages of 'this'",
        input: `class Confused {
  method() {
    fun inner(instance) {
      var feeling = "confused";
      print this.feeling;
    }
    return inner;
  }
}

var instance = Confused();
var m = instance.method();
m(instance);`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Undefined property 'feeling'.\n[line 5]"
    },
    // Stage #OU5: Classes - Constructor calls
    {
        name: "[tester::#OU5] [test-1] Classes - Constructor calls",
        input: `class Default {
  init() {
    this.x = "world";
    this.y = 44;
  }
}

print Default().x;
print Default().y;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "world\n44",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OU5] [test-2] Classes - Constructor calls",
        input: `class Robot {
  init(model, func) {
    this.model = model;
    this.function = func;
  }
}
print Robot("R2-D2", "Astromech").model;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "R2-D2",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OU5] [test-3] Classes - Constructor calls",
        input: `class Counter {
  init(startValue) {
    if (startValue < 0) {
      print "startValue can't be negative";
      this.count = 0;
    } else {
      this.count = startValue;
    }
  }
}

var instance = Counter(-27);
print instance.count;

print instance.init(27).count;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "startValue can't be negative\n0\n27",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OU5] [test-4] Classes - Constructor calls",
        input: `class Vehicle {
  init(type) {
    this.type = type;
  }
}

class Car {
  init(make, model) {
    this.make = make;
    this.model = model;
    this.wheels = "four";
  }

  describe() {
    print this.make + " " + this.model +
    " with " + this.wheels + " wheels";
  }
}

var vehicle = Vehicle("Generic");
print "Generic " + vehicle.type;

var myCar = Car("Toyota", "Corolla");
myCar.describe();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Generic Generic\nToyota Corolla with four wheels",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #EB9: Classes - Return within constructors
    {
        name: "[tester::#EB9] [test-1] Classes - Return within constructors",
        input: `class Person {
  init() {
    print "foo";
    return;
  }
}

Person();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "foo",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#EB9] [test-2] Classes - Return within constructors",
        input: `class ThingDefault {
  init() {
    this.x = "foo";
    this.y = 42;
    return this;
  }
}
var out = ThingDefault();
print out;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 5] Error at 'return': Can't return a value from an initializer."
    },
    {
        name: "[tester::#EB9] [test-3] Classes - Return within constructors",
        input: `class Foo {
  init() {
    return "something";
  }
}

Foo();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 3] Error at 'return': Can't return a value from an initializer."
    },
    {
        name: "[tester::#EB9] [test-4] Classes - Return within constructors",
        input: `class Foo {
  init() {
    return this.callback();
  }

  callback() {
    return "callback";
  }
}

Foo();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 3] Error at 'return': Can't return a value from an initializer."
    },
    // Stage #MF6: Inheritance - Class Hierarchy
    {
        name: "[tester::#MF6] [test-1] Inheritance - Class Hierarchy",
        input: `class Doughnut {}

class BostonCream < Doughnut {}

print Doughnut();
print BostonCream();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Doughnut instance\nBostonCream instance",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MF6] [test-2] Inheritance - Class Hierarchy",
        input: `{
  class A {}

  class B < A {}

  class C < A {}

  print A();
  print B();
  print C();
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "A instance\nB instance\nC instance",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MF6] [test-3] Inheritance - Class Hierarchy",
        input: `class A {}

fun f() {
  class B < A {}
  return B;
}

print f();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "B",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MF6] [test-4] Inheritance - Class Hierarchy",
        input: `class Vehicle {}

class Car < Vehicle {}

class Sedan < Car {}

print Vehicle();
print Car();
print Sedan();

{
  class Truck < Vehicle {}
  print Truck();
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Vehicle instance\nCar instance\nSedan instance\nTruck instance",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #KY1: Inheritance - Inheriting Methods
    {
        name: "[tester::#KY1] [test-1] Inheritance - Inheriting Methods",
        input: `class Doughnut {
  cook() {
    print "Fry until golden brown.";
  }
}

class BostonCream < Doughnut {
  cook() {
    super.cook();
  }
}

BostonCream().cook();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Fry until golden brown.",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KY1] [test-2] Inheritance - Inheriting Methods",
        input: `class Root {
  getName() {
    print "Root class";
  }
}

class Parent < Root {
  parentMethod() {
    print "Method defined in Parent";
  }
}

class Child < Parent {
  childMethod() {
    print "Method defined in Child";
  }
}

var root = Root();
var parent = Parent();
var child = Child();

root.getName();
parent.getName();
child.getName();

parent.parentMethod();
child.parentMethod();

child.childMethod();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Root class\nRoot class\nRoot class\nMethod defined in Parent\nMethod defined in Parent\nMethod defined in Child",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KY1] [test-3] Inheritance - Inheriting Methods",
        input: `class Foo {
  init() {
    this.secret = 42;
  }
}

class Bar < Foo {}

class Baz < Bar {}

var baz = Baz();

print baz.secret;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "42",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KY1] [test-4] Inheritance - Inheriting Methods",
        input: `class foo {
  infoo() {
    print "from foo";
  }
}

class world < foo {
  inworld() {
    print "from world";
  }
}

class baz < world {
  inbaz() {
    print "from baz";
  }
}

var baz = baz();
baz.infoo();
baz.inworld();
baz.inbaz();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "from foo\nfrom world\nfrom baz",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #KA5: Inheritance - Overriding Methods
    {
        name: "[tester::#KA5] [test-1] Inheritance - Overriding Methods",
        input: `class A {
  method() {
    print "A method";
  }
}


class B < A {
  method() {
    print "B method";
  }
}

var b = B();
b.method();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "B method",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KA5] [test-2] Inheritance - Overriding Methods",
        input: `class Base {
  init(a) {
    this.a = a;
  }
}


class Derived < Base {
  init(a, b) {
    this.a = a;
    this.b = b;
  }
}

var derived = Derived(20, 77);
print derived.a;
print derived.b;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "20\n77",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KA5] [test-3] Inheritance - Overriding Methods",
        input: `class Base {
  init(a) {
    this.a = a;
  }

  cook() {
    return "Base cooking " + this.a;
  }
}

class Derived < Base {
  init(a, b) {
    this.a = a;
    this.b = b;
  }

  cook() {
    return "Derived cooking " + this.b + " with "
    + this.a + " and " + this.b;
  }

  makeFood() {
    return this.cook();
  }
}

var derived = Derived("onions", "shallots");
print derived.a;
print derived.b;

print Base("ingredient").cook();
print derived.cook();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "onions\nshallots\nBase cooking ingredient\nDerived cooking shallots with onions and shallots",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KA5] [test-4] Inheritance - Overriding Methods",
        input: `class Animal {
  speak() {
    return "Animal speaks";
  }

  makeSound() {
    return "Generic sound";
  }

  communicate() {
    return this.speak() + " : " + this.makeSound();
  }
}

class Dog < Animal {
  speak() {
    return "Dog speaks";
  }

  makeSound() {
    return "Woof";
  }
}

class Puppy < Dog {
  speak() {
    return "Puppy speaks";
  }
}

var animal = Animal();
var dog = Dog();
var puppy = Puppy();

print animal.communicate();
print dog.communicate();
print puppy.communicate();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Animal speaks : Generic sound\nDog speaks : Woof\nPuppy speaks : Woof",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #AB0: Inheritance - Inheritance errrors
    {
        name: "[tester::#AB0] [test-1] Inheritance - Inheritance errrors",
        input: `class Foo < Foo {}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at 'Foo': A class can't inherit from itself."
    },
    {
        name: "[tester::#AB0] [test-2] Inheritance - Inheritance errrors",
        input: `fun A() {}

class B < A {}

print A();
print B();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Superclass must be a class.\n[line 3]"
    },
    {
        name: "[tester::#AB0] [test-3] Inheritance - Inheritance errrors",
        input: `var A = "class";

class B < A {}

print B();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Superclass must be a class.\n[line 3]"
    },
    {
        name: "[tester::#AB0] [test-4] Inheritance - Inheritance errrors",
        input: `class A {
  method() {
    print "A";
  }
}

class B < A {}
class C < B {}
class D < A {}

B = "not a class";
class E < B {}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 70,
        expectedStderr: "Superclass must be a class.\n[line 12]"
    },
    // Stage #QI0: Inheritance - The super keyword
    {
        name: "[tester::#QI0] [test-1] Inheritance - The super keyword",
        input: `class Doughnut {
  cook() {
    print "Fry until golden brown.";
  }
}

class BostonCream < Doughnut {
  cook() {
    super.cook();
  }
}

BostonCream().cook();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Fry until golden brown.",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QI0] [test-2] Inheritance - The super keyword",
        input: `class A {
  say() {
    print "A";
  }
}

class B < A {
  test() {
    super.say();
  }

  say() {
    print "B";
  }
}

class C < B {
  say() {
    print "C";
  }
}

C().say();
C().test();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "C\nA",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QI0] [test-3] Inheritance - The super keyword",
        input: `class A {
  say() {
    print "A";
  }
}

class B < A {
  getClosure() {
    fun closure() {
      super.say();
    }
    return closure;
  }

  say() {
    print "B";
  }
}

class C < B {
  say() {
    print "C";
  }
}

C().getClosure()();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "A",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#QI0] [test-4] Inheritance - The super keyword",
        input: `class Base {
  method() {
    print "Base.method()";
  }
}

class Parent < Base {
  method() {
    super.method();
  }
}

class Child < Parent {
  method() {
    super.method();
  }
}

var parent = Parent();
parent.method();
var child = Child();
child.method();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "Base.method()\nBase.method()",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #IB9: Inheritance - Invalid Usages of the super Keyword
    {
        name: "[tester::#IB9] [test-1] Inheritance - Invalid Usages of the super Keyword",
        input: `class Foo {
  cook() {
    super.cook();
  }
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 3] Error at 'super': Can't use 'super' in a class with no superclass."
    },
    {
        name: "[tester::#IB9] [test-2] Inheritance - Invalid Usages of the super Keyword",
        input: `super.notEvenInAClass();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at 'super': Can't use 'super' outside of a class."
    },
    {
        name: "[tester::#IB9] [test-3] Inheritance - Invalid Usages of the super Keyword",
        input: `class A {
  method() {}
}

class B < A {
  method() {
    (super).method();
  }
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 7] Error at ')': Expect '.' after 'super'."
    },
    {
        name: "[tester::#IB9] [test-4] Inheritance - Invalid Usages of the super Keyword",
        input: `class A {}

class B < A {
  method() {
    super;
  }
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 5] Error at ';': Expect '.' after 'super'."
    },
    // Stage #DE8: Resolving & Binding - Identifier Resolution
    {
        name: "[tester::#DE8] [test-1] Resolving & Binding - Identifier Resolution",
        input: `var variable = \"global\";\n\n{\n  fun f() {\n    print variable;\n  }\n\n  f();\n\n  var variable = \"local\";\n\n  f();\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "global\nglobal",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DE8] [test-2] Resolving & Binding - Identifier Resolution",
        input: `fun global() {\n  print \"global\";\n}\n\n{\n  fun f() {\n    global();\n  }\n\n  f();\n\n  fun global() {\n    print \"local\";\n  }\n\n  f();\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "global\nglobal",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DE8] [test-3] Resolving & Binding - Identifier Resolution",
        input: `var x = \"global\";\n\nfun outer() {\n  var x = \"outer\";\n\n  fun middle() {\n    fun inner() {\n      print x;\n    }\n\n    inner();\n\n    var x = \"middle\";\n\n    inner();\n  }\n\n  middle();\n}

outer();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "outer\nouter",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#DE8] [test-4] Resolving & Binding - Identifier Resolution",
        input: `var count = 0;\n\n{\n  fun makeCounter() {\n    fun counter() {\n      count = count + 1;\n      print count;\n    }\n    return counter;\n  }\n\n  var counter1 = makeCounter();\n  counter1();\n  counter1();\n\n  var count = 0;\n\n  counter1();\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "1\n2\n3",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #PT7: Resolving & Binding - Self Initialization
    {
        name: "[tester::#PT7] [test-1] Resolving & Binding - Self Initialization",
        input: `var a = \"value\";\n\nvar a = a;\nprint a;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "value",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PT7] [test-2] Resolving & Binding - Self Initialization",
        input: `var a = \"outer\";\n\n{\n  var a = a;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 4] Error at 'a': Can't read local variable in its own initializer."
    },
    {
        name: "[tester::#PT7] [test-3] Resolving & Binding - Self Initialization",
        input: `fun returnArg(arg) {\n  return arg;\n}\n\nvar b = \"global\";\n\n{\n  var a = \"first\";\n\n  var b = returnArg(b);\n  print b;\n}\n\nvar b = b + \" updated\";\nprint b;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 10] Error at 'b': Can't read local variable in its own initializer."
    },
    {
        name: "[tester::#PT7] [test-4] Resolving & Binding - Self Initialization",
        input: `fun outer() {\n  fun inner() {\n    var a = a;\n    print a;\n  }\n\n  inner();\n}\n\nouter();`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 3] Error at 'a': Can't read local variable in its own initializer."
    },
    // Stage #PZ7: Resolving & Binding - Variable Redeclaration
    {
        name: "[tester::#PZ7] [test-1] Resolving & Binding - Variable Redeclaration",
        input: `{\n  var a = \"value\";\n\n  var a = \"other\";
}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 4] Error at 'a': Already a variable with this name in this scope."
    },
    {
        name: "[tester::#PZ7] [test-2] Resolving & Binding - Variable Redeclaration",
        input: `fun foo(a) {\n  var a;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 2] Error at 'a': Already a variable with this name in this scope."
    },
    {
        name: "[tester::#PZ7] [test-3] Resolving & Binding - Variable Redeclaration",
        input: `fun foo(arg, arg) {\n  \"body\";\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error at 'arg': Already a variable with this name in this scope."
    },
    {
        name: "[tester::#PZ7] [test-4] Resolving & Binding - Variable Redeclaration",
        input: `var a = \"1\";\nprint a;\n\nvar a;\nprint a;\n\nvar a = \"2\";\nprint a;\n\n{\n  var a = \"1\";\n\n  var a = \"2\";\n  print a;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 13] Error at 'a': Already a variable with this name in this scope."
    },
    // Stage #EH3: Resolving & Binding - Invalid Return
    {
        name: "[tester::#EH3] [test-1] Resolving & Binding - Invalid Return",
        input: `fun foo() {\n  return \"at function scope is ok\";\n}\n\nreturn;`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 5] Error at 'return': Can't return from top-level code."
    },
    {
        name: "[tester::#EH3] [test-2] Resolving & Binding - Invalid Return",
        input: `fun foo() {\n  if (true) {\n    return \"early return\";\n  }\n\n  for (var i = 0; i < 10; i = i + 1) {\n    return \"loop return\";\n  }\n}\n\nif (true) {\n  return \"conditional return\";\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 12] Error at 'return': Can't return from top-level code."
    },
    {
        name: "[tester::#EH3] [test-3] Resolving & Binding - Invalid Return",
        input: `{\n  return \"not allowed in a block either\";\n}\n\nfun allowed() {\n  if (true) {\n    return \"this is fine\";\n  }\n  return;\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 2] Error at 'return': Can't return from top-level code."
    },
    {
        name: "[tester::#EH3] [test-4] Resolving & Binding - Invalid Return",
        input: `fun outer() {\n  fun inner() {\n    return \"ok\";\n  }\n\n  return \"also ok\";\n}\n\nif (true) {\n  fun nested() {\n    return;\n  }\n\n  return \"not ok\";\n}`,
        command: "./your_program.sh run test.lox",
        expectedOutput: "",
        expectedExitCode: 65,
        expectedStderr: "[line 14] Error at 'return': Can't return from top-level code."
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
