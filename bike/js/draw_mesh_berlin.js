
const BERLIN_MESH_X = 410 - 60;//400 - 30;
const BERLIN_MESH_Y = -40;//0;//-210//75;

const BERLIN_MESH_WIDTH_GRID = 35;

const BERLIN_MESH_WIDTH = BERLIN_MESH_WIDTH_GRID * 18;//14;
const BERLIN_MESH_HEIGHT = BERLIN_MESH_WIDTH_GRID * 18;//14;

function draw_mesh_berlin(svg_w_px, svg_h_px, 
                          svg_w_px_legend, svg_h_px_legend, 
                          id_svg_main, id_svg_legend, 
                          progress, language) {

    console.log("draw_mesh_berlin")

    dataset_mesh = dataset_mesh_berlin

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
                    .range([BERLIN_MESH_X, BERLIN_MESH_X + BERLIN_MESH_WIDTH])

    let scaleY = d3.scaleLinear()
                    .domain([min_y, max_xy])
                    .range([BERLIN_MESH_Y + BERLIN_MESH_HEIGHT, BERLIN_MESH_Y])

    let circle_radius = (scaleX(min_x + 1) - scaleX(min_x)) / 2

    // --------------------------------------------------------------------------------- 

    draw_mesh_legend_berlin(dataset_mesh, svg_w_px_legend, svg_h_px_legend, id_svg_legend)

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
      let d3_curve_type = d3.curveBasisClosed

      let line_mountain = d3.line()
                              .x(function(d) { return scaleX(d[0]); })
                              .y(function(d) { return scaleY(d[1]); })
                                .curve(d3_curve_type);//.curve(d3.curveLinear);

      svg.append("path")
              .attr("d", line_mountain(path_park_1_berlin))
              .attr("stroke-opacity", 0) 
              .style("fill", COLOR_GREEN)
              .attr("fill-opacity", 0.2 * opacity) 

      svg.append("path")
              .style("fill", COLOR_WHITE)
              .attr("d", line_mountain(path_park_2_berlin))
              .attr("stroke-opacity", 0) 
              .style("fill", COLOR_GREEN)
              .attr("fill-opacity", 0.2 * opacity) 

      // ---------------------------------------------------------------------------------

        d3_curve_type = d3.curveBundle.beta(1)

        let line_river = d3.line()
              .x(function(d) { return scaleX(d[0]); })
              .y(function(d) { return scaleY(d[1]); })
              .curve(d3_curve_type)

        svg.append("path")
                .attr("d", line_river(path_river_1_berlin))
                .attr("stroke", COLOR_BLUE) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        svg.append("path")
                .attr("d", line_river(path_river_2_berlin))
                .attr("stroke", COLOR_BLUE) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        svg.append("path")
                .attr("d", line_river(path_river_3_berlin))
                .attr("stroke", COLOR_BLUE) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        svg.append("path")
                .attr("d", line_river(path_river_4_berlin))
                .attr("stroke", COLOR_BLUE) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

       // ---------------------------------------------------------------------------------
      
        d3_curve_type = d3.curveBasisClosed

        let line_contour = d3.line()
                                .x(function(d) { return scaleX(d[0]); })
                                .y(function(d) { return scaleY(d[1]); })
                                .curve(d3_curve_type);

        svg.append("path")
                .attr("d", line_contour(path_contour_berlin))
                .attr("stroke", COLOR_BROWN) 
                .attr("stroke-width", STROKE_WIDTH) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        svg.append("path")
                .attr("d", line_contour(path_contour_berlin))
                .attr("stroke", COLOR_MAIN) 
                .attr("stroke-width", 1.5) 
                .attr("stroke-opacity", opacity)
                .attr("fill-opacity", 0)

        // ----------

        svg.append("line")
                .attr("x1", scaleX(2.5))
                .attr("y1", scaleY(0.5))
                .attr("x2", scaleX(3.5))
                .attr("y2", scaleY(0.5))
                .attr("stroke", COLOR_GREY) 
                .attr("stroke-width", 1) 
                .attr("stroke-opacity", opacity) 
                .attr("fill-opacity", 0) 

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", scaleX(3))
                .attr("y", scaleY(0.5) - 5)
                .attr("stroke-opacity", 0) 
                .attr("fill", COLOR_GREY)
                .attr("fill-opacity", opacity) 
                .text("1" + getText_KM(g_language))
    }
    
    // ---------------------------------------------------------------------------------

    svg.append("text")
            .attr("id", "i_text_tiergarten")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", scaleX(6))
            .attr("y", scaleY(6.5) + 12)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_GREEN)
            .attr("fill-opacity", 0.5) //.attr("fill-opacity", 0) 
            .text(getText_Tiergarten(g_language))

    svg.append("text")
            .attr("id", "i_text_tempelhofer_feld")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", scaleX(9))
            .attr("y", scaleY(2.5) + 12)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_GREEN)
            .attr("fill-opacity", 0.5) //.attr("fill-opacity", 0) 
            .text(getText_TempelhoferFeld(g_language))

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", scaleX(10.5))
            .attr("y", scaleY(5.5) + 12)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", opacity) 
            .text(getText_Spree(g_language))

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", scaleX(8.0))
            .attr("y", scaleY(4.5) + 12)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", opacity) 
            .text(getText_Landwehrkanal(g_language))

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", scaleX(8.5))
            .attr("y", scaleY(9.5) - 6)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BROWN)
            .attr("fill-opacity", opacity) 
            .text(getText_BerlinRingbahn(g_language) + " (S41/S42)")

    // ---------------------------------------------------------------------------------

    let mesh_width = Math.abs(scaleX(1) - scaleX(0))
    let mesh_height = Math.abs(scaleY(1) - scaleY(0))

    svg.append("circle")
            .attr("cx", scaleX(7))
            .attr("cy", scaleY(7))
            .attr("r", mesh_width / 2)
            .attr("width", mesh_width)
            .attr("height", mesh_height)
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", opacity * 0.2) 
            .attr("stroke-opacity", 0) 

    svg.append("circle")
            .attr("cx", scaleX(4))
            .attr("cy", scaleY(5))
            .attr("r", mesh_width / 2)
            .attr("width", mesh_width)
            .attr("height", mesh_height)
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", opacity * 0.2) 
            .attr("stroke-opacity", 0) 

    svg.append("circle")
            .attr("cx", scaleX(10))
            .attr("cy", scaleY(7))
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
              label: getText_BerlinHBF(g_language),
              title: "",
              align: "right",  // try right or left
              wrap: mesh_width * 3,  // try something smaller to see text split in several lines
              padding: 0   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX(6.5),
            y: scaleY(7.5),
            dx: -(mesh_width * 1.5),
            dy: -(mesh_height * 1.5)
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("id", "i_landmark_berlin_hbf")
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
              label: getText_ZoolGarten(g_language),
              title: "",
              align: "right",  // try right or left
              wrap: mesh_width * 3,  // try something smaller to see text split in several lines
              padding: 0   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX(3.5),
            y: scaleY(5.5),
            dx: -(mesh_width * 0.5),
            dy: -(mesh_height * 2.5)
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("id", "i_landmark_zoo_garten")
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
              label: getText_Alexanderplatz(g_language),
              title: "",
              align: "left",  // try right or left
              wrap: mesh_width * 3,  // try something smaller to see text split in several lines
              padding: 0   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX(10.5),
            y: scaleY(7.5),
            dx: (mesh_width * 1.5),
            dy: -(mesh_height * 1.5)
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("id", "i_landmark_alexanderplatz")
            .attr("class", "annotation-group c_content_m")
                .style('opacity', 0)
                .call(makeAnnotations)
    }

    // ---------------------------------------------------------------------------------

    let max_count = d3.max(dataset_mesh, function (d) { return d.count; }); 

    let scaleCircle_Count = d3.scaleLinear()
                                .domain([0, max_count])
                                .range([0, Math.pow(circle_radius, 2) * Math.PI]);

    let scaleCircle_Opacity = d3.scaleLinear()
                                .domain([0, max_count])
                                .range([0.2, 1]);

    let circle = scaleCircle_Count(max_count);

    let r = Math.sqrt(circle / Math.PI);

    let height = scaleX(1) - scaleX(0);
    let width = scaleY(0) - scaleY(1);

    // ---------------------------------------------------------------------------------

    svg.selectAll("circle.c_circle_count")       
       .data(dataset_mesh.filter(function(d) { if (d.count > 0) return d}))
       .enter()
        .append("circle")
            .attr("id", function (d) { return "i_circle_count_" + d.mesh_id })
            .attr("class", "c_circle_count")
            .attr("cx", function (d) { return scaleX(d.index_x) })
            .attr("cy", function (d) { return scaleY(d.index_y) })
            .attr("r", function (d) {

                let circle = scaleCircle_Count(d.count);

                let r = Math.sqrt(circle / Math.PI);

                return r;
            })
            .attr("stroke", COLOR_WHITE)
            //.attr("stroke-opacity", opacity)
            .attr("stroke-opacity", function (d) { return opacity * scaleCircle_Opacity(d.count) })
            .attr("stroke-width", 0.5)
            .attr("fill-opacity", 0) 

    // --------------

    svg.selectAll("circle.c_circle_path_relative")   
       .data(dataset_mesh.filter(function(d) { if (d.count > 0) return d}))
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
       .data(dataset_mesh.filter(function(d) { if (d.count > 0) return d}))
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

    svg.selectAll("text.c_text_count")  
       .data(dataset_mesh.filter(function(d) { if (d.count > 0) return d}))
       .enter()
        .append("text")
            .attr("id", function (d) { return "i_text_count_" + d.mesh_id })
            .attr("class", "c_text_count c_content_m c_text_anchor_middle")
            .attr("x", function (d) { return scaleX(d.index_x)})
            .attr("y", function (d) { return scaleY(d.index_y) + (height / 3)})
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", function (d) { return opacity * scaleCircle_Opacity(d.count) })
            .text(function (d) { return FORMAT_COMMA(d.count)}) 

    // --------------

    svg.selectAll("text.c_text_path")   
       .data(dataset_mesh.filter(function(d) { if (d.count > 0) return d}))
       .enter()
        .append("text")
            .attr("id", function (d) { return "i_text_path_" + d.mesh_id })
            .attr("class", "c_text_path c_content_m c_text_anchor_middle c_cursor")
            .attr("x", function (d) { return scaleX(d.index_x)})
            .attr("y", function (d) { return scaleY(d.index_y) + (height / 3)})
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", opacity) 
            .text("") 

    // ---------------------------------------------------------------------------------

    svg.selectAll("rect.c_rect_path_background")  
       .data(dataset_mesh.filter(function(d) { if (d.count > 0) return d}))
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

                    d3.select("#i_text_count_" + dataset_mesh[index].mesh_id)
                            .attr("fill-opacity", opacity * scaleCircle_Opacity(dataset_mesh[index].count))
                            .text(FORMAT_COMMA(dataset_mesh[index].count))

                }
            })

    svg.selectAll("rect.c_rect_path")  
       .data(dataset_mesh.filter(function(d) { if (d.count > 0) return d}))
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
                                                      .domain([0, max_end])
                                                      .range([0, Math.pow(circle_radius, 2) * Math.PI]);

                let scaleCircle_opacity_relative = d3.scaleLinear()
                                                      .domain([0, max_end])
                                                      .range([0.2, 1]);

                for (let i = 0; i < end.length; i++) {

                    let circle = scaleCircle_count_relative(end[i].count);

                    let r = Math.sqrt(circle / Math.PI);

                    d3.select("#i_circle_path_relative_" + end[i].mesh_id)
                            .attr("stroke-opacity", scaleCircle_opacity_relative(end[i].count))
                            .attr("r", r)

                    let count = (end[i].count > 0) ? FORMAT_COMMA(end[i].count) : ""

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

                d3.selectAll(".c_circle_count")
                        .attr("stroke-opacity", 0) 

                d3.selectAll(".c_text_count")
                        .attr("fill-opacity", 0) 
                        .text("")

                // -------------------------------------

                d3.select("#i_text_path_relative_label")
                        .text(FORMAT_K(max_end)) 

                // -------------------------------------

                if (d.index_x == 7 && d.index_y == 7) 
                    d3.select("#i_landmark_berlin_hbf").style('opacity', opacity * 0.4) 

                if (d.index_x == 4 && d.index_y == 5) 
                    d3.select("#i_landmark_zoo_garten").style('opacity', opacity * 0.4) 

                if (d.index_x == 10 && d.index_y == 7)  
                    d3.select("#i_landmark_alexanderplatz").style('opacity', opacity * 0.4) 

/*
                if ((d.index_x == 5 && d.index_y == 6) ||
                    (d.index_x == 6 && d.index_y == 6) ||
                    (d.index_x == 7 && d.index_y == 6)) 
                    d3.select("#i_text_tiergarten").style('fill-opacity', opacity * 0.5) 

                if ((d.index_x == 8 && d.index_y == 2) ||
                    (d.index_x == 9 && d.index_y == 2) ||
                    (d.index_x ==10 && d.index_y == 2) ||
                    (d.index_x == 9 && d.index_y == 1) ||
                    (d.index_x ==10 && d.index_y == 1)) 
                    d3.select("#i_text_tempelhofer_feld").style('fill-opacity', opacity * 0.5) 
                    */
            })
            .on("mouseout", function(d) {

                for (index in dataset_mesh) {

                    if (dataset_mesh[index].count > 0) {

                        d3.select("#i_circle_count_" + dataset_mesh[index].mesh_id)
                                 .attr("stroke-opacity", opacity * scaleCircle_Opacity(dataset_mesh[index].count))

                        d3.select("#i_text_count_" + dataset_mesh[index].mesh_id)
                                 .attr("fill-opacity", opacity * scaleCircle_Opacity(dataset_mesh[index].count))
                                 .text(FORMAT_COMMA(dataset_mesh[index].count))
                    }
                }

                //d3.selectAll(".c_circle_count")
                //        .attr("stroke-opacity", opacity) 

                d3.selectAll(".c_circle_path")
                        .attr("r", 0)

                d3.selectAll(".c_circle_path_relative")
                        .attr("r", 0)

                d3.selectAll(".c_text_path")
                        .text("")

                d3.select("#i_circle_path_relative_" + d.mesh_id)
                        .attr("fill-opacity", 0)

                // -------------------------------------

                if (d.index_x == 7 && d.index_y == 7) 
                    d3.select("#i_landmark_berlin_hbf").style('opacity', 0) 

                if (d.index_x == 4 && d.index_y == 5) 
                    d3.select("#i_landmark_zoo_garten").style('opacity', 0) 

                if (d.index_x == 10 && d.index_y == 7)  
                    d3.select("#i_landmark_alexanderplatz").style('opacity', 0)
/*
                if ((d.index_x == 5 && d.index_y == 6) ||
                    (d.index_x == 6 && d.index_y == 6) ||
                    (d.index_x == 7 && d.index_y == 6))   
                    d3.select("#i_text_tiergarten").style('fill-opacity', 0) 

                if ((d.index_x == 8 && d.index_y == 2) ||
                    (d.index_x == 9 && d.index_y == 2) ||
                    (d.index_x ==10 && d.index_y == 2) ||
                    (d.index_x == 9 && d.index_y == 1) ||
                    (d.index_x ==10 && d.index_y == 1)) 
                    d3.select("#i_text_tempelhofer_feld").style('fill-opacity', 0) 
                    */
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

const LEGEND_BERLIN_MESH_X = 0;
const LEGEND_BERLIN_MESH_Y = 0;

const LEGEND_BERLIN_MESH_WIDTH = 300 - LEGEND_BERLIN_MESH_X;

const LEGEND_BERLIN_MESH_WIDTH_ITEM = 30;
const LEGEND_BERLIN_MESH_HEIGHT_ITEM = 10;

const LEGEND_BERLIN_MESH_WIDTH_GAP = 10;
const LEGEND_BERLIN_MESH_HEIGHT_GAP = 10;

const LEGEND_BERLIN_MESH_X_PATTERN = LEGEND_BERLIN_MESH_X;
const LEGEND_BERLIN_MESH_X_TEXT = LEGEND_BERLIN_MESH_X_PATTERN + LEGEND_BERLIN_MESH_WIDTH_GAP + LEGEND_BERLIN_MESH_WIDTH_ITEM;

const LEGEND_BERLIN_MESH_HEIGHT_PARK = LEGEND_BERLIN_MESH_HEIGHT_ITEM;
const LEGEND_BERLIN_MESH_HEIGHT_RIVER = LEGEND_BERLIN_MESH_HEIGHT_ITEM;
const LEGEND_BERLIN_MESH_HEIGHT_RINGBAHN = LEGEND_BERLIN_MESH_HEIGHT_ITEM;
const LEGEND_BERLIN_MESH_HEIGHT_LANDMARK = LEGEND_BERLIN_MESH_HEIGHT_ITEM;
const LEGEND_BERLIN_MESH_HEIGHT_PATH_END = LEGEND_BERLIN_MESH_HEIGHT_ITEM;
const LEGEND_BERLIN_MESH_HEIGHT_PATH = LEGEND_BERLIN_MESH_HEIGHT_ITEM;
const LEGEND_BERLIN_MESH_HEIGHT_PATH_RELATIVE = LEGEND_BERLIN_MESH_HEIGHT_ITEM;

const LEGEND_BERLIN_MESH_Y_PARK            = LEGEND_BERLIN_MESH_Y;
const LEGEND_BERLIN_MESH_Y_RIVER           = LEGEND_BERLIN_MESH_Y_PARK + LEGEND_BERLIN_MESH_HEIGHT_PARK + LEGEND_BERLIN_MESH_HEIGHT_GAP;
const LEGEND_BERLIN_MESH_Y_RIGNBAHN        = LEGEND_BERLIN_MESH_Y_RIVER + LEGEND_BERLIN_MESH_HEIGHT_RIVER + LEGEND_BERLIN_MESH_HEIGHT_GAP;
const LEGEND_BERLIN_MESH_Y_LANDMARK        = LEGEND_BERLIN_MESH_Y_RIGNBAHN + LEGEND_BERLIN_MESH_HEIGHT_RINGBAHN + LEGEND_BERLIN_MESH_HEIGHT_GAP;
const LEGEND_BERLIN_MESH_Y_PATH_END        = LEGEND_BERLIN_MESH_Y_LANDMARK + LEGEND_BERLIN_MESH_HEIGHT_LANDMARK + (LEGEND_BERLIN_MESH_HEIGHT_GAP * 2);
const LEGEND_BERLIN_MESH_Y_PATH            = LEGEND_BERLIN_MESH_Y_PATH_END + LEGEND_BERLIN_MESH_HEIGHT_PATH_END + (LEGEND_BERLIN_MESH_HEIGHT_GAP * 2);
const LEGEND_BERLIN_MESH_Y_PATH_RELATIVE   = LEGEND_BERLIN_MESH_Y_PATH + LEGEND_BERLIN_MESH_HEIGHT_PATH + (LEGEND_BERLIN_MESH_HEIGHT_GAP * 2);
const LEGEND_BERLIN_MESH_Y_END             = LEGEND_BERLIN_MESH_Y_PATH_RELATIVE + LEGEND_BERLIN_MESH_HEIGHT_PATH_RELATIVE + LEGEND_BERLIN_MESH_HEIGHT_GAP;

function draw_mesh_legend_berlin(dataset_mesh, svg_w_px, svg_h_px, id_svg) {

    console.log("draw_mesh_legend_berlin");

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
                    .range([BERLIN_MESH_X, BERLIN_MESH_X + BERLIN_MESH_WIDTH])

    let scaleY = d3.scaleLinear()
                    .domain([min_y, max_xy])
                    .range([BERLIN_MESH_Y + BERLIN_MESH_HEIGHT, BERLIN_MESH_Y])

    let circle_radius = (scaleX(min_x + 1) - scaleX(min_x)) / 2

    let circle_radius_station_count = (scaleX(min_x + 1) - scaleX(min_x)) / 10
    let circle_radius_parking_amount = (scaleX(min_x + 1) - scaleX(min_x)) / 2

    let scaleOpacity_station_count = d3.scaleLinear()
                                        .domain([0, max_station_count])
                                        .range([0, 1]);

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

    let max_count = d3.max(dataset_mesh, function (d) { return d.count; }); 

    let scaleCircle_Count = d3.scaleLinear()
                                .domain([0, max_count])
                                .range([0, Math.pow(circle_radius, 2) * Math.PI]);

    let circle = scaleCircle_Count(max_count);

    let r = Math.sqrt(circle / Math.PI);

    let height = scaleX(1) - scaleX(0);
    let width = scaleY(0) - scaleY(1);

    // --------------------------------------------------------------------------------- 

    svg.append("rect")
            .attr("x", LEGEND_BERLIN_MESH_X_PATTERN + (STROKE_WIDTH / 2))
            .attr("y", LEGEND_BERLIN_MESH_Y_PARK + (STROKE_WIDTH / 2))
            .attr("width", LEGEND_BERLIN_MESH_WIDTH_ITEM - (STROKE_WIDTH / 2))
            .attr("height", LEGEND_BERLIN_MESH_HEIGHT_ITEM - (STROKE_WIDTH / 2))
            .attr("rx", RECT_ROUND)
            .attr("ry", RECT_ROUND)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_GREEN)
            .attr("fill-opacity", 0.2) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_PARK + LEGEND_BERLIN_MESH_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_GREEN)
            .attr("fill-opacity", 1) 
            .text(getText_Park(g_language).toUpperCase())

    // -----

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_MESH_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_MESH_Y_RIVER + (LEGEND_BERLIN_MESH_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_MESH_X_PATTERN + LEGEND_BERLIN_MESH_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_MESH_Y_RIVER + (LEGEND_BERLIN_MESH_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_RIVER + LEGEND_BERLIN_MESH_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", 1) 
            .text(getText_River(g_language).toUpperCase())

    // -----

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_MESH_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_MESH_Y_RIGNBAHN + (LEGEND_BERLIN_MESH_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_MESH_X_PATTERN + LEGEND_BERLIN_MESH_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_MESH_Y_RIGNBAHN + (LEGEND_BERLIN_MESH_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_BROWN) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_MESH_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_MESH_Y_RIGNBAHN + (LEGEND_BERLIN_MESH_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_MESH_X_PATTERN + LEGEND_BERLIN_MESH_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_MESH_Y_RIGNBAHN + (LEGEND_BERLIN_MESH_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_MAIN) 
            .attr("stroke-width", STROKE_WIDTH / 2) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_RIGNBAHN + LEGEND_BERLIN_MESH_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BROWN)
            .attr("fill-opacity", 1) 
            .text(getText_BerlinRingbahn(g_language).toUpperCase() + " (S41/S42)")

    // -----

    r = LEGEND_BERLIN_MESH_WIDTH_ITEM / 3

    svg.append("circle")
            .attr("cx", LEGEND_BERLIN_MESH_X_PATTERN + (LEGEND_BERLIN_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_BERLIN_MESH_Y_LANDMARK + r)
            .attr("r", r)
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", 0.2) 
            .attr("stroke-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_LANDMARK + r + 3)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_WHITE)
            .attr("fill-opacity", 0.4) 
            .text(getText_Landmark(g_language).toUpperCase())

    // -----

    r = LEGEND_BERLIN_MESH_WIDTH_ITEM / 3

    svg.append("circle")
            .attr("cx", LEGEND_BERLIN_MESH_X_PATTERN + (LEGEND_BERLIN_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_BERLIN_MESH_Y_PATH_END + r)
            .attr("r", r)
            .attr("stroke", COLOR_WHITE) 
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_PATH_END + r + 3)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_WHITE)
            .attr("fill-opacity", 1) 
            .text(getText_NumberOfTrips(g_language).toUpperCase())

    // -----

    svg.append("circle")
            .attr("id", "i_circle_label_path")
            .attr("cx", LEGEND_BERLIN_MESH_X_PATTERN + (LEGEND_BERLIN_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_BERLIN_MESH_Y_PATH + r)
            .attr("r", r)
            .attr("fill", COLOR_RED) 
            .attr("fill-opacity", 0.8)  
            .attr("stroke-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_PATH + LEGEND_BERLIN_MESH_HEIGHT_GAP - 2)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_RED)
            .attr("fill-opacity", 1)  
            .text(getText_TripsNumberOfTheSelectedArea(g_language).toUpperCase())

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_PATH + LEGEND_BERLIN_MESH_HEIGHT_GAP + 12)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_RED)
            .attr("fill-opacity", 1)  
            .text("(" + getText_CompareWithAll(g_language).toUpperCase() + ")")

    // -----

    svg.append("circle")
            .attr("cx", LEGEND_BERLIN_MESH_X_PATTERN + (LEGEND_BERLIN_MESH_WIDTH_ITEM / 2))
            .attr("cy", LEGEND_BERLIN_MESH_Y_PATH_RELATIVE  + r)
            .attr("r", r)
            .attr("stroke", COLOR_RED) 
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 0.8) 
            .attr("fill-opacity", 0)

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_PATH_RELATIVE + LEGEND_BERLIN_MESH_HEIGHT_GAP- 2)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_RED)
            .attr("fill-opacity", 1) 
            .text(getText_TripsNumberOfTheSelectedArea(g_language).toUpperCase())

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_MESH_X_TEXT)
            .attr("y", LEGEND_BERLIN_MESH_Y_PATH_RELATIVE + LEGEND_BERLIN_MESH_HEIGHT_GAP + 12)
            .attr("stroke-opacity", 0) 
            .style("fill", COLOR_RED)
            .attr("fill-opacity", 1) 
            .text("(" + getText_CompareWithItself(g_language).toUpperCase() + ")")
}