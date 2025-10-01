# Getting Started (English)

A comprehensive guide to using the MUI Fadeout Loading Progress component.

## Installation

```bash
npm install @ehfuse/mui-fadeout-loading-progress
```

or

```bash
yarn add @ehfuse/mui-fadeout-loading-progress
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react @mui/material @emotion/react @emotion/styled
```

## Basic Usage

### Simple Example

```tsx
import React, { useState } from "react";
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    // Simulate async operation
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div>
            <h1>My App</h1>
            <LoadingProgress visible={loading} />
        </div>
    );
}

export default App;
```

### With Callback

```tsx
import React, { useState } from "react";
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    const handleLoadingComplete = () => {
        console.log("Loading animation completed!");
        // Perform any action after loading completes
    };

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div>
            <h1>My App</h1>
            <LoadingProgress
                visible={loading}
                onComplete={handleLoadingComplete}
            />
        </div>
    );
}

export default App;
```

## Props API

| Prop              | Type                  | Required | Default                                                | Description                                                                                                                        |
| ----------------- | --------------------- | -------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `visible`         | `boolean`             | Yes      | -                                                      | Controls the visibility of the loading indicator                                                                                   |
| `onComplete`      | `() => void`          | No       | -                                                      | Callback function called after the fade-out animation completes                                                                    |
| `fadeoutDuration` | `number`              | No       | `200`                                                  | Duration of the fade-out animation in milliseconds                                                                                 |
| `exitDelay`       | `number`              | No       | `0`                                                    | Additional delay before unmounting after fade-out completes (milliseconds)                                                         |
| `size`            | `number`              | No       | `40`                                                   | Size of the loading indicator in pixels                                                                                            |
| `className`       | `string`              | No       | -                                                      | CSS class name to apply to the overlay Box                                                                                         |
| `style`           | `CSSProperties`       | No       | -                                                      | Inline styles to apply to the overlay Box (merged with default styles)                                                             |
| `sx`              | `SxProps<Theme>`      | No       | -                                                      | MUI sx prop for advanced styling (theme access, responsive styles, pseudo-selectors, etc.)                                         |
| `indicator`       | `ReactNode \| string` | No       | -                                                      | Custom indicator component or image URL. If string, renders as image; if ReactNode, renders as-is. Default is MUI CircularProgress |
| `background`      | `BackgroundConfig`    | No       | `{ show: true, color: "255, 255, 255", opacity: 0.9 }` | Background configuration object (see below)                                                                                        |

### BackgroundConfig

| Property  | Type      | Default           | Description                                                                                                                                                              |
| --------- | --------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `show`    | `boolean` | `true`            | Whether to show the background overlay. Set to false to display only the loading indicator                                                                               |
| `color`   | `string`  | `"255, 255, 255"` | Background color. Supports hex (`#fff`, `#423453`), rgb (`rgb(255,0,0)`), rgba (`rgba(255,0,0,0.5)`), named colors (`white`, `black`), or RGB string (`"255, 255, 255"`) |
| `opacity` | `number`  | `0.9`             | Opacity of the background (0.0 ~ 1.0). Ignored if color is already rgba format                                                                                           |

## How It Works

1. When `visible` is `true`, the loading overlay is rendered with full opacity
2. When `visible` changes from `true` to `false`, a fade-out animation begins (default 200ms)
3. After the animation completes and `exitDelay` elapses, the component unmounts and `onComplete` callback is triggered
4. The component automatically manages its rendering state to ensure smooth animations

## Styling

The component uses Material-UI's `Box` and `CircularProgress` components with the following default styles:

-   **Overlay**: White background with 90% opacity (`rgba(255, 255, 255, 0.9)`)
-   **Position**: Absolute positioning covering the entire parent container
-   **Z-index**: 1000
-   **Progress indicator**: 40px diameter circular progress
-   **Animation**: 200ms ease-out fade transition

## TypeScript Support

This package includes TypeScript definitions out of the box. No additional setup required!

```tsx
interface BackgroundConfig {
    show?: boolean;
    color?: string;
    opacity?: number;
}

interface LoadingProgressProps {
    visible: boolean;
    onComplete?: () => void;
    fadeoutDuration?: number;
    exitDelay?: number;
    size?: number;
    className?: string;
    style?: CSSProperties;
    sx?: SxProps<Theme>;
    indicator?: ReactNode | string;
    background?: BackgroundConfig;
}
```

