```
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

```

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
- ``--project=__PROJECTNAME__ ``
    - Change ``__PROJECTNAME__`` to your project's folder name. Default is `base`.
- ``--theme=__THEMENAME__``
    - Change ``__THEMENAME__`` to the theme name. Default is `unicorn-tears`.
- ``--port=__PORTNUMBER__ ``
    - Set the port number with ``--port=__PORTNUMBER__``. Default is 3000.
- ``--cms=__wp__ ``
    - You only need to change this if you are developing a non WP theme by passing cms as false. Default is `wp`.

**Before starting work on a project make sure the paths in the gulpfile.config.js are configured to the appropriate locations.
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
