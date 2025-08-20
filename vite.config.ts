import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import devtoolsJson from 'vite-plugin-devtools-json'
import babel from 'vite-plugin-babel'
const ReactCompilerConfig = {}
export default defineConfig({
    css: {
        devSourcemap: true
    },
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
    build: {
        ssr: true,
        minify: true
    },
    plugins: [
        tailwindcss(),
        reactRouter(),
        tsconfigPaths(),
        devtoolsJson(),
        babel({
            filter: /\.[jt]sx?$/,
            babelConfig: {
                presets: ['@babel/preset-typescript'],
                plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
            }
        })
    ]
})
