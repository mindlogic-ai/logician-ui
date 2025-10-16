---
allowed-tools: Task
description: Get feature architecture guidance through interactive consultation
argument-hint: <feature or technical problem>
---

Launch the feature architecture consultant to help you think through technical design decisions.

## Usage

```bash
# Describe the feature you want to build
/architect "Add real-time collaboration for chatbot editing"

# Or ask about technical decisions
/architect "How should I structure the state for this feature?"

# Or get help with architecture
/architect "Need to refactor the file upload system for better performance"
```

## What the Agent Does

The **feature-architect** will help you through:

1. **Understand Requirements**
   - Asks about the feature, users, data flow
   - Clarifies scope (MVP vs full vision)
   - Identifies constraints and scale concerns

2. **Map Existing Architecture**
   - Checks for similar features in codebase
   - Reviews current patterns and conventions
   - Identifies what can be reused

3. **Present Architectural Options**
   - Shows 2-3 approaches with trade-offs
   - Covers component structure, state, API design
   - Explains scalability and maintenance implications

4. **Dive into Technical Details**
   - Component hierarchy and composition
   - State management strategy (Zustand, Context, local)
   - API integration patterns
   - Data fetching and caching
   - Error handling and edge cases
   - Testing and performance strategy

## Process

The command will:
1. Take your feature description from $ARGUMENTS
2. Launch the feature-architect agent with Task tool
3. Agent asks questions to understand requirements
4. Agent analyzes existing codebase patterns
5. Agent presents architectural options
6. Agent helps you finalize technical design

**Note**: The agent guides architecture, it doesn't design for you. You make the key decisions!

## Examples

### Example 1: New Feature
```bash
/architect "Users can share chatbots with team members and set permissions"
```

Agent will ask:
- What permissions? (view, edit, admin)
- How are they shared? (invite, link, automatic)
- Where's the data stored? (new table, extend existing)
- Real-time updates needed?

Then presents architecture options for state, API, components.

### Example 2: Technical Decision
```bash
/architect "Should this state be in Zustand or Context?"
```

Agent will ask:
- What data needs to be stored?
- Used across multiple pages or just one section?
- Does it need persistence?
- How often does it change?

Then presents:
- Option A: Zustand (global, persisted)
- Option B: Context (scoped, ephemeral)
- Option C: Local state (component-only)

### Example 3: Refactoring
```bash
/architect "The chat system has performance issues with large message lists"
```

Agent will ask:
- How many messages? (hundreds, thousands)
- What's slow? (render, scroll, search)
- Are messages paginated?
- Real-time updates involved?

Then presents optimization strategies:
- Virtual scrolling
- Message pagination
- Lazy loading
- Memoization patterns

### Example 4: Integration
```bash
/architect "Need to integrate third-party video call API"
```

Agent will ask:
- Which API? (what capabilities)
- Where in the app? (chat, dedicated page)
- Authentication needed?
- How to handle errors/failures?

Then presents integration patterns and component structure.
