module.exports = ({gulp, config, fileInclude}) => {
    gulp.task("htmlimport", () => {
        return gulp.src(config.markup.src)
            .pipe(fileInclude({
                prefix: "@@",
                basepath: "assets/html/templates",
                indent: true
            }))
            .pipe(gulp.dest(config.markup.dest));
    });
};

