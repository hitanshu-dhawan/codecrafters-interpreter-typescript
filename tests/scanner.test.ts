import { TestRunner } from './test-runner.js';

/**
 * Scanner tests based on the CodeCrafters test cases
 */
const scannerTests = [
    // Stage #RY8: Scanning - Empty file
    {
        name: "Empty file",
        input: "",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0
    },

    // Stage #OL4: Scanning - Parentheses
    {
        name: "Single left parenthesis",
        input: "(",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Double right parenthesis",
        input: "))",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "RIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Mixed parentheses",
        input: ")()((",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "RIGHT_PAREN ) null\nLEFT_PAREN ( null\nRIGHT_PAREN ) null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Complex parentheses",
        input: "())))((",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 0
    },

    // Stage #OE8: Scanning - Braces
    {
        name: "Single right brace",
        input: "}",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "RIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Double braces",
        input: "{{}}",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nLEFT_BRACE { null\nRIGHT_BRACE } null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Mixed braces",
        input: "{{}{{",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nLEFT_BRACE { null\nRIGHT_BRACE } null\nLEFT_BRACE { null\nLEFT_BRACE { null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Mixed parentheses and braces",
        input: "(()){}}",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_PAREN ( null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nRIGHT_BRACE } null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0
    },

    // Stage #XC5: Scanning - Other single-character tokens
    {
        name: "Plus and minus",
        input: "+-",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "PLUS + null\nMINUS - null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Multiple operators",
        input: "++--**..,,;;",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "PLUS + null\nPLUS + null\nMINUS - null\nMINUS - null\nSTAR * null\nSTAR * null\nDOT . null\nDOT . null\nCOMMA , null\nCOMMA , null\nSEMICOLON ; null\nSEMICOLON ; null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Mixed operators",
        input: ",+;..,-",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "COMMA , null\nPLUS + null\nSEMICOLON ; null\nDOT . null\nDOT . null\nCOMMA , null\nMINUS - null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "All single character tokens",
        input: "({,-;+*})",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nCOMMA , null\nMINUS - null\nSEMICOLON ; null\nPLUS + null\nSTAR * null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0
    },

    // Stage #EA6: Scanning - Lexical errors
    {
        name: "Unexpected character @",
        input: "@",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: @"
    },
    {
        name: "Multiple unexpected characters",
        input: ",.$(#",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "COMMA , null\nDOT . null\nLEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: $"
    },
    {
        name: "Only unexpected characters",
        input: "##@$%",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: #"
    },
    {
        name: "Mixed valid and unexpected",
        input: "{(%@-#,.+)}",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nLEFT_PAREN ( null\nMINUS - null\nCOMMA , null\nDOT . null\nPLUS + null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: %"
    },

    // Stage #MP7: Scanning - Assignment & equality operators
    {
        name: "Single equals",
        input: "=",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EQUAL = null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Double equals",
        input: "==",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EQUAL_EQUAL == null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Mixed equality operators",
        input: "({=}){==}",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nEQUAL = null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nEQUAL_EQUAL == null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Equality with errors",
        input: "((%#===$))",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_PAREN ( null\nEQUAL_EQUAL == null\nEQUAL = null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: %"
    },

    // Stage #BU3: Scanning - Negation & inequality operators
    {
        name: "Not equal",
        input: "!=",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "BANG_EQUAL != null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Bang and not equal",
        input: "!!===",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "BANG ! null\nBANG_EQUAL != null\nEQUAL_EQUAL == null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Complex bang expressions",
        input: "!{!}(!===)=",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "BANG ! null\nLEFT_BRACE { null\nBANG ! null\nRIGHT_BRACE } null\nLEFT_PAREN ( null\nBANG_EQUAL != null\nEQUAL_EQUAL == null\nRIGHT_PAREN ) null\nEQUAL = null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Bang with errors",
        input: "{(!%#===)}",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nLEFT_PAREN ( null\nBANG ! null\nEQUAL_EQUAL == null\nEQUAL = null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: %"
    },

    // Stage #ET2: Scanning - Relational operators
    {
        name: "Greater equal",
        input: ">=",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "GREATER_EQUAL >= null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "All relational operators",
        input: "<<<=>>>=",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LESS < null\nLESS < null\nLESS_EQUAL <= null\nGREATER > null\nGREATER > null\nGREATER_EQUAL >= null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Mixed relational",
        input: ">=<<=>=>",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "GREATER_EQUAL >= null\nLESS < null\nLESS_EQUAL <= null\nGREATER_EQUAL >= null\nGREATER > null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Relational with other tokens",
        input: "(){!<!=}",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nBANG ! null\nLESS < null\nBANG_EQUAL != null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0
    },

    // Stage #ML2: Scanning - Division operator & comments
    {
        name: "Comment only",
        input: "//Comment",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0
    },
    {
        name: "Token with comment",
        input: "(///Unicode:£§᯽☺♣)",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Division operator",
        input: "/",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "SLASH / null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Tokens with comment",
        input: "({(!=+;)})//Comment",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nLEFT_PAREN ( null\nBANG_EQUAL != null\nPLUS + null\nSEMICOLON ; null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0
    },

    // Stage #ER2: Scanning - Whitespace
    {
        name: "Single space",
        input: " ",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0
    },
    {
        name: "Mixed whitespace",
        input: " \t\n ",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0
    },
    {
        name: "Tokens with whitespace",
        input: "{\n }\n((*-; \t))",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nRIGHT_BRACE } null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nSTAR * null\nMINUS - null\nSEMICOLON ; null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Complex whitespace",
        input: "{ \n \t\n}\n((>*,;))",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nRIGHT_BRACE } null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nGREATER > null\nSTAR * null\nCOMMA , null\nSEMICOLON ; null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0
    },

    // Stage #TZ7: Scanning - Multi-line errors
    {
        name: "Error on line 2",
        input: "()\n\t@",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 2] Error: Unexpected character: @"
    },
    {
        name: "Multiple errors line 2",
        input: "\n\t$%",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 2] Error: Unexpected character: $"
    },
    {
        name: "Complex multiline errors",
        input: "()  #\t{}\n@\n$\n+++\n// Let's Go!\n+++\n#",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nRIGHT_BRACE } null\nPLUS + null\nPLUS + null\nPLUS + null\nPLUS + null\nPLUS + null\nPLUS + null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: #"
    },
    {
        name: "Single line with error",
        input: "({.\t@})",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nDOT . null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: @"
    },

    // Stage #UE7: Scanning - String literals
    {
        name: "Simple string",
        input: '"hello"',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'STRING "hello" hello\nEOF  null',
        expectedExitCode: 0
    },
    {
        name: "Unterminated string",
        input: '"baz" , "unterminated',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'STRING "baz" baz\nCOMMA , null\nEOF  null',
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unterminated string."
    },
    {
        name: "String with special content",
        input: '"foo \tbar 123 // hello world!"',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'STRING "foo \tbar 123 // hello world!" foo \tbar 123 // hello world!\nEOF  null',
        expectedExitCode: 0
    },
    {
        name: "Multiple strings with operators",
        input: '("bar"+"baz") != "other_string"',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'LEFT_PAREN ( null\nSTRING "bar" bar\nPLUS + null\nSTRING "baz" baz\nRIGHT_PAREN ) null\nBANG_EQUAL != null\nSTRING "other_string" other_string\nEOF  null',
        expectedExitCode: 0
    },

    // Stage #KJ0: Scanning - Number literals
    {
        name: "Integer",
        input: "47",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "NUMBER 47 47.0\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Decimal",
        input: "7092.4817",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "NUMBER 7092.4817 7092.4817\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Decimal with trailing zeros",
        input: "47.0000",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "NUMBER 47.0000 47.0\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Complex expression with numbers",
        input: '(75+55) > 76 != ("Success" != "Failure") != (74 >= 49)',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'LEFT_PAREN ( null\nNUMBER 75 75.0\nPLUS + null\nNUMBER 55 55.0\nRIGHT_PAREN ) null\nGREATER > null\nNUMBER 76 76.0\nBANG_EQUAL != null\nLEFT_PAREN ( null\nSTRING "Success" Success\nBANG_EQUAL != null\nSTRING "Failure" Failure\nRIGHT_PAREN ) null\nBANG_EQUAL != null\nLEFT_PAREN ( null\nNUMBER 74 74.0\nGREATER_EQUAL >= null\nNUMBER 49 49.0\nRIGHT_PAREN ) null\nEOF  null',
        expectedExitCode: 0
    },

    // Stage #EY7: Scanning - Identifiers
    {
        name: "Simple identifiers",
        input: "bar baz",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "IDENTIFIER bar null\nIDENTIFIER baz null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Complex identifiers",
        input: "_123baz f00 world_ 6ar 6az",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "IDENTIFIER _123baz null\nIDENTIFIER f00 null\nIDENTIFIER world_ null\nNUMBER 6 6.0\nIDENTIFIER ar null\nNUMBER 6 6.0\nIDENTIFIER az null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Variable assignment",
        input: 'message = "Hello, World!"\nnumber = 123',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'IDENTIFIER message null\nEQUAL = null\nSTRING "Hello, World!" Hello, World!\nIDENTIFIER number null\nEQUAL = null\nNUMBER 123 123.0\nEOF  null',
        expectedExitCode: 0
    },
    {
        name: "Complex identifier expression",
        input: '{\n// This is a complex test case\nstr1 = "Test"\nstr2 = "Case"\nnum1 = 100\nnum2 = 200.00\nresult = (str1 == str2) != ((num1 + num2) >= 300)\n}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'LEFT_BRACE { null\nIDENTIFIER str1 null\nEQUAL = null\nSTRING "Test" Test\nIDENTIFIER str2 null\nEQUAL = null\nSTRING "Case" Case\nIDENTIFIER num1 null\nEQUAL = null\nNUMBER 100 100.0\nIDENTIFIER num2 null\nEQUAL = null\nNUMBER 200.00 200.0\nIDENTIFIER result null\nEQUAL = null\nLEFT_PAREN ( null\nIDENTIFIER str1 null\nEQUAL_EQUAL == null\nIDENTIFIER str2 null\nRIGHT_PAREN ) null\nBANG_EQUAL != null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nIDENTIFIER num1 null\nPLUS + null\nIDENTIFIER num2 null\nRIGHT_PAREN ) null\nGREATER_EQUAL >= null\nNUMBER 300 300.0\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nEOF  null',
        expectedExitCode: 0
    },

    // Stage #PQ5: Scanning - Reserved words
    {
        name: "Simple keyword",
        input: "class",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "CLASS class null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Keywords vs identifiers",
        input: "IF this FALSE ELSE WHILE if nil class SUPER while super THIS AND for var fun PRINT print TRUE FOR else OR false return VAR FUN CLASS and RETURN NIL or true",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "IDENTIFIER IF null\nTHIS this null\nIDENTIFIER FALSE null\nIDENTIFIER ELSE null\nIDENTIFIER WHILE null\nIF if null\nNIL nil null\nCLASS class null\nIDENTIFIER SUPER null\nWHILE while null\nSUPER super null\nIDENTIFIER THIS null\nIDENTIFIER AND null\nFOR for null\nVAR var null\nFUN fun null\nIDENTIFIER PRINT null\nPRINT print null\nIDENTIFIER TRUE null\nIDENTIFIER FOR null\nELSE else null\nIDENTIFIER OR null\nFALSE false null\nRETURN return null\nIDENTIFIER VAR null\nIDENTIFIER FUN null\nIDENTIFIER CLASS null\nAND and null\nIDENTIFIER RETURN null\nIDENTIFIER NIL null\nOR or null\nTRUE true null\nEOF  null",
        expectedExitCode: 0
    },
    {
        name: "Keyword in control structure",
        input: 'var greeting = "Hello"\nif (greeting == "Hello") {\n    return true\n} else {\n    return false\n}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'VAR var null\nIDENTIFIER greeting null\nEQUAL = null\nSTRING "Hello" Hello\nIF if null\nLEFT_PAREN ( null\nIDENTIFIER greeting null\nEQUAL_EQUAL == null\nSTRING "Hello" Hello\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nRETURN return null\nTRUE true null\nRIGHT_BRACE } null\nELSE else null\nLEFT_BRACE { null\nRETURN return null\nFALSE false null\nRIGHT_BRACE } null\nEOF  null',
        expectedExitCode: 0
    },
    {
        name: "Complex keyword expression",
        input: 'var result = (a + b) > 7 or "Success" != "Failure" or x >= 5\nwhile (result) {\n    var counter = 0\n    counter = counter + 1\n    if (counter == 10) {\n        return nil\n    }\n}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'VAR var null\nIDENTIFIER result null\nEQUAL = null\nLEFT_PAREN ( null\nIDENTIFIER a null\nPLUS + null\nIDENTIFIER b null\nRIGHT_PAREN ) null\nGREATER > null\nNUMBER 7 7.0\nOR or null\nSTRING "Success" Success\nBANG_EQUAL != null\nSTRING "Failure" Failure\nOR or null\nIDENTIFIER x null\nGREATER_EQUAL >= null\nNUMBER 5 5.0\nWHILE while null\nLEFT_PAREN ( null\nIDENTIFIER result null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nVAR var null\nIDENTIFIER counter null\nEQUAL = null\nNUMBER 0 0.0\nIDENTIFIER counter null\nEQUAL = null\nIDENTIFIER counter null\nPLUS + null\nNUMBER 1 1.0\nIF if null\nLEFT_PAREN ( null\nIDENTIFIER counter null\nEQUAL_EQUAL == null\nNUMBER 10 10.0\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nRETURN return null\nNIL nil null\nRIGHT_BRACE } null\nRIGHT_BRACE } null\nEOF  null',
        expectedExitCode: 0
    }
];

/**
 * Run scanner tests
 */
async function runScannerTests() {
    console.log("🔍 Running Scanner Tests...\n");

    const runner = new TestRunner();
    const results = await runner.runTests(scannerTests);

    const passed = results.filter(r => r.passed).length;
    const total = results.length;

    console.log(`\n📊 Scanner Tests: ${passed}/${total} passed`);

    if (passed !== total) {
        console.log("\n❌ Some scanner tests failed!");
        process.exit(1);
    } else {
        console.log("\n✅ All scanner tests passed!");
    }

    runner.cleanup();
}

// Export for use in main test runner
export { scannerTests, runScannerTests };

// Run if this file is executed directly
if (import.meta.main) {
    runScannerTests();
}