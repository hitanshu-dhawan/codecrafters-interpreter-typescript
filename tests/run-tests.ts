#!/usr/bin/env bun

import { runScannerTests } from './scanner.test.js';
import { runParserTests } from './parser.test.js';
import { runInterpreterTests } from './interpreter.test.js';

/**
 * Main test runner that executes all test suites
 */
async function main() {
    console.log("🚀 Starting Lox Interpreter Test Suite\n");
    console.log("=".repeat(50));

    try {
        // Run scanner tests
        await runScannerTests();
        console.log("\n" + "=".repeat(50));

        // Run parser tests  
        await runParserTests();
        console.log("\n" + "=".repeat(50));

        // Run interpreter tests
        await runInterpreterTests();
        console.log("\n" + "=".repeat(50));

        console.log("\n🎉 All test suites completed successfully!");

    } catch (error) {
        console.error("\n💥 Test suite failed:", error);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (import.meta.main) {
    main();
}