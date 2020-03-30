
const DURATION_X = 410;
const DURATION_Y = 140;

const DURATION_WIDTH = 950 - DURATION_X;

const DURATION_WIDTH_LABEL = 25;
const DURATION_HEIGHT_LABEL = 25;

const DURATION_X_LABEL = DURATION_X;
const DURATION_X_CONTENT = DURATION_X_LABEL + DURATION_WIDTH_LABEL;

const DURATION_WIDTH_CONTENT = 950 - DURATION_X_CONTENT;

const DURATION_HEIGHT_TEXT_TITLE = DURATION_HEIGHT_LABEL;
const DURATION_HEIGHT_TEXT_TITLE_SUB = DURATION_HEIGHT_LABEL;
const DURATION_HEIGHT_GAP_1 = 0;
const DURATION_HEIGHT_COUNT = 120;
const DURATION_HEIGHT_TEXT_HOUR = DURATION_HEIGHT_LABEL;
const DURATION_HEIGHT_TEXT_COUNT = DURATION_HEIGHT_LABEL;
const DURATION_HEIGHT_GAP_2 = 20;
const DURATION_HEIGHT_OPTION = DURATION_HEIGHT_LABEL;

const DURATION_Y_TEXT_TITLE     = DURATION_Y;
const DURATION_Y_TEXT_TITLE_SUB = DURATION_Y_TEXT_TITLE + DURATION_HEIGHT_TEXT_TITLE;
const DURATION_Y_GAP_1          = DURATION_Y_TEXT_TITLE_SUB + DURATION_HEIGHT_TEXT_TITLE_SUB;
const DURATION_Y_COUNT          = DURATION_Y_GAP_1 + DURATION_HEIGHT_GAP_1;
const DURATION_Y_TEXT_HOUR      = DURATION_Y_COUNT + DURATION_HEIGHT_COUNT;
const DURATION_Y_TEXT_COUNT     = DURATION_Y_TEXT_HOUR + DURATION_HEIGHT_TEXT_HOUR;
const DURATION_Y_GAP_2          = DURATION_Y_TEXT_COUNT + DURATION_HEIGHT_TEXT_COUNT;
const DURATION_Y_OPTION         = DURATION_Y_GAP_2 + DURATION_HEIGHT_GAP_2;
const DURATION_Y_END            = DURATION_Y_OPTION + DURATION_HEIGHT_OPTION;

const DURATION_WIDTH_PATH = 3;

// ------

const DISTANCE_X = DURATION_X;
const DISTANCE_Y = DURATION_Y_END + 50;

const DISTANCE_WIDTH = 950 - DISTANCE_X;

const DISTANCE_WIDTH_LABEL = 25;
const DISTANCE_HEIGHT_LABEL = 25;

const DISTANCE_X_LABEL = DISTANCE_X;
const DISTANCE_X_CONTENT = DISTANCE_X_LABEL + DISTANCE_WIDTH_LABEL;

const DISTANCE_WIDTH_CONTENT = 950 - DISTANCE_X_CONTENT;

const DISTANCE_HEIGHT_TEXT_TITLE = DISTANCE_HEIGHT_LABEL;
const DISTANCE_HEIGHT_GAP_1 = 0;
const DISTANCE_HEIGHT_COUNT = 120;
const DISTANCE_HEIGHT_TEXT_HOUR = DISTANCE_HEIGHT_LABEL;
const DISTANCE_HEIGHT_TEXT_COUNT = DISTANCE_HEIGHT_LABEL;

