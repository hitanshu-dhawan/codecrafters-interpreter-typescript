import { TestRunner } from './test-runner.js';

/**
 * Scanner tests based on the CodeCrafters test cases
 */
const scannerTests = [
    // Stage #RY8: Scanning - Empty file
    {
        name: "[tester::#RY8] [test-1] Scanning: Empty file",
        input: ``, // Corrected from ""
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #OL4: Scanning - Parentheses
    {
        name: "[tester::#OL4] [test-1] Scanning: Parentheses",
        input: `(`, // Corrected from \"(\"
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OL4] [test-2] Scanning: Parentheses",
        input: `))`, // Corrected from \"))\"
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "RIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OL4] [test-3] Scanning: Parentheses",
        input: `()())`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nLEFT_PAREN ( null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OL4] [test-4] Scanning: Parentheses",
        input: `)()((()`, // Corrected from \"()()((()\"
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "RIGHT_PAREN ) null\nLEFT_PAREN ( null\nRIGHT_PAREN ) null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #OE8: Scanning - Braces
    {
        name: "[tester::#OE8] [test-1] Scanning: Braces",
        input: `}`, // Corrected from \"}\"
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "RIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OE8] [test-2] Scanning: Braces",
        input: `{{}}`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nLEFT_BRACE { null\nRIGHT_BRACE } null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OE8] [test-3] Scanning: Braces",
        input: `}{{{}}`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "RIGHT_BRACE } null\nLEFT_BRACE { null\nLEFT_BRACE { null\nLEFT_BRACE { null\nRIGHT_BRACE } null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#OE8] [test-4] Scanning: Braces",
        input: `({)}{)}`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nLEFT_BRACE { null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #XC5: Scanning - Other single-character tokens
    {
        name: "[tester::#XC5] [test-1] Scanning: Other single-character tokens",
        input: `+-`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "PLUS + null\nMINUS - null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XC5] [test-2] Scanning: Other single-character tokens",
        input: `++--**..,,;;`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "PLUS + null\nPLUS + null\nMINUS - null\nMINUS - null\nSTAR * null\nSTAR * null\nDOT . null\nDOT . null\nCOMMA , null\nCOMMA , null\nSEMICOLON ; null\nSEMICOLON ; null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XC5] [test-3] Scanning: Other single-character tokens",
        input: `-;+*,.,`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "MINUS - null\nSEMICOLON ; null\nPLUS + null\nSTAR * null\nCOMMA , null\nDOT . null\nCOMMA , null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#XC5] [test-4] Scanning: Other single-character tokens",
        input: `({.*+-;})`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nDOT . null\nSTAR * null\nPLUS + null\nMINUS - null\nSEMICOLON ; null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #EA6: Scanning - Lexical errors
    {
        name: "[tester::#EA6] [test-1] Scanning: Lexical errors",
        input: ' @',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: @"
    },
    {
        name: "[tester::#EA6] [test-2] Scanning: Lexical errors",
        input: ',.$(#',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "COMMA , null\nDOT . null\nLEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: $\n[line 1] Error: Unexpected character: #"
    },
    {
        name: "[tester::#EA6] [test-3] Scanning: Lexical errors",
        input: ' @%$$%',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: @\n[line 1] Error: Unexpected character: %\n[line 1] Error: Unexpected character: $\n[line 1] Error: Unexpected character: $\n[line 1] Error: Unexpected character: %"
    },
    {
        name: "[tester::#EA6] [test-4] Scanning: Lexical errors",
        input: '{($-*.# @+)}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nLEFT_PAREN ( null\nMINUS - null\nSTAR * null\nDOT . null\nPLUS + null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: $\n[line 1] Error: Unexpected character: #\n[line 1] Error: Unexpected character: @"
    },
    // Stage #MP7: Scanning - Assignment & equality Operators
    {
        name: "[tester::#MP7] [test-1] Scanning: Assignment & equality Operators",
        input: '=',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EQUAL = null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MP7] [test-2] Scanning: Assignment & equality Operators",
        input: '==',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EQUAL_EQUAL == null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MP7] [test-3] Scanning: Assignment & equality Operators",
        input: '({=}){==}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nEQUAL = null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nEQUAL_EQUAL == null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#MP7] [test-4] Scanning: Assignment & equality Operators",
        input: '(( @==#=$))',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_PAREN ( null\nEQUAL_EQUAL == null\nEQUAL = null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: @\n[line 1] Error: Unexpected character: #\n[line 1] Error: Unexpected character: $"
    },
    // Stage #BU3: Scanning - Negation & inequality operators
    {
        name: "[tester::#BU3] [test-1] Scanning: Negation & inequality operators",
        input: '!=',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "BANG_EQUAL != null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BU3] [test-2] Scanning: Negation & inequality operators",
        input: '!!===',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "BANG ! null\nBANG_EQUAL != null\nEQUAL_EQUAL == null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BU3] [test-3] Scanning: Negation & inequality operators",
        input: '!{!}(!===)=',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "BANG ! null\nLEFT_BRACE { null\nBANG ! null\nRIGHT_BRACE } null\nLEFT_PAREN ( null\nBANG_EQUAL != null\nEQUAL_EQUAL == null\nRIGHT_PAREN ) null\nEQUAL = null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#BU3] [test-4] Scanning: Negation & inequality operators",
        input: `{(~===!=%)}`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nLEFT_PAREN ( null\nEQUAL_EQUAL == null\nEQUAL = null\nBANG_EQUAL != null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: ~\n[line 1] Error: Unexpected character: %"
    },
    // Stage #ET2: Scanning - Relational operators
    {
        name: "[tester::#ET2] [test-1] Scanning: Relational operators",
        input: '>=',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "GREATER_EQUAL >= null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ET2] [test-2] Scanning: Relational operators",
        input: '<<<=>>>=',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LESS < null\nLESS < null\nLESS_EQUAL <= null\nGREATER > null\nGREATER > null\nGREATER_EQUAL >= null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ET2] [test-3] Scanning: Relational operators",
        input: '<<=<<=>=',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LESS < null\nLESS_EQUAL <= null\nLESS < null\nLESS_EQUAL <= null\nGREATER_EQUAL >= null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ET2] [test-4] Scanning: Relational operators",
        input: '(){!=>===}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nBANG_EQUAL != null\nGREATER_EQUAL >= null\nEQUAL_EQUAL == null\nRIGHT_BRACE } null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #ML2: Scanning - Division operator & comments
    {
        name: "[tester::#ML2] [test-1] Scanning: Division operator & comments",
        input: '//Comment',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ML2] [test-2] Scanning: Division operator & comments",
        input: '(///Unicode:£§᯽☺♣)',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ML2] [test-3] Scanning: Division operator & comments",
        input: '/',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "SLASH / null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ML2] [test-4] Scanning: Division operator & comments",
        input: '({(*>.)})//Comment',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nLEFT_PAREN ( null\nSTAR * null\nGREATER > null\nDOT . null\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #ER2: Scanning - Whitespace
    {
        name: "[tester::#ER2] [test-1] Scanning: Whitespace",
        input: ' ',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ER2] [test-2] Scanning: Whitespace",
        input: ' \t\n ',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ER2] [test-3] Scanning: Whitespace",
        input: '{\n\t}\n(( . ;-))',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nRIGHT_BRACE } null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nDOT . null\nSEMICOLON ; null\nMINUS - null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#ER2] [test-4] Scanning: Whitespace",
        input: '{\t \n \n}\n((>=+<=, ))',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_BRACE { null\nRIGHT_BRACE } null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nGREATER_EQUAL >= null\nPLUS + null\nLESS_EQUAL <= null\nCOMMA , null\nRIGHT_PAREN ) null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #TZ7: Scanning - Multi-line errors
    {
        name: "[tester::#TZ7] [test-1] Scanning: Multi-line errors",
        input: '()\n\t @',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 2] Error: Unexpected character: @"
    },
    {
        name: "[tester::#TZ7] [test-2] Scanning: Multi-line errors",
        input: '%\n $',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "EOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: %\n[line 2] Error: Unexpected character: $"
    },
    {
        name: "[tester::#TZ7] [test-3] Scanning: Multi-line errors",
        input: "()  #\t{}\n @\n$\n+++\n// Let's Go!\n+++\n#",
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nRIGHT_BRACE } null\nPLUS + null\nPLUS + null\nPLUS + null\nPLUS + null\nPLUS + null\nPLUS + null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: #\n[line 2] Error: Unexpected character: @\n[line 3] Error: Unexpected character: $\n[line 7] Error: Unexpected character: #"
    },
    {
        name: "[tester::#TZ7] [test-4] Scanning: Multi-line errors",
        input: '({. $})',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "LEFT_PAREN ( null\nLEFT_BRACE { null\nDOT . null\nRIGHT_BRACE } null\nRIGHT_PAREN ) null\nEOF  null",
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unexpected character: $"
    },
    // Stage #UE7: Scanning - String literals
    {
        name: "[tester::#UE7] [test-1] Scanning: String literals",
        input: `\"hello\"`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'STRING \"hello\" hello\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#UE7] [test-2] Scanning: String literals",
        input: `\"foo\" * \"unterminated`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'STRING \"foo\" foo\nSTAR * null\nEOF  null',
        expectedExitCode: 65,
        expectedStderr: "[line 1] Error: Unterminated string."
    },
    {
        name: "[tester::#UE7] [test-3] Scanning: String literals",
        input: `\"foo \tbar 123 // hello world!\"`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'STRING \"foo \tbar 123 // hello world!\" foo \tbar 123 // hello world!\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#UE7] [test-4] Scanning: String literals",
        input: `(\"world\"+\"baz\") != \"other_string\"`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'LEFT_PAREN ( null\nSTRING \"world\" world\nPLUS + null\nSTRING \"baz\" baz\nRIGHT_PAREN ) null\nBANG_EQUAL != null\nSTRING \"other_string\" other_string\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #KJ0: Scanning - Number literals
    {
        name: "[tester::#KJ0] [test-1] Scanning: Number literals",
        input: `56`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "NUMBER 56 56.0\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KJ0] [test-2] Scanning: Number literals",
        input: `2531.2373`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "NUMBER 2531.2373 2531.2373\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KJ0] [test-3] Scanning: Number literals",
        input: `51.0000`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "NUMBER 51.0000 51.0\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#KJ0] [test-4] Scanning: Number literals",
        input: `(74+47) > 80 != (\"Success\" != \"Failure\") != (78 >= 95)`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'LEFT_PAREN ( null\nNUMBER 74 74.0\nPLUS + null\nNUMBER 47 47.0\nRIGHT_PAREN ) null\nGREATER > null\nNUMBER 80 80.0\nBANG_EQUAL != null\nLEFT_PAREN ( null\nSTRING \"Success\" Success\nBANG_EQUAL != null\nSTRING \"Failure\" Failure\nRIGHT_PAREN ) null\nBANG_EQUAL != null\nLEFT_PAREN ( null\nNUMBER 78 78.0\nGREATER_EQUAL >= null\nNUMBER 95 95.0\nRIGHT_PAREN ) null\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #EY7: Scanning - Identifiers
    {
        name: "[tester::#EY7] [test-1] Scanning: Identifiers",
        input: `baz bar`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "IDENTIFIER baz null\nIDENTIFIER bar null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#EY7] [test-2] Scanning: Identifiers",
        input: `_123world_ baz 6az f00 bar`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "IDENTIFIER _123world_ null\nIDENTIFIER baz null\nNUMBER 6 6.0\nIDENTIFIER az null\nIDENTIFIER f00 null\nIDENTIFIER bar null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#EY7] [test-3] Scanning: Identifiers",
        input: 'message = \"Hello, World!\"\nnumber = 123',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'IDENTIFIER message null\nEQUAL = null\nSTRING \"Hello, World!\" Hello, World!\nIDENTIFIER number null\nEQUAL = null\nNUMBER 123 123.0\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#EY7] [test-4] Scanning: Identifiers",
        input: '{\n// This is a complex test case\nstr1 = \"Test\"\nstr2 = \"Case\"\nnum1 = 100\nnum2 = 200.00\nresult = (str1 == str2) != ((num1 + num2) >= 300)\n}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'LEFT_BRACE { null\nIDENTIFIER str1 null\nEQUAL = null\nSTRING \"Test\" Test\nIDENTIFIER str2 null\nEQUAL = null\nSTRING \"Case\" Case\nIDENTIFIER num1 null\nEQUAL = null\nNUMBER 100 100.0\nIDENTIFIER num2 null\nEQUAL = null\nNUMBER 200.00 200.0\nIDENTIFIER result null\nEQUAL = null\nLEFT_PAREN ( null\nIDENTIFIER str1 null\nEQUAL_EQUAL == null\nIDENTIFIER str2 null\nRIGHT_PAREN ) null\nBANG_EQUAL != null\nLEFT_PAREN ( null\nLEFT_PAREN ( null\nIDENTIFIER num1 null\nPLUS + null\nIDENTIFIER num2 null\nRIGHT_PAREN ) null\nGREATER_EQUAL >= null\nNUMBER 300 300.0\nRIGHT_PAREN ) null\nRIGHT_BRACE } null\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
    },
    // Stage #PQ5: Scanning - Reserved words
    {
        name: "[tester::#PQ5] [test-1] Scanning: Reserved words",
        input: `for`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "FOR for null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PQ5] [test-2] Scanning: Reserved words",
        input: `for if else AND print nil return ELSE TRUE or false RETURN VAR this NIL true SUPER super CLASS FALSE FUN THIS FOR OR var while PRINT class IF fun and WHILE`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: "FOR for null\nIF if null\nELSE else null\nIDENTIFIER AND null\nPRINT print null\nNIL nil null\nRETURN return null\nIDENTIFIER ELSE null\nIDENTIFIER TRUE null\nOR or null\nFALSE false null\nIDENTIFIER RETURN null\nIDENTIFIER VAR null\nTHIS this null\nIDENTIFIER NIL null\nTRUE true null\nIDENTIFIER SUPER null\nSUPER super null\nIDENTIFIER CLASS null\nIDENTIFIER FALSE null\nIDENTIFIER FUN null\nIDENTIFIER THIS null\nIDENTIFIER FOR null\nIDENTIFIER OR null\nVAR var null\nWHILE while null\nIDENTIFIER PRINT null\nCLASS class null\nIDENTIFIER IF null\nFUN fun null\nAND and null\nIDENTIFIER WHILE null\nEOF  null",
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PQ5] [test-3] Scanning: Reserved words",
        input: 'var greeting = \"Hello\"\nif (greeting == \"Hello\") {\n    return true\n} else {\n    return false\n}',
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'VAR var null\nIDENTIFIER greeting null\nEQUAL = null\nSTRING \"Hello\" Hello\nIF if null\nLEFT_PAREN ( null\nIDENTIFIER greeting null\nEQUAL_EQUAL == null\nSTRING \"Hello\" Hello\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nRETURN return null\nTRUE true null\nRIGHT_BRACE } null\nELSE else null\nLEFT_BRACE { null\nRETURN return null\nFALSE false null\nRIGHT_BRACE } null\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
    },
    {
        name: "[tester::#PQ5] [test-4] Scanning: Reserved words",
        input: `var result = (a + b) > 7 or \"Success\" != \"Failure\" or x >= 5\nwhile (result) {\n    var counter = 0\n    counter = counter + 1\n    if (counter == 10) {\n        return nil\n    }\n}`,
        command: "./your_program.sh tokenize test.lox",
        expectedOutput: 'VAR var null\nIDENTIFIER result null\nEQUAL = null\nLEFT_PAREN ( null\nIDENTIFIER a null\nPLUS + null\nIDENTIFIER b null\nRIGHT_PAREN ) null\nGREATER > null\nNUMBER 7 7.0\nOR or null\nSTRING \"Success\" Success\nBANG_EQUAL != null\nSTRING \"Failure\" Failure\nOR or null\nIDENTIFIER x null\nGREATER_EQUAL >= null\nNUMBER 5 5.0\nWHILE while null\nLEFT_PAREN ( null\nIDENTIFIER result null\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nVAR var null\nIDENTIFIER counter null\nEQUAL = null\nNUMBER 0 0.0\nIDENTIFIER counter null\nEQUAL = null\nIDENTIFIER counter null\nPLUS + null\nNUMBER 1 1.0\nIF if null\nLEFT_PAREN ( null\nIDENTIFIER counter null\nEQUAL_EQUAL == null\nNUMBER 10 10.0\nRIGHT_PAREN ) null\nLEFT_BRACE { null\nRETURN return null\nNIL nil null\nRIGHT_BRACE } null\nRIGHT_BRACE } null\nEOF  null',
        expectedExitCode: 0,
        expectedStderr: ""
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
