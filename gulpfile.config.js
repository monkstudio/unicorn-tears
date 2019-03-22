//get project directory starting from public_html
const projectDirectory = '';

module.exports = {
	projectDirectory: projectDirectory,
	faviconFile: '/src/faviconData.json',

	// CSS
	plainstyleSRC:'/src/css/**/*.css',
	styleSRC:'/src/scss/**/*.scss',
	styleDST:'/dist/css',
	styleCompiled:'/dist/css/style.css',
	styleMinified:'/dist/css/style.min.css',

	// JS
	jsImports:'/src/js/imports/imports.js',
	jsSRC:'/src/js',
	jsDST:'/dist/js',
	jsCompiled:'/dist/js/script.js',
	jsMinified:'/dist/js/script.min.css',

	// Images
	imgSRC:'/src/images',
	imgDST:'/dist/images',

	// Fonts
	woffSRC:'/src/fonts/**/*.+(woff|woff2)',
	woffDST:'/dist/fonts',

	// Asset Manifest
	manifestPath:'/dist/manifest.json',

	// Watch
	watchJS:'/src/js/!(imports)**',
	watchJSIMPORTS:'/src/js/imports/**/*.js',
	watchSCSS:'/src/scss/**/*.scss',
	watchCSS:'/src/css/**/*.css',
	watchIMG:'/src/images/*.+(png|jpg|jpeg|gif|svg)',
	watchFONTS:'/src/fonts/*',
	watchFAVICON:'/src/images/favicon.png',
	watchSTATIC:'/**/*.+(html|php)',

	BROWSER_SUPPORT: [
		'last 2 version',
		'> 1%',
		'ie >= 11',
	]
};