# Icon Library

Logician UI provides 100+ icons through a unified `Icon` component, combining custom SVG icons with react-icons.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Icon Sizes](#icon-sizes)
- [Icon Colors](#icon-colors)
- [IconButton](#iconbutton)
- [Custom SVG Icons](#custom-svg-icons)
- [React Icons](#react-icons)
- [TypeScript Support](#typescript-support)

---

## Basic Usage

### Import and Use

```tsx
import { Icon } from '@mindlogic-ai/logician-ui';

function MyComponent() {
  return (
    <>
      <Icon icon="IoHome" />
      <Icon icon="Analytics" />
      <Icon icon="FaUser" />
    </>
  );
}
```

### With Props

```tsx
<Icon
  icon="IoHome"
  boxSize="lg"
  color="primary.main"
/>
```

---

## Icon Sizes

Use the `boxSize` prop to control icon size:

```tsx
<Icon icon="IoHome" boxSize="xs" />  {/* 16px */}
<Icon icon="IoHome" boxSize="sm" />  {/* 20px */}
<Icon icon="IoHome" boxSize="md" />  {/* 24px - default */}
<Icon icon="IoHome" boxSize="lg" />  {/* 32px */}
<Icon icon="IoHome" boxSize="xl" />  {/* 40px */}

{/* Custom size */}
<Icon icon="IoHome" boxSize="48px" />
<Icon icon="IoHome" boxSize={12} />   {/* 48px via Chakra spacing */}
```

**Size mapping:**
- `xs` = 16px (`sizes.4`)
- `sm` = 20px (`sizes.5`)
- `md` = 24px (`sizes.6`) - **default**
- `lg` = 32px (`sizes.8`)
- `xl` = 40px (`sizes.10`)

---

## Icon Colors

Use Chakra UI color tokens:

```tsx
{/* Semantic tokens (recommended) */}
<Icon icon="IoHome" color="primary.main" />
<Icon icon="IoWarning" color="danger.main" />
<Icon icon="IoCheckmarkCircle" color="success.main" />

{/* Gray scale */}
<Icon icon="IoHome" color="gray.1200" />
<Icon icon="IoHome" color="gray.600" />

{/* Custom colors */}
<Icon icon="IoHome" color="blue.500" />
<Icon icon="IoHome" color="#1751D0" />
```

### Responsive Colors

```tsx
<Icon
  icon="IoHome"
  color={{ base: 'gray.600', md: 'primary.main' }}
/>
```

---

## IconButton

Combine icons with buttons for icon-only actions:

```tsx
import { IconButton, Icon } from '@mindlogic-ai/logician-ui';

<IconButton
  aria-label="Close"
  icon={<Icon icon="IoClose" />}
  onClick={handleClose}
/>

<IconButton
  aria-label="Search"
  icon={<Icon icon="IoSearch" />}
  variant="ghost"
  size="sm"
/>

<IconButton
  aria-label="Delete"
  icon={<Icon icon="FaRegTrashAlt" />}
  colorScheme="red"
/>
```

**Important**: Always provide `aria-label` for accessibility.

---

## Custom SVG Icons

Logician UI includes custom-designed SVG icons for specific use cases.

### Available Custom Icons

#### Navigation & Interface
- `Analytics` - Analytics/chart icon (outline)
- `FilledAnalytics` - Analytics icon (filled)
- `Dashboard` - Dashboard icon
- `Window` - Window/app icon
- `Layout` - Layout icon (outline)
- `FilledLayout` - Layout icon (filled)

#### Communication
- `Chat` - Chat/message icon (outline)
- `FilledChat` - Chat icon (filled)
- `Language` - Language/translation icon

#### Content & Editing
- `Edit` - Edit/pencil icon (outline)
- `FilledEdit` - Edit icon (filled)
- `Bulb` - Lightbulb/idea icon (outline)
- `FilledBulb` - Bulb icon (filled)

#### People & Teams
- `Face` - Face/user icon (outline)
- `FilledFace` - Face icon (filled)
- `Members` - Team members icon (outline)
- `FilledMembers` - Members icon (filled)

#### Business & Commerce
- `Store` - Store icon (outline)
- `StoreActive` - Store icon (active state)
- `Studio` - Studio icon (outline)
- `StudioActive` - Studio icon (active state)
- `Receipt` - Receipt/billing icon
- `AmountUsage` - Usage/metrics icon (outline)
- `FilledAmountUsage` - Usage icon (filled)

#### Status & Actions
- `Pending` - Pending/waiting icon
- `Sparkles` - Sparkles/magic icon
- `VerticalEllipsis` - Three-dot menu icon

#### Help & Support
- `Faq` - FAQ/help icon (outline)
- `FilledFaq` - FAQ icon (filled)

### Usage

```tsx
import { Icon } from '@mindlogic-ai/logician-ui';

<Icon icon="Analytics" boxSize="lg" color="primary.main" />
<Icon icon="FilledAnalytics" boxSize="md" />
<Icon icon="Chat" color="gray.1200" />
<Icon icon="Sparkles" boxSize="sm" color="yellow.400" />
```

### Filled vs Outline

Many custom icons come in both outline and filled variants:

```tsx
{/* Outline - for default state */}
<Icon icon="Analytics" />
<Icon icon="Chat" />
<Icon icon="Members" />

{/* Filled - for active/selected state */}
<Icon icon="FilledAnalytics" />
<Icon icon="FilledChat" />
<Icon icon="FilledMembers" />
```

**Pattern for navigation:**
```tsx
function NavItem({ isActive, label }) {
  return (
    <Button
      leftIcon={
        <Icon
          icon={isActive ? 'FilledAnalytics' : 'Analytics'}
          color={isActive ? 'primary.main' : 'gray.800'}
        />
      }
    >
      {label}
    </Button>
  );
}
```

---

## React Icons

Logician UI includes 100+ icons from [react-icons](https://react-icons.github.io/react-icons/).

### Icon Sets Included

- **Ionicons** (io5, io) - Modern, clean icons
- **Font Awesome** (fa, fa6) - Popular icon set
- **Material Design** (md) - Google's Material icons
- **Lucide** (lu) - Clean, consistent icons
- **Tabler Icons** (tb) - Outline icons
- **Heroicons** (hi)
- **Bootstrap Icons** (bi)
- **Phosphor Icons** (pi)
- **React Icons** (rx, sl, gi, go, gr, lia, bs, ci)

### Common Icons

#### Navigation & UI
```tsx
<Icon icon="IoHome" />              // Home
<Icon icon="IoSearch" />            // Search
<Icon icon="IoMenu" />              // Menu (LuMenu)
<Icon icon="IoClose" />             // Close/X
<Icon icon="IoCloseOutline" />      // Close outline
<Icon icon="IoChevronForward" />    // Right arrow
<Icon icon="IoChevronDownOutline" /> // Down arrow
<Icon icon="IoIosArrowBack" />      // Back arrow
<Icon icon="IoIosArrowForward" />   // Forward arrow
<Icon icon="LuExternalLink" />      // External link
```

#### Actions
```tsx
<Icon icon="IoAddOutline" />        // Add/plus
<Icon icon="IoAddCircleOutline" />  // Add circle
<Icon icon="FaRegCopy" />           // Copy
<Icon icon="FaRegTrashAlt" />       // Delete/trash
<Icon icon="IoMdSave" />            // Save
<Icon icon="LuDownload" />          // Download
<Icon icon="LuUpload" />            // Upload
<Icon icon="IoMdSettings" />        // Settings
<Icon icon="SlSettings" />          // Settings (outline)
<Icon icon="MdLogout" />            // Logout
<Icon icon="HiRefresh" />           // Refresh
<Icon icon="FaRotateRight" />       // Rotate/refresh
```

#### Communication
```tsx
<Icon icon="IoChatbubbleEllipses" /> // Chat
<Icon icon="IoIosMail" />           // Email/mail
<Icon icon="IoCall" />              // Phone/call
<Icon icon="LuSendHorizontal" />    // Send
<Icon icon="IoIosShareAlt" />       // Share
<Icon icon="IoMdLink" />            // Link
```

#### Files & Documents
```tsx
<Icon icon="IoDocumentTextSharp" /> // Document
<Icon icon="CiFileOn" />            // File
<Icon icon="IoIosAttach" />         // Attachment
<Icon icon="FaArchive" />           // Archive
<Icon icon="FaPrint" />             // Print
```

#### Status & Feedback
```tsx
<Icon icon="IoCheckmarkCircle" />   // Success/checkmark
<Icon icon="FaCheck" />             // Check
<Icon icon="IoWarning" />           // Warning
<Icon icon="IoWarningOutline" />    // Warning outline
<Icon icon="MdError" />             // Error
<Icon icon="LuInfo" />              // Info
<Icon icon="FaRegQuestionCircle" /> // Question/help
```

#### Visibility
```tsx
<Icon icon="IoEyeOutline" />        // Eye/show
<Icon icon="IoEyeOffOutline" />     // Eye off/hide
<Icon icon="FaRegEye" />            // Eye (Font Awesome)
<Icon icon="FaRegEyeSlash" />       // Eye slash
```

#### Users & People
```tsx
<Icon icon="FaRegUserCircle" />     // User profile
<Icon icon="FaUsers" />             // Multiple users
<Icon icon="FaUserPlus" />          // Add user
<Icon icon="FaUserCheck" />         // User verified
<Icon icon="FaUserClock" />         // User time
<Icon icon="GrUserAdmin" />         // Admin user
<Icon icon="MdOutlinePersonPin" />  // Person pin
```

#### Business & Finance
```tsx
<Icon icon="FaMoneyBillWave" />     // Money/payment
<Icon icon="GiTwoCoins" />          // Coins
<Icon icon="LuReceipt" />           // Receipt
<Icon icon="FaChartPie" />          // Chart/analytics
<Icon icon="TbSum" />               // Sum/total
```

#### Education
```tsx
<Icon icon="FaGraduationCap" />     // Education
<Icon icon="LuGraduationCap" />     // Graduation cap (Lucide)
<Icon icon="FaPersonChalkboard" />  // Teaching
<Icon icon="LuBookOpenText" />      // Book/reading
<Icon icon="PiExam" />              // Exam/test
```

#### Filter & Sort
```tsx
<Icon icon="IoFilter" />            // Filter
<Icon icon="MdFilterList" />        // Filter list
<Icon icon="FaSortAlphaDown" />     // Sort A-Z
<Icon icon="FaSortAlphaUp" />       // Sort Z-A
<Icon icon="FaSortNumericDown" />   // Sort 0-9
<Icon icon="FaSortNumericUp" />     // Sort 9-0
```

#### Misc
```tsx
<Icon icon="IoIosList" />           // List
<Icon icon="MdPreview" />           // Preview
<Icon icon="FaImage" />             // Image
<Icon icon="FaCode" />              // Code
<Icon icon="IoCodeSlash" />         // Code slash
<Icon icon="FaLock" />              // Lock/security
<Icon icon="TbLockCog" />           // Lock settings
<Icon icon="HiLightningBolt" />     // Lightning/fast
<Icon icon="TbInfinity" />          // Infinity
<Icon icon="RxDotsHorizontal" />    // Horizontal dots
<Icon icon="MdOutlineCalendarToday" /> // Calendar
<Icon icon="BsTranslate" />         // Translate
<Icon icon="PiGlobe" />             // Globe
<Icon icon="PiGlobeX" />            // Globe crossed
<Icon icon="TbWorldSearch" />       // World search
```

### Full List

For a complete list of all available react-icons, see:
- [IconMap.ts](../src/components/Icon/IconMap.ts) - Full icon registry
- [react-icons.github.io](https://react-icons.github.io/react-icons/) - Interactive browser

---

## TypeScript Support

The `Icon` component is fully typed with autocomplete support:

```tsx
import { Icon, IconType } from '@mindlogic-ai/logician-ui';

// IconType includes all available icon names
const iconName: IconType = 'IoHome';

// Type-safe props
import { IconProps } from '@mindlogic-ai/logician-ui';

const iconProps: IconProps = {
  icon: 'IoHome',
  boxSize: 'md',
  color: 'primary.main',
};
```

---

## Best Practices

### 1. Use Semantic Icon Names

```tsx
// ✅ Good - clear meaning
<Icon icon="IoHome" />
<Icon icon="IoSearch" />
<Icon icon="FaRegTrashAlt" />

// ❌ Avoid - unclear abbreviations
<Icon icon="RxDot" />
```

### 2. Maintain Consistent Sizing

```tsx
// ✅ Good - consistent sizes across UI
<IconButton icon={<Icon icon="IoClose" boxSize="md" />} />
<IconButton icon={<Icon icon="IoSettings" boxSize="md" />} />

// ⚠️ Inconsistent
<IconButton icon={<Icon icon="IoClose" boxSize="lg" />} />
<IconButton icon={<Icon icon="IoSettings" boxSize="sm" />} />
```

### 3. Use Filled/Outline for State

```tsx
// ✅ Good - visual feedback
<Icon
  icon={isActive ? 'FilledAnalytics' : 'Analytics'}
  color={isActive ? 'primary.main' : 'gray.800'}
/>

// ❌ Less clear
<Icon
  icon="Analytics"
  color={isActive ? 'primary.main' : 'gray.800'}
/>
```

### 4. Accessibility with IconButton

```tsx
// ✅ Good - descriptive label
<IconButton
  aria-label="Close dialog"
  icon={<Icon icon="IoClose" />}
/>

// ❌ Bad - missing or vague label
<IconButton
  icon={<Icon icon="IoClose" />}
/>
```

### 5. Semantic Colors

```tsx
// ✅ Good - semantic meaning
<Icon icon="IoWarning" color="warning.main" />
<Icon icon="FaRegTrashAlt" color="danger.main" />
<Icon icon="IoCheckmarkCircle" color="success.main" />

// ⚠️ Less meaningful
<Icon icon="IoWarning" color="yellow.400" />
```

---

## Adding Custom Icons

If you need to add your own SVG icons:

### 1. Prepare SVG

Optimize your SVG:
- Remove unnecessary attributes
- Use `currentColor` for fill/stroke
- Set viewBox appropriately

```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="..." stroke="currentColor" strokeWidth="2" />
</svg>
```

### 2. Use as Chakra Icon

```tsx
import { Icon as ChakraIcon } from '@chakra-ui/react';

function CustomIcon(props) {
  return (
    <ChakraIcon viewBox="0 0 24 24" {...props}>
      <path d="..." stroke="currentColor" strokeWidth="2" />
    </ChakraIcon>
  );
}

// Usage
<CustomIcon boxSize={6} color="primary.main" />
```

---

## Common Patterns

### Icon with Text

```tsx
import { HStack, Text, Icon } from '@mindlogic-ai/logician-ui';

<HStack spacing={2}>
  <Icon icon="IoHome" boxSize="sm" />
  <Text>Home</Text>
</HStack>
```

### Icon in Button

```tsx
import { Button, Icon } from '@mindlogic-ai/logician-ui';

<Button
  leftIcon={<Icon icon="IoAddOutline" />}
  variant="primary"
>
  Add Item
</Button>

<Button
  rightIcon={<Icon icon="LuExternalLink" />}
  variant="secondary"
>
  Open Link
</Button>
```

### Conditional Icons

```tsx
import { Icon } from '@mindlogic-ai/logician-ui';

function StatusIcon({ status }) {
  const iconMap = {
    success: 'IoCheckmarkCircle',
    error: 'MdError',
    warning: 'IoWarning',
    info: 'LuInfo',
  };

  const colorMap = {
    success: 'success.main',
    error: 'danger.main',
    warning: 'warning.main',
    info: 'primary.main',
  };

  return (
    <Icon
      icon={iconMap[status]}
      color={colorMap[status]}
      boxSize="md"
    />
  );
}
```

### Interactive Icon

```tsx
import { Icon, Box } from '@mindlogic-ai/logician-ui';

<Box
  as="button"
  onClick={handleClick}
  cursor="pointer"
  _hover={{ color: 'primary.main' }}
  transition="color 0.2s"
>
  <Icon icon="IoHome" boxSize="lg" />
</Box>
```

---

## Troubleshooting

### Icon not rendering

```tsx
// ❌ Wrong - icon name doesn't exist
<Icon icon="NonExistentIcon" />

// ✅ Check IconMap.ts for valid icon names
<Icon icon="IoHome" />
```

### Icon size not working

```tsx
// ❌ Wrong - invalid size prop
<Icon icon="IoHome" size="md" />

// ✅ Correct - use boxSize
<Icon icon="IoHome" boxSize="md" />
```

### Color not applying

```tsx
// ⚠️ Some SVGs use fill, others use stroke
// Custom SVGs should use currentColor

// ✅ Works with most icons
<Icon icon="IoHome" color="primary.main" />
```

---

## Resources

- [Icon Component Code](../src/components/Icon/Icon.tsx)
- [Icon Map Reference](../src/components/Icon/IconMap.ts)
- [react-icons Library](https://react-icons.github.io/react-icons/)
- [Chakra UI Icon Docs](https://chakra-ui.com/docs/components/icon)
