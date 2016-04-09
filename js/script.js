
    var categories = ['Pass Accuracy %', 'Shot Accuracy %', 'Corners', 'Fouls',
                                'Tackles', 'Possession %', 'Shots on Target', 'Shots', 'Goals'];
		$(document).ready(function(){
            
			$('a[href^="#"]').on('click',function (e) {
				e.preventDefault();

				var target = this.hash;
				var $target = $(target);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 900, 'swing', function () {
					window.location.hash = target;
				});
			});
             
            $('#container1').highcharts({

                data: {
                    csv:  document.getElementById('csv').innerHTML
                },

                title: {
                    text: 'LeBron James Career'
                },

                yAxis: [{ // left y axis
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'left',
                        x: 3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }, { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        x: -3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }],

                legend: {
                    align: 'left',
                    verticalAlign: 'top',
                    y: 20,
                    floating: true,
                    borderWidth: 0
                },

                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    hs.htmlExpand(null, {
                                        pageOrigin: {
                                            x: e.pageX || e.clientX,
                                            y: e.pageY || e.clientY
                                        },
                                        headingText: this.series.name,
                                        maincontentText: this.y,
                                        width: 50
                                    });
                                }
                            }
                        },
                        marker: {
                            lineWidth: 1
                        }
                    }
                },


            });
            $('#container2').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Barcelona v Real Madrid'
                },
                subtitle: {
                    text: 'Match Facts'
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                },

                series: [{
                    name: 'Barcelona',
                    data: [-2.2, -2.2, -2.3, -2.5, -2.7, -3.1, -3.2,
                        -3.0, -3.2]
                }, {
                    name: 'Real Madrid',
                    data: [2.1, 2.0, 2.2, 2.4, 2.6, 3.0, 3.1, 2.9,
                        3.1]
                }]
            });
            $('#container3').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: 'Winning<br>Chance',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 40
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -35,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Winning Chance',
                    innerSize: '50%',
                    data: [
                        ['Barcelona',   45],
                        ['Real Madrid',       55],
                        {
                            name: 'Proprietary or Undetectable',
                            y: 0.2,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    ]
                }]
            });
            $(function(){
                url = 'http://espnfc.com/rss/news?section=global';
                $.ajax({
                type: "GET",
                url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
                dataType: 'json',
                error: function(){
                    alert('Unable to load feed, Incorrect path or invalid feed');
                },
                success: function(xml){
                    result = xml.responseData.feed.entries;
                    for (i=0; i<5; i++){
                        y=i+1;
                        line=	y+". <a style='color:white;' href='"+result[i]["link"]+"'>"+result[i]["title"]+"</p></a>";
                        $(container4).append(line);
                        }
                        $(container4).append("<h6>Source: ESPN</h6>");
                    }
                });
            });
		});
		
        $(window).load(function(){
            $("header").vegas({
                
                slides: [
                    { src: "img/soccer.jpg" },
                    { src: "img/baseball.jpg" },
                    { src: "img/basketball.jpg" },
                    { src: "img/football.jpg" }
                ],
                overlay:'js/overlays/01.png',
                animation:'kenburns',
                transition: 'blur'
            });
        });
        $(window).scroll(function() {
            if ($(document).scrollTop() > 350) {
                $('nav').addClass('navbar-shrink');
            } else {
                $('nav').removeClass('navbar-shrink');
            }
        });
        (function (H) {
            function deferRender (proceed) {
                var series = this, 
                $renderTo = $(this.chart.container.parentNode);

                // It is appeared, render it
                if ($renderTo.is(':appeared') || !series.options.animation) {
                    proceed.call(series);
                    
                // It is not appeared, halt renering until appear
                } else  {
                    $renderTo.appear(); // Initialize appear plugin
                    $renderTo.on('appear', function () {
                        proceed.call(series);
                    });
                }
            };
    
        H.wrap(H.Series.prototype, 'render', deferRender);
        }(Highcharts));

        Highcharts.createElement('link', {
           href: 'https://fonts.googleapis.com/css?family=Unica+One',
           rel: 'stylesheet',
           type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

        Highcharts.theme = {
           colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
              "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
           chart: {
              backgroundColor: {
                 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                 stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                 ]
              },
              style: {
                 fontFamily: "'Unica One', sans-serif"
              },
              plotBorderColor: '#606063'
           },
           title: {
              style: {
                 color: '#E0E0E3',
                 textTransform: 'uppercase',
                 fontSize: '20px'
              }
           },
           subtitle: {
              style: {
                 color: '#E0E0E3',
                 textTransform: 'uppercase'
              }
           },
           xAxis: {
              gridLineColor: '#707073',
              labels: {
                 style: {
                    color: '#E0E0E3'
                 }
              },
              lineColor: '#707073',
              minorGridLineColor: '#505053',
              tickColor: '#707073',
              title: {
                 style: {
                    color: '#A0A0A3'

                 }
              }
           },
           yAxis: {
              gridLineColor: '#707073',
              labels: {
                 style: {
                    color: '#E0E0E3'
                 }
              },
              lineColor: '#707073',
              minorGridLineColor: '#505053',
              tickColor: '#707073',
              tickWidth: 1,
              title: {
                 style: {
                    color: '#A0A0A3'
                 }
              }
           },
           tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              style: {
                 color: '#F0F0F0'
              }
           },
           plotOptions: {
              series: {
              animation: {
                    duration: 2000
                },
                 dataLabels: {
                    color: '#B0B0B3'
                 },
                 marker: {
                    lineColor: '#333'
                 }
              },
              boxplot: {
                 fillColor: '#505053'
              },
              candlestick: {
                 lineColor: 'white'
              },
              errorbar: {
                 color: 'white'
              }
           },
           legend: {
              itemStyle: {
                 color: '#E0E0E3'
              },
              itemHoverStyle: {
                 color: '#FFF'
              },
              itemHiddenStyle: {
                 color: '#606063'
              }
           },
           credits: {
                enabled: false
            },
           labels: {
              style: {
                 color: '#707073'
              }
           },

           drilldown: {
              activeAxisLabelStyle: {
                 color: '#F0F0F3'
              },
              activeDataLabelStyle: {
                 color: '#F0F0F3'
              }
           },

           navigation: {
              buttonOptions: {
                 symbolStroke: '#DDDDDD',
                 theme: {
                    fill: '#505053'
                 }
              }
           },

           // scroll charts
           rangeSelector: {
              buttonTheme: {
                 fill: '#505053',
                 stroke: '#000000',
                 style: {
                    color: '#CCC'
                 },
                 states: {
                    hover: {
                       fill: '#707073',
                       stroke: '#000000',
                       style: {
                          color: 'white'
                       }
                    },
                    select: {
                       fill: '#000003',
                       stroke: '#000000',
                       style: {
                          color: 'white'
                       }
                    }
                 }
              },
              inputBoxBorderColor: '#505053',
              inputStyle: {
                 backgroundColor: '#333',
                 color: 'silver'
              },
              labelStyle: {
                 color: 'silver'
              }
           },

           navigator: {
              handles: {
                 backgroundColor: '#666',
                 borderColor: '#AAA'
              },
              outlineColor: '#CCC',
              maskFill: 'rgba(255,255,255,0.1)',
              series: {
                 color: '#7798BF',
                 lineColor: '#A6C7ED'
              },
              xAxis: {
                 gridLineColor: '#505053'
              }
           },

           scrollbar: {
              barBackgroundColor: '#808083',
              barBorderColor: '#808083',
              buttonArrowColor: '#CCC',
              buttonBackgroundColor: '#606063',
              buttonBorderColor: '#606063',
              rifleColor: '#FFF',
              trackBackgroundColor: '#404043',
              trackBorderColor: '#404043'
           },

           // special colors for some of the
           legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
           background2: '#505053',
           dataLabelsColor: '#B0B0B3',
           textColor: '#C0C0C0',
           contrastTextColor: '#F0F0F3',
           maskColor: 'rgba(255,255,255,0.3)'
        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
       
