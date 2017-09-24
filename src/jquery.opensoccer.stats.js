
;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "JOS_getStats",
			defaults = {
                apiBaseURL: "http://soccer.sportsopendata.net/v1/leagues/",
				season: "15-16",
                league: "serie-a",
                team: false,
                template: "default",
                style: "default",
                wrapperClass: "",
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
				this.getStats(plugin);
			},
            
			getStats: function (plugin) {

				$.ajax({
                    url: plugin.settings.apiBaseURL+plugin.settings.league+"/seasons/"+plugin.settings.season+"/standings",
                    dataType: "json",
                    success: function(data) {
                        var elementCustomClass = (plugin.settings.wrapperClass !== "") ? " " + plugin.settings.wrapperClass : "";
                        $(plugin.element).addClass('JOS-teamStats' + elementCustomClass);
                        $(plugin.element).html(plugin.getStatsTemplate(plugin,data));
                    },
                    error: function() {
                        if (plugin.settings.debug === true) {
                            console.log("getStandings => AJAXERROR!");
                        }
                    }
                }); // end ajax
			},
            
            
            getStatsTemplate: function(plugin,data) {
                
                var standings = data.data.standings,
                    markup = "";
                
                
                $.each(standings,function(i,item) {
                    if(plugin.settings.team === false || plugin.settings.team === item.team || plugin.settings.team === "all") {
                        
                        markup += '<div class="JOS-teamStats__team">';
                        markup += '     <div class="JOS-teamStats__team-inner">';
                        markup += '         <div class="JOS-teamStats__team-row">';
                        markup += '             <div class="JOS-teamStats__team-col JOS-teamStats__team-col-1">';
                        markup += '                 <div class="JOS-teamStats__team-col-inner">';
                        markup += '                     <h3 class="JOS-teamStats__team-teamname">' + item.team + '</h3>';
                        markup += '                     <div class="JOS-teamStats__team-col-data overall-data overall-data-standings">';
                        markup += '                         <div class="JOS-teamStats__team-data-title">';
                        markup += '                             <h5>Standing</h5>';
                        markup += '                         </div>';
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Points</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.points + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Position</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.position + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Played</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.matches_played + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Wins</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.wins + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Draws</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.draws + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Losts</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.losts + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        markup += '                     </div>';
                        markup += '                     <div class="JOS-teamStats__team-col-data overall-data overall-data-goals">';
                        markup += '                         <div class="JOS-teamStats__team-data-title">';
                        markup += '                             <h5>Goals</h5>';
                        markup += '                         </div>';
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Scores</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.scores + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Conceded</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.conceded + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Difference</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.overall.goal_difference + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        markup += '                     </div>';
                        markup += '                 </div>';
                        markup += '             </div>';
                        
                        markup += '             <div class="JOS-teamStats__team-col JOS-teamStats__team-col-2">';
                        markup += '                 <div class="JOS-teamStats__team-col-inner">';
                        markup += '                     <h4 class="JOS-teamStats__team-teamname">Advanced Data</h4>';
                        
                        markup += '                     <div class="JOS-teamStats__team-col-data home-data home-data-standings">';
                        
                        markup += '                         <div class="JOS-teamStats__team-data-title">';
                        markup += '                             <h5>Home Standings</h5>';
                        markup += '                         </div>';
                        
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Wins</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.home.wins + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Draws</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.home.draws + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Losts</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.home.losts + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Home Power</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + plugin.getTeamPower(item.home.wins,item.home.draws,item.home.losts,"home") + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        
                        markup += '                     </div>';
                        
                        markup += '                     <div class="JOS-teamStats__team-col-data home-data home-data-goals">';
                        
                        markup += '                         <div class="JOS-teamStats__team-data-title">';
                        markup += '                             <h5>Home Goals</h5>';
                        markup += '                         </div>';
                        
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Scores</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.home.scores + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Conceded</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.home.conceded + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Difference</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.home.goal_difference + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        
                        markup += '                     </div>';
                        
                        
                        markup += '                     <div class="JOS-teamStats__team-col-data away-data away-data-standings">';
                        
                        markup += '                         <div class="JOS-teamStats__team-data-title">';
                        markup += '                             <h5>Away Standings</h5>';
                        markup += '                         </div>';
                        
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Wins</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.away.wins + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Draws</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.away.draws + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Losts</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.away.losts + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Away Power</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + plugin.getTeamPower(item.away.wins,item.away.draws,item.away.losts,"home") + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        
                        markup += '                     </div>';
                        
                        
                        markup += '                     <div class="JOS-teamStats__team-col-data away-data away-data-goals">';
                        
                        markup += '                         <div class="JOS-teamStats__team-data-title">';
                        markup += '                             <h5>Away Goals</h5>';
                        markup += '                         </div>';
                        
                        markup += '                         <div class="JOS-teamStats__team-datas">';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Scores</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.away.scores + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Conceded</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.away.conceded + '</span>';
                        markup += '                             </div>';
                        markup += '                             <div class="JOS-teamStats__team-data">';
                        markup += '                                 <span class="JOS-teamStats__team-data-label">Difference</span>';
                        markup += '                                 <span class="JOS-teamStats__team-data-value">' + item.away.goal_difference + '</span>';
                        markup += '                             </div>';
                        markup += '                         </div>';
                        
                        markup += '                     </div>';
                        
                        
                        markup += '                 </div>';
                        markup += '             </div>';
                        
                        markup += '         </div>';
                        markup += '     </div>';
                        markup += '</div>';
                        
                    }
                    
                }); // end each
                
                return markup;
            },
            
            getTeamPower: function(wins,draws,losts,where) {
                
                var power;
                
                if (Number(wins) > (Number(draws) + Number(losts))) {
                    power = "+1";
                }
                if (Number(wins) == (Number(draws) + Number(losts))) {
                    power = "0";
                }
                if (Number(wins) < (Number(draws) + Number(losts))) {
                    power = "-1";
                }
                return power;
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
