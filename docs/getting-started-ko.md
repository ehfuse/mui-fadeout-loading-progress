# Getting Started (한국어)

MUI Fadeout Loading Progress 컴포넌트 사용 가이드입니다.

## 설치

```bash
npm install @ehfuse/mui-fadeout-loading-progress
```

또는

```bash
yarn add @ehfuse/mui-fadeout-loading-progress
```

## Peer Dependencies

다음 peer dependencies가 필요합니다:

```bash
npm install react @mui/material @emotion/react @emotion/styled
```

## 기본 사용법

### 간단한 예제

```tsx
import React, { useState } from "react";
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    // 비동기 작업 시뮬레이션
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div>
            <h1>나의 앱</h1>
            <LoadingProgress visible={loading} />
        </div>
    );
}

export default App;
```

### 콜백과 함께 사용

```tsx
import React, { useState } from "react";
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    const handleLoadingComplete = () => {
        console.log("로딩 애니메이션 완료!");
        // 로딩 완료 후 수행할 작업
    };

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div>
            <h1>나의 앱</h1>
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

| Prop              | 타입                  | 필수 | 기본값                                                 | 설명                                                                                                                                             |
| ----------------- | --------------------- | ---- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `visible`         | `boolean`             | Yes  | -                                                      | 로딩 인디케이터의 표시 여부를 제어합니다                                                                                                         |
| `onComplete`      | `() => void`          | No   | -                                                      | 페이드아웃 애니메이션 완료 후 호출되는 콜백 함수                                                                                                 |
| `fadeoutDuration` | `number`              | No   | `200`                                                  | 페이드아웃 애니메이션 지속 시간 (밀리초)                                                                                                         |
| `exitDelay`       | `number`              | No   | `0`                                                    | 페이드아웃 완료 후 언마운트까지의 추가 지연 시간 (밀리초)                                                                                        |
| `size`            | `number`              | No   | `40`                                                   | 로딩 인디케이터의 크기 (픽셀)                                                                                                                    |
| `className`       | `string`              | No   | -                                                      | 오버레이 Box에 적용할 CSS 클래스명                                                                                                               |
| `style`           | `CSSProperties`       | No   | -                                                      | 오버레이 Box에 적용할 인라인 스타일 (기본 스타일과 병합됨)                                                                                       |
| `indicator`       | `ReactNode \| string` | No   | -                                                      | 커스텀 인디케이터 컴포넌트 또는 이미지 URL. 문자열이면 이미지로 렌더링되고, ReactNode면 그대로 렌더링됩니다. 기본값은 MUI CircularProgress입니다 |
| `background`      | `BackgroundConfig`    | No   | `{ show: true, color: "255, 255, 255", opacity: 0.9 }` | 배경 설정 객체 (아래 참조)                                                                                                                       |

### BackgroundConfig

| 속성      | 타입      | 기본값            | 설명                                                                                                                                                    |
| --------- | --------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `show`    | `boolean` | `true`            | 배경 오버레이 표시 여부. false로 설정하면 로딩 인디케이터만 표시됩니다                                                                                  |
| `color`   | `string`  | `"255, 255, 255"` | 배경 색상. hex(`#fff`, `#423453`), rgb(`rgb(255,0,0)`), rgba(`rgba(255,0,0,0.5)`), 색상 이름(`white`, `black`), 또는 RGB 문자열(`"255, 255, 255"`) 지원 |
| `opacity` | `number`  | `0.9`             | 배경의 투명도 (0.0 ~ 1.0). color가 이미 rgba 형식이면 무시됩니다                                                                                        |

## 동작 방식

1. `visible`이 `true`일 때, 로딩 오버레이가 전체 불투명도로 렌더링됩니다
2. `visible`이 `true`에서 `false`로 변경되면, 페이드아웃 애니메이션이 시작됩니다 (기본 200ms)
3. 애니메이션 완료 후 `exitDelay` 시간을 대기한 후, 컴포넌트가 언마운트되고 `onComplete` 콜백이 호출됩니다
4. 컴포넌트는 부드러운 애니메이션을 보장하기 위해 렌더링 상태를 자동으로 관리합니다

## 스타일링

컴포넌트는 Material-UI의 `Box`와 `CircularProgress` 컴포넌트를 다음과 같은 기본 스타일로 사용합니다:

-   **오버레이**: 90% 불투명도의 흰색 배경 (`rgba(255, 255, 255, 0.9)`)
-   **포지션**: 부모 컨테이너 전체를 덮는 절대 위치
-   **Z-index**: 1000
-   **프로그레스 인디케이터**: 40px 직경의 원형 프로그레스
-   **애니메이션**: 200ms ease-out 페이드 트랜지션

