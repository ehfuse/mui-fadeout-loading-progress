# MUI Fadeout Loading Progress

부드러운 페이드아웃 애니메이션과 완료 콜백을 제공하는 Material-UI 로딩 인디케이터 React 컴포넌트입니다.

A React component for Material-UI that provides a smooth fade-out loading indicator with customizable behavior and onComplete callback.

## 주요 기능 | Features

-   🎨 부드러운 페이드아웃 애니메이션 (200ms) | Smooth fade-out animation (200ms)
-   🔄 페이드아웃 후 자동 언마운트 | Automatic unmount after fade-out
-   📦 TypeScript로 제작 | Built with TypeScript
-   🎯 Material-UI 통합 | Material-UI integration
-   ⚡ 가볍고 고성능 | Lightweight and performant
-   🪝 완료 콜백 지원 | Callback support on completion

## API Signature

```tsx
interface BackgroundConfig {
    show?: boolean; // default: true
    color?: string; // default: "255, 255, 255" - Supports hex (#fff), rgb(), rgba(), named colors, or RGB string
    opacity?: number; // default: 0.9 - Applied to background (0.0 ~ 1.0). Ignored if color is rgba
}

interface LoadingProgressProps {
    visible: boolean;
    onComplete?: () => void;
    fadeoutDuration?: number; // default: 200ms
    exitDelay?: number; // default: 0ms
    size?: number; // default: 40
    className?: string;
    style?: CSSProperties;
    sx?: SxProps<Theme>; // MUI sx prop for advanced styling
    indicator?: ReactNode | string; // Custom indicator or image URL
    background?: BackgroundConfig; // Background configuration
}

export function LoadingProgress(
    props: LoadingProgressProps
): JSX.Element | null;
```

## 📖 Documentation

-   **[Getting Started (한국어)](docs/getting-started-ko.md)** - 설치 및 사용 가이드
-   **[Getting Started (English)](docs/getting-started-en.md)** - Installation and usage guide

## Quick Start

```bash
npm install @ehfuse/mui-fadeout-loading-progress
```

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <LoadingProgress
                visible={loading}
                onComplete={() => console.log("Done!")}
            />
        </div>
    );
}
```

## License

MIT License - Copyright (c) 2025 KIM YOUNG JIN (ehfuse@gmail.com)

## Links

-   **Repository**: [github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress](https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress)
-   **Issues**: [Issue Tracker](https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress/issues)
-   **NPM**: [npmjs.com/package/@ehfuse/mui-fadeout-loading-progress](https://www.npmjs.com/package/@ehfuse/mui-fadeout-loading-progress)
