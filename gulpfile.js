 /*jslint node:true */

'use strict';
/*
                    . . . .
                    ,`,`,`,`,
. . . .               `\`\`\`\;
`\`\`\`\`,            ~|;!;!;\!
 ~\;\;\;\|\          (--,!!!~`!       .
(--,\\\===~\         (--,|||~`!     ./
 (--,\\\===~\         `,-,~,=,:. _,//
  (--,\\\==~`\        ~-=~-.---|\;/J,
   (--,\\\((```==.    ~'`~/       a |
     (-,.\\('('(`\\.  ~'=~|     \_.  \        ⋆ ✢ ✣ ✤ ✥ ✦ ✧ ✩ ✪ ✫ ✬ ✭
        (,--(,(,(,'\\. ~'=|       \\_;>  --   Magic really does exist!
          (,-( ,(,(,;\\ ~=/        \          ✧ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ✰ ★ ✬ ✭
          (,-/ (.(.(,;\\,/          )
           (,--/,;,;,;,\\         ./------.
             (==,-;-'`;'         /_,----`. \
     ,.--_,__.-'                    `--.  ` \
    (='~-_,--/        ,       ,!,___--. \  \_)
   (-/~(     |         \   ,_-         | ) /_|
   (~/((\    )\._,      |-'         _,/ /
    \\))))  /   ./~.    |           \_\;
 ,__/////  /   /    )  /
  '===~'   |  |    (, <.
           / /       \. \
         _/ /          \_\
         / /            \ \
        /_!/             >_\

           o                    _/_
 , , _ _  ,  _, __ _   _ _      /  _  __,  _   (
(_/_/ / /_(_(__(_)/ (_/ / /_---(__(/_(_/(_/ (_/_)_

_,     _   ,_   ,    .  _,_ ,__,    // 2 . 0 . 0
 (_/__(/__/ (__/_)__/__(_/_/ / (_


*/


const   gulp            = require('gulp'),
        browsersync     = require('browser-sync').create(),
        plumber         = require('gulp-plumber'),
        gutil           = require('gulp-util'),
        rename          = require('gulp-rename'),
        sass            = require('gulp-sass'),
        cleanCSS        = require('gulp-clean-css'),
        autoprefixer    = require('gulp-autoprefixer'),
        sourcemaps      = require('gulp-sourcemaps'),
        concat          = require('gulp-concat'),
        uglify          = require('gulp-uglify'),
        fs              = require('fs'),
        args            = require('yargs').argv,
        imagemin        = require('gulp-imagemin'),
        realFavicon     = require('gulp-real-favicon'),
        browserify      = require('browserify'),
        source          = require('vinyl-source-stream'),
        buffer          = require('vinyl-buffer'),
        gradient        = require('gradient-string'),
        assetManifest   = require('gulp-asset-manifest'),
        babel           = require('gulp-babel'),

        //get args
        project         = args.project || 'base',
        cms             = args.cms || 'wp',
        theme           = args.theme || 'unicorn-tears',
        url             = project + '.mnk.nu',
        port            = args.port || '3000',
        cwd             = '/devserver/' + project + '/public_html';

        //get the project directory
        if ( cms === 'wp') {
var     projectcwd = cwd + '/wp-content/themes/' + theme;
        } else {
var     projectcwd      = cwd;
        }

        //now that we finally have the project director, let's get the config files
const   config          = require(projectcwd + '/gulpfile.config.js'),
        faviconDataFile = projectcwd + config.faviconFile;


//Error handler
function handleError (error) {
    gutil.log(
        gradient.passion("\n          ,  , \n"),
        gradient.passion("          \\ \\ \n"),
        gradient.passion("          ) \\ \\    _p_ \n"),
        gradient.passion("         )^\))\))  /  *\\ \n"),
        gradient.passion("          \_|| || / /^`-'  💔  Every time this appears a unicorn\'s horn falls off  💔 \n"),
        gradient.passion("  __       -\ \\--/ / \n"),
        gradient.passion("<'  \\___/   ___. )' \n"),
        gradient.passion("     `====\ )___/\\\\ \n"),
        gradient.passion("        //     `' \n"),
        gradient.passion("        \\     /  \\ \n"),
        gradient.passion("         `' \n")
    );
    gutil.log(gutil.colors.red(error));
    this.emit('end');
}


