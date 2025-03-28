import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import typescript from 'rollup-plugin-typescript'
import path from 'path'

const srcRoot = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@scc': srcRoot
		},
	},
	plugins: [
		react(),
		svgr(),
	],
	server: {
		port: 5678,
	},
	build: {
		outDir: './build',
		assetsDir: '.',
		rollupOptions: {
			plugins: [
				typescript()
			  ]
		}
	}
});