const DISTANCE_Y_TEXT_TITLE = DISTANCE_Y;
const DISTANCE_Y_GAP_1      = DISTANCE_Y_TEXT_TITLE + DISTANCE_HEIGHT_TEXT_TITLE;
const DISTANCE_Y_COUNT      = DISTANCE_Y_GAP_1 + DISTANCE_HEIGHT_GAP_1;
const DISTANCE_Y_TEXT_HOUR  = DISTANCE_Y_COUNT + DISTANCE_HEIGHT_COUNT;
const DISTANCE_Y_TEXT_COUNT = DISTANCE_Y_TEXT_HOUR + DISTANCE_HEIGHT_TEXT_HOUR;
const DISTANCE_Y_END        = DISTANCE_Y_TEXT_COUNT + DISTANCE_HEIGHT_TEXT_COUNT;

const DISTANCE_WIDTH_PATH = 3;

const DISTANCE_COUNT_SCALE = 2000000;

// -------------------------------------------------

const DISPLAY_TYPE_DURATION = 
[
    {index: 0, name: "All",                         count_scale: 2000000, text_format: FORMAT_K},
    {index: 1, name: "Return to Different Station", count_scale: 2000000, text_format: FORMAT_K},
    {index: 2, name: "Return to Same Station",      count_scale:   10000, text_format: FORMAT_K_2},
];

var displayType_duration_prev = DISPLAY_TYPE_DURATION[0];
var displayType_duration_this = DISPLAY_TYPE_DURATION[0];

// -------------------------------------------------

var transition_duration = true
var transition_distance = true

var transition_duration_note = true
var transition_distance_note = true

