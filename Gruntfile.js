module.exports = function( grunt ) {

	grunt.initConfig( {

		// Import package manifest
		pkg: grunt.file.readJSON( "package.json" ),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %><%= pkg.versionStatus %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: [ "src/jquery.opensoccer.standings.js","src/jquery.opensoccer.stats.js" ],
				dest: "dist/jquery.opensoccer.js"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: [ "dist/jquery.opensoccer.js" ],
				dest: "dist/jquery.opensoccer.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},
        
        sass: { // Task
            dev: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    'demo/css/jQueryOpenSoccer.css': 'src/sass/jQueryOpenSoccer.scss', // 'destination': 'source'
                    'demo/css/demo.css': 'demo/sass/demo.scss' // 'destination': 'source'
                }
            },
            dist: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    'dist/css/jQueryOpenSoccer.css': 'src/sass/jQueryOpenSoccer.scss'
                }
            },
            dist_compressed: { // Target
                options: { // Target options
                    style: 'compressed'
                },
                files: { // Dictionary of files
                    'dist/css/jQueryOpenSoccer.min.css': 'src/sass/jQueryOpenSoccer.scss'
                }
            }
        },

		watch: {
			files: [ "src/sass/**/*","demo/sass/**/*"],
			tasks: [ "default" ]
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-sass" );

	grunt.registerTask( "default", [ "sass:dev" ] );
    grunt.registerTask( "dev", [ "sass:dev","watch" ] );
    grunt.registerTask( "dist", [ "concat", "uglify", "sass:dist", "sass:dist_compressed" ] );
};
