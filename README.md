# Leveraging .mdc rules Files to Improve Development Workflow in Cursor

## About This Guide

This guide is based on a combination of information from various sources:
- The official Cursor documentation
- Articles found online about working with Cursor and MDC files
- My personal trial and error while developing the experimental LinkByte project
- Observations and insights gained during hands-on experimentation

I've combined knowledge from the broader community and my own experience to compile these tips on effectively using Cursor rules and integrating Cursor into your development workflow. The patterns and practices described here represent my findings, not official guidelines, and are shared to help others navigate this powerful tool more effectively.

## LinkByte: A Test Bed for Cursor Rules

LinkByte is an experimental URL shortener application built with Next.js and FastAPI that I created specifically to test the capabilities of Cursor AI with well-defined rules. This simple project served as a controlled environment to explore how effectively Cursor could follow patterns and guidelines when generating and refactoring code with minimal human intervention.

The frontend was initially generated using Vercel's V0 AI tool, which provided a basic foundation. I then used Cursor and a set of custom rules to develop and refine specific features, particularly JWT authentication with HTTP-only cookies and link creation functionality. These features were chosen as they provided good test cases for rule enforcement across both frontend and backend components, requiring proper form handling, API integration, and security considerations.

## What Are .mdc rules files?

.mdc rules files are special documentation files used by Cursor AI to understand codebases and guide development. These files contain project-specific rules, patterns, and best practices that help the AI provide more contextual and relevant code suggestions and modifications.

When working with Cursor AI, these files act as a knowledge base that shapes how the AI responds to your requests. They enable the AI to understand your project's architecture, coding standards, and patterns without having to analyze the entire codebase repeatedly.

## How Cursor Rules Work

Cursor rules are loaded into the AI's context based on their configuration:

1. **Always-applied rules** (`alwaysApply: true`): Automatically included in every conversation
2. **File-pattern rules** (`globs: "pattern"`): Included when files matching the pattern are attached or mentioned
3. **Description-based rules**: Selected by the AI when the query seems relevant to the rule's description
4. **Manually-requested rules**: Only included when explicitly requested in your prompt

The AI agent decides which rules to apply based on their relevance to your current task. Being specific in your prompt about which rules to apply can help the AI understand your needs better.

## Organizing Rules with cursor-rules.mdc

The `cursor-rules.mdc` file serves as a meta-rule that helps organize and structure all other rules. It provides guidelines on how to:

- Structure rule content concisely (15-25 lines of content)
- Focus each rule on a single topic or technology
- Use bullet points instead of paragraphs
- Include minimal code examples
- Organize files with proper naming conventions

This meta-rule approach helps keep your rules organized and maintainable. By following the structure defined in `cursor-rules.mdc`, you ensure that all other rules remain focused, specific, and easy to update.

According to the rule, MDC files should be organized with proper prefixes:
- `core-`: Project-wide standards
- `fe-`: Frontend guidelines
- `be-`: Backend guidelines
- `test-`: Testing practices
- `tool-`: Tool-specific guidelines

This organization makes it easy to find relevant rules when needed and ensures that the AI can pick up the right context for different parts of your codebase.

## Rule Categories

### Development Workflow Rules
- **core-workflow.mdc**: Overall development workflow guidelines with Cursor AI
- **core-tdd.mdc**: Test-Driven Development workflow and practices
- **test-automation.mdc**: Guidelines for automatic test creation

### Frontend Rules
- **fe-nextjs.mdc**: Core best practices for Next.js and TypeScript development
- **fe-component-patterns.mdc**: Component design and implementation patterns
- **fe-state-management.mdc**: State management approaches and patterns
- **form-api-patterns.mdc**: Form handling with React Hook Form and API integration patterns

### Backend Rules
- **be-api-design.mdc**: API endpoint design principles
- **be-error-handling.mdc**: Error handling and logging best practices
- **be-security.mdc**: Security best practices for Python applications
- **database-patterns.mdc**: Database model design and query optimization
- **auth-security.mdc**: Authentication and security best practices

### Testing Rules
- **test-automation.mdc**: Guidelines for creating proper tests
- **unit-testing.mdc**: Unit testing best practices 
- **storybook-basics.mdc**: Storybook setup, component stories, and Next.js integration
- **test-mocking.mdc**: Mocking patterns for tests and Storybook
- **test-e2e-patterns.mdc**: End-to-end testing guidelines

