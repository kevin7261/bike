
const INTRO_X = 410;
const INTRO_Y = 120;

const INTRO_WIDTH = 950 - INTRO_X;

const INTRO_WIDTH_MAP = 380;
const INTRO_WIDTH_NUMBER_RADIUS = 40;//50
const INTRO_WIDTH_NUMBER_GAP = 80;//50

const INTRO_HEIGHT_TEXT = 30

const INTRO_HEIGHT_MAP = INTRO_WIDTH_MAP
const INTRO_HEIGHT_GAP_1 = -40
const INTRO_HEIGHT_ICON = 80
const INTRO_HEIGHT_GAP_2 = 20
const INTRO_HEIGHT_NUMBER = INTRO_HEIGHT_TEXT
const INTRO_HEIGHT_GAP_3 = 0
const INTRO_HEIGHT_TEXT_DESC = INTRO_HEIGHT_TEXT

const INTRO_X_MAP = INTRO_X

const INTRO_Y_MAP = INTRO_Y
const INTRO_Y_GAP_1 = INTRO_Y_MAP + INTRO_HEIGHT_MAP
const INTRO_Y_ICON = INTRO_Y_GAP_1 + INTRO_HEIGHT_GAP_1
const INTRO_Y_GAP_2 = INTRO_Y_ICON + INTRO_HEIGHT_ICON
const INTRO_Y_NUMBER = INTRO_Y_GAP_2 + INTRO_HEIGHT_GAP_2
const INTRO_Y_GAP_3 = INTRO_Y_NUMBER + INTRO_HEIGHT_NUMBER
const INTRO_Y_TEXT_DESC = INTRO_Y_GAP_3 + INTRO_HEIGHT_GAP_3
const INTRO_Y_END = INTRO_Y_TEXT_DESC + INTRO_HEIGHT_TEXT_DESC

const INTRO_X_TAIPEI = INTRO_X_MAP + (INTRO_WIDTH / 2)
const INTRO_Y_TAIPEI = INTRO_Y + (INTRO_HEIGHT_MAP / 2) - 20

// -------------------------------------------------

var map_transition = true;

