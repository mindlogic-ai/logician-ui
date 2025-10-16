# Storybook Documentation Patterns

Storybook 8.5 is used for interactive component documentation and development in the Logician UI design system.

## Configuration Overview

### File Structure
```
.storybook/
├── main.ts                    # Main Storybook configuration
├── preview.tsx               # Global decorators and parameters
├── getChakraArgTypes.ts      # Utility for Chakra prop controls
├── manager.ts                # UI customization
├── manager-head.html         # Custom head for manager UI
└── vite.config.ts           # Vite-specific config
```

### Key Configuration Points

**main.ts:**
- Stories location: `src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)` and `src/theme/*.stories.@(js|jsx|ts|tsx|mdx)`
- Framework: Vite + React
- Autodocs enabled for all stories
- Path alias `@` configured to point to `src/`
- SVGR plugin for SVG-as-component support

**preview.tsx:**
- Global `LogicianProvider` wrapper (Chakra UI provider)
- Story sorting: Setup → Theme → Components → Chat → *
- Alphabetical sorting within categories
- Can disable provider per story with `parameters: { disableLogicianProvider: true }`

## Creating Story Files

### File Location
Place stories next to components:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.stories.tsx  ← Story file here
└── index.tsx
```

### Basic Story Template

```tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ComponentName } from './ComponentName';
import { ComponentNameProps } from './ComponentName.types';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',  // Categorize under Components
  component: ComponentName,
  args: {
    // Default args for all stories
    children: 'Default content',
  },
  argTypes: {
    // Control definitions (see below)
  },
};

export default meta;

type Story = StoryFn<typeof ComponentName>;

export const Basic: Story = (args) => <ComponentName {...args} />;
```

### Story with State Management

For components requiring controlled state (inputs, forms):

```tsx
import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
};

export default meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Basic: StoryFn<InputProps> = Template.bind({});
Basic.args = {};

export const WithPlaceholder: StoryFn<InputProps> = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Enter text...',
};
```

### Multiple Variants Story

Show all variants of a component:

```tsx
export const AllVariants: Story = (args) => {
  const variants = ['primary', 'secondary', 'tertiary', 'danger'] as const;

  return (
    <Box>
      {variants.map((variant) => (
        <div key={variant}>
          <p>{variant}</p>
          <Button {...args} variant={variant} />
        </div>
      ))}
    </Box>
  );
};
```

## ArgTypes Configuration

### Common Control Types

```tsx
argTypes: {
  // Text input
  placeholder: {
    control: 'text'
  },

  // Select dropdown
  variant: {
    control: {
      type: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },

  // Boolean toggle
  isDisabled: {
    control: 'boolean'
  },

  // Number input
  maxLength: {
    control: 'number'
  },

  // Color picker
  color: {
    control: 'color'
  },

  // Radio buttons
  size: {
    control: {
      type: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },

  // Object input
  style: {
    control: 'object',
  },
}
```

### Advanced ArgTypes

```tsx
argTypes: {
  variant: {
    control: {
      type: 'select',
      options: ['primary', 'secondary'],
    },
    description: 'The visual variant of the button',
    table: {
      defaultValue: { summary: 'secondary' },
      type: { summary: 'ButtonVariant' },
    },
  },

  // Disable control for certain props
  children: {
    control: false,  // No control in Storybook UI
  },

  // Function props
  onClick: {
    action: 'clicked',  // Shows in Actions panel
  },
}
```

## Story Naming Conventions

### Title Structure
```tsx
title: 'Category/SubCategory/ComponentName'
```

**Categories in use:**
- `Setup` - Getting started guides
- `Theme` - Color palette, typography
- `Components` - UI components
  - `Components/Button`
  - `Components/Input`
  - `Components/Form/Input`
- `Chat` - Chat-specific components

### Story Export Names

Use descriptive PascalCase names:

```tsx
// ✅ Good
export const Basic: Story = ...
export const WithIcon: Story = ...
export const AllVariants: Story = ...
export const Disabled: Story = ...
export const ErrorState: Story = ...

// ❌ Avoid
export const story1: Story = ...
export const test: Story = ...
```

## Using Chakra ArgTypes Helper

Use `getChakraArgTypes` to expose common Chakra props:

```tsx
import { getChakraArgTypes } from '../../.storybook/getChakraArgTypes';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    ...getChakraArgTypes({ exclude: ['width', 'height'] }),
    icon: {
      control: 'text',
      description: 'Icon name from react-icons',
    },
  },
};
```

**Exposed Chakra props:**
- `color`
- `boxSize` (with select control: xs, sm, md, lg, xl)
- `width`
- `height`
- `fontSize`

## Story Args Pattern

### Basic Args
```tsx
Basic.args = {
  variant: 'primary',
  children: 'Click me',
};
```

### Complex Args
```tsx
WithIcon.args = {
  placeholder: 'Search...',
  leftIcon: <Icon icon="IoSearch" />,
  size: 'md',
  isDisabled: false,
};
```

## Global Decorators

All stories are wrapped in `LogicianProvider` (Chakra UI provider) by default.

### Disable Provider for Specific Story

```tsx
export const WithoutProvider: Story = (args) => <Component {...args} />;

