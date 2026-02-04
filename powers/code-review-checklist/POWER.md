---
name: "code-review-checklist"
displayName: "Code Review Checklist"
description: "A comprehensive checklist for conducting effective code reviews with best practices and common pitfalls to avoid"
keywords: ["code review", "checklist", "pull request", "pr review", "quality"]
author: "Kiro User"
---

# Code Review Checklist

## Overview

This power provides a structured approach to code reviews, helping you catch common issues and maintain code quality. Use this checklist when reviewing pull requests or conducting peer reviews.

## Onboarding

No installation required - this is a knowledge base power. Simply activate it when you need guidance during code reviews.

## Code Review Checklist

### 1. Functionality
- [ ] Does the code do what it's supposed to do?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?

### 2. Code Quality
- [ ] Is the code readable and well-organized?
- [ ] Are variable and function names descriptive?
- [ ] Is there unnecessary duplication?
- [ ] Are functions/methods reasonably sized?

### 3. Security
- [ ] Is user input validated and sanitized?
- [ ] Are there any hardcoded secrets or credentials?
- [ ] Is sensitive data properly protected?

### 4. Performance
- [ ] Are there any obvious performance issues?
- [ ] Are database queries optimized?
- [ ] Is caching used appropriately?

### 5. Testing
- [ ] Are there adequate tests?
- [ ] Do tests cover edge cases?
- [ ] Are tests readable and maintainable?

### 6. Documentation
- [ ] Is complex logic documented?
- [ ] Are public APIs documented?
- [ ] Is the README updated if needed?

## Best Practices

- Review in small batches (under 400 lines ideally)
- Focus on the code, not the author
- Ask questions rather than make demands
- Praise good solutions, not just critique problems
- Use automated tools for style/formatting issues

## Common Pitfalls to Avoid

- Nitpicking style when there are bigger issues
- Rubber-stamping without actually reviewing
- Being overly critical or harsh
- Ignoring tests or documentation
