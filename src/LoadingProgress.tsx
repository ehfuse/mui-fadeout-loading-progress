/**
 * MIT License
 *
 * Copyright (c) 2025 KIM YOUNG JIN (ehfuse@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

export interface BackgroundConfig {
    show?: boolean;
    color?: string; // Any CSS color: hex (#fff, #ffffff), rgb(255,255,255), rgba(), named colors, or RGB string "255, 255, 255"
    opacity?: number; // Applied to background (0.0 ~ 1.0). If color is already rgba, this is ignored
}

export interface LoadingProgressProps {
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

export default function LoadingProgress({
    visible,
    onComplete,
    fadeoutDuration = 200,
    exitDelay = 0,
    size = 40,
    className,
    style,
    indicator,
    background = {
        show: true,
        color: "255, 255, 255",
        opacity: 0.9,
    },
}: LoadingProgressProps) {
    const prevVisibleRef = useRef<boolean | undefined>(undefined);
    const boxRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(visible);

    // 배경 설정 기본값 처리
    const {
        show: showBackground = true,
        color: backgroundColor = "255, 255, 255",
        opacity: backgroundOpacity = 0.9,
    } = background;

    useEffect(() => {
        const prevVisible = prevVisibleRef.current;

        // visible이 true에서 false로 변경될 때 페이드아웃 후 onComplete 호출
        if (prevVisible === true && visible === false && boxRef.current) {
            // CSS transition으로 페이드아웃 시작
            const box = boxRef.current;
            box.style.opacity = "0";

            // fadeoutDuration + exitDelay 후 onComplete 호출 및 언마운트
            setTimeout(() => {
                setShouldRender(false); // 페이드아웃 완료 후 언마운트
                onComplete?.();
            }, fadeoutDuration + exitDelay);
        } else if (visible === true) {
            // visible이 true가 되면 다시 렌더링하고 opacity 복원
            setShouldRender(true);
            if (boxRef.current) {
                boxRef.current.style.opacity = "1";
            }
        }

        // 현재 visible 값을 ref에 저장
        prevVisibleRef.current = visible;
    }, [visible, onComplete, fadeoutDuration, exitDelay]);

    if (!shouldRender) {
        return null;
    }

    // indicator 렌더링 로직
    const renderIndicator = () => {
        // string이면 이미지 URL로 간주
        if (typeof indicator === "string") {
            return (
                <img
                    src={indicator}
                    alt="Loading"
                    style={{ width: size, height: size }}
                />
            );
        }
        // ReactNode가 제공되면 그대로 렌더링
        if (indicator) {
            return indicator;
        }
        // 기본값: MUI CircularProgress
        return <CircularProgress size={size} />;
    };

    // 배경색 처리: 다양한 색상 형식 지원
    const getBackgroundStyle = () => {
        if (!showBackground) {
            return { backgroundColor: "transparent" };
        }

        // 이미 rgba 형식이면 그대로 사용
        if (backgroundColor.startsWith("rgba")) {
            return { backgroundColor };
        }

        // RGB 문자열 형식 (예: "255, 255, 255")
        if (/^\d+,\s*\d+,\s*\d+$/.test(backgroundColor)) {
            return {
                backgroundColor: `rgba(${backgroundColor}, ${backgroundOpacity})`,
            };
        }

        // hex, rgb(), named color 등의 경우
        // CSS에서 color와 opacity를 함께 사용
        if (backgroundOpacity !== 1) {
            return {
                backgroundColor: backgroundColor,
                // 배경에만 opacity를 적용하기 위해 before pseudo-element 사용하거나
                // 직접 rgba로 변환하는 대신 CSS custom property 사용
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: backgroundColor,
                    opacity: backgroundOpacity,
                    zIndex: -1,
                },
            };
        }

        // opacity가 1이면 그냥 색상만
        return { backgroundColor };
    };

    return (
        <Box
            ref={boxRef}
            className={className}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                opacity: visible ? 1 : 0,
                transition: `opacity ${fadeoutDuration}ms ease-out`,
                ...getBackgroundStyle(),
                ...style,
            }}
        >
            {renderIndicator()}
        </Box>
    );
}