### Tool-Specific Rules
- **tool-fastapi.mdc**: FastAPI development best practices
- **tool-pydantic.mdc**: Pydantic validation patterns
- **tool-sqlalchemy.mdc**: SQLAlchemy ORM and Alembic migrations
- **env-variables.mdc**: Environment variables management
- **http-logging.mdc**: HTTP clients and structured logging

## How to Use Rules in Prompts

When working with Cursor AI, you should explicitly request specific rules when needed:

```
Create a new React form component for the URL shortener using the storybook-basics and test-automation rules.
```

```
Implement a new API endpoint for URL analytics following the be-api-design and test-automation rules.
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

## Using Cursor.Directory Generator

The [cursor.directory](https://cursor.directory) generator is a powerful tool that can automatically generate Cursor rules based on your project's dependencies. By analyzing your `package.json` file or `requirements.txt` file, it creates a set of rules specific to your tech stack, saving significant time in rule creation.

To use the generator:

1. Visit [cursor.directory/generate](https://cursor.directory/generate)
2. Upload your project's `package.json` or `requirements.txt` file
3. Review the generated rules
4. Copy the rules to your `.cursor/rules` directory

For my project, I uploaded my `package.json` and received the following rules that aligned with my technology stack:

### Generated Rules Examples

```
---
name: nextjs-best-practices.mdc
description: Best practices for Next.js applications and routing
globs: **/*.{ts,tsx}
---

- Use the App Router for better performance and improved data fetching.
- Implement proper error boundaries to handle errors gracefully.
- Utilize Next.js built-in optimizations like image optimization and code splitting.
- Use `getStaticProps` and `getServerSideProps` appropriately for data fetching.

---
name: react-best-practices.mdc
description: Best practices for React development
globs: **/*.{ts,tsx,js,jsx}
---

- Use functional components with hooks instead of class components.
- Implement proper state management using Context API or external libraries like Redux.
- Utilize memoization techniques like `useMemo` and `useCallback` for performance optimization.
- Follow React's one-way data flow principle.

---
name: typescript-best-practices.mdc
description: TypeScript coding standards and type safety guidelines
globs: **/*.{ts,tsx}
---

- Enable strict mode in your `tsconfig.json` for better type checking.
- Use interfaces for object shapes and types for unions or more complex types.
- Leverage type inference where possible to reduce type annotations.
- Use generics for reusable components and functions.

---
name: tailwindcss-best-practices.mdc
description: Best practices for using Tailwind CSS
globs: **/*.{ts,tsx,css}
---

- Use utility-first classes for styling to maintain consistency and speed up development.
- Create custom components with Tailwind classes for reusability.
- Utilize the `@apply` directive in custom CSS to combine multiple utility classes.
- Keep your `tailwind.config.js` organized and use it to extend or override default styles.

---
name: radix-ui-best-practices.mdc
description: Best practices for using Radix UI components
globs: **/*.{ts,tsx}
---

- Use Radix UI primitives as building blocks for custom components.
- Follow Radix UI's accessibility guidelines to ensure your components are accessible.
- Utilize Radix UI's state management hooks for controlled components.
- Customize Radix UI components using the `asChild` prop for better integration with your design system.

---
name: react-query-best-practices.mdc
description: Best practices for using React Query for data fetching
globs: **/*.{ts,tsx}
---

- Use `useQuery` for fetching data and `useMutation` for creating, updating, or deleting data.
- Implement proper error handling and loading states with React Query's built-in features.
- Utilize query keys effectively for caching and refetching data.
- Use `queryClient` to manage global query state and invalidate queries when needed.

---
name: react-hook-form-best-practices.mdc
description: Best practices for using React Hook Form for form handling
globs: **/*.{ts,tsx}
---

- Use the `useForm` hook to manage form state and validation.
- Implement custom validation rules using the `register` function.
- Utilize the `Controller` component for controlled inputs with external UI libraries.
- Use TypeScript with React Hook Form for better type safety and autocompletion.

---
name: zod-best-practices.mdc
description: Best practices for using Zod for schema validation
globs: **/*.{ts,tsx}
---

- Define clear and reusable schemas for your data structures.
- Use Zod's built-in validation methods to ensure data integrity.
- Integrate Zod with React Hook Form for seamless form validation.
- Utilize Zod's type inference to generate TypeScript types from your schemas.

---
name: storybook-best-practices.mdc
description: Best practices for using Storybook for component development
globs: **/*.{ts,tsx,js,jsx,stories.mdx}
---

- Write stories for all your components to showcase different states and variations.
- Use Storybook's addon ecosystem to enhance your development experience.
- Implement proper documentation within your stories using MDX.
- Utilize Storybook's testing capabilities to ensure component quality.

---
name: eslint-best-practices.mdc
description: Best practices for using ESLint for code linting
globs: **/*.{ts,tsx,js,jsx}
---