## TypeScript 지원

이 패키지는 TypeScript 타입 정의를 기본 제공합니다. 추가 설정이 필요 없습니다!

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
    indicator?: ReactNode | string;
    background?: BackgroundConfig;
}
```

## 브라우저 지원

이 컴포넌트는 다음과 호환되는 모든 최신 브라우저를 지원합니다:

-   React 16.8+
-   Material-UI 5.0+

## 실전 예제

### 데이터 페칭과 함께 사용

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

### 여러 로딩 상태 관리

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
                onComplete={() => console.log("작업 완료")}
            />
            <button onClick={handleSave}>저장</button>
        </div>
    );
}
```

## 고급 사용법

### 커스텀 애니메이션 타이밍

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Loading
                visible={loading}
                fadeoutDuration={500} // 500ms 동안 페이드아웃
                exitDelay={200} // 200ms 추가 대기 후 언마운트
                onComplete={() => console.log("완전히 사라짐")}
            />
        </div>
    );
}
```

### 커스텀 크기

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {/* 큰 로딩 인디케이터 */}
            <LoadingProgress visible={loading} size={80} />
        </div>
    );
}
```

### 배경 설정 - 표시/숨김

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {/* 배경 오버레이 없이 로딩 인디케이터만 표시 */}
            <LoadingProgress visible={loading} background={{ show: false }} />
        </div>
    );
}
```

### 배경 설정 - 색상 및 투명도

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            {/* Hex 색상 사용 */}
            <LoadingProgress
                visible={loading}
                background={{ color: "#423453", opacity: 0.8 }}
            />

            {/* RGB 문자열 사용 (rgba로 변환됨) */}
            <LoadingProgress
                visible={loading}
                background={{ color: "255, 0, 0", opacity: 0.5 }}
            />

            {/* 색상 이름 사용 */}
            <LoadingProgress
                visible={loading}
                background={{ color: "black", opacity: 0.7 }}
            />

            {/* rgba 직접 사용 (opacity 무시됨) */}
            <LoadingProgress
                visible={loading}
                background={{ color: "rgba(0, 0, 0, 0.5)" }}
            />

            {/* rgb() 함수 사용 */}
            <LoadingProgress
                visible={loading}
                background={{ color: "rgb(255, 100, 50)", opacity: 0.6 }}
            />
        </div>
    );
}
```

### 커스텀 스타일링

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
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // 어두운 배경
                    backdropFilter: "blur(5px)", // 블러 효과
                }}
            />
        </div>
    );
}
```

### 커스텀 인디케이터 (ReactNode)

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";
import { CircularProgress, Box } from "@mui/material";

function App() {
    const [loading, setLoading] = useState(true);

    const customIndicator = (
        <Box sx={{ textAlign: "center" }}>
            <CircularProgress color="secondary" size={60} />
            <div style={{ marginTop: 16, color: "#666" }}>로딩 중...</div>
        </Box>
    );

    return (
        <div>
            <LoadingProgress visible={loading} indicator={customIndicator} />
        </div>
    );
}
```

### 이미지 인디케이터 (URL)

```tsx
import { LoadingProgress } from "@ehfuse/mui-fadeout-loading-progress";

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Loading
                visible={loading}
                indicator="/path/to/loading-spinner.gif"
                size={100} // 이미지 크기
            />
        </div>
    );
}
```

### 스피너 애니메이션이 있는 커스텀 컴포넌트

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

## 문제 해결

### 로딩이 표시되지 않는 경우

부모 컨테이너가 `position: relative`를 가지고 있는지 확인하세요. 로딩 컴포넌트는 `position: absolute`를 사용합니다.

```tsx
<div style={{ position: "relative", minHeight: "300px" }}>
    <LoadingProgress visible={loading} />
    {/* 내용 */}
</div>
```

### 애니메이션이 부드럽지 않은 경우

컴포넌트가 리렌더링을 과도하게 유발하는지 확인하세요. `visible` prop은 안정적인 boolean 값이어야 합니다.

## 라이선스

MIT License

Copyright (c) 2025 KIM YOUNG JIN (ehfuse@gmail.com)

## 기여

기여는 언제나 환영합니다! Pull Request를 자유롭게 제출해 주세요.

## 리포지토리

[https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress](https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress)

## 이슈

문제가 발생하거나 제안 사항이 있으면 [이슈 트래커](https://github.com/ehfuse/@ehfuse/mui-fadeout-loading-progress/issues)에 등록해 주세요.