/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Set up Browsersync
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
function browserSync(done) {
    browsersync.init({
        proxy: url,
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                margin: '0px',
                padding: '5px',
                position: 'fixed',
                fontSize: '10px',
                zIndex: '9999',
                borderRadius: '5px 0px 0px',
                color: 'white',
                textAlign: 'center',
                display: 'block',
                backgroundColor: 'rgba(60, 197, 31, 0.5)'
            }
        },
        port: port,
        open: false
    });

    //hello, let's introduce ourselves
    gutil.log(gradient.atlas.multiline('                    . . . .\n                    ,`,`,`,`,\n. . . .               `\\`\\`\\`\\;\n`\\`\\`\\`\\`,            ~|;!;!;\\!\n ~\\;\\;\\;\\|\\          (--,!!!~`!       .\n(--,\\\\\\===~\\         (--,|||~`!     ./\n (--,\\\\\\===~\\         `,-,~,=,:. _,//\n  (--,\\\\\\==~`\\        ~-=~-.---|\\;/J,\n   (--,\\\\\\((```==.    ~\'`~/       a |\n     (-,.\\\\(\'(\'(`\\\\.  ~\'=~|     \\_.  \\        ⋆ ✢ ✣ ✤ ✥ ✦ ✧ ✩ ✪ ✫ ✬ ✭\n        (,--(,(,(,\'\\\\. ~\'=|       \\\\_;>  --   Magic really does exist!\n          (,-( ,(,(,;\\\\ ~=/        \\          ✧ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ✰ ★ ✬ ✭\n          (,-/ (.(.(,;\\\\,/          )\n           (,--/,;,;,;,\\\\         ./------.\n             (==,-;-\'`;\'         /_,----`. \\\n     ,.--_,__.-\'                    `--.  ` \\\n    (=\'~-_,--/        ,       ,!,___--. \\  \\_)\n   (-/~(     |         \\   ,_-         | ) /_|\n   (~/((\\    )\\._,      |-\'         _,/ /\n    \\\\))))  /   ./~.    |           \\_\\;\n ,__/////  /   /    )  /\n  \'===~\'   |  |    (, <.\n           / /       \\. \\\n         _/ /          \\_\\\n         / /            \\ \\\n        /_!/             >_\\\n\n           o                    _/_\n , , _ _  ,  _, __ _   _ _      /  _  __,  _   (\n(_/_/ / /_(_(__(_)/ (_/ / /_---(__(/_(_/(_/ (_/_)_\n\n_,     _   ,_   ,    .  _,_ ,__,    // 2 . 0 . 0\n (_/__(/__/ (__/_)__/__(_/_/ / (_\n\n'));
    gutil.log(gutil.colors.yellow.bold('Welcome to the wonderful world of'),gradient.pastel( '~ unicorns ~'));
    gutil.log(gradient.pastel('☀️ unicorn-tears 🌟 sparkly 🌟 rainbow 🌟 edition 🌈 version 2.0.0 🌙'));

    //project details
    gutil.log(gradient.teen.multiline('\n     .^====^.     \n    =( - o- )=  ~ Current working directory:\n     /      \\\\\n   +( |    | )//\n'),gutil.colors.green.bold('📂  ' + projectcwd));
    gutil.log(gradient.instagram.multiline('\n     .^====^.\n    =( o__o )=  ~ If gulp is not working properly:\n     /      \\\\\n   +( |    | )//')
    ,gutil.colors.green.bold('\n ✅  Check --theme is correct ( default: unicorn-tears )')
    ,gutil.colors.green.bold('\n ✅  Check --project is correct ( default: base )')
    ,gutil.colors.green.bold('\n ✅  Check you have a gulpfile.config.js in the root of your project folder, and all paths are correct')
    ,gutil.colors.green.bold('\n ✅  For more info please read the README.md')
    );
}


/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Auto Refresh
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Reloads the page on watched changes
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/

function browserSyncReload(done) {
    browsersync.reload();
    gutil.log(gutil.colors.white('⭐  R E F R E S H I N G  ⭐'));
    done();
}


/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Process scss
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Compiles sass and reloads for plain css files
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
//firstly-- compile style.css and source map
function scss() {
    return gulp.src([projectcwd + config.styleSRC])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer(config.BROWSER_SUPPORT))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(projectcwd + config.styleDST))
        .pipe(browsersync.stream())
}

