// You can use the DEBUG variable to conditionally do tasks such as minification.
var DEBUG = false,
    path = require('path');

module.exports = function (grunt) {
    var serverFiles = [
        './server/*.ts',
        './server/!(typings)/*.ts'
    ], clientFiles = [
        './public/*.ts',
        './public/!(typings)/*.ts'
    ];
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    './public/app.js': './public/main.js'
                },
                options: {
                    commondir: true,
                    browserifyOptions: {
                        debug: DEBUG
                    },
                    transform: ['deamdify']
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            bundle: [
                './public/app.js',
                './public/app.js.map',
                './public/style.css',
                './public/style.css.map'
            ]
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            run: {
                tasks: [].concat(DEBUG ? ['shell:mongod'] : ['shell:mongod']).concat([
                    'nodemon', 
                    'watch'
                ])
            },
            build: {
                tasks: [
                    'typescript:server',
                    'typescript:client',
                    'less'
                ]
            },
            bundle: {
                tasks: [
                    'cssmin',
                    'bundle'
                ]
            }
        },
        copy: {
            map: {
                src: './public/app.js.map',
                dest: './public/app.js.map',
                options: {
                    // Fixes the sourcemap to point to the correct directory
                    process: function (content) {
                        var regex = new RegExp(path.resolve(__dirname, 'public').replace(/\\/g, '/'), 'g');
                        return content.replace(regex, '.');
                    }
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    // Add files (e.g. bootstrap) in here to combine them into 1 output css file.
                    './public/style.css': [
                        './public/common/less/style.css'
                    ]
                }
            }
        },
        exorcise: {
            bundle: {
                options: {},
                files: {
                    './public/app.js.map': ['./public/app.js'],
                }
            }
        },
        less: {
            main: {
                options: {
                    cleancss: true,
                    sourceMap: DEBUG
                },
                files: {
                    'public/style.css': 'public/common/less/style.less'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server/server.js',
                options: {
                    ignore: ['node_modules/**'],
                    watch: ['server']
                }
            }
        },
        shell: {
            tsd: {
                command: [
                    'node node_modules/tsd/build/cli update -so --config tsd.server.json',
                    'node node_modules/tsd/build/cli update -so --config tsd.public.json'
                ].join(' && ')
            },
            mongod: {
                command: 'mongod --logpath logs/mongo/mongod.txt'
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: serverFiles.concat(clientFiles)
            }
        },
        typescript: {
            options: {
                module: 'commonjs',
                target: 'es5'
            },
            server: {
                src: serverFiles
            },
            client: {
                src: clientFiles
            }
        },
        uglify: {
            options: {
                sourceMap: false,
                mangle: true
            },
            bundle: {
                files: {
                    './public/app.js': [
                        './public/app.js'
                    ]
                }
            }
        },
        watch: {
            server: {
                files: serverFiles,
                tasks: ['tslint', 'typescript:server']
            },
            client: {
                files: clientFiles,
                tasks: ['tslint', 'typescript:client']
            },
            less: {
                files: ['./public/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            browserify: {
                files: ['./public/**/*.js'],
                tasks: ['bundle']
            }
        }
    });

    /// Load tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exorcise');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-typescript');


    /// Register tasks

    // When not debugging, we want to run uglify on the js.
    grunt.registerTask('bundle', ['browserify'].concat(DEBUG ? ['exorcise', 'copy:map'] : ['uglify']));
    grunt.registerTask('make', ['clean:bundle', 'concurrent:build', 'concurrent:bundle']);
    grunt.registerTask('install', ['shell:tsd']);
    grunt.registerTask('ts', ['tslint', 'concurrent:ts']);
    grunt.registerTask('tsd', ['shell:tsd']);

    /// Default task
    grunt.registerTask('default', ['make', 'concurrent:run']);
};