## Browser Support

This component supports all modern browsers that are compatible with:

-   React 16.8+
-   Material-UI 5.0+

## Real-World Examples

### Using with Data Fetching

```tsx
import React, { useState, useEffect } from "react";
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserData()
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ position: "relative", minHeight: "400px" }}>
            <LoadingProgress visible={loading} />
            {user && (
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            )}
        </div>
    );
}
```

### Managing Multiple Loading States

```tsx
import React, { useState } from "react";
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function Dashboard() {
    const [isInitializing, setIsInitializing] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await saveData();
        setIsSaving(false);
    };

    return (
        <div style={{ position: "relative" }}>
            <Loading
                visible={isInitializing || isSaving}
                onComplete={() => console.log("Operation complete")}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}
```

## Advanced Usage

### Custom Animation Timing

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Loading
                visible={loading}
                fadeoutDuration={500} // 500ms fade-out
                exitDelay={200} // Wait 200ms more before unmounting
                onComplete={() => console.log("Completely disappeared")}
            />
        </div>
    );
}
```

### Custom Size

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {/* Large loading indicator */}
            <LoadingProgress visible={loading} size={80} />
        </div>
    );
}
```

### Background Configuration - Show/Hide

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {/* Display only the loading indicator without background overlay */}
            <LoadingProgress visible={loading} background={{ show: false }} />
        </div>
    );
}
```

### Background Configuration - Color & Opacity

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {/* Using hex color */}
            <LoadingProgress
                visible={loading}
                background={{ color: "#423453", opacity: 0.8 }}
            />

            {/* Using RGB string (converted to rgba) */}
            <LoadingProgress
                visible={loading}
                background={{ color: "255, 0, 0", opacity: 0.5 }}
            />

            {/* Using named color */}
            <LoadingProgress
                visible={loading}
                background={{ color: "black", opacity: 0.7 }}
            />

            {/* Using rgba directly (opacity ignored) */}
            <LoadingProgress
                visible={loading}
                background={{ color: "rgba(0, 0, 0, 0.5)" }}
            />

            {/* Using rgb() function */}
            <LoadingProgress
                visible={loading}
                background={{ color: "rgb(255, 100, 50)", opacity: 0.6 }}
            />
        </div>
    );
}
```

### Custom Styling

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Loading
                visible={loading}
                className="my-loading"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background
                    backdropFilter: "blur(5px)", // Blur effect
                }}
            />
        </div>
    );
}
```

### Custom Indicator (ReactNode)

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";
import { CircularProgress, Box } from "@mui/material";

function App() {
    const [loading, setLoading] = useState(true);

    const customIndicator = (
        <Box sx={{ textAlign: "center" }}>
            <CircularProgress color="secondary" size={60} />
            <div style={{ marginTop: 16, color: "#666" }}>Loading...</div>
        </Box>
    );

    return (
        <div>
            <LoadingProgress visible={loading} indicator={customIndicator} />
        </div>
    );
}
```

### Image Indicator (URL)

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Loading
                visible={loading}
                indicator="/path/to/loading-spinner.gif"
                size={100} // Image size
            />
        </div>
    );
}
```

### Custom Component with Spinner Animation

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

function App() {
    const [loading, setLoading] = useState(true);

    const customSpinner = (
        <Box
            sx={{
                width: 60,
                height: 60,
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                animation: `${spin} 1s linear infinite`,
            }}
        />
    );

    return (
        <div>
            <LoadingProgress visible={loading} indicator={customSpinner} />
        </div>
    );
}
```

## Troubleshooting

### Loading indicator not showing

Make sure the parent container has `position: relative`. The loading component uses `position: absolute`.

```tsx
<div style={{ position: "relative", minHeight: "300px" }}>
    <LoadingProgress visible={loading} />
    {/* Your content */}
</div>
```

### Animation not smooth

Check if the component is causing excessive re-renders. The `visible` prop should be a stable boolean value.

## License

MIT License

Copyright (c) 2025 KIM YOUNG JIN (ehfuse@gmail.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress](https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress)

## Issues

If you encounter any issues or have suggestions, please file them in the [issue tracker](https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress/issues).
