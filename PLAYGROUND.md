# CopilotKit Chat Playground

A powerful playground for customizing CopilotKit Chat components with real-time preview and code export.

## Features

### 🎨 Customization Options

#### Text Settings
- **Title**: Customize the chat header title
- **Initial Message**: Set the welcome message displayed when chat opens
- **Placeholder**: Configure the input field placeholder text

#### Color Scheme
- **Primary Color**: Main brand/action color
- **Contrast Color**: Text color on primary elements
- **Background Color**: Main container background
- **Secondary Color**: Cards and elevated surfaces
- **Secondary Contrast**: Primary text color
- **Separator Color**: Border colors
- **Muted Color**: Disabled/inactive states

#### Typography
- **Font Family**: Choose from system fonts (System UI, Georgia, Courier New, Arial, Times New Roman)
- **Font Size**: Select from 12px, 14px, 16px, or 18px

#### Style Properties
- **Border Radius**: Control corner roundness (0px to 16px)
- **Padding**: Adjust spacing (8px to 20px)

### 🔄 Real-time Preview
- Live preview in isolated iframe
- Instant updates as you change settings
- Style isolation prevents conflicts with main app

### 📤 Code Export

Export your customized chat in three formats:

#### 1. **Hybrid (Recommended)**
- Combines React props with custom CSS
- Best balance of maintainability and customization
- Separates concerns (styling vs configuration)

#### 2. **Props Only**
- Pure React component with inline styles
- No external CSS files needed
- Type-safe with TypeScript

#### 3. **CSS Only**
- Global CSS variables and classes
- Useful for theme switching
- Can be combined with any CopilotKit component

## Architecture

### File Structure

```
src/
├── types/
│   └── playground.ts              # TypeScript types and default config
├── hooks/
│   └── usePlaygroundConfig.ts     # State management hook
├── components/
│   └── playground/
│       ├── PlaygroundContainer.tsx # Main orchestrator
│       ├── SettingsPanel.tsx       # Left settings panel
│       ├── PreviewPanel.tsx        # Center preview with iframe
│       └── CodeExporter.tsx        # Export modal
├── utils/
│   └── codeGenerator.ts           # Code generation utilities
└── app/
    ├── page.tsx                   # Main playground page
    └── preview/
        ├── layout.tsx             # CopilotKit wrapper for preview
        └── page.tsx               # Preview iframe content
```

### How It Works

1. **State Management**: `usePlaygroundConfig` hook manages all customization settings
2. **Settings Panel**: User modifies settings through form controls
3. **Preview Communication**:
   - Settings sync to iframe via `postMessage`
   - Iframe listens for updates and applies them to CopilotChat
4. **Style Application**:
   - CSS variables for colors
   - Dynamic CSS injection for typography/spacing
   - Props for text content
5. **Code Generation**: Generates exportable code based on selected format

### Key Design Decisions

#### Why Hybrid Approach?
- **CSS Variables**: Best for colors (easy theming, runtime updates)
- **Props**: Best for text content (type-safe, component-level)
- **Custom CSS**: Best for structural changes (fonts, spacing)

#### Why Iframe Isolation?
- Prevents style conflicts with parent app
- True preview of how chat will look in isolation
- Separate CopilotKit instance for preview

#### Why PostMessage Communication?
- Secure cross-origin communication
- Real-time synchronization
- Clean separation of concerns

## Usage

### Running the Playground

```bash
npm run dev
```

Visit `http://localhost:3000` to access the playground.

### Customizing Settings

1. Use the left panel to adjust settings
2. See changes instantly in the preview
3. Click "Export Code" to get your customized implementation

### Integrating Exported Code

#### Option 1: Hybrid (Recommended)

```tsx
// MyChat.tsx
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "./custom-copilot.css";

export function MyChat() {
  return (
    <div style={cssVariables}>
      <CopilotChat labels={labels} />
    </div>
  );
}
```

```css
/* custom-copilot.css */
.copilotKitMessages {
  font-family: your-font;
  padding: your-padding;
}
```

#### Option 2: Props Only

```tsx
import { CopilotChat } from "@copilotkit/react-ui";

export function MyChat() {
  return (
    <div style={{ "--copilot-kit-primary-color": "#6366f1" }}>
      <CopilotChat labels={{ title: "My Chat" }} />
    </div>
  );
}
```

## Extending the Playground

### Adding New Settings

1. Update `PlaygroundConfig` type in `src/types/playground.ts`
2. Add form controls in `SettingsPanel.tsx`
3. Update preview styling in `src/app/preview/page.tsx`
4. Modify code generators in `src/utils/codeGenerator.ts`

### Adding New Export Formats

1. Create new generator function in `codeGenerator.ts`
2. Add format to `ExportFormat` type
3. Add tab in `CodeExporter.tsx`

## Best Practices

- **Code Quality**: Follow TypeScript best practices, use proper types
- **Performance**: Debounce rapid changes if needed
- **Accessibility**: Ensure all controls are keyboard accessible
- **Documentation**: Keep code well-commented for team collaboration

## Future Enhancements

Potential additions for Phase 2:
- Custom sub-components (Header, Messages, Input)
- Icon customization
- Advanced styling (gradients, shadows, animations)
- Theme presets (light/dark mode templates)
- Save/load configurations
- Share configurations via URL
