# Component Reference

Complete reference for all Logician UI components, organized by category. All components are built on Chakra UI and support its full prop system.

## Table of Contents

- [Core Components](#core-components)
- [Form Components](#form-components)
- [Navigation Components](#navigation-components)
- [Feedback Components](#feedback-components)
- [Data Display Components](#data-display-components)
- [Layout Components](#layout-components)
- [Icon Components](#icon-components)
- [File Components](#file-components)
- [Chart Components](#chart-components)

---

## Core Components

### Accordion

Expandable/collapsible content sections.

```tsx
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@mindlogic-ai/logician-ui';

<Accordion>
  <AccordionItem>
    <AccordionButton>Section 1</AccordionButton>
    <AccordionPanel>Content for section 1</AccordionPanel>
  </AccordionItem>
</Accordion>
```

### Alert

Display feedback messages to users.

```tsx
import { Alert } from '@mindlogic-ai/logician-ui';

<Alert status="success">Operation completed successfully</Alert>
<Alert status="error">Something went wrong</Alert>
<Alert status="warning">Please review your input</Alert>
<Alert status="info">New features available</Alert>
```

### Avatar

Display user profile images or initials.

```tsx
import { Avatar } from '@mindlogic-ai/logician-ui';

<Avatar name="John Doe" src="/path/to/image.jpg" />
<Avatar name="Jane Smith" size="lg" />
```

### Badge

Highlight status or categorize items.

```tsx
import { Badge } from '@mindlogic-ai/logician-ui';

<Badge colorScheme="blue">New</Badge>
<Badge colorScheme="green">Active</Badge>
<Badge colorScheme="red">Urgent</Badge>
```

### Banner

Display prominent messages or announcements.

```tsx
import { Banner } from '@mindlogic-ai/logician-ui';

<Banner
  title="System Maintenance"
  description="Scheduled maintenance on Sunday"
  status="warning"
/>
```

**Props:**
- `size`: `'sm' | 'md' | 'lg'`
- `status`: `'info' | 'warning' | 'success' | 'error'`

### Button

Trigger actions and events.

```tsx
import { Button } from '@mindlogic-ai/logician-ui';

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="tertiary">Tertiary Action</Button>
<Button variant="ghost">Ghost Button</Button>
<Button isDisabled>Disabled</Button>
<Button isLoading>Loading...</Button>
```

**Variants:**
- `primary` - Main call-to-action (blue background)
- `secondary` - Default button (white background, gray border)
- `tertiary` - Low emphasis (no border, gray text)
- `ghost` - Minimal styling

**Sizes:** `xs`, `sm`, `md`, `lg`

### Card

Container for grouped content.

```tsx
import { Card } from '@mindlogic-ai/logician-ui';

<Card padding={6} borderRadius="lg">
  <H3>Card Title</H3>
  <Text>Card content goes here</Text>
</Card>
```

### Carousel

Display images or content in a slideshow.

```tsx
import { Carousel } from '@mindlogic-ai/logician-ui';

<Carousel images={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />
```

### CarouselModal

Fullscreen modal carousel viewer.

```tsx
import { CarouselModal } from '@mindlogic-ai/logician-ui';

<CarouselModal
  isOpen={isOpen}
  onClose={onClose}
  images={imageUrls}
  initialIndex={0}
/>
```

### Chip

Compact elements for tags, filters, or selections.

```tsx
import { Chip } from '@mindlogic-ai/logician-ui';

<Chip label="React" onRemove={() => handleRemove('react')} />
<Chip label="TypeScript" />
```

### ChipButton

Interactive chip that acts as a button.

```tsx
import { ChipButton } from '@mindlogic-ai/logician-ui';

<ChipButton onClick={() => console.log('clicked')}>
  Click me
</ChipButton>
```

### Container

Constrain content width for better readability.

```tsx
import { Container } from '@mindlogic-ai/logician-ui';

<Container maxW="container.xl">
  <YourContent />
</Container>
```

### Tag

Label or categorize content.

```tsx
import { Tag } from '@mindlogic-ai/logician-ui';

<Tag colorScheme="blue">Technology</Tag>
<Tag colorScheme="green">Environment</Tag>
```

---

## Form Components

### AutowidthInput

Input that automatically adjusts its width based on content.

```tsx
import { AutowidthInput } from '@mindlogic-ai/logician-ui';

<AutowidthInput placeholder="Auto-sizing input" />
```

### Checkbox

Select multiple options.

```tsx
import { Checkbox } from '@mindlogic-ai/logician-ui';

<Checkbox defaultChecked>I agree to the terms</Checkbox>
<Checkbox isDisabled>Disabled option</Checkbox>
```

### DatePicker

Select dates with a calendar interface.

```tsx
import { DatePicker } from '@mindlogic-ai/logician-ui';

<DatePicker
  selectedDate={date}
  onDateChange={(newDate) => setDate(newDate)}
/>
```

**Features:**
- Calendar popup
- Date range selection
- Keyboard navigation
- Localization support

### FileInput

Upload files with drag-and-drop support.

```tsx
import { FileInput } from '@mindlogic-ai/logician-ui';

<FileInput
  accept="image/*"
  onFileSelect={(files) => handleFiles(files)}
  multiple
/>
```

### FormControl & FormLabel

Structure form fields with labels and validation.

```tsx
import { FormControl, FormLabel, Input } from '@mindlogic-ai/logician-ui';

<FormControl isRequired isInvalid={hasError}>
  <FormLabel>Email Address</FormLabel>
  <Input type="email" />
</FormControl>
```

### GuideCue

Provide contextual help or guidance.

```tsx
import { GuideCue } from '@mindlogic-ai/logician-ui';

<GuideCue>
  Enter your email address to receive notifications
</GuideCue>
```

### Input

Text input field.

```tsx
import { Input } from '@mindlogic-ai/logician-ui';

<Input placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input isInvalid errorBorderColor="danger.main" />
<Input isReadOnly value="Read-only value" />
```

**Props:**
- `focusBorderColor` - Border color on focus (default: `primary.main`)
- `errorBorderColor` - Border color when invalid (default: `danger.main`)
- `isInvalid` - Show error state
- `isReadOnly` - Make input read-only
- `isDisabled` - Disable input

### MonthPicker

Select month and year.

```tsx
import { MonthPicker } from '@mindlogic-ai/logician-ui';

<MonthPicker
  selectedMonth={month}
  onMonthChange={(newMonth) => setMonth(newMonth)}
/>
```

### PasswordInput

Input field for passwords with show/hide toggle.

```tsx
import { PasswordInput } from '@mindlogic-ai/logician-ui';

<PasswordInput placeholder="Enter password" />
```

**Features:**
- Show/hide password toggle
- Eye icon button
- Secure input masking

### PinInput

Enter PIN codes or verification codes.

```tsx
import { PinInput } from '@mindlogic-ai/logician-ui';

<PinInput length={6} onComplete={(pin) => verifyPin(pin)} />
```

### Radio

Select a single option from multiple choices.

```tsx
import { Radio, RadioGroup, Stack } from '@mindlogic-ai/logician-ui';

<RadioGroup value={value} onChange={setValue}>
  <Stack direction="column">
    <Radio value="1">Option 1</Radio>
    <Radio value="2">Option 2</Radio>
    <Radio value="3">Option 3</Radio>
  </Stack>
</RadioGroup>
```

### Select

Dropdown selection menu.

```tsx
import { Select } from '@mindlogic-ai/logician-ui';

<Select placeholder="Select option">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</Select>
```

### SegmentedControl

Toggle between multiple options (alternative to tabs/radio).

```tsx
import { SegmentedControl } from '@mindlogic-ai/logician-ui';

<SegmentedControl
  options={['Daily', 'Weekly', 'Monthly']}
  value={period}
  onChange={setPeriod}
/>
```

### Slider

Select a value from a range.

```tsx
import { Slider } from '@mindlogic-ai/logician-ui';

<Slider
  defaultValue={50}
  min={0}
  max={100}
  onChange={(val) => setValue(val)}
/>
```

### Switch

Toggle between on/off states.

```tsx
import { Switch } from '@mindlogic-ai/logician-ui';

<Switch isChecked={enabled} onChange={(e) => setEnabled(e.target.checked)}>
  Enable notifications
</Switch>
```

### Textarea

Multi-line text input.

```tsx
import { Textarea } from '@mindlogic-ai/logician-ui';

<Textarea
  placeholder="Enter description"
  rows={4}
  resize="vertical"
/>
```

**Features:**
- Auto-resize support
- Character count integration
- IME composition support

### UrlInput

Input field optimized for URLs.

```tsx
import { UrlInput } from '@mindlogic-ai/logician-ui';

<UrlInput
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  placeholder="https://example.com"
/>
```

---

## Navigation Components

### Breadcrumb

Show navigation hierarchy.

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@mindlogic-ai/logician-ui';

<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink>Details</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### Menu

Dropdown menu with actions.

```tsx
import { Menu, MenuButton, MenuList, MenuItem } from '@mindlogic-ai/logician-ui';

<Menu>
  <MenuButton as={Button}>Actions</MenuButton>
  <MenuList>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Archive</MenuItem>
  </MenuList>
</Menu>
```

### Pagination

Navigate through paginated data.

```tsx
import { Pagination } from '@mindlogic-ai/logician-ui';

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>
```

### Tabs

Organize content into tabbed sections.

```tsx
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@mindlogic-ai/logician-ui';

<Tabs>
  <TabList>
    <Tab>Overview</Tab>
    <Tab>Details</Tab>
    <Tab>Settings</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Overview content</TabPanel>
    <TabPanel>Details content</TabPanel>
    <TabPanel>Settings content</TabPanel>
  </TabPanels>
</Tabs>
```

---

## Feedback Components

### CrossPageToasts

Toast notifications that persist across page navigations.

```tsx
import { CrossPageToasts } from '@mindlogic-ai/logician-ui';

// Add to app root
<CrossPageToasts />
```

### ErrorFallback

Display error states with recovery options.

```tsx
import { ErrorFallback } from '@mindlogic-ai/logician-ui';

<ErrorFallback
  error={error}
  resetError={() => retry()}
/>
```

### Loaders

Various loading indicators.

```tsx
import { Loaders } from '@mindlogic-ai/logician-ui';

<Loaders.Spinner />
<Loaders.Dots />
<Loaders.Pulse />
```

### Modal

Display content in an overlay dialog.

```tsx
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@mindlogic-ai/logician-ui';

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalBody>Modal content goes here</ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### ProgressBar

Show progress of an operation.

```tsx
import { ProgressBar } from '@mindlogic-ai/logician-ui';

<ProgressBar value={60} max={100} />
<ProgressBar isIndeterminate />
```

**Props:**
- `size`: `'xs' | 'sm' | 'md' | 'lg'`
- `colorScheme`: Color theme
- `isIndeterminate`: Animated loading state

### RadialProgress

Circular progress indicator.

```tsx
import { RadialProgress } from '@mindlogic-ai/logician-ui';

<RadialProgress value={75} />
```

### SegmentedProgressBar

Multi-step progress indicator.

```tsx
import { SegmentedProgressBar } from '@mindlogic-ai/logician-ui';

<SegmentedProgressBar
  segments={5}
  currentSegment={3}
/>
```

### SeeMoreButton

Expand/collapse content.

```tsx
import { SeeMoreButton } from '@mindlogic-ai/logician-ui';

<SeeMoreButton
  isExpanded={expanded}
  onClick={() => setExpanded(!expanded)}
/>
```

### Spinner

Loading spinner.

```tsx
import { Spinner } from '@mindlogic-ai/logician-ui';

<Spinner size="md" />
<Spinner color="primary.main" />
```

### Toast

Show temporary notification messages.

```tsx
import { useToast } from '@chakra-ui/react';

const toast = useToast();

toast({
  title: 'Success',
  description: 'Operation completed',
  status: 'success',
  duration: 3000,
});
```

### Tooltip

Display helpful text on hover.

```tsx
import { Tooltip } from '@mindlogic-ai/logician-ui';

<Tooltip label="Helpful information">
  <Button>Hover me</Button>
</Tooltip>
```

---

## Data Display Components

### Code

Display code with syntax highlighting.

```tsx
import { Code } from '@mindlogic-ai/logician-ui';

<Code language="javascript">
  {`const greeting = "Hello World";`}
</Code>
```

### CodeTabs

Multiple code blocks with language tabs.

```tsx
import { CodeTabs } from '@mindlogic-ai/logician-ui';

<CodeTabs
  tabs={[
    { language: 'javascript', code: 'const x = 1;' },
    { language: 'typescript', code: 'const x: number = 1;' },
  ]}
/>
```

### CopyableCode

Code block with copy button.

```tsx
import { CopyableCode } from '@mindlogic-ai/logician-ui';

<CopyableCode code="npm install logician-ui" language="bash" />
```

### DataField

Display labeled data in a consistent format.

```tsx
import { DataField } from '@mindlogic-ai/logician-ui';

<DataField label="Email" value="user@example.com" />
<DataField label="Status" value="Active" />
```

### ExpandableText

Show long text with expand/collapse.

```tsx
import { ExpandableText } from '@mindlogic-ai/logician-ui';

<ExpandableText maxLines={3}>
  {longTextContent}
</ExpandableText>
```

### InlineCode

Inline code formatting.

```tsx
import { InlineCode } from '@mindlogic-ai/logician-ui';

<Text>Use the <InlineCode>console.log()</InlineCode> function</Text>
```

### InfoSprinkle

Small info icon with tooltip.

```tsx
import { InfoSprinkle } from '@mindlogic-ai/logician-ui';

<InfoSprinkle label="Additional information here" />
```

### Markdown

Render Markdown content.

```tsx
import { Markdown } from '@mindlogic-ai/logician-ui';

<Markdown content="# Heading\n\nSome **bold** text" />
```

**Features:**
- GitHub Flavored Markdown (GFM)
- Code syntax highlighting
- Math equations (KaTeX)
- Tables, task lists, footnotes

### Masonry

Pinterest-style grid layout.

```tsx
import { Masonry } from '@mindlogic-ai/logician-ui';

<Masonry columns={3} spacing={4}>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</Masonry>
```

### MaxLengthIndicator

Show character count for inputs.

```tsx
import { MaxLengthIndicator } from '@mindlogic-ai/logician-ui';

<MaxLengthIndicator current={text.length} max={100} />
```

### MDXEditor

Rich text editor with Markdown support.

```tsx
import { MDXEditor } from '@mindlogic-ai/logician-ui';

<MDXEditor
  markdown={content}
  onChange={setContent}
/>
```

**Features:**
- WYSIWYG editing
- Markdown shortcuts
- Toolbar with formatting options
- Image upload support

### Table

Display tabular data.

```tsx
import { Table, Thead, Tbody, Tr, Th, Td } from '@mindlogic-ai/logician-ui';

<Table>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Email</Th>
      <Th>Status</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>John Doe</Td>
      <Td>john@example.com</Td>
      <Td>Active</Td>
    </Tr>
  </Tbody>
</Table>
```

### Typography

Text components with consistent styling.

```tsx
import { H1, H2, H3, H4, H5, Text, Subtitle, Subtext, Link } from '@mindlogic-ai/logician-ui';

<H1>Main Heading</H1>
<H2>Section Heading</H2>
<H3>Subsection</H3>
<Text>Body text</Text>
<Subtitle>Subtitle text</Subtitle>
<Subtext>Small secondary text</Subtext>
<Link href="/about">Link text</Link>
```

**Responsive Font Sizes:**
- H1: 34px (mobile) / 42px (desktop)
- H2: 28px / 35px
- H3: 21px / 24px
- H4: 18px / 20px
- H5: 15px / 17px
- Text: 14px
- Subtitle/Subtext: 13px / 14px

---

## Layout Components

### Container

(See Core Components section)

### Masonry

(See Data Display Components section)

---

## Icon Components

### Icon

Display icons from react-icons or custom SVG icons.

```tsx
import { Icon } from '@mindlogic-ai/logician-ui';

<Icon icon="IoHome" boxSize="md" />
<Icon icon="FaUser" color="primary.main" />
<Icon icon="Analytics" boxSize="lg" /> {/* Custom SVG */}
```

**Sizes:** `xs`, `sm`, `md`, `lg`, `xl`

See [Icon Library](./icons.md) for all available icons.

### IconButton

Button with only an icon.

```tsx
import { IconButton } from '@mindlogic-ai/logician-ui';

<IconButton
  aria-label="Close"
  icon={<Icon icon="IoClose" />}
  onClick={onClose}
/>
```

---

## File Components

### FileInput

(See Form Components section)

### FileItem

Display a single file with metadata.

```tsx
import { FileItem } from '@mindlogic-ai/logician-ui';

<FileItem
  name="document.pdf"
  size={1024000}
  onRemove={() => handleRemove()}
/>
```

### FileList

Display a list of uploaded files.

```tsx
import { FileList } from '@mindlogic-ai/logician-ui';

<FileList
  files={uploadedFiles}
  onRemove={(index) => handleRemove(index)}
/>
```

---

## Chart Components

### LineGraph

Display line charts.

```tsx
import { LineGraph } from '@mindlogic-ai/logician-ui';

<LineGraph
  data={chartData}
  xKey="date"
  yKey="value"
/>
```

**Powered by Recharts** - Supports responsive charts, tooltips, legends, and multiple data series.

### RadialProgress

(See Feedback Components section)

### SegmentedProgressBar

(See Feedback Components section)

---

## Common Props

All Logician UI components support Chakra UI's style props:

### Spacing
`margin`, `padding`, `m`, `p`, `mt`, `mb`, `ml`, `mr`, `mx`, `my`, `pt`, `pb`, `pl`, `pr`, `px`, `py`

### Layout
`width`, `height`, `maxW`, `maxH`, `minW`, `minH`, `display`, `overflow`

### Flexbox & Grid
`flex`, `flexDirection`, `alignItems`, `justifyContent`, `gap`, `gridTemplateColumns`

### Colors
`color`, `bg`, `bgColor`, `borderColor`, `backgroundColor`

### Borders
`border`, `borderWidth`, `borderRadius`, `borderTop`, `borderBottom`

### Typography
`fontSize`, `fontWeight`, `lineHeight`, `textAlign`, `letterSpacing`

### Responsive Props
Use object notation for responsive values:
```tsx
<Box fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} />
<Stack direction={{ base: 'column', md: 'row' }} />
```

---

## Best Practices

1. **Import only what you need** for optimal bundle size
2. **Use semantic tokens** from the theme (`primary.main`, `danger.main`)
3. **Leverage TypeScript** for type safety and autocomplete
4. **Follow accessibility guidelines** (see [Accessibility Guide](./accessibility.md))
5. **Use responsive props** for mobile-first design
6. **Explore Storybook** for component examples and props
