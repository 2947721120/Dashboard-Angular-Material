	module.exports = function(grunt) {
		grunt.initConfig({
			watch: {
				scripts: {
					files: ['assets/js/*.js'],
					tasks: ['uglify'],
				},
				css: {
					files: ['assets/css/*.css'],
					tasks: ['cssmin'],
				},
			},
			uglify: {
				my_target: {
					files: {
						'assets/min/main.min.js': ['assets/js/*.js']
					},
					options: {
						mangle: false
					}

				}
			},
			cssmin: {
				target: {
					files: {
						'assets/min/main.min.css': ['assets/css/*.css']
					}
				}
			}
		});


		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.registerTask('default', ['uglify','cssmin','watch']);
	}