//secondly-- compile minified style.min.css to project root
function styles() {
    return gulp.src(projectcwd + config.styleCompiled, {
        allowEmpty: true
	})
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS({ debug: true }, function (details) {
            gutil.log(gutil.colors.red(details.name + '(original file size): ' + details.stats.originalSize));
            gutil.log(gutil.colors.green(details.name + '(minified file size): ' + details.stats.minifiedSize));
        }))
        .pipe(assetManifest({
            manifestFile: projectcwd + config.manifestPath,
            bundleName: 'styles',
            includeRelativePath: true
        }))
        .pipe(gulp.dest(projectcwd + config.styleDST))
        .pipe(browsersync.stream())
        .on('end', function () {
            gutil.log(
                gradient.instagram("\n                ✿ \n"),
                gradient.instagram("              •̀ ༽☆ \n"),
                gradient.instagram("          ,.~ ` ~., \n"),
                gradient.instagram("      ___/         \\ \n"),
                gradient.instagram("     (   *   ◡      !     ♥  CSS minifed to " + projectcwd + config.styleDST + "\n"),
                gradient.instagram("     `———,          /~,\n"),
                gradient.instagram("    ,-~,(,,/      (,,/\\ \n"),
                gradient.instagram("   ◜   |              |   \n"),
                gradient.instagram("  |    \(``,      (`` / \n"),
                gradient.instagram("   \     \.,__    __,/ \n"),
            )
        });
}

//refresh page for plain css changes in the project folder
function plainCSS() {
    return gulp.src(projectcwd + config.plainstyleSRC)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(autoprefixer())
        .pipe(assetManifest({
            manifestFile: projectcwd + config.manifestPath,
            bundleName: 'styles',
            includeRelativePath: true
        }))
        .pipe(gulp.dest(projectcwd+config.styleDST))
        .pipe(browsersync.stream())
        .on('end', function () {
            gutil.log(gradient.atlas('🌈 Double rainbow all the way 🌈 '));
        });
}

/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Process scripts
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Bundles es6 modules as imports.js
Concatenates regular js as script.js
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
//bundle es6 scripts
function bundle()  {
    return browserify({
        entries: projectcwd + config.jsImports, debug: true
    })
        .transform('babelify', { presets: ['@babel/preset-env'] })
        .bundle()
        .pipe(source('imports.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('imports.map'))
        .pipe(assetManifest({
            manifestFile: projectcwd + config.manifestPath,
            bundleName: 'imports',
            includeRelativePath: true
        }))
        .pipe(gulp.dest(projectcwd+config.jsDST))
        .pipe(browsersync.stream())
}

//Process normal js
function scripts() {
    return gulp.src([
        //process base.js last, ignore files prefixed with a _
        projectcwd + config.jsSRC + '/**/!(base)*.js',
        projectcwd + config.jsSRC + '/base.js',

        '!' +  projectcwd + config.jsSRC + '/archive/**',
        // '!' +  projectcwd + config.jsSRC + '/**/_*',
        // '!' +  projectcwd + config.jsSRC + '/**/imports/**'
    ], { allowEmpty: true })
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(babel({presets: [require.resolve('@babel/preset-env')]}))
        .pipe(concat('script.js'))
        .pipe(gulp.dest(projectcwd+config.jsDST))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(assetManifest({
            manifestFile: projectcwd + config.manifestPath,
            bundleName: 'js',
            includeRelativePath: true
        }))
        .pipe(gulp.dest(projectcwd+config.jsDST))
        .pipe(browsersync.stream())
        .on('end', function () {
            gutil.log(
                gradient.fruit("\n"),
                gradient.fruit("    .^====^.   \n"),
                gradient.fruit("   =( ^--^ )=  ♥ script.js & script.min.js minified to " + projectcwd + config.jsDST + "\n"),
                gradient.fruit("    /      \\   /~\n"),
                gradient.fruit("  +( |    | )//\n" )
            );
        });
}

/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Optimise images
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Images are minified to the dist folder
Favicons are generated into the dist folder

Note: because there is sometimes a delay in images copying over, this task may be triggered multiple times.
If this happens feel free to ignore the terminal until it completes minifying all the files
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
function images() {
    return gulp.src(projectcwd+config.imgSRC+'/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox: false}, {removeUselessStrokeAndFill: false}],
            verbose: true
        }))
        .pipe(assetManifest({
            manifestFile: projectcwd + config.manifestPath,
            bundleName: 'images',
            includeRelativePath: true
        }))
        .pipe(gulp.dest(projectcwd + config.imgDST))
        .on('end', function () {
            gutil.log(
                gradient.vice("\n     ┌╌┐\n"),
                gradient.vice("   .╌╌╌.\n"),
                gradient.vice("   (  ◓ ▻     ♥ Images minified to " + projectcwd + config.imgDST + "\n"),
                gradient.vice("  /   ◜ \\\n"),
                gradient.vice(" /   {   }\n"),
                gradient.vice(" \\    ◟ /◞\n"),
                gradient.vice(" \\︿︿︿︿==\n"),
            );
        });

}


