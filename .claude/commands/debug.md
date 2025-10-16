---
allowed-tools: Task
description: Get debugging guidance through systematic problem-solving consultation
argument-hint: <bug description or symptom>
---

Launch the debugging consultant to help you systematically diagnose and fix issues.

## Usage

```bash
# Describe the bug or symptom
/debug "Chatbot list is empty but API returns data"

# Or describe unexpected behavior
/debug "File upload works in dev but fails in production"

# Or ask about errors
/debug "Getting 'Cannot read property map of null' error"

# Or performance issues
/debug "Page is slow to load with many chatbots"
```

## What the Agent Does

The **debug-consultant** will help you through:

1. **Understand the Problem**
   - Asks about symptoms, timing, reproduction steps
   - Identifies what changed recently
   - Clarifies expected vs actual behavior

2. **Gather Evidence**
   - Checks TypeScript/ESLint diagnostics
   - Reviews recent git changes
   - Analyzes console errors and network requests
   - Finds related code with Grep

3. **Form Hypotheses**
   - Presents 2-4 possible causes based on evidence
   - Provides specific diagnostic steps for each
   - Explains what to expect if hypothesis is true

4. **Test Systematically**
   - Guides through testing each hypothesis
   - Narrows down based on results
   - Teaches debugging techniques along the way

5. **Identify Root Cause**
   - Eliminates possibilities systematically
   - Explains the "why" behind the bug
   - Suggests fix with context

## Process

The command will:
1. Take your bug description from $ARGUMENTS
2. Launch the debug-consultant agent with Task tool
3. Agent asks diagnostic questions
4. Agent gathers evidence (diagnostics, logs, diffs)
5. Agent forms and tests hypotheses
6. Agent guides you to root cause and fix

**Note**: The agent teaches you to debug, it doesn't debug for you. You learn the process!

## Examples

### Example 1: Runtime Error
```bash
/debug "TypeError: Cannot read property 'map' of undefined in ChatbotList"
```

Agent will ask:
- Where does this error appear? (which page/component)
- Is data fetched from API?
- What's in the Network tab?
- Can you show the code around the .map() call?

Then forms hypotheses:
- API returns null instead of array
- State not initialized properly
- Race condition with async load

### Example 2: UI Not Updating
```bash
/debug "Deleting a chatbot doesn't update the list"
```

Agent will ask:
- Does the API call succeed? (Network tab)
- Any console errors?
- Is state updating? (React DevTools)
- Does refresh show the change?

Then tests:
- State management issue
- Optimistic update bug
- Cache not invalidating

### Example 3: Performance Issue
```bash
/debug "App gets slow after using chat for a while"
```

Agent will ask:
- How long until it slows? (minutes, hours)
- Does refresh fix it?
- Any console warnings about memory?
- Does it happen with all chatbots?

Then investigates:
- Memory leak (missing cleanup)
- Event listeners not removed
- SSE connections not being closed
- Re-render loops

### Example 4: Environment-Specific
```bash
/debug "File upload works locally but not on staging"
```

Agent will ask:
- Same browser/environment locally and staging?
- Any CORS errors in console?
- Different file size/type?
- Environment variables different?

Then checks:
- Environment config differences
- API endpoint differences
- CORS settings
- File size limits

### Example 5: Race Condition
```bash
/debug "Sometimes chatbot settings don't save, but usually they do"
```

Agent will ask:
- Is there a pattern? (fast clicks, slow network)
- Multiple async operations happening?
- Any component unmount during save?
- Console warnings about setState?

Then investigates:
- Concurrent saves conflicting
- Component unmounting mid-operation
- State closure capturing old value
- Missing dependency in useEffect

## Debugging Techniques Taught

The agent teaches you:
- **Binary search debugging** - Comment out half, narrow down
- **Rubber duck debugging** - Explain code line by line
- **Comparative debugging** - Compare working vs broken
- **Time-travel debugging** - Use git history to find when it broke
- **Systematic elimination** - Rule out possibilities one by one
- **Evidence-based diagnosis** - Form testable hypotheses from data

## Bug Categories Covered

- Race conditions & async issues
- State management bugs
- Integration & data flow problems
- TypeScript type mismatches
- Performance bottlenecks
- Memory leaks
- Environment-specific issues
- Edge cases & boundary conditions
