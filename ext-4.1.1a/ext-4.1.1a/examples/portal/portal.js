/**
 * @class Ext.app.Portal
 * @extends Object
 * A sample portal layout application class.
 */
// TODO: Fill in the content panel -- no AccordionLayout at the moment
// TODO: Fix container drag/scroll support (waiting on Ext.lib.Anim)
// TODO: Fix Ext.Tool scope being set to the panel header
// TODO: Drag/drop does not cause a refresh of scroll overflow when needed
// TODO: Grid portlet throws errors on destroy (grid bug)
// TODO: Z-index issues during drag

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.window.*',
    'Ext.ux.GMapPanel'
]);
Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);

Ext.define('Ext.app.Portal', {
	
    extend: 'Ext.container.Viewport',
    //requires: [ 'Ext.diag.layout.ContextItem', 'Ext.diag.layout.Context' ],
    uses: ['Ext.app.PortalPanel', 'Ext.app.PortalColumn', 'Ext.app.GridPortlet', 'Ext.app.ChartPortlet'],
    
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },

    initComponent: function(){
        var content = '<div class="portlet-content">'+Ext.example.shortBogusMarkup+'</div>';
        
        store1.loadData(generateData(8));       
        	    
	    //data for line chart
	    var chart = Ext.create('Ext.chart.Chart', {
	            xtype: 'chart',
	            style: 'background:#fff',
	            animate: true,
	            store: store1,
	            shadow: true,
	            theme: 'Category1',
	            legend: {
	                position: 'right'
	            },
	            axes: [{
	                type: 'Numeric',
	                minimum: 0,
	                position: 'left',
	                fields: ['data1', 'data2', 'data3'],
	                title: 'Number of Hits',
	                minorTickSteps: 1,
	                grid: {
	                    odd: {
	                        opacity: 1,
	                        fill: '#ddd',
	                        stroke: '#bbb',
	                        'stroke-width': 0.5
	                    }
	                }
	            }, {
	                type: 'Category',
	                position: 'bottom',
	                fields: ['name'],
	                title: 'Month of the Year'
	            }],
	            series: [{
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                xField: 'name',
	                yField: 'data1',
	                markerConfig: {
	                    type: 'cross',
	                    size: 4,
	                    radius: 4,
	                    'stroke-width': 0
	                }
	            }, {
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                smooth: true,
	                xField: 'name',
	                yField: 'data2',
	                markerConfig: {
	                    type: 'circle',
	                    size: 4,
	                    radius: 4,
	                    'stroke-width': 0
	                }
	            }, {
	                type: 'line',
	                highlight: {
	                    size: 7,
	                    radius: 7
	                },
	                axis: 'left',
	                smooth: true,
	                fill: true,
	                xField: 'name',
	                yField: 'data3',
	                markerConfig: {
	                    type: 'circle',
	                    size: 4,
	                    radius: 4,
	                    'stroke-width': 0
	                }
	            }]
	        });
	    
	       //data for radder
        var chart1 = Ext.create('Ext.chart.Chart', {
            id: 'chartCmp1',
            xtype: 'chart',
            style: 'background:#fff',
            theme: 'Category2',
            animate: true,
            store: store1,
            insetPadding: 20,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Radial',
                position: 'radial',
                label: {
                    display: true
                }
            }],
            series: [{
                type: 'radar',
                xField: 'name',
                yField: 'data1',
                showInLegend: true,
                showMarkers: true,
                markerConfig: {
                    radius: 5,
                    size: 5
                },
                style: {
                    'stroke-width': 2,
                    fill: 'none'
                }
            },{
                type: 'radar',
                xField: 'name',
                yField: 'data2',
                showInLegend: true,
                showMarkers: true,
                markerConfig: {
                    radius: 5,
                    size: 5
                },
                style: {
                    'stroke-width': 2,
                    fill: 'none'
                }
            },{
                type: 'radar',
                xField: 'name',
                yField: 'data3',
                showMarkers: true,
                showInLegend: true,
                markerConfig: {
                    radius: 5,
                    size: 5
                },
                style: {
                    'stroke-width': 2,
                    fill: 'none'
                }
            }]
        });
	    
	    var chart2 = Ext.create('Ext.chart.Chart', {
            id: 'chartCmp2',
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            store: store1,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                grid: true,
                position: 'left',
                fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 1
                    }
                },
                minimum: 0,
                adjustMinimumByMajorUnit: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year',
                grid: true,
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'area',
                highlight: false,
                axis: 'left',
                xField: 'name',
                yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                style: {
                    opacity: 0.93
                }
            }]
        });
        
        // data for bar chart
        var chart3 = Ext.create('Ext.chart.Chart', {
            id: 'chartCmp3',
            xtype: 'chart',
            animate: true,
            shadow: true,
            store: store1,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1','data2'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            background: {
              gradient: {
                id: 'backgroundGradient',
                angle: 45,
                stops: {
                  0: {
                    color: '#ffffff'
                  },
                  100: {
                    color: '#eaf1f8'
                  }
                }
              }
            },
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
                  }
                },
                label: {
                  display: 'insideEnd',
                    field: 'data1',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                  'text-anchor': 'middle'
                },
                xField: 'name',
                yField: ['data1']
            }]
        });    

        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 5 5 5' // pad the layout from the window edges
            },
            items: [{
                id: 'app-header',
                xtype: 'box',
                region: 'north',
                height: 40,
                html: 'Ext Portal'
            },{
                xtype: 'container',
                region: 'center',
                layout: 'border',
                items: [{
                    id: 'app-options',
                    title: 'Options',
                    region: 'west',
                    animCollapse: true,
                    width: 200,
                    minWidth: 150,
                    maxWidth: 400,
                    split: true,
                    collapsible: true,
                    layout:{
                        type: 'accordion',
                        animate: true
                    },
                    items: [{
                        html: content,
                        title:'Navigation',
                        autoScroll: true,
                        border: false,
                        iconCls: 'nav'
                    },{
                        title:'Settings',
                        html: content,
                        border: false,
                        autoScroll: true,
                        iconCls: 'settings'
                    }]
                },{
                    id: 'app-portal',
                    xtype: 'portalpanel',
                    region: 'center',
                    items: [{
                        id: 'col-1',
                        items: [{
                            id: 'portlet-1',
                            title: 'Line Chart',
                            tools: this.getTools(),
                            height: 400,
                            layout: 'fit',
                            //items: Ext.create('Ext.app.GridPortlet'),
                            items: chart,   //线性图
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        },{
                            id: 'portlet-2',
                            title: 'Radder',
                            tools: this.getTools(),
                            height: 400,
                            items: chart1,
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    },{
                    	id: 'con',
                    	//xtype: 'panel',
                        width:450,
                        height:450,
                    	//layout: 'border',  //gmappanel的上层容器不能为border布局
                    	layout: 'fit',
                        items:{
                    		autoShow: true,
                    		layout: 'fit',
                    		title: 'GMap Window',
                    		closeAction: 'hide',
                    		width:450,
                    		height:450,
                    		border: false,
//                    		x: 40,
//                    		y: 60,
                    		items: 
                    		{
                    			xtype: 'gmappanel',
                    			center: {
                    				geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                    				marker: {title: 'Fenway Park'}
                    			},
                    			markers: [{
                    				lat: 42.339641,
                    				lng: -71.094224,
                    				title: 'Boston Museum of Fine Arts',
                    				listeners: {
                    					click: function(e){
                    					Ext.Msg.alert('It\'s fine', 'and it\'s art.');
                    					}
                    				}
                    			},{
                    				lat: 42.339419,
                    				lng: -71.09077,
                    				title: 'Northeastern University'
                    			}]
                    		}
                    	}
                    },{
                    	id: 'col-3',
                    	items: [{
                    		id: 'portlet-3',
                    		title: 'Area',
                    		tools: this.getTools(),
                    		height: 400,
                    		layout: 'fit',
                    		//items: Ext.create('Ext.app.GridPortlet'),
                    		items: chart2,
                    		listeners: {
                    			'close': Ext.bind(this.onPortletClose, this)
                    		}
                        },{
                            id: 'portlet-4',
                            title: 'Bar',
                            tools: this.getTools(),
                            height: 400,
                            layout: 'fit',
                            items: chart3,
                            listeners: {
                                'close': Ext.bind(this.onPortletClose, this)
                            }
                        }]
                    }]
                }
                ]
            }]
        });
        this.callParent(arguments);
    },

    onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },

    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
            msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});

Ext.onReady(function(){
	
	 
	    
    Ext.create('Ext.app.Portal');
});