function draw_duration_distance_youbike(svg_w_px, svg_h_px, 
                                        id_svg_main, 
                                        progress, language) {

    console.log("draw_duration_distance_youbike")

    console.log("progress", progress)

    dataset_daily = dataset_daily_youbike

    if (dataset_daily.length <= 0) 
        return
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

    {
        let displayType_index_prev = displayType_duration_prev.index
        let displayType_index_this = displayType_duration_this.index
        
        // --------------------------------------------------------------------------------- 

        dataset = []
        dataset_d = []
        dataset_s = []

        for (i = 0; i < dataset_daily.length; i++) {

            dataset.push(dataset_daily[i].duration)
            dataset_d.push(dataset_daily[i].duration_d)
            dataset_s.push(dataset_daily[i].duration_s)
        }

        duration_sum = []
        duration_sum_d = []
        duration_sum_s = []

        for (m = 0; m < dataset[0].length - 1; m++) {

            duration_sum.push(d3.sum(dataset,     function (d) { return d[m] }))
            duration_sum_d.push(d3.sum(dataset_d, function (d) { return d[m] }))
            duration_sum_s.push(d3.sum(dataset_s, function (d) { return d[m] }))
        }
    
        // --------------------------------------------------------------------------------- 

        let v_max_count = [d3.max(duration_sum,   function (d) { return d; }),
                           d3.max(duration_sum_d, function (d) { return d; }),
                           d3.max(duration_sum_s, function (d) { return d; })]

        let v_rulerMax_scaleY_count = []

        for (i in v_max_count) {

            count_scale = DISPLAY_TYPE_DURATION[i].count_scale;
            v_rulerMax_scaleY_count.push(count_scale * (parseInt(v_max_count[i] / count_scale))); // calculate scale
        }

        // --------------------------------------------------------------------------------- 
        
        let  v_scaleY_count = []

        for (i in v_rulerMax_scaleY_count) {

            v_scaleY_count.push(d3.scaleLinear()
                                    .domain([0, v_rulerMax_scaleY_count[i]]) 
                                    .range([DURATION_Y_COUNT + DURATION_HEIGHT_COUNT, DURATION_Y_COUNT]));
        }

        let scaleY_count_prev = v_scaleY_count[displayType_index_prev]
        let scaleY_count_this = v_scaleY_count[displayType_index_this]

        // ---------------------------------------------------------------------------------

        let scaleX = d3.scaleLinear()
                        .domain([0, duration_sum.length - 1])
                        .range([DURATION_X_CONTENT, 
                                DURATION_X_CONTENT + DURATION_WIDTH_CONTENT])

        // --------------------------------------------------------------------------------- 

        svg.append("text")
                .attr("class", "c_content_l_bold color_white_svg")
                .attr("x", DURATION_X)
                .attr("y", DURATION_Y_TEXT_TITLE)
                .attr("fill-opacity", opacity) 
                .text(getText_Duration_SubTitle(0, language))

        svg.append("text")
                .attr("class", "c_content_l color_white_svg")
                .attr("x", DURATION_X)
                .attr("y", DURATION_Y_TEXT_TITLE_SUB)
                .attr("fill-opacity", opacity) 
                .text(getText_TypeName(displayType_index_this, language)) 

        // ---------------------------------------------------------------------------------

        let dataset_duration = []

        for (i in duration_sum) {

            dataset_duration.push([duration_sum[i], duration_sum_d[i], duration_sum_s[i]])
        }

        let middle_index = [d3.sum(dataset_duration, function(d) { return d[0] }) / 2,
                            d3.sum(dataset_duration, function(d) { return d[1] }) / 2,
                            d3.sum(dataset_duration, function(d) { return d[2] }) / 2]

        let count_sum = [0, 0, 0]
        let median = [0, 0, 0]

        for (type_index = 0; type_index < median.length; type_index++) {

            for (i in dataset_duration) {

                count_sum[type_index] += dataset_duration[i][type_index]

                if (count_sum[type_index] > middle_index[type_index]) {

                    median[type_index] = i

                    break
                }
            }
        }

        // -----------------------------------------------------

        if (transition_duration) {
            
             svg.selectAll("line.c_line_duration")
                .data(dataset_duration)
                .enter()
                .append("line")
                    .attr("class", "c_line_duration")
                    .attr("x1", function (d, i) { return scaleX(i) })
                    .attr("y1", function (d) { return scaleY_count_prev(0) })
                    .attr("x2", function (d, i) { return scaleX(i) })
                    .attr("y2", function (d) { return scaleY_count_prev(0) })
                    .attr("stroke", COLOR_WHITE) 
                    .attr("stroke-width", DURATION_WIDTH_PATH) 
                    .attr("stroke-opacity", opacity) 
                    .attr("fill-opacity", 0) 
                    .transition()
                    .duration(1000)
                    .attr("y2", function (d) { return scaleY_count_this(d[displayType_index_this]) })

            transition_duration = false

        } else {

             svg.selectAll("line.c_line_duration")
                .data(dataset_duration)
                .enter()
                .append("line")
                    .attr("class", "c_line_duration")
                    .attr("x1", function (d, i) { return scaleX(i) })
                    .attr("y1", function (d) { return scaleY_count_prev(0) })
                    .attr("x2", function (d, i) { return scaleX(i) })
                    .attr("y2", function (d) { return scaleY_count_prev(d[displayType_index_prev]) })
                    .attr("stroke", COLOR_WHITE) 
                    .attr("stroke-width", DURATION_WIDTH_PATH) 
                    .attr("stroke-opacity", opacity) 
                    .attr("fill-opacity", 0) 
                    .transition()
                    .duration(1000)
                    .attr("y2", function (d) { return scaleY_count_this(d[displayType_index_this]) })
        }

        // -----------------------------------------------------

        svg.selectAll("line.c_line_duration_select")
                .data(dataset_duration)
                .enter()
                .append("line")
                    .attr("class", "c_line_duration_select")
                    .attr("id", function (d) { return "i_line_duration_select_" + d; } )
                    .attr("x1", function (d, i) { return scaleX(i) })
                    .attr("y1", function (d) { return scaleY_count_prev(0) })
                    .attr("x2", function (d, i) { return scaleX(i) })
                    .attr("y2", function (d) { return scaleY_count_prev(v_max_count[0]) })
                    .attr("stroke", COLOR_WHITE) 
                    .attr("stroke-width", DURATION_WIDTH_PATH * 3) 
                    .attr("opacity", 0) 
                    .on("mouseover", function (d, i) {

                        let x = scaleX(i)

                        // --------------------

                        d3.select("#i_line_duration_select")
                            .attr("x1", x)
                            .attr("x2", x)
                            .attr("stroke", COLOR_WHITE)
                            .attr("opacity", opacity / 2) 

                        d3.select("#i_text_duration_title")
                            .attr("x", x - TEXT_GAP) 
                            .attr("opacity", opacity) 
                            .text(getText_NumberOfTrips(language).toUpperCase() + " (" + i + getText_Min(language).toUpperCase() + ")") 

                        d3.select("#i_text_duration_content")
                            .attr("x", x + TEXT_GAP) 
                            .attr("fill", COLOR_WHITE)
                            .attr("fill-opacity", opacity)
                            .attr("stroke-opacity", 0)
                            .attr("opacity", opacity) 
                            .text(FORMAT_COMMA(d[displayType_index_this]))
                    })

        svg.append("text")
                .attr("id", "i_text_duration_title")
                .attr("class", "c_content_m c_text_anchor_end")
                .attr("x", 0) 
                .attr("y", DURATION_Y_TEXT_COUNT + DURATION_HEIGHT_TEXT_COUNT - 6) 
                .attr("fill", COLOR_WHITE) 
                .attr("opacity", opacity) 

        svg.append("text")
                .attr("id", "i_text_duration_content")
                .attr("class", "c_content_l c_text_anchor_start")
                .attr("x", 0) 
                .attr("y", DURATION_Y_TEXT_COUNT + DURATION_HEIGHT_TEXT_COUNT - 2) 
                .attr("opacity", opacity) 

        // ---------------------------------------------------------------------------------

        for (var m = 0; m < duration_sum.length; m += 10) {

            svg.append("text")
                    .attr("class", "c_content_m c_text_anchor_middle")
                    .attr("x", scaleX(m)) 
                    .attr("y", DURATION_Y_TEXT_HOUR + DURATION_HEIGHT_TEXT_HOUR - 10) 
                    .attr("fill", COLOR_GREY)
                    .attr("opacity", opacity)
                    .text(m)
        }

        svg.append("text")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", scaleX(duration_sum.length - 2)) 
            .attr("y", DURATION_Y_TEXT_HOUR + DURATION_HEIGHT_TEXT_HOUR - 10) 
            .attr("fill", COLOR_GREY)
            .attr("opacity", opacity)
            .text(getText_Min(language) + " >>")
              
        // --------------------------------------------------------------------------------- 

        for (var i = 0; i <= v_rulerMax_scaleY_count[displayType_index_this]; i += (v_rulerMax_scaleY_count[displayType_index_this] / 2)) {

            svg.append("text")
                    .attr("class", "c_content_m c_text_anchor_middle")
                    .attr("x", DURATION_X_LABEL + DURATION_WIDTH_LABEL - 16)
                    .attr("y", scaleY_count_this(i) + 4)
                    .attr("fill", COLOR_GREY)
                    .attr("opacity", opacity)
                    .text(DISPLAY_TYPE_DURATION[displayType_index_this].text_format(i))
        }

        // --------------------------------------------------------------------------------- 

        {
            // Features of the annotation
            let annotations = [
              {
                type: d3.annotationCalloutElbow,
                note: {
                  label: (median[displayType_index_this]) + getText_Min(language),
                  title: getText_Median(language),
                  align: "left",  // try right or left
                  wrap: 80,  // try something smaller to see text split in several lines
                  padding: 0   // More = text lower
                },
                color: [COLOR_RED],
                x: scaleX(median[displayType_index_this]),
                y: scaleY_count_this(dataset_duration[median[displayType_index_this]][displayType_index_this]),
                dx: 25,
                dy: -25
              }
            ]

            // Add annotation to the chart
            let makeAnnotations = d3.annotation()
                                        .annotations(annotations)

            svg.append("g")
                .attr("class", "annotation-group c_content_m")
                    .style('opacity', (transition_duration_note) ? 0 : opacity)
                    .call(makeAnnotations)
                    .transition()
                    .duration(1000)
                    .style('opacity', (transition_duration_note) ? 0 : opacity)
                    .transition()
                    .duration(250)
                    .style('opacity', opacity)

            transition_duration_note = false
        }

        // ---------------------------------------------------------------------------------
       
        svg.append("line")
                    .attr("id", "i_line_duration_select")
                    .attr("x1", 0)
                    .attr("y1", DURATION_Y_COUNT)
                    .attr("x2", 0)
                    .attr("y2", DURATION_Y_GAP_2)
                    .attr("stroke-width", 0.5) 
                    .attr("opacity", 0) 

        // --------------------------------------------------------------------------------- 

        {
            svg.append("text")
                    .attr("id", "i_duration_type_title")
                    .attr("class", "c_content_m c_text_anchor_start")
                    .attr("x", DURATION_X)
                    .attr("y", DURATION_Y_OPTION)
                    .attr("fill", COLOR_WHITE) 
                    .attr("fill-opacity", opacity)
                    .text(getText_Type(language) + " /")

            let width_option = d3.select("#i_duration_type_title").node().getBBox().width;

            svg.selectAll("text.c_text_duration_option")
                .data(DISPLAY_TYPE_DURATION)
                .enter()
                .append("text")
                    .attr("id", function (d) { return "i_text_duration_option_" + d.index })
                    .attr("class", "c_text_duration_option c_content_m c_text_anchor_start text_dec_underline c_cursor")
                    .text(function (d, i) { return getTypeText(i, language).toUpperCase()  })
                    .attr("x", function (d, i) { 

                        let width_sum = 0

                        for (index in DISPLAY_TYPE_DURATION) {

                            if (index >= i)
                                break

                            width_sum += (d3.select("#i_text_duration_option_" + DISPLAY_TYPE_DURATION[index].index).node().getBBox().width + TEXT_GAP_MAX)
                        }

                        return DAILY_X + width_option + TEXT_GAP_MAX + width_sum
                    })                     
                    .attr("y", DURATION_Y_OPTION)
                    .attr("fill", function (d) { return (d.index == displayType_index_this) ? COLOR_WHITE : COLOR_GREY}) 
                    .attr("fill-opacity", opacity)
                    .on("click", function(d) {

                        transition_duration_note = true

                        displayType_duration_prev = displayType_duration_this
                        displayType_duration_this = d

                        draw_duration_distance_youbike(svg_w_px, svg_h_px, 
                                                       id_svg_main, 
                                                       progress, language)
                    })
        }

    }

    // ---------------------------------------------------------------------------

    {
        dataset = []

        for (i = 0; i < dataset_daily.length; i++) {

            dataset.push(dataset_daily[i].distance)
        }

        distance_sum = []

        for (m = 1; m < dataset[0].length - 1; m++) {

            distance_sum.push(d3.sum(dataset, function (d) { return d[m] }))
        }

        let max_count = d3.max(distance_sum, function (d) { return d; });

        // ---------------------------------------------------------------------------------

        let rulerMax_scaleY_count = DISTANCE_COUNT_SCALE * (parseInt(max_count / DISTANCE_COUNT_SCALE)); // calculate scale

        // ---------------------------------------------------------------------------------

        let scaleX = d3.scaleLinear()
                        .domain([0, distance_sum.length - 1])
                        .range([DISTANCE_X_CONTENT, 
                                DISTANCE_X_CONTENT + DISTANCE_WIDTH_CONTENT])

        let scaleY = d3.scaleLinear()
                        .domain([0, rulerMax_scaleY_count])
                        .range([DISTANCE_Y_COUNT + DISTANCE_HEIGHT_COUNT, DISTANCE_Y_COUNT])

        // --------------------------------------------------------------------------------- 

        svg.append("text")
                .attr("class", "c_content_l_bold c_text_anchor_start color_white_svg")
                .attr("x", DISTANCE_X_LABEL)
                .attr("y", DISTANCE_Y_TEXT_TITLE)
                .attr("fill-opacity", opacity) 
                .text(getText_Distance_SubTitle(0, language))

        // ---------------------------------------------------------------------------------

        dataset_distance = []

        for (i in distance_sum) {

            dataset_distance.push(distance_sum[i])
        }

        let middle_index = d3.sum(dataset_distance, function(d) { return d }) / 2

        let count_sum = 0
        let median = 0

        for (i in dataset_distance) {

            count_sum += dataset_distance[i]

            if (count_sum > middle_index) {

                median = i

                break
            }
        }

        // -----------------------------------------------------

        if (transition_distance) {
        
            svg.selectAll("line.c_line_distance")
                .data(dataset_distance)
                .enter()
                .append("line")
                    .attr("class", "c_line_distance")
                    .attr("x1", function (d, i) { return scaleX(i) })
                    .attr("y1", function (d) { return scaleY(0) })
                    .attr("x2", function (d, i) { return scaleX(i) })
                    .attr("y2", function (d) { return scaleY(0) })
                    .attr("stroke", COLOR_WHITE) 
                    .attr("stroke-width", DISTANCE_WIDTH_PATH) 
                    .attr("stroke-opacity", opacity) 
                    .attr("fill-opacity", 0)
                    .transition()
                    .duration(1000)
                    .attr("y2", function (d) { return scaleY(d) })

            transition_distance = false

        } else {
        
            svg.selectAll("line.c_line_distance")
                .data(dataset_distance)
                .enter()
                .append("line")
                    .attr("class", "c_line_distance")
                    .attr("x1", function (d, i) { return scaleX(i) })
                    .attr("y1", function (d) { return scaleY(0) })
                    .attr("x2", function (d, i) { return scaleX(i) })
                    .attr("y2", function (d) { return scaleY(d) })
                    .attr("stroke", COLOR_WHITE) 
                    .attr("stroke-width", DISTANCE_WIDTH_PATH) 
                    .attr("stroke-opacity", opacity) 
                    .attr("fill-opacity", 0)
        }

        // -----------------------------------------------------

        svg.selectAll("line.c_line_distance_select")
                .data(dataset_distance)
                .enter()
                .append("line")
                    .attr("class", "c_line_distance_select")
                    .attr("id", function (d) { return "i_line_distance_select_" + d; } )
                    .attr("x1", function (d, i) { return scaleX(i) })
                    .attr("y1", function (d) { return scaleY(0) })
                    .attr("x2", function (d, i) { return scaleX(i) })
                    .attr("y2", function (d) { return scaleY(max_count) })
                    .attr("stroke", COLOR_WHITE) 
                    .attr("stroke-width", DISTANCE_WIDTH_PATH * 3) 
                    .attr("opacity", 0) 
                    .on("mouseover", function (d, i) {

                        let x = scaleX(i)

                        // --------------------

                        d3.select("#i_line_distance_select")
                            .attr("x1", x)
                            .attr("x2", x)
                            .attr("stroke", COLOR_WHITE)
                            .attr("opacity", opacity / 2) 

                        d3.select("#i_text_distance_title")
                            .attr("x", x - TEXT_GAP) 
                            .attr("y", DISTANCE_Y_TEXT_COUNT + DISTANCE_HEIGHT_TEXT_COUNT - 8) 
                            .attr("opacity", opacity) 
                            .text(getText_NumberOfTrips(language).toUpperCase() + " (" + FORMAT_COMMA(i / 10) + getText_KM(language).toUpperCase() + ")") 

                        d3.select("#i_text_distance_content")
                            .attr("x", x + 5) 
                            .attr("y", DISTANCE_Y_TEXT_COUNT + DISTANCE_HEIGHT_TEXT_COUNT - 2) 
                            .attr("fill", COLOR_WHITE)
                            .attr("fill-opacity", opacity)
                            .attr("stroke-opacity", 0)
                            .attr("opacity", opacity) 
                            .text(FORMAT_COMMA(d))
                    })

        svg.append("text")
                .attr("id", "i_text_distance_title")
                .attr("class", "c_content_m c_text_anchor_end")
                .attr("x", 0) 
                .attr("y", 0) 
                .attr("fill", COLOR_WHITE) 
                .attr("opacity", opacity) 

        svg.append("text")
                .attr("id", "i_text_distance_content")
                .attr("class", "c_content_l c_text_anchor_start")
                .attr("x", 0) 
                .attr("y", 0) 
                .attr("fill", COLOR_WHITE) 
                .attr("opacity", opacity) 
                .attr("opacity", opacity) 

        // ---------------------------------------------------------------------------------

        for (var d = 0; d < dataset_distance.length; d += 10) {

            svg.append("text")
                    .attr("class", "c_content_m c_text_anchor_middle")
                    .attr("x", scaleX(d)) 
                    .attr("y", DISTANCE_Y_TEXT_HOUR + DISTANCE_HEIGHT_TEXT_HOUR - 10) 
                    .attr("fill", COLOR_GREY)
                    .attr("opacity", opacity)
                    .text(parseInt(d / 10))
        }

        svg.append("text")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", scaleX(dataset_distance.length - 2)) 
            .attr("y", DISTANCE_Y_TEXT_HOUR + DISTANCE_HEIGHT_TEXT_HOUR - 10) 
            .attr("fill", COLOR_GREY)
            .attr("opacity", opacity)
            .text(getText_KM(language) + " >>")
              
        // --------------------------------------------------------------------------------- 

        for (var i = 0; i <= rulerMax_scaleY_count; i += (rulerMax_scaleY_count / 2)) {

                svg.append("text")
                        .attr("class", "c_content_m c_text_anchor_middle")
                        .attr("x", DISTANCE_X_LABEL + DISTANCE_WIDTH_LABEL - 16)
                        .attr("y", scaleY(i) + 4)
                        .attr("fill", COLOR_GREY)
                        .attr("opacity", opacity)
                        .text(FORMAT_K(i))
            }

        // --------------------------------------------------------------------------------- 

        {
            // Features of the annotation
            let annotations = [
              {
                type: d3.annotationCalloutElbow,
                note: {
                  label: (median / 10) + getText_KM(language),
                  title: getText_Median(language),
                  align: "left",  // try right or left
                  wrap: 80,  // try something smaller to see text split in several lines
                  padding: 0   // More = text lower
                },
                color: [COLOR_RED],
                x: scaleX(median),
                y: scaleY(dataset_distance[median]),
                dx: 25,
                dy: -25
              }
            ]

            // Add annotation to the chart
            let makeAnnotations = d3.annotation()
                                        .annotations(annotations)

            svg.append("g")
                .attr("class", "annotation-group c_content_m")
                    .style('opacity', (transition_distance_note) ? 0 : opacity)
                    .call(makeAnnotations)
                    .transition()
                    .duration(1000)
                    .style('opacity', (transition_distance_note) ? 0 : opacity)
                    .transition()
                    .duration(250)
                    .style('opacity', opacity)

            transition_distance_note = false
        }
        
        // ---------------------------------------------------------------------------------
       
        svg.append("line")
                    .attr("id", "i_line_distance_select")
                    .attr("x1", 0)
                    .attr("y1", DISTANCE_Y_COUNT)
                    .attr("x2", 0)
                    .attr("y2", DISTANCE_Y_END)
                    .attr("stroke-width", 0.5) 
                    .attr("opacity", opacity) 
    }

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

