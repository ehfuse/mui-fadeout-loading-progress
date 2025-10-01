import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                sourcemap: true,
                exports: "named",
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true,
                exports: "named",
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            typescript({
                tsconfig: "./tsconfig.json",
                declaration: false,
                exclude: ["**/*.test.ts", "**/*.test.tsx"],
            }),
        ],
        external: [
            "react",
            "react-dom",
            "@mui/material",
            "@emotion/react",
            "@emotion/styled",
        ],
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];
