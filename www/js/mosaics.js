var viewer;
var overlay;

var drawn_polygons = 0;
var drawn_lines = 0;
var drawn_points = 0;

var drawing_points = false;
var drawing_lines = false;
var drawing_polygon = false;
var last_point = null;
var polygon_points = [];

// ----------
App = {
    // ----------
    init: function(tiles_url, height, width) {
        console.log("initializing OSD with tiles_url: '" + tiles_url + "', height: " + height + ", width: " + width);

        viewer = OpenSeadragon({
            id: 'map',
            prefixUrl: './images/',
            tileSources: [{
                "Image": {
                    "xmlns":    "http://schemas.microsoft.com/deepzoom/2008",
                    "Url": tiles_url,
                    "Format":   "png", 
                    "Overlap":  "0", 
                    "TileSize": "256",
                    "Size": {
                        "Height": height,
                        "Width":  width
                    }
                }
            }]
        });

        overlay = viewer.svgOverlay();

        viewer.addHandler('canvas-click', function(event) {
            if (drawing_polygon) {
                // The canvas-click event gives us a position in web coordinates.
                var webPoint = event.position;

                // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.
                var viewportPoint = viewer.viewport.pointFromPixel(webPoint);

                // Convert from viewport coordinates to image coordinates.
                var imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);

                // Show the results.
                //$("#web-point").text("Web Point: " + webPoint.toString());
                $("#web-point").text("Web Point: " + webPoint.x + ", " + webPoint.y);
                $("#viewport-point").text("Viewport Point: " + viewportPoint.toString());
                $("#image-point").text("Image Point: " + imagePoint.toString());

                console.log(webPoint.toString(), viewportPoint.toString(), imagePoint.toString());
                //console.log(viewer.world.getItemAt(0).source.dimensions);

                var x = viewportPoint.x;
                var y = viewportPoint.y;
                polygon_points.push({"x": x, "y": y});

                var radius = 0.0025;

                var d3Circle = d3.select(overlay.node()).append("circle")
                    .style('fill', 'rgba(0,0,255,0.25)')
                    .attr("id", "svg-circle-" + drawn_points)
                    .attr("cx", x)
                    .attr("cy", y)
                    .attr("r", radius)
                    .attr("class", "svg-polygon-circle");

                drawn_points++;

                if (last_point == null) {
                    last_point = viewportPoint;
                } else {
                    var x1 = last_point.x;
                    var y1 = last_point.y;
                    var x2 = viewportPoint.x;
                    var y2 = viewportPoint.y;

                    var d3Line = d3.select(overlay.node()).append("line")
                        .style('stroke', 'rgba(0,0,255,0.75)')
                        .attr("id", "svg-polygon-line-" + drawn_lines)
                        .attr("x1", x1)
                        .attr("y1", y1)
                        .attr("x2", x2)
                        .attr("y2", y2)
                        .attr("stroke-width", 0.0005)
                        .attr("class", "svg-polygon-line")

                    drawn_lines++;
                
                    last_point = viewportPoint;
                }


                event.preventDefaultAction = true;

            } else if (drawing_points) {
                // The canvas-click event gives us a position in web coordinates.
                var webPoint = event.position;

                // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.
                var viewportPoint = viewer.viewport.pointFromPixel(webPoint);

                // Convert from viewport coordinates to image coordinates.
                var imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);

                // Show the results.
                //$("#web-point").text("Web Point: " + webPoint.toString());
                $("#web-point").text("Web Point: " + webPoint.x + ", " + webPoint.y);
                $("#viewport-point").text("Viewport Point: " + viewportPoint.toString());
                $("#image-point").text("Image Point: " + imagePoint.toString());

                console.log(webPoint.toString(), viewportPoint.toString(), imagePoint.toString());
                //console.log(viewer.world.getItemAt(0).source.dimensions);

                var x = viewportPoint.x;
                var y = viewportPoint.y;
                var radius = 0.005;

                var d3Circle = d3.select(overlay.node()).append("circle")
                    .style('fill', 'rgba(255,0,0,0.25)')
                    .attr("id", "svg-circle-" + drawn_points)
                    .attr("cx", x)
                    .attr("cy", y)
                    .attr("r", radius)
                    .attr("class", "svg-circle");

                drawn_points++;

                event.preventDefaultAction = true;

            } else if (drawing_lines) {
                // The canvas-click event gives us a position in web coordinates.
                var webPoint = event.position;

                // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.
                var viewportPoint = viewer.viewport.pointFromPixel(webPoint);

                // Convert from viewport coordinates to image coordinates.
                var imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);

                // Show the results.
                //$("#web-point").text("Web Point: " + webPoint.toString());
                $("#web-point").text("Web Point: " + webPoint.x + ", " + webPoint.y);
                $("#viewport-point").text("Viewport Point: " + viewportPoint.toString());
                $("#image-point").text("Image Point: " + imagePoint.toString());

                console.log(webPoint.toString(), viewportPoint.toString(), imagePoint.toString());
                //console.log(viewer.world.getItemAt(0).source.dimensions);

                if (last_point == null) {
                    last_point = viewportPoint;
                } else {
                    var x1 = last_point.x;
                    var y1 = last_point.y;
                    var x2 = viewportPoint.x;
                    var y2 = viewportPoint.y;

                    var d3Line = d3.select(overlay.node()).append("line")
                        .style('stroke', 'rgba(0,255,0,0.25)')
                        .attr("id", "svg-line-" + drawn_lines)
                        .attr("x1", x1)
                        .attr("y1", y1)
                        .attr("x2", x2)
                        .attr("y2", y2)
                        .attr("stroke-width", 0.001)
                        .attr("class", "svg-line")
                
                    drawn_lines++;
                    last_point = viewportPoint;
                }

                event.preventDefaultAction = true;
            }
        });
    }
};

