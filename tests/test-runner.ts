import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test result interface
 */
interface TestResult {
    name: string;
    passed: boolean;
    expected: string;
    actual: string;
    stderr: string;
    exitCode: number;
    expectedExitCode: number;
}

/**
 * Test case interface
 */
interface TestCase {
    name: string;
    input: string;
    command: string;
    expectedOutput: string;
    expectedExitCode: number;
    expectedStderr?: string;
}

/**
 * Test runner for the Lox interpreter
 */
export class TestRunner {
    private readonly projectRoot: string;
    private readonly testFilePath: string;

    constructor() {
        this.projectRoot = path.resolve(__dirname, '..');
        this.testFilePath = path.join(this.projectRoot, 'test.lox');
    }

    /**
     * Run a single test case
     */
    async runTest(testCase: TestCase): Promise<TestResult> {
        // Write test input to file
        fs.writeFileSync(this.testFilePath, testCase.input);

        const result = await this.executeCommand(testCase.command);

        // For tests that expect stderr, check stderr content
        let passed: boolean;
        if (testCase.expectedStderr) {
            passed =
                result.exitCode === testCase.expectedExitCode &&
                this.normalizeOutput(result.stdout) === this.normalizeOutput(testCase.expectedOutput) &&
                this.normalizeOutput(result.stderr).includes(this.normalizeOutput(testCase.expectedStderr));
        } else {
            // For tests without expectedStderr, just check stdout and exit code
            passed =
                result.exitCode === testCase.expectedExitCode &&
                this.normalizeOutput(result.stdout) === this.normalizeOutput(testCase.expectedOutput);
        }

        return {
            name: testCase.name,
            passed,
            expected: testCase.expectedOutput,
            actual: result.stdout,
            stderr: result.stderr,
            exitCode: result.exitCode,
            expectedExitCode: testCase.expectedExitCode
        };
    }

    /**
     * Run multiple test cases
     */
    async runTests(testCases: TestCase[]): Promise<TestResult[]> {
        const results: TestResult[] = [];

        for (const testCase of testCases) {
            const result = await this.runTest(testCase);
            results.push(result);

            // Print result immediately
            if (result.passed) {
                console.log(`✓ ${result.name}`);
            } else {
                console.log(`✗ ${result.name}`);
                console.log(`  Expected: ${result.expected.replace(/\n/g, '\\n')}`);
                console.log(`  Actual: ${result.actual.replace(/\n/g, '\\n')}`);
                if (result.stderr) {
                    console.log(`  Stderr: ${result.stderr.replace(/\n/g, '\\n')}`);
                }
                console.log(`  Exit code: ${result.exitCode} (expected: ${result.expectedExitCode})`);
            }
        }

        return results;
    }

    /**
     * Execute a command and return the result
     */
    private executeCommand(command: string): Promise<{ stdout: string, stderr: string, exitCode: number }> {
        return new Promise((resolve) => {
            const [cmd, ...args] = command.split(' ');
            const child = spawn(cmd, args, {
                cwd: this.projectRoot,
                stdio: ['pipe', 'pipe', 'pipe']
            });

            let stdout = '';
            let stderr = '';

            child.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            child.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            child.on('close', (code) => {
                resolve({
                    stdout: stdout.trim(),
                    stderr: stderr.trim(),
                    exitCode: code || 0
                });
            });
        });
    }

    /**
     * Normalize output for comparison
     */
    private normalizeOutput(output: string): string {
        return output.trim().replace(/\r\n/g, '\n');
    }

    /**
     * Clean up test files
     */
    cleanup(): void {
        if (fs.existsSync(this.testFilePath)) {
            fs.unlinkSync(this.testFilePath);
        }
    }
}