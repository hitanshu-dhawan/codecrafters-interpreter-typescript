# Lox Interpreter Test Suite

This directory contains comprehensive unit tests for the Lox interpreter implementation. The tests are organized into three main categories that mirror the implementation stages:

## Test Categories

### 1. Scanner Tests (`scanner.test.ts`)
Tests the lexical analysis phase, verifying that the scanner correctly tokenizes Lox source code.

**Covered test stages:**
- ✅ **RY8**: Empty file scanning
- ✅ **OL4**: Parentheses tokenization
- ✅ **OE8**: Braces tokenization  
- ✅ **XC5**: Single-character tokens (operators, punctuation)
- ✅ **EA6**: Lexical error handling
- ✅ **MP7**: Assignment & equality operators (`=`, `==`)
- ✅ **BU3**: Negation & inequality operators (`!`, `!=`)
- ✅ **ET2**: Relational operators (`<`, `<=`, `>`, `>=`)
- ✅ **ML2**: Division operator & comment handling (`/`, `//`)
- ✅ **ER2**: Whitespace handling
- ✅ **TZ7**: Multi-line error reporting
- ✅ **UE7**: String literal parsing
- ✅ **KJ0**: Number literal parsing
- ✅ **EY7**: Identifier parsing
- ✅ **PQ5**: Reserved word recognition

### 2. Parser Tests (`parser.test.ts`)
Tests the syntax analysis phase, verifying that the parser correctly builds Abstract Syntax Trees (ASTs).

**Covered test stages:**
- ✅ **SC2**: Boolean & nil literals
- ✅ **RA8**: Number literal parsing
- ✅ **TH5**: String literal parsing
- ✅ **XE6**: Parentheses grouping
- ✅ **MQ1**: Unary operators (`!`, `-`)
- ✅ **WA9**: Arithmetic operators - multiplication & division
- ✅ **YF2**: Arithmetic operators - addition & subtraction
- ✅ **UH4**: Comparison operators
- ✅ **HT8**: Equality operators
- ✅ **WZ8**: Syntax error handling

### 3. Interpreter Tests (`interpreter.test.ts`)
Tests the evaluation phase, verifying that expressions are correctly interpreted and evaluated.

**Covered functionality:**
- ✅ **IZ6**: Literal evaluation (booleans, nil, numbers, strings)
- ✅ Boolean logic operations
- ✅ Arithmetic operations with proper precedence
- ✅ String concatenation
- ✅ Comparison operations
- ✅ Equality testing
- ✅ Unary operations (negation, logical not)
- ✅ Grouped expressions
- ✅ Complex nested expressions

## Running Tests

### Run All Tests
```bash
# Using npm/bun scripts
bun test

# Or directly
bun run tests/run-tests.ts
```

### Run Individual Test Suites
```bash
# Scanner tests only
bun test:scanner

# Parser tests only  
bun test:parser

# Interpreter tests only
bun test:interpreter
```

### Run Individual Files
```bash
# Scanner tests
bun run tests/scanner.test.ts

# Parser tests
bun run tests/parser.test.ts

# Interpreter tests
bun run tests/interpreter.test.ts
```

## Test Structure

Each test case follows this structure:
```typescript
{
    name: "Descriptive test name",
    input: "source code to test",
    command: "./your_program.sh <command> test.lox",
    expectedOutput: "expected stdout output",
    expectedExitCode: 0, // or 65 for errors
    expectedStderr?: "expected error message" // optional
}
```

## Test Framework

The tests use a custom lightweight testing framework (`TestRunner`) that:
- ✅ Spawns the interpreter as a subprocess
- ✅ Writes test input to temporary files
- ✅ Captures stdout, stderr, and exit codes
- ✅ Provides detailed failure reporting
- ✅ Handles both success and error cases
- ✅ Supports parallel test execution

## Expected Output Format

The tests verify exact output matching for:

### Tokenize Command
```
TOKEN_TYPE lexeme literal
EOF  null
```

### Parse Command
```
(operator operand1 operand2)
```

### Evaluate Command
```
result_value
```

## Error Handling

Tests also verify proper error handling:
- **Exit Code 65**: Syntax/lexical errors
- **Exit Code 70**: Runtime errors  
- **Exit Code 0**: Successful execution

Error messages should follow the format:
```
[line X] Error: Description
```

## Contributing

When adding new tests:
1. Follow the existing naming convention
2. Include both positive and negative test cases
3. Test edge cases and error conditions
4. Ensure tests match the CodeCrafters specification exactly
5. Update this README if adding new test categories