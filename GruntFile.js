module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jison: {
			options: {
				moduleType: 'js'
			},
			dist: {
				files: {
					'src/30_parser.js': 'src/30_parser.jison'
				}
			}
		},
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: require("glob").sync("./src/*.js"),
				dest: 'dist/units.pre.js'
			}
		},
		uglify: {
			options: {
				report: "gzip",
				sourceMap: true,
				preserveComments: false,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/units.min.js': ['dist/units.pre.js']
				}
			},
			distBeautify: {
				options: {
					sourceMap: false,
					mangle: false,
					beautify: true
				},
				files: {
					'dist/units.js': ['dist/units.pre.js']
				}
			}
		},
		watch: {
			options: {
				atBegin: true,
				spawn: false
			},
			dev: {
				files: ['src/**.jison', 'src/**.js'],
				tasks: ['dev']
			}
		},
		blanket_mocha: {
			dist: {
				src: ['test/*.html'],
				options: {
					threshold: 50,
					log: true,
					logErrors: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jison');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-blanket-mocha');

	grunt.registerTask('test', ['blanket_mocha']);
	grunt.registerTask('dev', ['jison', 'concat', 'blanket_mocha']);
	grunt.registerTask('dist', ['jison', 'concat', 'uglify', 'blanket_mocha']);
	grunt.registerTask('default', ['dist']);
};