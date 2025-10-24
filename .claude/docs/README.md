# Logician UI Documentation

User-facing documentation for consuming applications. These files provide comprehensive guides for developers using Logician UI in their projects.

## Installation

Copy these docs to your project using the included script:

```bash
npx @mindlogic-ai/logician-ui copy-lui-docs
```

This will copy all documentation files to `.claude/logician-ui/` in your project.

## Documentation Files

### [getting-started.md](./getting-started.md)
Installation, setup, and your first component. Covers:
- Installation with npm/yarn
- Setting up LogicianProvider
- Framework-specific setup (Next.js, Vite, CRA)
- Basic usage examples
- Common issues and troubleshooting

### [components.md](./components.md)
Complete component reference with examples. Organized by category:
- Core Components (Button, Card, Badge, etc.)
- Form Components (Input, Select, Checkbox, etc.)
- Navigation (Breadcrumb, Tabs, Pagination, etc.)
- Feedback (Alert, Modal, Toast, etc.)
- Data Display (Table, Code, Markdown, etc.)
- Icons, Layout, Charts

### [theming.md](./theming.md)
Customize colors, typography, spacing, and more:
- Theme customization basics
- Color system and semantic tokens
- Typography and font sizes
- Border radius and spacing
- Component style overrides
- Dark mode support
- Accessing theme values in code

### [icons.md](./icons.md)
Complete icon library reference:
- 100+ icons from react-icons
- Custom SVG icons
- Icon sizes and colors
- IconButton usage
- TypeScript support
- Common patterns and best practices

### [accessibility.md](./accessibility.md)
WCAG 2.1 compliance and best practices:
- Keyboard navigation patterns
- Screen reader support
- Focus management
- Color contrast guidelines
- Form accessibility
- Component-specific patterns
- Testing accessibility

### [integration.md](./integration.md)
Framework-specific integration guides:
- Next.js (App Router & Pages Router)
- Vite
- Create React App
- Remix
- TypeScript configuration
- Form libraries (React Hook Form, Formik)
- State management
- SSR considerations

## Using with Claude Code

To make these docs available to Claude Code in your project, reference them in your `.claude/claude.md`:

```markdown
# Project Documentation

## Logician UI

This project uses Logician UI as the component library. See the following guides:

- [Getting Started](./.claude/logician-ui/getting-started.md)
- [Component Reference](./.claude/logician-ui/components.md)
- [Theming Guide](./.claude/logician-ui/theming.md)
- [Icon Library](./.claude/logician-ui/icons.md)
- [Accessibility](./.claude/logician-ui/accessibility.md)
- [Integration](./.claude/logician-ui/integration.md)
```

This allows Claude Code to reference the documentation when helping with your project.

## Contributing

Found an issue or want to suggest an improvement? Please open an issue at:
https://github.com/mindlogic-ai/logician-ui/issues

## Links

- **NPM Package**: [@mindlogic-ai/logician-ui](https://www.npmjs.com/package/@mindlogic-ai/logician-ui)
- **Storybook**: [View live examples](https://mindlogic-storybook.vercel.app)
- **GitHub**: [Repository](https://github.com/mindlogic-ai/logician-ui)
