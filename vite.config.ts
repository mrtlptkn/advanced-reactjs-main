import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Environment değişkenlerini yükle

	const isProduction = mode === 'production';

	return {
		plugins: [react(), tailwindcss()],

		// Path alias tanımlamaları
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'@components': resolve(__dirname, './src/components'),
				'@assets': resolve(__dirname, './src/assets'),
			},
		},

		// Development sunucu ayarları
		server: {
			port: 3000,
			open: true, // Tarayıcıyı otomatik aç
			cors: true,
			hmr: {
				overlay: true, // Hata overlay'ini göster
			},
		},

		// Preview sunucu ayarları (production build test için)
		preview: {
			port: 4173,
			open: true,
		},

		// Build ayarları
		build: {
			// Production için kaynak haritaları
			sourcemap: isProduction ? false : true,

			// Minimum dosya boyutu (gzip öncesi KB)
			minify: isProduction ? 'esbuild' : false,

			// Chunk boyutu uyarı limiti
			chunkSizeWarningLimit: 500,

			// Çıktı dizini
			outDir: 'dist',

			// Build öncesi çıktı dizinini temizle
			emptyOutDir: true,

			// Rollup ayarları
			rollupOptions: {
				output: {
					// Vendor chunk'larını ayır
					manualChunks: {
						vendor: ['react', 'react-dom'],
						// router: ['react-router-dom'], // Kullanıyorsanız aktif edin
					},
					// Dosya isimlendirme
					chunkFileNames: isProduction
						? 'assets/js/[name]-[hash].js'
						: 'assets/js/[name].js',
					entryFileNames: isProduction
						? 'assets/js/[name]-[hash].js'
						: 'assets/js/[name].js',
					assetFileNames: isProduction
						? 'assets/[ext]/[name]-[hash].[ext]'
						: 'assets/[ext]/[name].[ext]',
				},
			},

			// CSS code splitting
			cssCodeSplit: true,

			// Target tarayıcılar
			target: 'es2015',
		},

		// CSS ayarları
		css: {
			devSourcemap: !isProduction,
			modules: {
				localsConvention: 'camelCase',
			},
		},

		// Ortam değişkenleri prefix'i
		envPrefix: 'VITE_',

		// Bağımlılık optimizasyonu
		optimizeDeps: {
			include: ['react', 'react-dom'],
			// exclude: [], // Optimize edilmemesi gereken paketler
		},

		// Performans için esbuild ayarları
		esbuild: {
			// Production'da console ve debugger'ları kaldır
			drop: isProduction ? ['console', 'debugger'] : [],
			// Legal yorumları kaldır
			legalComments: 'none',
		},

		// Define global sabitler
		define: {
			__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
			__DEV__: !isProduction,
		},

		// Vitest (unit testing) ayarları
		test: {
			environment: 'jsdom',
			setupFiles: ['./src/test/setup.ts'],
		},
	};
});
