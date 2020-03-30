
const MESH_X = 410 - 50;
const MESH_Y = -140//75;

const MESH_WIDTH_GRID = 35;

const MESH_WIDTH = MESH_WIDTH_GRID * 25;
const MESH_HEIGHT = MESH_WIDTH_GRID * 25;

function draw_mesh_youbike(svg_w_px, svg_h_px, 
                           svg_w_px_legend, svg_h_px_legend, 
                           id_svg_main, id_svg_legend, 
                           progress, language) {

    console.log("draw_mesh_youbike")

    dataset_mesh = dataset_mesh_youbike

    if (dataset_mesh.length <= 0) 
        return

    let min_x = d3.min(dataset_mesh, function (d) { return d.index_x; }); 
    let max_x = d3.max(dataset_mesh, function (d) { return d.index_x; }); 
    let min_y = d3.min(dataset_mesh, function (d) { return d.index_y; }); 
    let max_y = d3.max(dataset_mesh, function (d) { return d.index_y; }); 

    let max_xy = d3.max([max_x, max_y], function (d) { return d; }); 

    //console.log(min_x, max_x, min_y, max_y, max_xy);

    let scaleX = d3.scaleLinear()
                    .domain([min_x, max_xy])
                    .range([MESH_X, MESH_X + MESH_WIDTH])

    let scaleY = d3.scaleLinear()
                    .domain([min_y, max_xy])
                    .range([MESH_Y + MESH_HEIGHT, MESH_Y])

    let circle_radius = (scaleX(min_x + 1) - scaleX(min_x)) / 2

    // --------------------------------------------------------------------------------- 

    draw_mesh_legend_youbike(dataset_mesh, svg_w_px_legend, svg_h_px_legend, id_svg_legend, language)

    d3.select(id_svg_main + " > svg").remove();

    let svg = d3.select(id_svg_main)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);
    
    // --------------------------------------------------------------------------------- 

    let scaleProgress_opacity = d3.scaleLinear()
                                    .domain([0, 0.1, 0.9, 1])
                                    .range([0, 1, 1, 0])

    let opacity = scaleProgress_opacity(progress)
    
    // ---------------------------------------------------------------------------------

    // map
    {
      let d3_curve_type = d3.curveBundle.beta(1)

      let line_mountain = d3.line()
                              .x(function(d) { return scaleX(d[0]); })
                              .y(function(d) { return scaleY(d[1]); })
                                .curve(d3_curve_type);//.curve(d3.curveLinear);

      svg.append("defs")
            .append("pattern")
            .attr("id", "pattern_mountain")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 30)
            .attr("height", 30)
            .attr("patternUnits", "userSpaceOnUse")
              .append("path")
                .attr("d", "m 0 10 l 3 -3 l 3 3")
                .attr("stroke", COLOR_GREEN) 
                .attr("stroke-width", 1) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

      svg.append("path")
              .attr("id", "id_path_mountain")
              .attr("d", line_mountain(path_mountain_1_youbike))
              .style("fill", "url(#pattern_mountain)")
              .attr("fill-opacity", opacity) 

      svg.append("path")
              .attr("id", "id_path_mountain")
              .style("fill", COLOR_WHITE)
              .attr("d", line_mountain(path_mountain_2_youbike))
              .style("fill", "url(#pattern_mountain)")
              .attr("fill-opacity", opacity) 

       // ---------------------------------------------------------------------------------

        let line_contour = d3.line()
                                .x(function(d) { return scaleX(d[0]); })
                                .y(function(d) { return scaleY(d[1]); })
                                .curve(d3_curve_type)

        svg.append("path")
                .attr("id", "id_path_contour")
                .attr("d", line_contour(path_contour_youbike))
                .attr("stroke", COLOR_GREEN) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        // ---------------------------------------------------------------------------------

       let image_width = (scaleX(1) - scaleX(0)) * 0.6
       let image_height = (scaleY(0) - scaleY(1)) * 0.6

        svg.append("image")
            .attr("href", "image/airport.gif") 
            .attr("x", scaleX(10) - (image_width / 2))
            .attr("y", scaleY(11) - (image_height / 2))
            .attr("width", image_width + "px") 
            .attr("height", image_height + "px") 
            .attr("opacity", opacity * 0.4) 

        // ---------------------------------------------------------------------------------

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", scaleX(3))
                .attr("y", scaleY(14.5) - 6)
                .attr("stroke-opacity", 0) 
                .attr("fill", COLOR_BLUE)
                .attr("fill-opacity", opacity) 
                .text(getText_KeelungRiver(g_language))

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", scaleX(4.5))
                .attr("y", scaleY(4.5) - 6)
                .attr("stroke-opacity", 0) 
                .attr("fill", COLOR_BLUE)
                .attr("fill-opacity", opacity) 
                .text(getText_TamsuiRiver(g_language))

        svg.append("text")
                .attr("id", "i_text_airport")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", scaleX(10))
                .attr("y", scaleY(10.5) + 6)
                .attr("stroke-opacity", 0) 
                .attr("fill", COLOR_WHITE)
                .attr("fill-opacity", opacity * 0.4) 
                .text(getText_TSA(g_language))

      // ---------------------------------------------------------------------------------

        let line_river = d3.line()
              .x(function(d) { return scaleX(d[0]); })
              .y(function(d) { return scaleY(d[1]); })
              .curve(d3_curve_type);//.curve(d3.curveLinear);

        svg.append("path")
                .attr("id", "id_path_river")
                .attr("d", line_river(path_river_1_youbike))
                .attr("stroke", COLOR_BLUE) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        svg.append("path")
                .attr("id", "id_path_river")
                .attr("d", line_river(path_river_2_youbike))
                .attr("stroke", COLOR_BLUE) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        // ----------

        svg.append("line")
                .attr("x1", scaleX(2.5))
                .attr("y1", scaleY(1.5))
                .attr("x2", scaleX(3.5))
                .attr("y2", scaleY(1.5))
                .attr("stroke", COLOR_GREY) 
                .attr("stroke-width", 1) 
                .attr("stroke-opacity", opacity) 
                .attr("fill-opacity", 0) 

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", scaleX(3))
                .attr("y", scaleY(1.5) - 5)
                .attr("stroke-opacity", 0) 
                .attr("fill", COLOR_GREY)
                .attr("fill-opacity", opacity) 
                .text("1" + getText_KM(g_language))
    }
    
    // ---------------------------------------------------------------------------------

    let mesh_width = Math.abs(scaleX(1) - scaleX(0))
    let mesh_height = Math.abs(scaleY(1) - scaleY(0))

    svg.append("circle")
            .attr("cx", scaleX(6))
            .attr("cy", scaleY(8))
            .attr("r", mesh_width / 2)
            .attr("width", mesh_width)
            .attr("height", mesh_height)
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", opacity * 0.2) 
            .attr("stroke-opacity", 0) 

    svg.append("circle")
            .attr("cx", scaleX(11))
            .attr("cy", scaleY(7))
            .attr("r", mesh_width / 2)
            .attr("width", mesh_width)
            .attr("height", mesh_height)
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", opacity * 0.2) 
            .attr("stroke-opacity", 0) 

    svg.append("circle")
            .attr("cx", scaleX(8))
            .attr("cy", scaleY(5))
            .attr("r", mesh_width / 2)
            .attr("width", mesh_width)
            .attr("height", mesh_height)
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", opacity * 0.2) 
            .attr("stroke-opacity", 0) 

    // ---------------------------------------------------------------------------------

    {
        // Features of the annotation
         let annotations = [
          {
            type: d3.annotationCalloutElbow,
            note: {
              label: getText_TaipeiMainStation(g_language),
              title: "",
              align: "right",  // try right or left
              wrap: mesh_width * 3,  // try something smaller to see text split in several lines
              padding: 0   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX(5.5),
            y: scaleY(8.5),
            dx: -(mesh_width * 1.5),
            dy: -(mesh_height * 1.5)
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("id", "i_landmark_taipei_main_station")
            .attr("class", "annotation-group c_content_m")
                .style('opacity', 0)
                .call(makeAnnotations)
    }
    
    {
        // Features of the annotation
         let annotations = [
          {
            type: d3.annotationCalloutElbow,
            note: {
              label: getText_Taipei101(g_language),
              title: "",
              align: "left",  // try right or left
              wrap: mesh_width * 3,  // try something smaller to see text split in several lines
              padding: 3   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX(11.5),
            y: scaleY(6.5),
            dx: (mesh_width * 4.5),
            dy: (mesh_height * 2.5)
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("id", "i_landmark_taipei_101")
            .attr("class", "annotation-group c_content_m")
                .style('opacity', 0)
                .call(makeAnnotations)
    }
    
    {
        // Features of the annotation
         let annotations = [
          {
            type: d3.annotationCalloutElbow,
            note: {
              label: getText_NTU(g_language),
              title: "",
              align: "right",  // try right or left
              wrap: mesh_width * 3,  // try something smaller to see text split in several lines
              padding: 3   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX(7.5),
            y: scaleY(4.5),
            dx: -(mesh_width * 1.5),
            dy:  (mesh_height * 0.5)
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("id", "i_landmark_ntu")
            .attr("class", "annotation-group c_content_m")
                .style('opacity', 0)
                .call(makeAnnotations)
    }

    // ---------------------------------------------------------------------------------

    let max_path_end = d3.max(dataset_mesh, function (d) { return d.path_end; }); 

    let scaleCircle_Count = d3.scaleLinear()
                                .domain([0, max_path_end])
                                .range([0, Math.pow(circle_radius, 2) * Math.PI]);

    let scaleCircle_Opacity = d3.scaleLinear()
                                .domain([0, max_path_end])
                                .range([0.2, 1]);

    let circle = scaleCircle_Count(max_path_end);

    let r = Math.sqrt(circle / Math.PI);

    let height = scaleX(1) - scaleX(0);
    let width = scaleY(0) - scaleY(1);

    // ---------------------------------------------------------------------------------

    svg.selectAll("circle.c_circle_path_end")       
       .data(dataset_mesh.filter(function(d) { if (d.station_count > 0) return d }))
       .enter()
        .append("circle")
            .attr("id", function (d) { return "i_circle_path_end_" + d.mesh_id })
            .attr("class", "c_circle_path_end")
            .attr("cx", function (d) { return scaleX(d.index_x) })
            .attr("cy", function (d) { return scaleY(d.index_y) })
            .attr("r", function (d) {

                let circle = scaleCircle_Count(d.path_end);

                let r = Math.sqrt(circle / Math.PI);

                return r;
            })
            .attr("stroke", COLOR_WHITE)
            .attr("stroke-opacity", function (d) { return opacity * scaleCircle_Opacity(d.path_end) })
            .attr("stroke-width", 0.5)
            .attr("fill-opacity", 0) 

    // --------------

    svg.selectAll("circle.c_circle_path_relative")        
       .data(dataset_mesh.filter(function(d) { if (d.station_count > 0) return d }))
       .enter()
        .append("circle")
            .attr("id", function (d) { return "i_circle_path_relative_" + d.mesh_id })
            .attr("class", "c_circle_path_relative")
            .attr("cx", function (d) { return scaleX(d.index_x) })
            .attr("cy", function (d) { return scaleY(d.index_y) })
            .attr("r", 0)
            .attr("stroke", COLOR_RED)
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", opacity * 0.8)
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", 0)

    // --------------

    svg.selectAll("circle.c_circle_path")   
       .data(dataset_mesh.filter(function(d) { if (d.station_count > 0) return d }))
       .enter()
        .append("circle")
            .attr("id", function (d) { return "i_circle_path_" + d.mesh_id })
            .attr("class", "c_circle_path")
            .attr("cx", function (d) { return scaleX(d.index_x) })
            .attr("cy", function (d) { return scaleY(d.index_y) })
            .attr("r", 0)
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", opacity * 0.8)

    // --------------

    svg.selectAll("text.c_text_path_end")   
       .data(dataset_mesh.filter(function(d) { if (d.station_count > 0) return d }))
       .enter()
        .append("text")
            .attr("id", function (d) { return "i_text_path_end_" + d.mesh_id })
            .attr("class", "c_text_path_end c_content_m c_text_anchor_middle")
            .attr("x", function (d) { return scaleX(d.index_x)})
            .attr("y", function (d) { return scaleY(d.index_y) + (height / 3)})
            .attr("fill", COLOR_WHITE)
            //.attr("fill-opacity", opacity) 
            .attr("fill-opacity", function (d) { return opacity * scaleCircle_Opacity(d.path_end) })
            .text(function (d) { 

                let count = (d.path_end >= 1000) ? parseInt(d.path_end / 1000) + "K" : d.path_end

                return count 
            }) 

    // --------------

    svg.selectAll("text.c_text_path")   
       .data(dataset_mesh.filter(function(d) { if (d.station_count > 0) return d }))
       .enter()
        .append("text")
            .attr("id", function (d) { return "i_text_path_" + d.mesh_id })
            .attr("class", "c_text_path c_content_m c_text_anchor_middle")
            .attr("x", function (d) { return scaleX(d.index_x)})
            .attr("y", function (d) { return scaleY(d.index_y) + (height / 3)})
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", opacity * 0.8)
            .text("") 

    // ---------------------------------------------------------------------------------

    svg.selectAll("rect.c_rect_path_background")  
       .data(dataset_mesh.filter(function(d) { if (d.station_count == 0) return d }))
       .enter()
        .append("rect")
            .attr("class", "c_rect_path_background")
            .attr("x", function (d) { return (scaleX(d.index_x) - (width / 2)) })
            .attr("y", function (d) { return (scaleY(d.index_y) - (height / 2)) })
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", 0) 
            .on("mouseover", function(d) {

                for (index in dataset_mesh) {

                    if (dataset_mesh[index].path_end > 0) {

                        d3.select("#i_text_path_end_" + dataset_mesh[index].mesh_id)
                                 .attr("fill-opacity", opacity * scaleCircle_Opacity(dataset_mesh[index].path_end))
                                 .text(parseInt(dataset_mesh[index].path_end / 1000) + "K")
                    }
                }
            })

    svg.selectAll("rect.c_rect_path")  
       .data(dataset_mesh.filter(function(d) { if (d.station_count > 0) return d }))
       .enter()
        .append("rect")
            .attr("class", "c_rect_path_select")
            .attr("x", function (d) { return (scaleX(d.index_x) - (width / 2)) })
            .attr("y", function (d) { return (scaleY(d.index_y) - (height / 2)) })
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", 0) 
            .on("mouseover", function(d, i) {

                if (d.station_count <= 0)
                    return

                let end = d.end

                // -------------------------------------

                for (let i = 0; i < end.length; i++) {

                    let circle = scaleCircle_Count(end[i].count);

                    let r = Math.sqrt(circle / Math.PI);

                    d3.select("#i_circle_path_" + end[i].mesh_id)
                            .attr("r", r)
                }

                // -------------------------------------

                let min_end = d3.min(end, function (d) { return d.count; }); 
                let max_end = d3.max(end, function (d) { return d.count; }); 

                let scaleCircle_count_relative = d3.scaleLinear()
                                                      .domain([min_end, max_end])
                                                      .range([0, Math.pow(circle_radius, 2) * Math.PI]);

                let scaleCircle_opacity_relative = d3.scaleLinear()
                                                      .domain([0, max_end])
                                                      .range([0.2, 1]);

                for (let i = 0; i < end.length; i++) {

                    if (end[i].count == 0)
                        continue

                    let circle = scaleCircle_count_relative(end[i].count)

                    let r = Math.sqrt(circle / Math.PI)

                    d3.select("#i_circle_path_relative_" + end[i].mesh_id)
                            .attr("stroke-opacity", scaleCircle_opacity_relative(end[i].count))
                            .attr("r", r)

                    count = (end[i].count >= 1000) ? FORMAT_K_2(end[i].count) : end[i].count

                    d3.select("#i_text_path_" + end[i].mesh_id)
                            .attr("fill-opacity", scaleCircle_opacity_relative(end[i].count))
                            .text(count)
                }

                // -------------------------------------

                {
                    d3.select("#i_circle_path_relative_" + d.mesh_id)
                            .attr("fill-opacity", 0.2)
                }

                // -------------------------------------

                d3.selectAll(".c_circle_path_end")
                        .attr("stroke-opacity", 0) 

                d3.selectAll(".c_text_path_end")
                        .attr("fill-opacity", 0) 
                        .text("")

                // -------------------------------------

                d3.select("#i_text_path_relative_label")
                        .text(FORMAT_K(max_end)) 

                // -------------------------------------

                if (d.index_x == 6 && d.index_y == 8) 
                    d3.select("#i_landmark_taipei_main_station").style('opacity', opacity * 0.4) 

                if (d.index_x == 11 && d.index_y == 7) 
                    d3.select("#i_landmark_taipei_101").style('opacity', opacity * 0.4) 

                if (d.index_x == 8 && d.index_y == 5) 
                    d3.select("#i_landmark_ntu").style('opacity', opacity * 0.4) 
            })
            .on("mouseout", function(d) {

                for (index in dataset_mesh) {

                    if (dataset_mesh[index].path_end > 0) {

                        d3.select("#i_circle_path_end_" + dataset_mesh[index].mesh_id)
                                 .attr("stroke-opacity", opacity * scaleCircle_Opacity(dataset_mesh[index].path_end))

                        let count = (dataset_mesh[index].path_end >= 1000) ? parseInt(dataset_mesh[index].path_end / 1000) + "K" : dataset_mesh[index].path_end

                        d3.select("#i_text_path_end_" + dataset_mesh[index].mesh_id)
                                 .attr("fill-opacity", opacity * scaleCircle_Opacity(dataset_mesh[index].path_end))
                                 .text(count)
                    }
                }

                d3.selectAll(".c_circle_path")
                        .attr("r", 0)

                d3.selectAll(".c_circle_path_relative")
                        .attr("r", 0)

                d3.selectAll(".c_text_path")
                        .text("")

                d3.select("#i_circle_path_relative_" + d.mesh_id)
                        .attr("fill-opacity", 0)

                // -------------------------------------

                if (d.index_x == 6 && d.index_y == 8) 
                    d3.select("#i_landmark_taipei_main_station").style('opacity', 0) 

                if (d.index_x == 11 && d.index_y == 7) 
                    d3.select("#i_landmark_taipei_101").style('opacity', 0) 

                if (d.index_x == 8 && d.index_y == 5) 
                    d3.select("#i_landmark_ntu").style('opacity', 0) 
            })
            .on("click", function(d) {

                console.log(d);
            })

    // ---------------------------------------------------------------------------------
    /*
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", svg_h_px)
        .attr("x2", svg_w_px)
        .attr("y2", svg_h_px)
        .attr("stroke", "gray")
        .attr("stroke-width", "1");
        */
}

// -------------------------------------------------

const LEGEND_MESH_X = 0;
const LEGEND_MESH_Y = 0;

const LEGEND_MESH_WIDTH = 300 - LEGEND_MESH_X;

const LEGEND_MESH_WIDTH_ITEM = 30;
const LEGEND_MESH_HEIGHT_ITEM = 10;

const LEGEND_MESH_WIDTH_GAP = 10;
const LEGEND_MESH_HEIGHT_GAP = 10;

const LEGEND_MESH_X_PATTERN = LEGEND_MESH_X;
const LEGEND_MESH_X_TEXT = LEGEND_MESH_X_PATTERN + LEGEND_MESH_WIDTH_GAP + LEGEND_MESH_WIDTH_ITEM;

const LEGEND_MESH_HEIGHT_MOUNTAIN = LEGEND_MESH_HEIGHT_ITEM;
//const LEGEND_MESH_HEIGHT_PLAIN = LEGEND_MESH_HEIGHT_ITEM;
const LEGEND_MESH_HEIGHT_RIVER = LEGEND_MESH_HEIGHT_ITEM;
const LEGEND_MESH_HEIGHT_LANDMARK = LEGEND_MESH_HEIGHT_ITEM;
const LEGEND_MESH_HEIGHT_PATH_END = LEGEND_MESH_HEIGHT_ITEM;
const LEGEND_MESH_HEIGHT_PATH = LEGEND_MESH_HEIGHT_ITEM;
const LEGEND_MESH_HEIGHT_PATH_RELATIVE = LEGEND_MESH_HEIGHT_ITEM;

const LEGEND_MESH_Y_MOUNTAIN        = LEGEND_MESH_Y;
//const LEGEND_MESH_Y_PLAIN           = LEGEND_MESH_Y_MOUNTAIN + LEGEND_MESH_HEIGHT_MOUNTAIN + LEGEND_MESH_HEIGHT_GAP;
const LEGEND_MESH_Y_RIVER           = LEGEND_MESH_Y_MOUNTAIN + LEGEND_MESH_HEIGHT_MOUNTAIN + LEGEND_MESH_HEIGHT_GAP;//= LEGEND_MESH_Y_PLAIN + LEGEND_MESH_HEIGHT_PLAIN + LEGEND_MESH_HEIGHT_GAP;
const LEGEND_MESH_Y_LANDMARK        = LEGEND_MESH_Y_RIVER + LEGEND_MESH_HEIGHT_RIVER + LEGEND_MESH_HEIGHT_GAP;
const LEGEND_MESH_Y_PATH_END        = LEGEND_MESH_Y_LANDMARK + LEGEND_MESH_HEIGHT_LANDMARK + (LEGEND_MESH_HEIGHT_GAP * 2);
const LEGEND_MESH_Y_PATH            = LEGEND_MESH_Y_PATH_END + LEGEND_MESH_HEIGHT_PATH_END + (LEGEND_MESH_HEIGHT_GAP * 2);
const LEGEND_MESH_Y_PATH_RELATIVE   = LEGEND_MESH_Y_PATH + LEGEND_MESH_HEIGHT_PATH + (LEGEND_MESH_HEIGHT_GAP * 2);
const LEGEND_MESH_Y_END             = LEGEND_MESH_Y_PATH_RELATIVE + LEGEND_MESH_HEIGHT_PATH_RELATIVE + LEGEND_MESH_HEIGHT_GAP;

function draw_mesh_legend_youbike(dataset_mesh, svg_w_px, svg_h_px, id_svg, language) {

    console.log("draw_mesh_legend_youbike");

    // ---------------------------------------------------------------------------------

    if (dataset_mesh.length <= 0) 
        return

    let min_x = d3.min(dataset_mesh, function (d) { return d.index_x; }); 
    let max_x = d3.max(dataset_mesh, function (d) { return d.index_x; }); 
    let min_y = d3.min(dataset_mesh, function (d) { return d.index_y; }); 
    let max_y = d3.max(dataset_mesh, function (d) { return d.index_y; }); 

    let max_xy = d3.max([max_x, max_y], function (d) { return d; }); 

    let max_station_count = d3.max(dataset_mesh, function (d) { return d.station_count; }); 

    let min_parking_amount = d3.min(dataset_mesh, function (d) { if (d.parking_amount > 0) return d.parking_amount; }); 
    let max_parking_amount = d3.max(dataset_mesh, function (d) { return d.parking_amount; }); 

    //console.log(min_x, max_x, min_y, max_y, max_xy, max_station_count, min_parking_amount, max_parking_amount);

    let scaleX = d3.scaleLinear()
                    .domain([min_x, max_xy])
                    .range([MESH_X, MESH_X + MESH_WIDTH])

    let scaleY = d3.scaleLinear()
                    .domain([min_y, max_xy])
                    .range([MESH_Y + MESH_HEIGHT, MESH_Y])

    let circle_radius = (scaleX(min_x + 1) - scaleX(min_x)) / 2

    let circle_radius_station_count = (scaleX(min_x + 1) - scaleX(min_x)) / 10
    let circle_radius_parking_amount = (scaleX(min_x + 1) - scaleX(min_x)) / 2

    let scaleCircle_parking_amount = d3.scaleLinear()
                                        .domain([0, max_parking_amount])
                                        .range([0, Math.pow(circle_radius_parking_amount, 2) * Math.PI]);

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg + " > svg").remove();

    let svg = d3.select(id_svg)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);

    // ---------------------------------------------------------------------------------

    let max_path_end = d3.max(dataset_mesh, function (d) { return d.path_end; }); 

    let scaleCircle_Count = d3.scaleLinear()
                                .domain([0, max_path_end])
                                .range([0, Math.pow(circle_radius, 2) * Math.PI]);

    let circle = scaleCircle_Count(max_path_end);

    let r = Math.sqrt(circle / Math.PI);

    let height = scaleX(1) - scaleX(0);
    let width = scaleY(0) - scaleY(1);

    // --------------------------------------------------------------------------------- 

    svg.append("defs")
        .append("pattern")
        .attr("id", "pattern_mountain_legend")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("patternUnits", "userSpaceOnUse")
          .append("path")
            .attr("d", "m 0 6 l 2 -2 l 2 2")
            .attr("stroke", "#48C9B0") 
            .attr("stroke-width", 1) 
            .attr("stroke-opacity", 1)
            .attr("fill-opacity", 0)

    svg.append("rect")
            .attr("x", LEGEND_MESH_X_PATTERN + (STROKE_WIDTH / 2))
            .attr("y", LEGEND_MESH_Y_MOUNTAIN + (STROKE_WIDTH / 2))
            .attr("width", LEGEND_MESH_WIDTH_ITEM - (STROKE_WIDTH / 2))
            .attr("height", LEGEND_MESH_HEIGHT_ITEM - (STROKE_WIDTH / 2))
            .attr("rx", RECT_ROUND)
            .attr("ry", RECT_ROUND)
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", STROKE_WIDTH / 2) 
            .attr("stroke-opacity", 1) 
            .style("fill", "url(#pattern_mountain_legend)")
            .attr("fill-opacity", 1) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_MOUNTAIN + LEGEND_MESH_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_GREEN)
            .attr("fill-opacity", 1) 
            .text(getText_Mountain(g_language).toUpperCase())

    // -----

    svg.append("line")
            .attr("x1", LEGEND_MESH_X_PATTERN)
            .attr("y1", LEGEND_MESH_Y_RIVER + (LEGEND_MESH_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_MESH_X_PATTERN + LEGEND_MESH_WIDTH_ITEM)
            .attr("y2", LEGEND_MESH_Y_RIVER + (LEGEND_MESH_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_RIVER + LEGEND_MESH_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", 1) 
            .text(getText_River(g_language).toUpperCase())

    // -----

    r = LEGEND_MESH_WIDTH_ITEM / 3

    svg.append("circle")
            .attr("cx", LEGEND_MESH_X_PATTERN + (LEGEND_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_MESH_Y_LANDMARK + r)
            .attr("r", r)
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", 0.2) 
            .attr("stroke-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_LANDMARK + r + 3)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_WHITE)
            .attr("fill-opacity", 0.4) 
            .text(getText_Landmark(g_language).toUpperCase())

    // -----

    r = LEGEND_MESH_WIDTH_ITEM / 3

    svg.append("circle")
            .attr("cx", LEGEND_MESH_X_PATTERN + (LEGEND_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_MESH_Y_PATH_END + r)
            .attr("r", r)
            .attr("stroke", COLOR_WHITE) 
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_PATH_END + r + 3)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_WHITE)
            .attr("fill-opacity", 1) 
            .text(getText_NumberOfTrips(g_language).toUpperCase())

    // -----

    r = LEGEND_MESH_WIDTH_ITEM / 3

    svg.append("circle")
            .attr("id", "i_circle_label_path")
            .attr("cx", LEGEND_MESH_X_PATTERN + (LEGEND_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_MESH_Y_PATH + r)
            .attr("r", r)
            .attr("fill", COLOR_RED) 
            .attr("fill-opacity", 0.8) 
            .attr("stroke-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_PATH + LEGEND_MESH_HEIGHT_GAP - 2)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", 1) 
            .text(getText_TripsNumberOfTheSelectedArea(g_language).toUpperCase())

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_PATH + LEGEND_MESH_HEIGHT_GAP + 12)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", 1)  
            .text("(" + getText_CompareWithAll(g_language).toUpperCase() + ")")

    // -----

    r = LEGEND_MESH_WIDTH_ITEM / 3

    svg.append("circle")
            .attr("cx", LEGEND_MESH_X_PATTERN + (LEGEND_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_MESH_Y_PATH_RELATIVE  + r)
            .attr("r", r)
            .attr("stroke", COLOR_RED) 
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 0.8) 
            .attr("fill-opacity", 0)

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_PATH_RELATIVE + LEGEND_MESH_HEIGHT_GAP - 2)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", 1) 
            .text(getText_TripsNumberOfTheSelectedArea(g_language).toUpperCase())

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_MESH_X_TEXT)
            .attr("y", LEGEND_MESH_Y_PATH_RELATIVE + LEGEND_MESH_HEIGHT_GAP + 12)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", 1) 
            .text("(" + getText_CompareWithItself(g_language).toUpperCase() + ")")
}
