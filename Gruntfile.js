module.exports = function (grunt) {

    require('time-grunt')(grunt);

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // [DIRS]
        dirs: {
            app: 'app',
            src: {
                root: '',
                stylesheets: 'dev/sass',
                javascript: 'dev/js',
            },
            dest: {
                root: 'dist',
                stylesheets: 'dist/css',
                javascript: 'dist/js',
            },
            dest_generated: {
                root: 'dist',
                stylesheets: 'dist/css',
                javascript: 'dist/js',
            },
            cache: {
                root: 'cache',
                javascript: 'cache/js',
            }
        },

        /// [JAVASCRIPT]
        javascript: {
            files: {

                /// [Werner Dweight's Werneo]
                '<%= dirs.dest_generated.javascript %>/werneo.js': [
                    '<%= dirs.cache.javascript %>/wd/core.js',
                    '<%= dirs.cache.javascript %>/wd/plugin.js',
                    '<%= dirs.cache.javascript %>/wd/ajaxLoader.js',
                    '<%= dirs.cache.javascript %>/wd/breadcrumbs.js',
                    '<%= dirs.cache.javascript %>/wd/dropdowns.js',
                    '<%= dirs.cache.javascript %>/wd/dynaFilter.js',
                    '<%= dirs.cache.javascript %>/wd/flashMessages.js',
                    '<%= dirs.cache.javascript %>/wd/gallery.js',
                    '<%= dirs.cache.javascript %>/wd/lists.js',
                    '<%= dirs.cache.javascript %>/wd/modalButtons.js',
                    '<%= dirs.cache.javascript %>/wd/modals.js',
                    '<%= dirs.cache.javascript %>/wd/navigation.js',
                    '<%= dirs.cache.javascript %>/wd/tabs.js',
                    '<%= dirs.cache.javascript %>/wd/timeline.js',
                    '<%= dirs.cache.javascript %>/wd/treeView.js',
                    '<%= dirs.cache.javascript %>/wd/main.js',
                ]
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.javascript %>',
                    src: ['**/*.js'],
                    dest: '<%= dirs.cache.javascript %>',
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.javascript %>',
                    src: ['**/*.js'],
                    dest: '<%= dirs.cache.javascript %>',
                }]
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: false,
                mangle: false,
                compress: {
                    warnings: true
                },
                beautify: false,
                wrap: false,
                exportAll: true,
                preserveComments: false
            },
            dist: {
                options: {
                    sourceMap: false,
                    mangle: false,
                    beautify: false
                },
                files: '<%= javascript.files %>'
            },
            dev: {
                options: {
                    sourceMap: false,
                    mangle: false,
                    beautify: false
                },
                files: '<%= javascript.files %>'
            }
        },

        compass: {
            options: {
                force: true
            },
            dist: {
                options: {
                    environment: 'production',
                    outputStyle: 'compressed',
                    sassDir: '<%= dirs.src.stylesheets %>',
                    cssDir: '<%= dirs.dest_generated.stylesheets %>',
                }
            },
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                    sourcemap: false,
                    debugInfo: false,
                    sassDir: '<%= dirs.src.stylesheets %>',
                    cssDir: '<%= dirs.dest_generated.stylesheets %>',
                }
            }
        },

        autoprefixer: {
            dist: {
                expand: true,
                flatten: true,
                src: '<%= dirs.dest_generated.stylesheets %>/**/*.css',
                dest: '<%= dirs.dest_generated.stylesheets %>'
            }
        },

        clean: {
            base: [
                '<%= dirs.dest_generated.stylesheets %>/*',
                '<%= dirs.dest_generated.javascript %>/*',
            ],
            cache: [
                '<%= dirs.cache.javascript %>/*',
            ],
        },

        // [WATCH]
        watch: {
            options: {
                livereload: true,
                spawn: false
            },

            css: {
                options: {
                    livereload: true
                },
                files: '<%= compass.dev.options.cssDir %>/**/*.css'
            },

            compass: {
                options: {
                    livereload: true
                },
                files: '<%= compass.dev.options.sassDir %>/**/*.{sass,scss}',
                tasks: ['sasslint', 'compass:dev', 'autoprefixer', 'notify:compass']
            },

            javascript: {
                options: {
                    spawn: true
                },
                files: '<%= dirs.src.javascript %>/**/*.js',
                tasks: ['newer:jshint:theme', 'newer:babel:dev', 'newer:uglify:dev', 'notify:uglify']
            },

        },

        availabletasks: {
            all: {},
            user: {
                options: {
                    showTasks: ['user']
                }
            }
        },

        notify: {
            options: {
                enabled: false
            },
            build_finish: {
                options: {
                    message: 'Build finished'
                }
            },
            compass: {
                options: {
                    title: 'SASS done!',
                    message: 'Compass + Autoprefixer tasks successfully finished!'
                }
            },
            uglify: {
                options: {
                    title: 'Uglify done!',
                    message: 'Uglify task successfully finished!'
                }
            },
        },

        notify_hooks: {
            options: {
                enabled: true,
                success: true, // whether successful grunt executions should be notified automatically
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: {
                src: ['Gruntfile.js']
            },
            theme: {
                src: [
                    '<%= dirs.src.javascript %>/**/*.js',
                ]
            }
        },

        sasslint: {
            target: [
                '<%= dirs.src.stylesheets %>/**/*.sass'
            ]
        }

    };

    //---

    grunt.config.init(config);

    //---

    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-babel');

    grunt.task.run('notify_hooks');

    //---

    grunt.registerTask('debug', 'Debug task.', function () {
        console.log(JSON.stringify(env, null, 2));
        console.log(JSON.stringify(config, null, 2));
        console.log(JSON.stringify(process.env, null, 2));
    });

    //---

    grunt.registerTask('tasks', ['availabletasks']);
    grunt.registerTask('default', ['tasks']);

    // [BUILD]
    grunt.registerTask('build', [
        'jshint:theme',
        'clean:base',
        'clean:cache',
        'babel:dist',
        'uglify:dist',
        'build_css',
        'notify:build_finish'
    ]);
    grunt.registerTask('build_css', ['sasslint', 'compass:dist', 'autoprefixer']);

    // dev
    grunt.registerTask('build_dev', [
        'jshint:theme',
        'clean:base',
        'clean:cache',
        'babel:dev',
        'uglify:dev',
        'sasslint',
        'compass:dev',
        'autoprefixer',
        'notify:build_finish'
    ]);
    grunt.registerTask('build_dev_css', ['sasslint', 'compass:dev', 'autoprefixer']);
    grunt.registerTask('build_dev_js', ['jshint:theme', 'babel:dev', 'uglify:dev']);
    grunt.registerTask('build_dev_watch', ['build_dev', 'watch']);

}
