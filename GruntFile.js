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
				dest: 'dist/units.js'
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				preserveComments: false,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/units.min.js': ['dist/units.js']
				}
			},
			distBeautify: {
				options: {
					sourceMap: false,
					mangle: false,
					beautify: true
				},
				files: {
					'dist/units.js': ['dist/units.js']
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
				tasks: ['jison', 'concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jison');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jison', 'concat', 'uglify']);
};