- Configure ESLint to match your project's coding standards and style guide.
- Use ESLint plugins specific to your tech stack (e.g., React, TypeScript).
- Implement pre-commit hooks to run ESLint before committing code.
- Regularly update ESLint and its plugins to benefit from the latest rules and improvements.
```

### Customizing Generated Rules

The automatically generated rules provide an excellent starting point, but I recommend customizing them to better fit your project's specific needs:

1. **Adjust glob patterns**: Make sure the file patterns match your project structure
2. **Enhance with project-specific guidelines**: Add your team's specific conventions
3. **Integrate with existing rules**: Combine with your hand-crafted rules
4. **Add concrete examples**: Include short code snippets that demonstrate best practices

After customizing, place the rules in your `.cursor/rules` directory and Cursor AI will automatically begin applying them based on their configuration.

### Refining Rules with cursor-rules.mdc

To elevate your rules to the next level, reference the `cursor-rules.mdc` master rule to refine the structure and format of rules generated by cursor.directory. This master rule serves as a template for all other rules, ensuring consistency and effectiveness:

1. **Apply consistent formatting**: Use the structure defined in cursor-rules.mdc (H1 title, H2 sections, bullet points)
2. **Refine content length**: Follow the 15-25 lines of content guideline for optimal rule processing
3. **Adjust naming conventions**: Rename files to follow the prefixed kebab-case pattern (e.g., `fe-nextjs.mdc` instead of `nextjs-best-practices.mdc`)
4. **Enhance frontmatter**: Add appropriate globs and alwaysApply settings based on your project structure

### Leveraging the Cursor Rules Repository

Beyond the generator, you can find a wealth of community-contributed rules at [cursor.directory/rules](https://cursor.directory/rules). This repository contains rules for various technologies, frameworks, and development patterns that you can adapt to your project:

1. **Browse by category**: Find rules relevant to your tech stack or development needs
2. **Download and customize**: Get rules and modify them to match your project context
3. **Contribute back**: Share your refined rules with the community

The most effective approach is to use the cursor.directory generator for initial rule creation, enhance those rules with examples from the rules repository, and then systematically refine them using cursor-rules.mdc as your guide. This incremental improvement process ensures your rules evolve alongside your project, becoming more tailored and effective over time.

## Debugging Rules

When working with Cursor rules, you might encounter situations where rules aren't being applied as expected. Here are some debugging techniques to ensure your rules are properly loaded:

### Manual Rule References

If a rule isn't being loaded automatically despite having `alwaysApply: true` set, you can manually reference it in your Cursor chat:

```
@rule-name Please create a component following the patterns in this rule.
```

This explicit reference forces Cursor to include the rule in its context, regardless of its configuration or the current files being viewed. This technique is especially useful when:

- Testing new rules before finalizing their configuration
- Working with rules that have complex glob patterns
- Dealing with rules that might not be selected by the AI based on the current context
- Wanting to apply multiple specific rules to a complex task

### Verify Rule Loading

As mentioned in the troubleshooting section, adding a verification line at the top of your rule is an effective way to confirm when it's being applied:

```markdown
Say "Rule [rule-name] loaded!" if this rule is being applied.
```

If you see this message in Cursor's response, you'll know the rule was successfully loaded into the context.

## Advanced Tips: Test Automation with Rules

One powerful application of Cursor rules is to create a rule specifically for test automation. This approach significantly enhances Cursor's ability to write and improve code following a Test-Driven Development (TDD) workflow.

### Creating a Test Automation Rule

Create a dedicated rule that explains how to run tests in your project, what testing frameworks you use, and what patterns to follow. For example:

```markdown
---
name: test-automation.mdc
description: How to run tests and follow TDD workflow in this project
globs: **/*.test.{ts,tsx,js,jsx}
---

# Test Automation

## Running Tests
- Use `npm test` to run all tests
- Use `npm test -- --watch` for watch mode
- Run a specific test with `npm test -- -t "test name"`

## TDD Workflow
- Write test first (Red phase)
- Implement minimal code to make test pass (Green phase)
- Refactor while maintaining passing tests (Refactor phase)
- Repeat for each feature or edge case

## Test Structure
- Group related tests with `describe`
- Name tests with clear action and expected result
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
```

### Using Agent Mode with Test Automation

When combined with Cursor's agent mode, a well-crafted test automation rule becomes even more powerful:

1. **Enable AutoRun Mode**: Go to Cursor Settings -> Features -> Enable auto-run mode
2. **Configure Command Safety**:
   - Add safe commands to your allowlist (e.g., `npm test`, `jest`, `pytest`)
   - Add potentially dangerous commands to your denylist (e.g., `rm -rf`, `format`, commands that modify production data)

3. **TDD Workflow with Agent Mode**:
   - Start with a prompt like: "Implement a user authentication feature following TDD principles and the test-automation rule"
   - Cursor will write tests first, then implement the feature, running tests to verify at each step
   - Watch as Cursor incrementally improves the code until all tests pass

This approach is particularly effective because:

- It helps Cursor learn from test failures and fix issues incrementally
- The AI can see exactly what's wrong through test output
- It prevents large changes that might break multiple things at once
- It ensures functionality is properly tested from the start
- The test-driven approach guides Cursor toward maintainable, well-structured code

The combination of clear testing rules, TDD principles, and AutoRun mode creates a powerful development environment where Cursor can act as a true coding partner, suggesting improvements, fixing bugs, and implementing features in a methodical, test-verified manner.

### Unit Tests vs. Integration Tests in TDD

While the TDD approach works with any test type, it's generally more effective with unit tests due to their speed. Unit tests run quickly, providing immediate feedback that allows Cursor to iterate rapidly. Integration tests, while valuable, often run more slowly and can make your development workflow less efficient. 

However, if you have optimized integration tests that run quickly, they can also be effectively used in the TDD workflow. The key is test execution speed - faster feedback loops lead to more efficient development with Cursor AI.

## Task Management with Rules

Another powerful application of Cursor rules is managing tasks within your development workflow.

### Task-List Rules

Creating a dedicated rule for task management enables Cursor to understand and maintain your project's task list:

```markdown
---
name: task-list.mdc
description: Guidelines for creating and managing task lists in markdown files
globs: **/*.md
---

