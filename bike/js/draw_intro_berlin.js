
const BERLIN_INTRO_X = 410;
const BERLIN_INTRO_Y = 120;

const BERLIN_INTRO_WIDTH = 950 - BERLIN_INTRO_X;

const BERLIN_INTRO_WIDTH_MAP = 250;
const BERLIN_INTRO_WIDTH_NUMBER_RADIUS = 30
const BERLIN_INTRO_WIDTH_NUMBER_GAP = 100

const BERLIN_INTRO_HEIGHT_TEXT = 30

const BERLIN_INTRO_HEIGHT_MAP = BERLIN_INTRO_WIDTH_MAP
const BERLIN_INTRO_HEIGHT_GAP_1 = 40
const BERLIN_INTRO_HEIGHT_TEXT_CITY = BERLIN_INTRO_HEIGHT_TEXT
const BERLIN_INTRO_HEIGHT_GAP_2 = 20
const BERLIN_INTRO_HEIGHT_TEXT_TITLE = 10;//BERLIN_INTRO_HEIGHT_TEXT
const BERLIN_INTRO_HEIGHT_GAP_4 = 0
const BERLIN_INTRO_HEIGHT_ICON = 60
const BERLIN_INTRO_HEIGHT_GAP_5 = 40
const BERLIN_INTRO_HEIGHT_NUMBER = BERLIN_INTRO_HEIGHT_TEXT
const BERLIN_INTRO_HEIGHT_GAP_6 = 0
const BERLIN_INTRO_HEIGHT_TEXT_DESC = BERLIN_INTRO_HEIGHT_TEXT

const BERLIN_INTRO_X_MAP = BERLIN_INTRO_X

const BERLIN_INTRO_Y_MAP = BERLIN_INTRO_Y
const BERLIN_INTRO_Y_GAP_1 = BERLIN_INTRO_Y_MAP + BERLIN_INTRO_HEIGHT_MAP
const BERLIN_INTRO_Y_TEXT_CITY = BERLIN_INTRO_Y_GAP_1 + BERLIN_INTRO_HEIGHT_GAP_1
const BERLIN_INTRO_Y_GAP_2 = BERLIN_INTRO_Y_TEXT_CITY + BERLIN_INTRO_HEIGHT_TEXT_CITY
const BERLIN_INTRO_Y_TEXT_TITLE = BERLIN_INTRO_Y_GAP_2 + BERLIN_INTRO_HEIGHT_GAP_2
const BERLIN_INTRO_Y_GAP_4 = BERLIN_INTRO_Y_TEXT_TITLE + BERLIN_INTRO_HEIGHT_TEXT_TITLE
const BERLIN_INTRO_Y_ICON = BERLIN_INTRO_Y_GAP_4 + BERLIN_INTRO_HEIGHT_GAP_4
const BERLIN_INTRO_Y_GAP_5 = BERLIN_INTRO_Y_ICON + BERLIN_INTRO_HEIGHT_ICON
const BERLIN_INTRO_Y_NUMBER = BERLIN_INTRO_Y_GAP_5 + BERLIN_INTRO_HEIGHT_GAP_5
const BERLIN_INTRO_Y_GAP_6 = BERLIN_INTRO_Y_NUMBER + BERLIN_INTRO_HEIGHT_NUMBER
const BERLIN_INTRO_Y_TEXT_DESC = BERLIN_INTRO_Y_GAP_6 + BERLIN_INTRO_HEIGHT_GAP_6
const BERLIN_INTRO_Y_END = BERLIN_INTRO_Y_TEXT_DESC + BERLIN_INTRO_HEIGHT_TEXT_DESC

const BERLIN_INTRO_X_TAIPEI = BERLIN_INTRO_X_MAP + (BERLIN_INTRO_WIDTH / 2) / 2 * 1
const BERLIN_INTRO_Y_TAIPEI = BERLIN_INTRO_Y_MAP + (BERLIN_INTRO_HEIGHT_MAP / 2)
const BERLIN_INTRO_X_BERLIN = BERLIN_INTRO_X_MAP + (BERLIN_INTRO_WIDTH / 2) / 2 * 3
const BERLIN_INTRO_Y_BERLIN = BERLIN_INTRO_Y_MAP + (BERLIN_INTRO_HEIGHT_MAP / 2)