function draw_intro_youbike(svg_w_px, svg_h_px, id_svg_main, progress, language) {

    console.log("draw_intro_youtube");

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg_main + " > svg").remove();

    let svg = d3.select(id_svg_main)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);

    // --------------------------------------------------------------------------------- 

    let scaleProgress_opacity = d3.scaleLinear()
                                    .domain([0, 0.1, 0.9, 1] )
                                    .range([0, 1, 1, 0])

    let opacity = scaleProgress_opacity(progress)

    // --------------------------------------------------------------------------------- 

    let scaleX_taipei = d3.scaleLinear()
                        .domain([0, 15])
                        .range([INTRO_X_TAIPEI - (INTRO_WIDTH_MAP / 2), 
                                INTRO_X_TAIPEI + (INTRO_WIDTH_MAP / 2)])

    let scaleY_taipei = d3.scaleLinear()
                        .domain([0, 15])
                        .range([INTRO_Y_TAIPEI - (INTRO_HEIGHT_MAP / 2), 
                                INTRO_Y_TAIPEI + (INTRO_HEIGHT_MAP / 2)])

    // --------------------------------------------------------------------------------- 

    let sum_path_start = d3.sum(dataset_mesh_youbike, function (d) { return d.path_start; });
    
    // --------------------------------------------------------------------------------- 

    svg.append("line")
            .attr("x1", scaleX_taipei(1))
            .attr("y1", scaleY_taipei(13))
            .attr("x2", scaleX_taipei(2))
            .attr("y2", scaleY_taipei(13))
            .attr("stroke", COLOR_GREY) 
            .attr("stroke-opacity", opacity)
            .attr("stroke-width", 1) 
            .attr("fill-opacity", 0)

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", scaleX_taipei(1.5))
            .attr("y", scaleY_taipei(13) - 5)
            .attr("fill", COLOR_GREY) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text("5" + getText_KM(language))

    let d3_curve_type = d3.curveBasisClosed;

    let line_contour_taipei = d3.line()
                            .x(function(d) { return scaleX_taipei(d[0]); })
                            .y(function(d) { return scaleY_taipei(d[1]); })
                            .curve(d3_curve_type)

    svg.append("path")
            .attr("d", line_contour_taipei(contour_new_taipei))
            .attr("stroke-opacity", 0)
            .attr("stroke", COLOR_WHITE) 
            .attr("fill-opacity", 0.2 * opacity)
            .attr("fill", COLOR_WHITE)

    svg.append("path")
            .attr("d", line_contour_taipei(contour_taipei))
            .attr("stroke-opacity", opacity)
            .attr("stroke-width", STROKE_WIDTH)
            .attr("stroke", COLOR_RED) 
            .attr("fill-opacity", opacity)
            .attr("fill", COLOR_MAIN)

    {
        // Features of the annotation
        let annotations = [
          {
            type: d3.annotationCalloutElbow,
            note: {
              label: getText_Population(language) + ": " + FORMAT_K_2(7034084),
              title: getText_Taipei_Metro_Area(language),
              align: "left",  // try right or left
              wrap: 150,  // try something smaller to see text split in several lines
              padding: 3   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX_taipei(8),
            y: scaleY_taipei(10),
            dy: 15,
            dx: 15
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("class", "annotation-group c_content_m")
                  .style('opacity', 0.4 * opacity)
                  .call(makeAnnotations)
    }

    {
        // Features of the annotation
         let annotations = [
          {
            type: d3.annotationCalloutElbow,
            note: {
              label: getText_Population(language) + ": " + FORMAT_K_2(2646204),
              title: getText_Taipei_City(language),
              align: "left",  // try right or left
              wrap: 150,  // try something smaller to see text split in several lines
              padding: 0   // More = text lower
            },
            color: [COLOR_RED],
            x: scaleX_taipei(6),
            y: scaleY_taipei(2),
            dy: -15,
            dx: 125
          }
        ]

        // Add annotation to the chart
        let makeAnnotations = d3.annotation()
                                    .annotations(annotations)
                                    //.editMode(true)

        svg.append("g")
            .attr("class", "annotation-group c_content_m")
                .style('opacity', opacity)
                .call(makeAnnotations)
    }

    // ---------------------------------------------------------------------------------

    svg.append("image")
            .attr("href", "image/station.gif") 
            .attr("x", INTRO_X_TAIPEI - (40 * 3) - INTRO_WIDTH_NUMBER_GAP + "px") 
            .attr("y", INTRO_Y_ICON + "px") 
            .attr("height", 80 + "px") 
            .attr("width", 80 + "px") 
            .attr("opacity", opacity) 

    svg.append("image")
            .attr("href", "image/bike.gif") 
            .attr("x", INTRO_X_TAIPEI - (40) + "px") 
            .attr("y", INTRO_Y_ICON + "px") 
            .attr("height", 80 + "px") 
            .attr("width", 80 + "px") 
            .attr("opacity", opacity) 

    svg.append("image")
            .attr("href", "image/trip.gif") 
            .attr("x", INTRO_X_TAIPEI + (40) + INTRO_WIDTH_NUMBER_GAP + "px") 
            .attr("y", INTRO_Y_ICON + "px") 
            .attr("height", 80 + "px") 
            .attr("width", 80 + "px") 
            .attr("opacity", opacity) 

    // ---------------------------------------------------------------------------------

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", INTRO_X_TAIPEI - (INTRO_WIDTH_NUMBER_RADIUS * 2 + INTRO_WIDTH_NUMBER_GAP)) 
            .attr("y", INTRO_Y_NUMBER) 
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(400)

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", INTRO_X_TAIPEI) 
            .attr("y", INTRO_Y_NUMBER) 
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(FORMAT_COMMA(13072))

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", INTRO_X_TAIPEI + (INTRO_WIDTH_NUMBER_RADIUS * 2 + INTRO_WIDTH_NUMBER_GAP)) 
            .attr("y", INTRO_Y_NUMBER) 
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(FORMAT_K_3(sum_path_start))
            
    // ---------------------------------------------------------------------------------

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", INTRO_X_TAIPEI - (INTRO_WIDTH_NUMBER_RADIUS * 2 + INTRO_WIDTH_NUMBER_GAP)) 
            .attr("y", INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_RentalStations(language))

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", INTRO_X_TAIPEI) 
            .attr("y", INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_Bikes(language))

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", INTRO_X_TAIPEI + (INTRO_WIDTH_NUMBER_RADIUS * 2 + INTRO_WIDTH_NUMBER_GAP)) 
            .attr("y", INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_Trips(language))
}
