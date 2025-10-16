---
allowed-tools: Bash(git*), Bash(gh*)
argument-hint: "title" [description]
description: Full Git workflow: create branch, commit changes, and create PR targeting dev
---

Execute the complete Git workflow as defined in CLAUDE.md, including branch creation, committing changes, and creating a pull request targeting the `dev` branch.

**Arguments:**
- `$1`: PR title (required) - will also be used for commit message
- `$2`: PR description (optional)

## Git Workflow Implementation

### Branch Naming Convention
- **feat/**: New features (e.g., `feat/user-authentication`, `feat/chat-improvements`)
- **fix/**: Bug fixes (e.g., `fix/login-error`, `fix/database-connection`)
- **minor/**: Minor improvements, refactoring, documentation (e.g., `minor/code-cleanup`, `minor/update-docs`)
- **hotfix/**: Critical production fixes only (exceptional use)

### Standard Workflow (ALWAYS targets 'dev' branch)
1. `git checkout dev`
2. `git pull origin dev`
3. `git checkout -b feat/your-feature-name` (or fix/, minor/)
4. Make your changes...
5. `git add .`
6. `git commit -m "your commit message"`
7. `git push -u origin feat/your-feature-name`
8. `gh pr create --base dev --title "feat: your feature title" --body "description"` (explicitly target dev)

### Hotfix Workflow (Exceptional - Production Critical Only)
1. `git checkout master`
2. `git pull origin master`
3. `git checkout -b hotfix/critical-fix-name`
4. Make your changes...
5. `git add .`
6. `git commit -m "hotfix: critical fix description"`
7. `git push -u origin hotfix/critical-fix-name`
8. `gh pr create --base master --title "hotfix: critical fix title" --body "description"`

## Process:
1. **Detect current state**: Check if we're starting fresh or have existing changes
2. **Branch management**: Create new branch if needed, following naming conventions
3. **Commit changes**: Stage and commit all changes with proper message format
4. **Push and PR**: Push branch and create PR targeting correct base branch
5. **Safety checks**: Validate branch names, check for conflicts, ensure proper targeting

**Key Safety Features:**
- Automatically determines if this should be a hotfix (targets master) or standard (targets dev)
  - **Hotfix detection**: Branch name starts with `hotfix/` → targets `master`
  - **Standard workflow**: All other branches (`feat/`, `fix/`, `minor/`) → targets `dev`
- **ALWAYS uses --base dev for standard workflow, --base master only for hotfixes**
- Validates branch naming conventions
- Prevents accidental master targeting for non-hotfix changes
- Shows git status and recent commits for context
- Prompts for branch name if not following conventions

**Usage Examples:**
- `/create-pr "fix: Add retry logic for Mistral API 503 errors"`
- `/create-pr "feat: Add user authentication system" "Implements OAuth2 with JWT tokens"`
- `/create-pr "hotfix: Fix critical database connection leak" "Emergency fix for production issue"`