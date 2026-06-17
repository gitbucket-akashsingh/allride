## The Effort settings

The Effort settings (Low, Medium, High, Max) control the AI’s internal reasoning budget—essentially telling the model how hard it needs to think and how many steps to explore before giving you a final answer.

### When to Use Each Level1.

#### 1. Low Effort (Speed & Economy First)

- What it does:
  - Minimizes or entirely skips internal thinking to prioritize an instant response and save tokens.
- When to use it:
  - Simple scripting tasks (e.g., "Rename these files," "Write a basic CSS class").
  - Formatting text, translating clean data, or generating boilerplates.
  - When you are building high-volume automation sub-agents where cost accumulation is a risk.

#### 2. Medium Effort (The Balanced Default)

- What it does:
  - Grants a moderate reasoning budget.
  - The AI will think through a few logical steps but won't wander down long rabbit holes.
- When to use it:
  - Routine everyday coding, single-file bug fixes, and writing unit tests.
  - General explanations of code or summarizing a pull request.
  - Note: This is the standard, balanced default setting for daily development.

#### 3. High Effort (Complex Problem Solving)

- What it does:
  - Allows the model to deeply evaluate alternative paths, execute multi-step planning, and proactively catch edge cases before typing a single line of response.
- When to use it:
  - Multi-file refactoring where changing code in one file impacts another.
  - Tricky debugging sessions where an error message doesn't make logical sense.
  - Integrating an entirely new framework or library into your existing codebase.

#### 4. Max Effort (Deepest Autonomous Reasoning)

- What it does:
  - Completely removes the token spending ceiling.
  - The AI is instructed to exhaustively test its assumptions, run complex logic checks, and take as long as it needs to verify absolute accuracy.
- When to use it:
  - High-stakes system architecture decisions where a mistake would be incredibly costly to fix later.
  - Security reviews, cryptographic functions, or auditing highly sensitive financial/payment logic.
  - Algorithmic bottlenecks or mysterious memory leaks that require extreme mathematical accuracy.

## Execution Type Setting

### 1. Ask Mode (Read-Only Explainer)

- What it does:
  - It acts strictly as a read-only assistant.
  - It scans your codebase and files to find answers but is not allowed to change or create any files.
- When to use it:
  - When you want to understand how a complex, messy piece of legacy code works.
  - When asking general conceptual questions (e.g., "How do I implement JWT auth in NestJS?").
  - To find where a specific function or variable is defined in a massive codebase without manually searching.

### 2. Plan Mode (The Architect)

- What it does:
  - It halts immediate execution.
  - When you describe a big task, Plan Mode researches your repository, asks you clarifying follow-up questions, and drafts a detailed step-by-step technical plan as a Markdown file.
  - It waits for your approval before writing a single line of actual code.
- When to use it:
  - Building a massive new feature from scratch (e.g., "Add a completely new billing and subscription page").
  - Substantial architecture refactoring across multiple folders and files.
  - Official Rule of Thumb: The official Cursor documentation recommends Planning first, then handing it to the Agent to build.

### 3. Agent Mode (The Builder / Doer)

- What it does:
  - This is Cursor's most proactive mode.
  - The AI operates semi-autonomously—it searches files, writes and directly applies code edits to your local files, runs terminal commands, and loops until the feature is completed.
- When to use it:
  - Small to medium feature additions where you know exactly what you want.
  - Repetitive tasks (e.g., "Write comprehensive unit tests for these 5 files").
  - Executing the tasks outlined by a step-by-step checklist you built in Plan Mode.

### 4. Debug Mode (The Detective)

- What it does:
  - Instead of blindly rewriting scripts, Debug Mode temporarily instruments your local environment.
  - It handles tricky bugs by actively reading your runtime terminal logs and stack traces as you reproduce the crash, allowing it to pinpoint the root cause.
- When to use it:
  - Silent bugs where code compiles fine but returns the wrong UI output.
  - Cryptic error messages or broken environment pipelines.Production vs. Local mismatch failures.

### 5. Multitask Mode (The Parallel Operator)

- What it does:
  - This activates parallel execution.
  - Instead of waiting for one file change to finish before submitting another instruction, Multitask Mode spins up multiple separate background processes to process queued modifications simultaneously without conflicts.
- When to use it:
  - Heavy visual design iterations (e.g., "Reduce header padding, change all button borders, and update icon sizes" all at once).
  - Bulk refactoring across unrelated code microservices where tasks do not overlap.
