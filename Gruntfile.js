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
        },

        /// [JAVASCRIPT]
        javascript: {
            files: {

                /// [Werner Dweight's Werneo]
                '<%= dirs.dest_generated.javascript %>/werneo.js': [
                    '<%= dirs.src.javascript %>/wd/core.js',
                    '<%= dirs.src.javascript %>/wd/dropdowns.js',
                    '<%= dirs.src.javascript %>/wd/dynaFilter.js',
                    '<%= dirs.src.javascript %>/wd/flashMessages.js',
                    '<%= dirs.src.javascript %>/wd/gallery.js',
                    '<%= dirs.src.javascript %>/wd/lists.js',
                    '<%= dirs.src.javascript %>/wd/modalButtons.js',
                    '<%= dirs.src.javascript %>/wd/modals.js',
                    '<%= dirs.src.javascript %>/wd/tabs.js',
                    '<%= dirs.src.javascript %>/wd/timeline.js',
                    '<%= dirs.src.javascript %>/wd/treeView.js',
                    '<%= dirs.src.javascript %>/wd/main.js',
                ]
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
                tasks: ['compass:dev', 'autoprefixer', 'notify:compass']
            },

            javascript: {
                options: {
                    spawn: true
                },
                files: '<%= dirs.src.javascript %>/**/*.js',
                tasks: ['newer:jshint:theme', 'newer:uglify:dev', 'notify:uglify']
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
        'uglify:dist',
        'build_css',
        'notify:build_finish'
    ]);
    grunt.registerTask('build_css', ['compass:dist', 'autoprefixer']);

    // dev
    grunt.registerTask('build_dev', [
        'jshint:theme',
        'clean:base',
        'uglify:dev',
        'compass:dev',
        'autoprefixer',
        'notify:build_finish'
    ]);
    grunt.registerTask('build_dev_css', ['compass:dev', 'autoprefixer']);
    grunt.registerTask('build_dev_js', ['jshint:theme', 'uglify:dev']);
    grunt.registerTask('build_dev_watch', ['build_dev', 'watch']);

}
