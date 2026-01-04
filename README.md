Node.js Expression Calculator

A command-line mathematical expression evaluator written in pure Node.js, with no external libraries, no browser environment, and no shortcuts.

This project implements a full expression pipeline — tokenization → parsing → evaluation — similar to how real interpreters and compilers work.

 Features

Parses and evaluates mathematical expressions from raw text

Supports:

Integers and floating-point numbers

Operator precedence (+ - * /)

Parentheses

Unary negation (-5, (-3))

Uses the Shunting Yard algorithm to convert infix expressions to postfix

Stack-based postfix evaluation

Runs entirely in the terminal (Node.js only)

Example:

( -13.5 + 53 ) * 22 - 4 / 2.5
→ 860.4

 Why this project matters

This calculator is not built using eval, math libraries, or parser generators.

Instead, it demonstrates:

Manual lexical analysis (tokenizer)

Operator precedence handling

Stack-based algorithms

Error detection for malformed expressions

Clean separation of responsibilities (lexer / parser / evaluator)

These are the same foundational ideas used in:

Compilers

Interpreters

Query engines

Programming language runtimes

🏗 Architecture

The program is split into three core stages:

1. Tokenization

Raw input string → structured tokens
Handles numbers, operators, parentheses, and unary minus.

2. Parsing (Shunting Yard)

Infix notation → postfix (RPN)
Correctly enforces operator precedence and associativity.

3. Evaluation

Postfix expression → final numeric result
Uses a stack machine approach.

 Usage
Run with standard input
node calc.js
(2 + 3) * 4

Or pass the expression as an argument
node calc.js "(2 + 3) * 4"

 Project Structure
calc.js        # tokenizer, parser, evaluator
README.md      # project documentation


No build tools. No dependencies. Just logic