# Task List Management

## Task Format
- Use checkboxes for task items: `- [ ] Task description`
- Mark completed tasks: `- [x] Completed task`
- Group tasks by feature or component
- Include estimated complexity or time

## Task Workflow
- Update task status after completion
- Add new tasks as they are identified
- Split complex tasks into smaller subtasks
- Link tasks to related files or documentation when possible
```

### Task-List Integration with Development Workflow

The task-list rule becomes especially powerful when combined with other rules:

1. **Project Planning**: Use task lists to outline features, components, and acceptance criteria
2. **TDD Workflow**: Reference task items when implementing features with test automation
3. **Progress Tracking**: Have Cursor update task statuses as work progresses
4. **Integration Potential**: With an MCP (Model Context Protocol) server, this could potentially integrate with project management tools like Jira

For example, you could prompt Cursor with:

```
Based on the task-list rule, implement the "user authentication feature" task using the test-automation rule with TDD principles.
```

Cursor would then:
1. Locate the task in your task list
2. Create tests according to your test-automation rule
3. Implement the feature with TDD
4. Update the task status upon completion

The combination of task-list and test-automation rules creates an end-to-end development workflow that can take you almost all the way to completing features. While LLMs occasionally make mistakes that require correction, this setup has proven remarkably effective for streamlining development.

### Best Practices for Task Management with Cursor

To maintain control over your development process while leveraging Cursor's capabilities:

1. **Request task expansion**: Ask Cursor to expand tasks that lack sufficient detail
   ```
   Expand the "implement user authentication" task with more specific subtasks and acceptance criteria
   ```

2. **Require confirmation before updates**: Configure your task-list rule to have Cursor ask for confirmation before modifying task lists
   ```
   Update the task list based on our discussion, but show me the changes first for approval
   ```

3. **Maintain control over planning**: Always review and approve task changes before implementation begins
   ```
   Review these task changes and let me know if they look reasonable before proceeding
   ```

4. **Be flexible with approach changes**: Feel free to refine, modify, or completely change the approach that Cursor suggests
   ```
   I'd like to take a different approach for this feature. Let's modify the task list to...
   ```

This approach gives you control over the critical planning phase while still leveraging Cursor's ability to assist with implementation. By having Cursor check with you before making significant changes to the task list, you prevent potential misunderstandings that could lead to wasted development effort.

## Most Important Rule Types for Effective Workflow

Based on my experience, these are the most impactful types of rules for enhancing your development workflow with Cursor:

1. **Project Structure Rules** (`core-project-structure.mdc`): Help Cursor understand where to place files, how to name components, and how to organize code, ensuring consistent architecture.

2. **Test Strategy Rules** (`test-automation.mdc`, `unit-testing.mdc`): Define how tests should be written and executed, enabling Cursor to follow proper testing practices.

3. **Library-Specific Rules** (`tool-fastapi.mdc`, `fe-nextjs.mdc`): Provide guidance on correctly using specific frameworks and libraries in your stack.

4. **Code Quality Rules** (`core-code-quality.mdc`): Establish standards for function size, variable naming, and code organization.

   > **Note on Code Quality**: While quality rules are useful, integrating Cursor with automated linting tools is often more effective. Using agent mode to automatically fix linting and formatting errors provides immediate, consistent feedback. Tools like ESLint, Prettier, Black, Ruff, SonarQube, or CodeClimate can check for issues such as unused variables, improper error handling, security vulnerabilities, and code complexity. For example, running `npm run lint` or `black .` in agent mode allows Cursor to see and fix violations automatically. This approach is particularly powerful for enforcing style guides, detecting anti-patterns, finding potential bugs, and ensuring accessibility compliance - often more efficiently than detailed written rules.

5. **Task Management Rules** (`task-list.mdc`): Help Cursor understand and maintain your project's task list.

6. **Domain-Specific Rules** (`domain-url-shortener.mdc`): Capture knowledge specific to your application domain.

7. **API Design Rules** (`be-api-design.mdc`): Guide the creation of consistent and well-structured APIs.

8. **Form Handling Rules** (`form-api-patterns.mdc`): Standardize form implementation and validation.

Having these essential rule types in place provides Cursor with a comprehensive understanding of your project, allowing it to generate more appropriate, consistent code that aligns with your project's standards.

## Personal Experience with Cursor Rules

Through my experimentation with Cursor rules in the LinkByte project, I've identified several strengths and limitations that might be helpful for others looking to implement similar systems:

### What Worked Well

- **Frontend Pattern Enforcement**: The rules were extremely effective for frontend development, particularly when refactoring components to follow application patterns. I deliberately generated components externally with poor practices (multiple state variables, no form validation, direct API calls in submit handlers), then had Cursor refactor them using my rules that enforced Zod validation, React Hook Form, and Orval-generated API hooks. This approach almost eliminated the need for manual intervention when dealing with forms, API calls, and basic state management.

- **Backend Code Generation**: Cursor seamlessly wrote tests on the backend and could draft basic CRUD endpoints that followed all the enforced patterns. The combination of test-automation rules and FastAPI-specific rules resulted in consistent, well-structured API implementations.

- **Task-Driven Development**: Using task lists with test automation rules created an efficient workflow where Cursor could understand what needed to be built, write the tests, implement the feature, and update the task status - all with minimal intervention from me.

### What Needed Improvement

- **Excessive Comments**: Despite having rules specifying that comments should only be added when necessary, Cursor consistently tried to add comments at every step. While you can ask it to remove them, it was a recurring issue that required manual correction.

- **Occasional Hallucinations**: Sometimes Cursor would think it was following a rule but would hallucinate certain aspects - for example, importing Pydantic schemas that didn't exist. When this happens, you either need to make an intervention or, more effectively, rely on the TDD/test-automation approach where Cursor will write and run tests, see the failures, and automatically fix the issues.

- **Context Limitations**: With complex rules and larger codebases, Cursor would occasionally miss important context or apply rule concepts incorrectly. This improved significantly when using explicitly referenced files in the rule or providing direct links between tasks and implementation patterns.

These experiences highlight that while Cursor rules dramatically improve AI coding assistance, they work best when combined with a testing approach that provides clear feedback on correctness, and when users maintain oversight of the planning and design phases of development.

## About LinkByte

LinkByte is an experimental, incomplete demo application I created specifically to explore how Cursor AI interacts with well-defined rules. It's a simple URL shortener toy project built with Next.js and FastAPI that serves as a test bed for rule experimentation.

The project was intentionally created with minimal manual coding - instead, I used it to push the boundaries of what's possible with AI assistance guided by rules. This experimental approach helped me better understand how different rule structures and combinations affect Cursor's code generation capabilities.

While LinkByte itself is not production-ready by any means, the insights gained from this experiment are valuable for understanding how to effectively structure rules for your own projects. The rule organization patterns demonstrated here can be adapted to your specific needs, potentially transforming Cursor AI into a more effective coding assistant for your real-world applications.