// -------------------------------------------------

var map_transition = true;

function draw_intro_berlin(svg_w_px, svg_h_px, id_svg_main, progress, language) {

    console.log("draw_intro_berlin");

    // --------------------------------------------------------------------------------- 

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

    let scaleX_taipei = d3.scaleLinear()
                        .domain([0, 15])
                        .range([BERLIN_INTRO_X_TAIPEI - (BERLIN_INTRO_WIDTH_MAP / 2), 
                                BERLIN_INTRO_X_TAIPEI + (BERLIN_INTRO_WIDTH_MAP / 2)])

    let scaleY_taipei = d3.scaleLinear()
                        .domain([0, 15])
                        .range([BERLIN_INTRO_Y_TAIPEI - (BERLIN_INTRO_HEIGHT_MAP / 2), 
                                BERLIN_INTRO_Y_TAIPEI + (BERLIN_INTRO_HEIGHT_MAP / 2)])

    let scaleX_berlin = d3.scaleLinear()
                        .domain([0, 15])
                        .range([BERLIN_INTRO_X_BERLIN - (BERLIN_INTRO_WIDTH_MAP / 2), 
                                BERLIN_INTRO_X_BERLIN + (BERLIN_INTRO_WIDTH_MAP / 2)])

    let scaleY_berlin = d3.scaleLinear()
                        .domain([0, 15])
                        .range([BERLIN_INTRO_Y_BERLIN - (BERLIN_INTRO_HEIGHT_MAP / 2), 
                                BERLIN_INTRO_Y_BERLIN + (BERLIN_INTRO_HEIGHT_MAP / 2)])

    // --------------------------------------------------------------------------------- 

    svg.append("line")
            .attr("x1", scaleX_taipei(1))
            .attr("y1", scaleY_taipei(14))
            .attr("x2", scaleX_taipei(3))
            .attr("y2", scaleY_taipei(14))
            .attr("stroke", COLOR_GREY) 
            .attr("stroke-opacity", opacity)
            .attr("stroke-width", 1) 
            .attr("fill-opacity", 0)

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", scaleX_taipei(2))
            .attr("y", scaleY_taipei(14) - 5)
            .attr("fill", COLOR_GREY) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text("10" + getText_KM(language))

    // --------------------------------------------------------------------------------- 

    let d3_curve_type = d3.curveBasisClosed;

    let line_contour_taipei = d3.line()
                            .x(function(d) { return scaleX_taipei(d[0]); })
                            .y(function(d) { return scaleY_taipei(d[1]); })
                            .curve(d3_curve_type)

    let line_contour_berlin = d3.line()
                            .x(function(d) { return scaleX_berlin(d[0] + 3); })
                            .y(function(d) { return scaleY_berlin(d[1]); })
                            .curve(d3_curve_type)

    // --------------------------------------------------------------------------------- 

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
              wrap: 120,  // try something smaller to see text split in several lines
              padding: 3   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX_taipei(8),
            y: scaleY_taipei(10),
            dx: 20,
            dy: 20
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
              wrap: 120,  // try something smaller to see text split in several lines
              padding: 0   // More = text lower
            },
            color: [COLOR_RED],
            x: scaleX_taipei(6),
            y: scaleY_taipei(2),
            dx: 80,
            dy: -20
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

    svg.append("path")
            .attr("d", line_contour_berlin(contour_berlin))
            .attr("stroke-opacity", 0)
            .attr("stroke", COLOR_WHITE) 
            .attr("fill-opacity", 0.2 * opacity)
            .attr("fill", COLOR_WHITE)

    svg.append("path")
            .attr("d", line_contour_berlin(contour_berlin_inner))
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
              label: getText_Population(language) + ": " + FORMAT_K_2(3644826),
              title: getText_Berlin(language),
              align: "right",  // try right or left
              wrap: 100,  // try something smaller to see text split in several lines
              padding: 3   // More = text lower
            },
            color: [COLOR_WHITE],
            x: scaleX_berlin(9),
            y: scaleY_berlin(7),
            dx: 30,
            dy: 70
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
              label: getText_Population(language) + ": " + FORMAT_K_2(1336550),
              title: getText_Berlin_Inner_City(language),
              align: "left",  // try right or left
              wrap: 100,  // try something smaller to see text split in several lines
              padding: 3   // More = text lower
            },
            color: [COLOR_RED],
            x: scaleX_berlin(5),
            y: scaleY_berlin(3.5),
            dx: -45,
            dy: 80
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

    {
        svg.append("rect")
            .attr("id", "i_rect_background_taipei")
            .attr("class", "c_title_background")
            .attr("x", 0) 
            .attr("y", BERLIN_INTRO_Y_TEXT_CITY - 14) 
            .attr("width", 0)
            .attr("height", 20)
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)

        svg.append("text")
                .attr("id", "i_text_background_taipei")
                .attr("class", "c_title_m c_text_anchor_middle")
                .attr("x", BERLIN_INTRO_X_TAIPEI) 
                .attr("y", BERLIN_INTRO_Y_TEXT_CITY) 
                .attr("fill", COLOR_MAIN) 
                .attr("fill-opacity", opacity) 
                .attr("stroke-opacity", 0)
                .text(getText_Taipei(language))

        let width_sum = d3.select("#i_text_background_taipei").node().getBBox().width

        d3.select("#i_rect_background_taipei")
                .attr("x", BERLIN_INTRO_X_TAIPEI - ((width_sum + 25) / 2)) 
                .attr("width", width_sum + 25)
    }

    {
        svg.append("rect")
            .attr("id", "i_rect_background_berlin")
            .attr("class", "c_title_background")
            .attr("x", 0) 
            .attr("y", BERLIN_INTRO_Y_TEXT_CITY - 14) 
            .attr("width", 65)
            .attr("height", 20)
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            
        svg.append("text")
            .attr("id", "i_text_background_berlin")
            .attr("class", "c_title_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN) 
            .attr("y", BERLIN_INTRO_Y_TEXT_CITY) 
            .attr("fill", COLOR_MAIN) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_Berlin(language))

        let width_sum = d3.select("#i_text_background_berlin").node().getBBox().width

        d3.select("#i_rect_background_berlin")
                .attr("x", BERLIN_INTRO_X_BERLIN - ((width_sum + 25) / 2)) 
                .attr("width", width_sum + 25)
    }
            
    // ---------------------------------------------------------------------------------

    svg.append("image")
            .attr("href", "image/ubike.gif") 
            .attr("x", BERLIN_INTRO_X_TAIPEI - 30) 
            .attr("y", BERLIN_INTRO_Y_ICON + "px") 
            .attr("height", 60 + "px") 
            .attr("width", 60 + "px") 
            .attr("opacity", opacity) 

    svg.append("image")
            .attr("href", "image/nextbike.gif") 
            .attr("x", BERLIN_INTRO_X_BERLIN - BERLIN_INTRO_WIDTH_NUMBER_GAP - 30) 
            .attr("y", BERLIN_INTRO_Y_ICON + "px") 
            .attr("height", 60 + "px") 
            .attr("width", 60 + "px") 
            .attr("opacity", opacity) 

    svg.append("image")
            .attr("href", "image/lidlbike.gif") 
            .attr("x", BERLIN_INTRO_X_BERLIN - 30) 
            .attr("y", BERLIN_INTRO_Y_ICON + "px") 
            .attr("height", 60 + "px") 
            .attr("width", 60 + "px") 
            .attr("opacity", opacity) 

    svg.append("image")
            .attr("href", "image/mobike.gif") 
            .attr("x", BERLIN_INTRO_X_BERLIN + BERLIN_INTRO_WIDTH_NUMBER_GAP - 30) 
            .attr("y", BERLIN_INTRO_Y_ICON + "px") 
            .attr("height", 60 + "px") 
            .attr("width", 60 + "px") 
            .attr("opacity", opacity) 

    // ---------------------------------------------------------------------------------

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_TAIPEI) 
            .attr("y", BERLIN_INTRO_Y_TEXT_TITLE) 
            .attr("fill", COLOR_GREEN) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text("YouBike".toUpperCase())
            
    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN - BERLIN_INTRO_WIDTH_NUMBER_GAP) 
            .attr("y", BERLIN_INTRO_Y_TEXT_TITLE) 
            .attr("fill", COLOR_BLUE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text("Nextbike".toUpperCase())
            
    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN) 
            .attr("y", BERLIN_INTRO_Y_TEXT_TITLE) 
            .attr("fill", COLOR_BLUE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text("LIDL-Bike".toUpperCase())
            
    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN + BERLIN_INTRO_WIDTH_NUMBER_GAP) 
            .attr("y", BERLIN_INTRO_Y_TEXT_TITLE) 
            .attr("fill", COLOR_BLUE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text("Mobike".toUpperCase())

    // ---------------------------------------------------------------------------------

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_TAIPEI - BERLIN_INTRO_WIDTH_NUMBER_RADIUS - ((BERLIN_INTRO_WIDTH_NUMBER_GAP - (BERLIN_INTRO_WIDTH_NUMBER_RADIUS * 2)) / 2)) 
            .attr("y", BERLIN_INTRO_Y_NUMBER + 6) 
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(400)

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_TAIPEI + BERLIN_INTRO_WIDTH_NUMBER_RADIUS +((BERLIN_INTRO_WIDTH_NUMBER_GAP - (BERLIN_INTRO_WIDTH_NUMBER_RADIUS * 2)) / 2))
            .attr("y", BERLIN_INTRO_Y_NUMBER + 6) 
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(FORMAT_COMMA(13072))

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN - BERLIN_INTRO_WIDTH_NUMBER_GAP) 
            .attr("y", BERLIN_INTRO_Y_NUMBER + 6)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(FORMAT_COMMA(2184))

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN) 
            .attr("y", BERLIN_INTRO_Y_NUMBER + 4)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(FORMAT_COMMA(3667))

    svg.append("text")
            .attr("class", "c_content_ll c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN + BERLIN_INTRO_WIDTH_NUMBER_GAP) 
            .attr("y", BERLIN_INTRO_Y_NUMBER + 4)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(FORMAT_COMMA(9184))
            
    // ---------------------------------------------------------------------------------

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_TAIPEI - BERLIN_INTRO_WIDTH_NUMBER_RADIUS - ((BERLIN_INTRO_WIDTH_NUMBER_GAP - (BERLIN_INTRO_WIDTH_NUMBER_RADIUS * 2)) / 2))
            .attr("y", BERLIN_INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_RentalStations(language))

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_TAIPEI + BERLIN_INTRO_WIDTH_NUMBER_RADIUS + ((BERLIN_INTRO_WIDTH_NUMBER_GAP - (BERLIN_INTRO_WIDTH_NUMBER_RADIUS * 2)) / 2))
            .attr("y", BERLIN_INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_Bikes(language))
                    
    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN - BERLIN_INTRO_WIDTH_NUMBER_GAP) 
            .attr("y", BERLIN_INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_Bikes(language))
                    
    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN) 
            .attr("y", BERLIN_INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_Bikes(language))
                    
    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_middle")
            .attr("x", BERLIN_INTRO_X_BERLIN + BERLIN_INTRO_WIDTH_NUMBER_GAP) 
            .attr("y", BERLIN_INTRO_Y_TEXT_DESC)  
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity) 
            .attr("stroke-opacity", 0)
            .text(getText_Bikes(language))
}
