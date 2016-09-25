/*
 *  g-open-soccer - v1.0.0beta
 *  Sportsopendata.net API interface jQuery plugin
 *  https://github.com/Gix075/gOpenSoccer
 *
 *  Made by Gix075 <gildo.giuliani@gmail.com> (https://github.com/Gix075)
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "gOpenSoccer_getStandings",
			defaults = {
                apiBaseURL: "http://soccer.sportsopendata.net/v1/leagues/",
				season: "15-16",
                league: "serie-a",
                view: "simple", // simple,advanced,extended,full
                template: "table", // table,tabless
                debug: false
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
                var plugin = this;
                switch(this.settings.get) {
                    case "standings":
                        this.getStandings(plugin);
                        break;
                    case "stats":
                        this.getStandings(plugin);
                        break;
                }
				this.getStandings(plugin,false);
			},
            
			getStandings: function(plugin,team) {

				// some logic
				$.ajax({
                    url: plugin.settings.apiBaseURL+plugin.settings.league+"/seasons/"+plugin.settings.season+"/standings",
                    dataType: "json",
                    success: function(data) {
                        $(plugin.element).html(plugin.getStandingsTemplate(plugin,data,team));
                    },
                    error: function() {
                        if (plugin.settings.debug === true) {
                            console.log("getStandings => AJAXERROR!");
                        }
                    }
                }); // end ajax
			},
            
            getStandingsTemplate: function(plugin,data,team) {
                
                var standings = data.data.standings,
                    markup,
                    domElems = this.utils_switchDomEl(plugin.settings.template);
                
                
                $.each(standings,function(i,item) {
                    if(team === false || item.team === team) {
                        
                        markup += "<"+domElems.row_open+">";
                        markup += "     <"+domElems.col_open+">"+ item.position +"<"+domElems.col_close+">";
                        markup += "     <"+domElems.col_open+">"+ item.team +"<"+domElems.col_close+">";
                        markup += "     <"+domElems.col_open+">"+ item.overall.points +"<"+domElems.col_close+">";
                        markup += "     <"+domElems.col_open+">"+ item.overall.matches_played +"<"+domElems.col_close+">";

                        // Columns available only for "advanced", "extended" and "full" views
                        if (plugin.settings.view === "advanced" || plugin.settings.view === "extended" || plugin.settings.view === "full") {
                            markup += "     <"+domElems.col_open+">"+ item.overall.wins +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.overall.draws +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.overall.losts +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.overall.scores +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.overall.conceded +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.overall.goal_difference +"<"+domElems.col_close+">";
                        }

                        // Columns available only for "extended" and "full" views
                        if (plugin.settings.view === "extended" || plugin.settings.view === "full") {
                            markup += "     <"+domElems.col_open+">"+ item.home.wins +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.home.draws +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.home.losts +"<"+domElems.col_close+">";
                        }

                        // Columns available only for "full" view
                        if (plugin.settings.view === "full") {
                            markup += "     <"+domElems.col_open+">"+ item.home.scores +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.home.conceded +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.home.goal_difference +"<"+domElems.col_close+">";
                        }

                        // Columns available only for "extended" and "full" views
                        if (plugin.settings.view === "extended" || plugin.settings.view === "full") {
                            markup += "     <"+domElems.col_open+">"+ item.away.wins +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.away.draws +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.away.losts +"<"+domElems.col_close+">";
                        }

                        // Columns available only for "full" view
                        if (plugin.settings.view === "full") {
                            markup += "     <"+domElems.col_open+">"+ item.away.scores +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.away.conceded +"<"+domElems.col_close+">";
                            markup += "     <"+domElems.col_open+">"+ item.away.goal_difference +"<"+domElems.col_close+">";
                        }
                        markup += "<"+domElems.row_close+">";
                        
                    }
                    
                }); // end each
                
                return markup;
            },
            
            utils_switchDomEl: function(template) {
                var domElems = {
                        row_open: "",
                        row_close: "",
                        col_open: "",
                        col_close: ""
                    };
                switch(template) {
                    case "table":
                        domElems.row_open = "tr";
                        domElems.row_close = "/tr";
                        domElems.col_open = "td";
                        domElems.col_close = "/td";
                        break;
                        
                    case "tableless":
                        domElems.row_open = "div class=\"soccerstats_standings-row\"";
                        domElems.row_close = "/div";
                        domElems.col_open = "div class=\"soccerstats_standings-col\"";
                        domElems.col_close = "/div";
                        break;
                }
                return domElems;
            }
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
