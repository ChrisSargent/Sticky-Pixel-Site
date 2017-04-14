Repo for the Sticky Pixel Website, a work in constant progress!

See the website here: http://www.stickypixel.com


# Pre Requisites:
- Node and NPM installed: https://nodejs.org/en/download/
- Gulp Installed: https://www.npmjs.com/package/gulp-install
- Jekyll (Ruby) Installed: https://jekyllrb.com

# Install
- Clone the repo
- run `npm install`

# Development
- Run `gulp dev`. This compiles the Jekyll HTML, SASS CSS and Concats JS Files and launches a BrowserSync session so we can make live changes to the html and sass code.

# Build
- Run `gulp build`: For an optimised build which does the same as the above but with minified and autoprefixed code etc. and also critical, inlined-css.
- Run `gulp prod`: For an optimised build which does the same as the above but with also critical, inlined-css.

# Images
- Run `gulp images` to minify and copy images to the `dist` folder

# Fonts
- Copy the `assets/fonts` folder to the `dist` folder
