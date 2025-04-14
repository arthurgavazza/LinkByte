# Cursor Rules Organization

This document provides an overview of the Cursor rules organization and how to effectively use them in your development workflow.

## How Cursor Rules Work

Cursor rules are loaded into the AI's context based on their configuration:

1. **Always-applied rules** (`alwaysApply: true`): Automatically included in every conversation
2. **File-pattern rules** (`globs: "pattern"`): Included when files matching the pattern are attached or mentioned
3. **Description-based rules**: Selected by the AI when the query seems relevant to the rule's description
4. **Manually-requested rules**: Only included when explicitly requested in your prompt

The AI agent decides which rules to apply based on their relevance to your current task. Being specific in your prompt about which rules to apply can help the AI understand your needs better.

## Rule Categories

### Development Workflow Rules
- **development-workflow.mdc**: Overall development workflow guidelines with Cursor AI (request explicitly)
- **test-automation.mdc**: Guidelines for automatic test creation (request explicitly)
- **code-quality-checks.mdc**: Standards for linting and code quality (request explicitly)
- **storybook-guidelines.mdc**: Guidelines for creating Storybook components (request explicitly for React components)

### Frontend Rules
- **frontend-rules.mdc**: Comprehensive frontend development standards (reference for architecture)
- **nextjs-typescript.mdc**: Core best practices for Next.js and TypeScript (reference for new components)
- **url-shortener-frontend.mdc**: Domain-specific components for URL shortener (reference for app components)
- **form-handling.mdc**: Form handling best practices with React Hook Form and Zod (auto-applied to form components)

### Backend Rules
- **backend-rules.mdc**: Core backend development guidelines (reference for architecture)
- **url-shortener-backend.mdc**: Domain-specific API implementation (reference for URL shortener APIs)
- **postgres-database.mdc**: PostgreSQL database best practices (auto-applied to database code)
- **api-best-practices.mdc**: API integration guidelines (auto-applied to API files)

### Security Rules
- **auth-cookie-rules.mdc**: HTTP-only cookie authentication guidelines (auto-applied to auth code)

### Project Organization
- **project-structure.mdc**: Project structure and file organization (reference for architecture)
- **quality-standards.mdc**: General quality standards for all code (reference for standards)

## How to Use Rules in Prompts

When working with Cursor AI, you should explicitly request specific rules when needed:

```
Create a new React form component for the URL shortener using the storybook-guidelines and test-automation rules.
```

```
Implement a new API endpoint for URL analytics following the url-shortener-backend and test-automation rules.
```

## Effective Rule Descriptions

For rules that rely on descriptions to be selected by the AI, use these patterns:

- Start with "USE WHEN" to clearly indicate when the rule applies
- Use clear action verbs (creating, modifying, implementing)
- Be specific about technologies or patterns
- Example: "USE WHEN implementing form validation with React Hook Form and Zod"

## Troubleshooting Rules

If a rule doesn't seem to be applied correctly:

1. **Verify rule loading**: Add a line at the top of your rule saying `Say "Rule [rule-name] loaded!" if this rule is being applied.`
2. **Check frontmatter**: Ensure the description, globs, and alwaysApply fields are correctly formatted
3. **Start a new chat**: Rule changes may not take effect until a new conversation is started
4. **Simplify glob patterns**: Use comma-separated patterns (e.g., `*.ts,*.tsx`) instead of curly braces
5. **Re-save the file**: Sometimes simply re-saving the rule file can resolve issues

## Rule Optimization

- Most rules are set to `alwaysApply: false` to avoid overwhelming Cursor with too many instructions
- Only apply rules that are specifically relevant to your current task
- Rules with overlapping content have been organized to minimize redundancy
- More specific rules should be preferred over general rules for specific tasks
- Keep rules focused and concise - AI processes shorter, targeted rules more effectively
- Periodically review rules for effectiveness and update as needed

## Creating New Rules

When creating new rules:

1. Use the `.cursor/rules/cursor-rules.mdc` file as a reference for proper formatting
2. Follow the naming convention: `kebab-case.mdc`
3. Include a clear description that helps the AI determine when to apply the rule
4. Set appropriate glob patterns or alwaysApply based on the rule's scope
5. Structure the content with clear headings and examples
6. Test the rule with sample queries to ensure it's being correctly applied