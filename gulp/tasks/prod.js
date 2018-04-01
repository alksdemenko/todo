module.exports = ({gulp, config}) => {
    // config.isDev = false;

    gulp.task("prod", gulp.series(
        "clean",
        gulp.parallel("fonts", "htmlimport", "scss", "images", "script")
    ));
};