/*
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
Check for updates on RealFaviconGenerator
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Run gulp favicon-update to start
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
function faviconUpdate(done) {
    // File where the favicon markups are stored
    const currentVersion = JSON.parse(fs.readFileSync(faviconDataFile)).version;
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
    });
    done();
}

/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Generate Favicons
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
-Place favicon.png in the /images
Specify favicon sizes below if you must
Run task and make sure markup is in header.php
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
function favicons(done) {
	realFavicon.generateFavicon({
		masterPicture: projectcwd + config.watchFAVICON,
		dest: projectcwd + config.imgDST + '/favicons',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: true,
			usePathAsIs: false
		},
		markupFile: faviconDataFile
    }, function () {
        done();
        gutil.log(gutil.colors.white('🎁  Favicons saved to ' + projectcwd + config.imgDST + '/favicons'));
        gutil.log(gradient.summer('♥ Copy the code below to your header and update the paths accordingly ♥'));
        gutil.log(gradient.atlas.multiline('\n\n' + JSON.parse(fs.readFileSync(faviconDataFile)).favicon.html_code + "\n\n"));
    });
}

/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Copy font files
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
function fonts() {
	return gulp.src(projectcwd + config.woffSRC)
        .pipe(rename({dirname: ''}))
        .pipe(assetManifest({
            manifestFile: projectcwd + config.manifestPath,
            bundleName: 'fonts',
            includeRelativePath: true
        }))
        .pipe(gulp.dest(projectcwd + config.woffDST))
        .pipe(browsersync.stream())
        .on('end', function () {
            gutil.log(
                gradient.retro("\n       `) \n"),
                gradient.retro(" >____/v=>   ♥  Fonts copied to " + projectcwd + config.woffDST + "\n"),
                gradient.retro("  >     \\\n"),
                gradient.retro("   \\____/\n"),
                gradient.retro("     LL\n\n")
            )
        });
}


/*!
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Watch the folder
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/

function watchFiles() {
    if (fs.existsSync(cwd)) {

        //show details on change
        function change(event) {
            gutil.log(gradient.cristal('✍️ File ' + event + ' was changed, running tasks...'));
        }

        // JS
        gulp.watch(projectcwd+config.watchJSIMPORTS, gulp.series(bundle)).on('change', change);
        gulp.watch(projectcwd+config.watchJS, gulp.series(scripts)).on('change', change);

        // CSS
        gulp.watch(projectcwd+config.watchSCSS, gulp.series(scss,styles)).on('change', change);
        gulp.watch(projectcwd+config.watchCSS, gulp.series(plainCSS)).on('change', change);

        // Images
        gulp.watch(projectcwd+config.watchFAVICON, gulp.series( favicons));
        gulp.watch(projectcwd+config.watchIMG, gulp.series(images));

        // Fonts
        gulp.watch(projectcwd+config.watchFONTS, gulp.series(fonts));

        // static
        gulp.watch(projectcwd+config.watchSTATIC, gulp.series(browserSyncReload)).on('change', change);

    } else {
        gutil.log(gutil.colors.bold.blue('Path not found. Make sure you specified a project/theme!'));
    }
}

// define complex tasks
const build = gulp.series(fonts, favicons, images, styles, bundle, scripts );
const watch = gulp.parallel(browserSync, watchFiles);

exports.build = build;
exports.default = watch;
