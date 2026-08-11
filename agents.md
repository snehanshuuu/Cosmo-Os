# AI Agent Workflow

This project follows a milestone-based autonomous development workflow.

Before starting any task, always read:

- `PRD.md`
- `Design.md`
- `Milestones.md`
- `Memory.md`

Each document has a single responsibility:

| Document | Responsibility |
|----------|----------------|
| PRD.md | Product requirements, functionality and acceptance criteria |
| Design.md | UI, UX, design system and interaction patterns |
| Milestones.md | Development roadmap and milestone order |
| Memory.md | Current project progress |

The objective is to complete one milestone at a time with the fewest possible iterations while maintaining production-quality code and minimizing token consumption.

---

# Global Rules

- Complete milestones sequentially.
- Never work on multiple milestones simultaneously.
- Never implement future milestones.
- Reuse existing components whenever possible.
- Never duplicate logic.
- Maintain strict TypeScript.
- Produce production-ready implementations.
- Never introduce placeholder code.
- Never refactor unrelated code.
- Preserve existing functionality.
- Stop immediately after the active milestone is complete.
- Builder never reviews its own implementation.
- Reviewer only reviews completed milestones.
- Memory Manager only updates project progress.

---

# Documentation Priority

Use each document only for its intended purpose.

- **PRD.md** → Functional requirements
- **Design.md** → Visual design, layout, animations and interactions
- **Milestones.md** → Implementation order
- **Memory.md** → Current project state

For any UI, UX, animation, spacing, typography, color, layout or interaction decision, **Design.md is the single source of truth**.

For any feature or functionality, **PRD.md is the single source of truth**.

---

# Agent 1 — Builder

## Objective

Implement the current active milestone.

## Workflow

### Step 1

Read:

- `PRD.md`
- `Design.md`
- `Milestones.md`
- `Memory.md`

### Step 2

Determine the active milestone from `Memory.md`.

### Step 3

Implement ONLY the active milestone.

Do not begin future milestones.

### Step 4

During implementation:

- Follow all functional requirements from `PRD.md`.
- Follow all UI and interaction guidelines from `Design.md`.
- Reuse the existing architecture.
- Keep components modular and reusable.
- Preserve existing functionality.
- Avoid unnecessary changes outside the active milestone.

### Step 5

Before declaring completion verify:

- PRD compliance
- Design compliance
- No TypeScript errors
- No build errors
- No duplicate logic
- Responsive behaviour preserved
- Existing functionality still works

### Step 6

When the milestone is fully complete, return only:

```
MILESTONE_COMPLETE
```

Do not perform any review.

---

# Agent 2 — Reviewer

## Objective

Review ONLY completed milestones.

Runs only after Builder returns:

```
MILESTONE_COMPLETE
```

## Workflow

Read:

- `PRD.md`
- `Design.md`
- `Milestones.md`
- `Memory.md`

Determine the active milestone.

Review ONLY that milestone.

---

## Functional Review

Verify:

- Functional requirements
- Acceptance criteria
- Missing functionality
- Incorrect implementation
- Functional bugs
- PRD compliance

---

## Design Review

Verify:

- Layout
- Typography
- Colors
- Glassmorphism
- Components
- Animations
- Responsive behaviour
- Interaction patterns

All visual elements must follow `Design.md`.

---

## Technical Review

Verify:

- TypeScript errors
- Build errors
- Accessibility
- Performance
- Duplicate logic
- Component consistency

---

Do NOT:

- Refactor code
- Suggest optional improvements
- Review future milestones

---

If issues exist:

Overwrite `Review.md`.

Format:

```md
## Critical

...

## Major

...

## Minor

...
```

If no issues exist:

Write exactly:

```
PASS
```

---

# Agent 3 — Memory Manager

Runs only after Reviewer finishes.

## Workflow

Read:

- `Memory.md`
- `Review.md`
- `Milestones.md`

If `Review.md` contains:

```
PASS
```

Update `Memory.md`.

Format:

```md
Completed

- Milestone X

Current

- Milestone X+1

Status

IN_PROGRESS
```

If the final milestone has passed:

```md
Completed

- All Milestones

Current

- None

Status

PROJECT_COMPLETE
```

If `Review.md` contains issues:

Do not modify `Memory.md`.

---

# Workflow

```
Builder
    │
    ▼
Implement Current Milestone
    │
    ▼
MILESTONE_COMPLETE
    │
    ▼
Reviewer
    │
    ▼
PASS?
 ┌──┴────────────┐
 │               │
No              Yes
 │               │
 ▼               ▼
Builder      Memory Manager
 │               │
 └───────────────┘
        │
        ▼
Next Milestone
        │
        ▼
Repeat until

PROJECT_COMPLETE
```

---

# Success Criteria

The project is complete only when:

- Every milestone is completed.
- Every milestone passes review.
- `Memory.md` reports `PROJECT_COMPLETE`.
- No TypeScript errors remain.
- No build errors remain.
- Every feature satisfies `PRD.md`.
- Every visual element satisfies `Design.md`.
- The application is production-ready.