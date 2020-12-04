``
                    . . . .
                    ,`,`,`,`,
. . . .               `\`\`\`\;
`\`\`\`\`,            ~|;!;!;\!
 ~\;\;\;\|\          (--,!!!~`!       .
(--,\\\===~\         (--,|||~`!     ./
 (--,\\\===~\         `,-,~,=,:. _,//
  (--,\\\==~`\        ~-=~-.---|\;/J,
   (--,\\\((``==.    ~'`~/       a |
     (-,.\\('('(`\\.  ~'=~|     \_.  \        ⋆ ✢ ✣ ✤ ✥ ✦ ✧ ✩ ✪ ✫ ✬ ✭
        (,--(,(,(,'\\. ~'=|       \\_;>  --   ✨ The one gulpfile to rule them all ✨
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

``

## ✨ Usage
This file is intended to be used with the unicorn-tears-theme['https://github.com/monkstudio/unicorn-tears-theme.git'] for WordPress, however it was built to be scalable to be used with hopefully most projects.

Unlike traditional gulp workflows, you can run this file from one location, and use it to service many directories with ease.

## ✨ Requirements
- npm
- gulp installed globally
- Folder for web projects
- a gulpfile.config.js in each project's directory, with paths configured to your project

## ✨Installation
1. Download `gulpfile.js` and `package.json` to your server
2. Install dependencies by navigating into the folder with the terminal, and typing `npm install`
3. Run gulp and pass in optional parameters from the terminal

### Flags you can pass:

- `--project=__PROJECTNAME__ `
    - *probably required*
    - Pass in the project folder's root directory.
    - Default: `base`
- `--theme=__THEMENAME__`
    - *probably required*
    - Change `__THEMENAME__` to the project's active theme name
    - Default: `unicorn-tears`.
- `--projectType=__PROJECTTYPE__`
    - *optional*
    - Change `__PROJECTTYPE__` depending if the project is a wp theme, wp plugin, or static site.
    - Default: `theme`
    - Other options: `plugin` or `static`
- `--port=__PORTNUMBER__ `
    - *optional*
    - Default: `3000`
- `--ssl`
    - *optional*
    - Default: `false`
    - Only pass in this flag if ssl is required
- `--root`
    - *optional*
    - Default: `public_html`
    - Pass in a custom path/folder name if the working directory should start from an alternative root directory
- `--configFile`
    - *optional*
    - Default: will look for a gulpfile.config.js in the theme folder
    - Optionally pass in a secondary custom config file in the project folder, with the following naming convention: `/gulpfile__FILENAME__.config.js`



***Note: unicorn-tears will automatically fail if no config file is found in the project directory***

*****Note: Before starting work on a project make sure a config file exists in the project folder and the paths in the config file are configured to the appropriate locations.

unicorn-tears will automatically fail if no config file is found in the project directory!!!

You can check  if the current working directory is correct by running gulp and checking the terminal feedback.**

The `gulpfile.config.js` included here is a sample I use for all my WordPress projects- customise the paths to your own needs.

## ✨ Philosophy
This gulpfile builds a /dist folder inside the project directory as you develop, so there is no build process necesary when the project is ready to go live.

Things to note
- Images will be automatically be resized and put in the `/dist` folder as they are being watched by gulp.
- any favicon.png dropped in the `/src/images` folder will trigger the gulpfile to generate web optimised favicons and it's relevant markup, which is output to the terminal and also the favicons folder as html.
- Font folders can be dropped in the `/src` folder, and this gulpfile will automatically flatten it's folder structure and copy over all woff and woff2 files to the `/dist` folder. Just remember to include the font sources in your CSS.
- If you want to use ES6 js and plugins drop the vendor files in the `/src/js/imports` folder, make changes to the `imports.js` file, and the gulpfile will bundle it all to the `/dist/js` folder. You'll need to enqueue it in functions as a separate js file.
- You can ask gulpfile to watch additional static files by changing the `gulpfile.config.js` file. By default, it watches all `.css`, `.html`, and `.php` files in the project folder.