WithoutProvider.parameters = {
  disableLogicianProvider: true,
};
```

## Story Parameters

### Story-specific Parameters

```tsx
export const DarkBackground: Story = (args) => <Component {...args} />;

DarkBackground.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
```

### Common Parameters

```tsx
parameters: {
  // Layout
  layout: 'centered',  // 'centered' | 'fullscreen' | 'padded'

  // Backgrounds
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#333333' },
    ],
  },

  // Docs
  docs: {
    description: {
      story: 'This story demonstrates...',
    },
  },
}
```

## Best Practices

### 1. Provide Meaningful Examples

```tsx
// ✅ Good - shows realistic use case
export const SearchInput: Story = Template.bind({});
SearchInput.args = {
  placeholder: 'Search products...',
  leftIcon: <Icon icon="IoSearch" />,
  size: 'md',
};

// ❌ Poor - generic, unhelpful
export const Example1: Story = Template.bind({});
Example1.args = {
  placeholder: 'text',
};
```

### 2. Cover All Variants

Create stories for:
- Basic/default state
- All variants (primary, secondary, etc.)
- Interactive states (disabled, error, loading)
- With icons/decorations
- Size variations
- Edge cases (long text, empty state)

### 3. Document Complex Props

```tsx
argTypes: {
  customProp: {
    control: 'text',
    description: 'Controls the XYZ behavior. Use "auto" for automatic sizing.',
    table: {
      defaultValue: { summary: 'auto' },
      type: { summary: 'string | number' },
    },
  },
}
```

### 4. Use Actions

For callback props:
```tsx
argTypes: {
  onClick: { action: 'clicked' },
  onChange: { action: 'changed' },
  onSubmit: { action: 'submitted' },
}
```

### 5. Organize Related Stories

Group related stories together:
```tsx
export const Sizes: Story = () => (
  <Stack spacing={4}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </Stack>
);
```

## Interactive Examples

### Form Component Example

```tsx
export const FormExample: Story = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  return (
    <Stack spacing={4}>
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Text>Name: {formData.name}</Text>
      <Text>Email: {formData.email}</Text>
    </Stack>
  );
};
```

### Component with Hooks Example

```tsx
export const WithTimer: Story = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return <Badge>Count: {count}</Badge>;
};
```

## MDX Documentation (Optional)

For complex components, create `.mdx` files:

```mdx
import { Meta, Canvas, Story } from '@storybook/addon-docs';
import { Button } from './Button';

<Meta title="Components/Button" component={Button} />

# Button Component

Buttons are used for...

<Canvas>
  <Story name="Primary">
    <Button variant="primary">Click me</Button>
  </Story>
</Canvas>
```

## Running Storybook

```bash
# Development mode
yarn storybook

# Build for deployment
yarn build-storybook
```

Storybook will be available at http://localhost:6006

## Troubleshooting

### Path Alias Issues
If `@/` imports don't work, check `.storybook/main.ts`:
```ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
}
```

### Provider Issues
If Chakra components don't render correctly, ensure `LogicianProvider` is wrapping the story (check `preview.tsx`).

### SVG Import Issues
SVGs should be imported as components. If not working, check SVGR plugin in `main.ts`.

## Common Patterns

### Showcase All Props
```tsx
export const AllProps: Story = () => (
  <SimpleGrid columns={2} spacing={4}>
    <div>
      <Text fontWeight="bold">Default</Text>
      <Button>Button</Button>
    </div>
    <div>
      <Text fontWeight="bold">Disabled</Text>
      <Button isDisabled>Button</Button>
    </div>
    <div>
      <Text fontWeight="bold">Loading</Text>
      <Button isLoading>Button</Button>
    </div>
    <div>
      <Text fontWeight="bold">With Icon</Text>
      <Button leftIcon={<Icon icon="IoAdd" />}>Button</Button>
    </div>
  </SimpleGrid>
);
```

### Responsive Component
```tsx
export const Responsive: Story = () => (
  <Button size={{ base: 'sm', md: 'md', lg: 'lg' }}>
    Responsive Button
  </Button>
);
```
