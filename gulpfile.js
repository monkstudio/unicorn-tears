 /*jslint node:true */

"use strict";
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
        /_!/            >_\
        
           o                    _/_               
 , , _ _  ,  _, __ _   _ _      /  _  __,  _   (  
(_/_/ / /_(_(__(_)/ (_/ / /_---(__(/_(_/(_/ (_/_)_

*/

var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    plumber = require("gulp-plumber"),
    gutil = require("gulp-util"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    bower = require("main-bower-files"),
    shell = require("gulp-shell"),
    gulpif = require('gulp-if'),
    fs = require('fs'),
    args = require("yargs").argv,

    //get args
    project = args.project || "base",
    theme = args.theme || "unicorn-tears",
    url = project + ".mnk.nu",
    port = args.port || "3000";

    //set cwd
if (args.theme === "holding") {
    var cwd = "../../../" + project + "/public_html";
} else {
    var cwd = "../../../" + project + "/public_html/wp-content/themes/" + theme;
}
// File where the favicon markups are stored
var FAVICON_DATA_FILE = cwd + '/faviconData.json';
/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Set up the BS
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
As you'll find out unicorns are full of bs
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
gulp.task("browser-sync", function () {
    browserSync.init({
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
    gutil.log(gutil.colors.green.bold("🌠 💝 Welcome to the wonderful bs world of"), gutil.colors.yellow.bold("~ unicorns ~"), gutil.colors.green.bold("( ˘ ³˘)💝 🌈 "));
});

/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Refresh
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
and question reality
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
gulp.task("bs-reload", function () {
    browserSync.reload();
    gutil.log(gutil.colors.white.bgBlue("⭐ Did you know unicorns love a refreshing waterfall? ⭐"));
});


/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Process sass
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Future note: add dump folder for straight up 
css files for concatenation.
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
//firstly-- compile style.css and source map
gulp.task("scss", function () {
    return gulp.src(cwd + "/scss/**/*.scss")
        .pipe(plumber({
            errorHandler: function (error) {
                gutil.log(gutil.colors.red("💔 Every time this appears a unicorn\"s horn falls off 💔"));
                gutil.log(gutil.colors.red(error.message));
                this.emit("end");
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cwd))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//secondly-- compile minified style.min.css to project root
gulp.task("styles", ["scss"], function () {
    
    return gulp.src(cwd + "/style.css")
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS({ debug: true }, function (details) {
            gutil.log(gutil.colors.red(details.name + "(original file size): " + details.stats.originalSize));
            gutil.log(gutil.colors.green(details.name + "(minified file size): " + details.stats.minifiedSize));
        }))
        .pipe(gulp.dest(cwd))
//        .pipe(browserSync.reload({
//            stream: true
//        }))
        .on("end", function () {
            gutil.log(gutil.colors.white("👑 Unicorns need them"), gutil.colors.blue("s"), gutil.colors.yellow("t"), gutil.colors.green("y"), gutil.colors.gray("l"), gutil.colors.red("e"), gutil.colors.cyan("s"), gutil.colors.white("to turn into dragons 🐲"));
        });
});

//refresh page for plain css changes in the root directory
gulp.task("plaincss", function () {
    return gulp.src([cwd + "/*.css", "!" + cwd + "/style.css", "!" + cwd + "/style.min.css"])
        .pipe(browserSync.reload({
            stream: true
        }))
});

/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Process scripts
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Remember to remove unnecessary scripts in 
js/vendor when you get a chance. This task will
concatenate every js in the js folder except
files prefixed with a _
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/

//firstly-- download all the bower stuff and make sure it's up to date
gulp.task("bowerinstall", function () {
    return gulp.src(cwd + "/bower.json")
        .pipe(shell(["cd " + cwd + " && bower install && bower update && bower prune"]));
});

//secondly-- get the js from bower and do a 💩 in main js folder
gulp.task("bower", ['bowerinstall'], function () {
    return gulp.src(bower({includeDev: true, filter: ["**/*.js", "!**/*.min.js", "!**/*/bootstrap.js", "!**/*/jquery.js"], paths: cwd }))
        .pipe(gulp.dest(cwd + "/js/vendor"))
        .on("end", function () {
            gutil.log(gutil.colors.green("🐤 Bower birds are every unicorn\'s annoying best friend 🐝 "));
        });
});
//thirdly-- process js folder and output script.js and script.min.js in project root
gulp.task("scripts", function () {
    return gulp.src([
        "!" + cwd + "/js/**/_*/**",
        "!" + cwd + "/js/**/_*.js",
        cwd + "/js/**/!(base)*.js",
        cwd + "/js/base.js"
    ])
         .pipe(plumber({
            errorHandler: function (error) {
                gutil.log(gutil.colors.red("💔 Every time this appears a unicorn\"s horn falls off 💔"));
                gutil.log(gutil.colors.red(error));
                this.emit("end");
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat("script.js"))
        .pipe(gulp.dest(cwd))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cwd))
        .pipe(browserSync.reload({
            stream: true
        }))
        .on("end", function () {
            gutil.log(gutil.colors.green("💖 A unicorn\"s mane can only flow majestically if it shampoos at least twice a day 💎"));
        });
});


/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Where the magic happens
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Basically the sparkly eye of sauron
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/

gulp.task("default", ["browser-sync"], function () {
    gulp.watch(cwd + "/bower.json", ["bower"]);
    gulp.watch("./package.json", ["npm"]);
//    gulp.watch(cwd + "/images/dump/favicon.*", ["favicons"]); 
//    gulp.watch([cwd + "/images/dump/**/*", "!" + cwd + "/images/dump/favicon.png"], ["images"]);
    gulp.watch(cwd + "/scss/**/*.scss", ["styles"]);
    gulp.watch(cwd + "/js/**/*.js", ["scripts"]);
    gulp.watch(cwd + "/**/*.html", ["bs-reload"]);
    gulp.watch(cwd + "/**/*.php", ["bs-reload"]);
    gulp.watch([
        cwd + "/*.js",
        "!" + cwd + "/script.js",
        "!" + cwd + "/script.min.js"], ["bs-reload"]);
    gulp.watch([
        cwd + "/*.css",
        "!" + cwd + "/style.css",
        "!" + cwd + "/style.min.css"], ["plaincss"]);
    
    gutil.log(gutil.colors.bold.blue("🎨 Current working directory" + cwd));
    gutil.log(gutil.colors.bold.red("⚡ If gulp is not working properly:"));
    gutil.log(gutil.colors.red("⚡ Check --theme if correct ( default: unicorn-tears )"));
    gutil.log(gutil.colors.red("⚡ Check --project is correct ( default: base )"));
    gutil.log(gutil.colors.red("⚡ Check port number is open ( default: 3000 )"));
});






/*! 
°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸

♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Tasks on the fly
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡ run a single task from below or above by typing:

gulp __TASKNAME__ --project=__PROJECT__ --theme=__THEME__ 

into the matrix
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡


♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Optimise images
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Any image in the images/dump folder will be 
ground down into a fine fairy dust then sprinkled 
liberally in the images root.
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
gulp.task("images", function () {
    
    var imagemin = require("gulp-imagemin");
    
    return gulp.src([cwd + "/images/dump/**/*", "!" + cwd + "/images/dump/favicon.png"])
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox: false}, {removeUselessStrokeAndFill: false}],
            verbose: true
        }))
        .pipe(gulp.dest(cwd + "/images/"))
        .on("end", function () {
            gutil.log(gutil.colors.blue("🎨 Unicorn tears create the highest quality jpegs 🌺"));
        });
    
});

/*
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡   
Check for updates on RealFaviconGenerator 
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Run gulp favicon-update to start
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡ 
*/
gulp.task('favicon-update', function (done) {
    
    var realFavicon = require('gulp-real-favicon'),
	    currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
        
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
});


/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡   
Check Page Speed Insights
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Run gulp psi to start
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡ 
*/
gulp.task('psi-mobile', function () {
    
    var psi = require('psi');
    
    return psi.output(url, {nokey: 'true', strategy: 'mobile'});
    //note: register for a google developers key 
});
gulp.task('psi-desktop', function () {
    
    var psi = require('psi');
    
    return psi.output(url, {nokey: 'true', strategy: 'desktop'});
});
gulp.task('psi', ['psi-mobile', 'psi-desktop']);


/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡   
Generate a spritesheet
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
-   Dump sprite images in /images/-sprites/
-   Run gulp sprites to start
-   Sprite will generate to /images/dump - ready
    for optimising
-   CSS file will generate to /scss/media/_sprite.scss
-   In the event multiple sprites are needed
    consolidate the css in _sprites.scss 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡ 
*/
gulp.task('sprites', function () {
    
    var sprity = require('sprity');
    
    return sprity.src({
        src: cwd + '/images/sprites/**/*.{png,jpg}',
        style: '_sprite.scss' //outputs plain css as a scss file
    })
    
        .on("error", function () {
            gutil.log(gutil.colors.red("💔 Every time this appears a unicorn\"s horn falls off 💔"));
            gutil.log(gutil.colors.red("- Make sure /images/sprites/ exists"));
            gutil.log(gutil.colors.red("- Make sure there are images in this folder"));
        })
        .pipe(gulpif('*.{png,jpg}', gulp.dest(cwd + '/images'), gulp.dest(cwd + '/scss/media/')))
        .on("end", function () {
            gutil.log(gutil.colors.yellow("🌙 Count the unicorns jumping over the rainbows and it might just put you to sleep ⭐️"));
        });
});

/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡   
Generate fontello fonts
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
-   Download config.json from fontello
-   Put config.json in /fonts/fontello/
-   Run gulp fontello to start
-   Copy fontello codes to scss folder
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡ 
*/
gulp.task('fontello', function () {
    
    var fontello = require('gulp-fontello');
    
    return gulp.src(cwd + '/fonts/fontello/config.json')
        .pipe(fontello({
            host          : 'http://fontello.com',  // Host for response 
            font          : './',                   // Destination dir for Fonts and Glyphs 
            css           : 'css',                  // Destination dir for CSS Styles, 
            assetsOnly    : true                    // extract from ZipFile only CSS Styles and Fonts exclude config.json, LICENSE.txt, README.txt and demo.html 
        }))
        .pipe(gulp.dest(cwd + '/fonts/fontello/'))
        .on("end", function () {
            gutil.log(gutil.colors.white("🎁 In the land of bs presents are only accepted if they are wrapped with a pretty bow 🎀"));
        });
});

/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Install, update, prune npm
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
If for any reason package.json needs to be 
updated in gulp-dev, this task will run. On the
off chance a dependency is deleted from package.json
run npm install in the gulp-dev directory so things
actually work again.
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
gulp.task("npm", function () {
    return gulp.src("./package.json")
        .pipe(shell(["npm install && npm update && npm prune"]))
        .on("end", function () {
            gutil.log(gutil.colors.black("🔮 All unicorns in the darklands agree - the more inception the better 💾 "));
        });
});

/*! 
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Generate Favicons
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Now 10000% less annoying
All you need to do is dump a favicon.png in the 
images/dump folder
Specify favicon sizes below if you must
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
*/
gulp.task('favicons', function (done) {
    
    var realFavicon = require('gulp-real-favicon');
    
	realFavicon.generateFavicon({
		masterPicture: cwd + "/images/dump/favicon.png",
		dest: cwd + "/images/favicons",
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
				backgroundColor: 'transparent',
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
				themeColor: 'transparent',
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
			errorOnImageTooSmall: true
		},
		markupFile: FAVICON_DATA_FILE
	}, function () {
		done();
	});
});
