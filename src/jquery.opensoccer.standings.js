
;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "JOS_getStandings",
			defaults = {
                apiBaseURL: "http://soccer.sportsopendata.net/v1/leagues/",
				season: "15-16",
                league: "serie-a",
                view: "simple", // simple,advanced,extended,full
                template: "table", // table,tabless
                debug: false
			};

		// Plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
                
                var plugin = this;
				this.getStandings(plugin,false);
			},
            
			getStandings: function (plugin,team) {

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
                    markup = "",
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