// ----------
function initialize_openseadragon(tiles_url, height, width) {
    console.log("initializing app!");

    if ($("#map").length == 0) {
        //The map was not actually loaded and the div does not exist.
        //do not initialize openseadragon.
        return;
    }
    
    App.init(tiles_url, height, width);

    console.log("AFTER INIT!");

    $('#points-button').click(function() {
        $('.svg-circle').toggle();
    });


    $('#lines-button').click(function() {
        $('.svg-line').toggle();
    });

    $('#polygons-button').click(function() {
        $('.svg-polygon').toggle();
    });


    $('#draw-lines-button').click(function() {
        if ($(this).attr("aria-pressed") === "false") {
            $(this).text("Stop Drawing");

            drawing_lines = true;
            last_point = null;
        } else {
            $(this).text("Draw Lines");

            drawing_lines = false;
            last_point = null;
        }
    });

    $('#draw-points-button').click(function() {
        if ($(this).attr("aria-pressed") === "false") {
            $(this).text("Stop Drawing");

            drawing_points = true;
            drawing_polygon = false;
            drawing_lines = false;
        } else {
            $(this).text("Draw Points");

            drawing_points = false;
        }
    });

    $('#draw-polygon-button').click(function() {
        if ($(this).attr("aria-pressed") === "false") {
            $(this).text("Close Polygon");

            drawing_polygon = true;
            last_point = null;
        } else {
            $(this).text("Draw Polygon");

            var points_str = "";
            for (var i = 0; i < polygon_points.length; i++) {
                if (i != 0) points_str += " ";
                points_str += polygon_points[i].x + "," + polygon_points[i].y;
            }

            console.log(points_str);

            var d3Polygon = d3.select(overlay.node()).append("polygon")
                .style('fill', 'rgba(0,0,255,0.25)')
                .attr("id", "svg-polygon-" + drawn_polygons)
                .attr("points", points_str)
                .attr("stroke-width", 0.001)
                .attr("class", "svg-polygon")

            drawn_polygons++;

            $(".svg-polygon-line").remove();
            $(".svg-polygon-circle").remove();

            polygon_points = [];

            drawing_polygon = false;
            last_point = null;
        }
    });
}
