/**
 * @class Ext.app.PortalDropZone
 * @extends Ext.dd.DropTarget
 * Internal class that manages drag/drop for {@link Ext.app.PortalPanel}.
 */
Ext.define('Ext.app.PortalDropZone', {
    extend: 'Ext.dd.DropTarget',

    constructor: function(portal, cfg) {
        this.portal = portal;
        Ext.dd.ScrollManager.register(portal.body);
        Ext.app.PortalDropZone.superclass.constructor.call(this, portal.body, cfg);
        portal.body.ddScrollConfig = this.ddScrollConfig;
    },

    ddScrollConfig: {
        vthresh: 50,
        hthresh: -1,
        animate: true,
        increment: 200
    },

    createEvent: function(dd, e, data, col, c, pos) {
        return {
            portal: this.portal,
            panel: data.panel,
            columnIndex: col,
            column: c,
            position: pos,
            data: data,
            source: dd,
            rawEvent: e,
            status: this.dropAllowed
        };
    },

    notifyOver: function(dd, e, data) {
        var xy = e.getXY(),
            portal = this.portal,
            proxy = dd.proxy;

        // case column widths
        if (!this.grid) {
            this.grid = this.getGrid();
        }

        // handle case scroll where scrollbars appear during drag
        var cw = portal.body.dom.clientWidth;
        if (!this.lastCW) {
            // set initial client width
            this.lastCW = cw;
        } else if (this.lastCW != cw) {
            // client width has changed, so refresh layout & grid calcs
            this.lastCW = cw;
            //portal.doLayout();
            this.grid = this.getGrid();
        }

        // determine column
        var colIndex = 0,
            colRight = 0,
            cols = this.grid.columnX,
            len = cols.length,
            cmatch = false;

        for (len; colIndex < len; colIndex++) {
            colRight = cols[colIndex].x + cols[colIndex].w;
            if (xy[0] < colRight) {
                cmatch = true;
                break;
            }
        }
        // no match, fix last index
        if (!cmatch) {
            colIndex--;
        }

        // find insert position
        var overPortlet, pos = 0,
            h = 0,
            match = false,
            overColumn = portal.items.getAt(colIndex),
            portlets = overColumn.items.items,
            overSelf = false;

        len = portlets.length;

        for (len; pos < len; pos++) {
            overPortlet = portlets[pos];
            h = overPortlet.el.getHeight();
            if (h === 0) {
                overSelf = true;
            } else if ((overPortlet.el.getY() + (h / 2)) > xy[1]) {
                match = true;
                break;
            }
        }

        pos = (match && overPortlet ? pos : overColumn.items.getCount()) + (overSelf ? -1 : 0);
        var overEvent = this.createEvent(dd, e, data, colIndex, overColumn, pos);

        if (portal.fireEvent('validatedrop', overEvent) !== false && portal.fireEvent('beforedragover', overEvent) !== false) {

            // make sure proxy width is fluid in different width columns
            proxy.getProxy().setWidth('auto');
            if (overPortlet) {
                // deleted by tmxu to avoid moving the target chart
                //dd.panelProxy.moveProxy(overPortlet.el.dom.parentNode, match ? overPortlet.el.dom : null);
                //overPortlet.el.setAttributes
                var charts = Ext.ComponentQuery.query('chart[id="chartCmp3"]');
                //var nme = barchart.getName();
                var barchart = charts[0];
                var flag = Ext.ComponentQuery.is(barchart,'chart');
                //barchart.series.yField ='data2';
                //barchart.redraw();
                
                var newSeries = {
                    type: 'bar',
                    axis: 'bottom',
                    highlight: true,
                    xField: 'name',
                    yField: 'data2'
                };

                var temp = dd.id;
                var temp1 = overPortlet.id;
                var sourcechart, dropchart;




                //var portalpanel = Ext.ComponentQuery.query('portalpanel[id="app-portal"]');
                //var portalpanel = portal.items.get(1).items.get(1);
                var portalpanel = Ext.getCmp('app-portal');

                

                for(var i=0; i<portalpanel.items.length;i++) {

                    

                    if(portalpanel.items.get(i).id=='col-1'||portalpanel.items.get(i).id=='col-3') {

                        for(var j=0;j<portalpanel.items.get(i).items.length;j++) {
                            if(portalpanel.items.get(i).items.get(j).id==temp) 
                                sourcechart = portalpanel.items.get(i).items.get(j).items.get(0);
                            if(portalpanel.items.get(i).items.get(j).id==temp1) 
                                dropchart = portalpanel.items.get(i).items.get(j).items.get(0);
                        }
                        //if(portalpanel.items.get(i).)
                    }
                    
                }


                //var tempid = sourcechart.getItemId();
                //var config = { 
                //    title:'提示', 
                //    msg: tempid
                //    } 
                //Ext.Msg.show(config);
                
                
                

                barchart.series.add(newSeries);

                barchart.redraw();

                
                
                //barchart.setAttributes({
                //    style: 'background:#000',
                //},true);
            } else {
                dd.panelProxy.moveProxy(overColumn.el.dom, null);
            }

            this.lastPos = {
                c: overColumn,
                col: colIndex,
                p: overSelf || (match && overPortlet) ? pos : false
            };
            this.scrollPos = portal.body.getScroll();

            portal.fireEvent('dragover', overEvent);
            return overEvent.status;
        } else {
            return overEvent.status;
        }

    },

    notifyOut: function() {
        delete this.grid;
    },

    notifyDrop: function(dd, e, data) {
        delete this.grid;
        if (!this.lastPos) {
            return;
        }
        var c = this.lastPos.c,
            col = this.lastPos.col,
            pos = this.lastPos.p,
            panel = dd.panel,
            dropEvent = this.createEvent(dd, e, data, col, c, pos !== false ? pos : c.items.getCount());

        if (this.portal.fireEvent('validatedrop', dropEvent) !== false && 
            this.portal.fireEvent('beforedrop', dropEvent) !== false) {

            Ext.suspendLayouts();
            
            // make sure panel is visible prior to inserting so that the layout doesn't ignore it
            panel.el.dom.style.display = '';
            dd.panelProxy.hide();
            dd.proxy.hide();

            if (pos !== false) {
                // delete by tmxu to avoid modifying the layout
                //c.insert(pos, panel);
            } else {
                c.add(panel);
            }

            Ext.resumeLayouts(true);

            this.portal.fireEvent('drop', dropEvent);

            // scroll position is lost on drop, fix it
            var st = this.scrollPos.top;
            if (st) {
                var d = this.portal.body.dom;
                setTimeout(function() {
                    d.scrollTop = st;
                },
                10);
            }
        }
        
        delete this.lastPos;
        return true;
    },

    // internal cache of body and column coords
    getGrid: function() {
        var box = this.portal.body.getBox();
        box.columnX = [];
        this.portal.items.each(function(c) {
            box.columnX.push({
                x: c.el.getX(),
                w: c.el.getWidth()
            });
        });
        return box;
    },

    // unregister the dropzone from ScrollManager
    unreg: function() {
        Ext.dd.ScrollManager.unregister(this.portal.body);
        Ext.app.PortalDropZone.superclass.unreg.call(this);
    }
});
