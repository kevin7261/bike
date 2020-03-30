
const HOURLY_PATH_X = 410;
const HOURLY_PATH_Y = 140;

const HOURLY_PATH_WIDTH = 950 - HOURLY_PATH_X;
const HOURLY_PATH_HEIGHT = 300;

const HOURLY_PATH_WIDTH_LABEL = 25;
const HOURLY_PATH_HEIGHT_LABEL = 25;

const HOURLY_PATH_X_LABEL = HOURLY_PATH_X;
const HOURLY_PATH_X_CONTENT = HOURLY_PATH_X_LABEL + HOURLY_PATH_WIDTH_LABEL;

const HOURLY_PATH_WIDTH_CONTENT = 950 - HOURLY_PATH_X_CONTENT;

const HOURLY_PATH_HEIGHT_TEXT_TITLE = HOURLY_PATH_HEIGHT_LABEL;
const HOURLY_PATH_HEIGHT_TEXT_TITLE_SUB = HOURLY_PATH_HEIGHT_LABEL;
const HOURLY_PATH_HEIGHT_GAP_1 = 30;
const HOURLY_PATH_HEIGHT_COUNT = 250;
const HOURLY_PATH_HEIGHT_TEXT_HOUR = HOURLY_PATH_HEIGHT_LABEL;
const HOURLY_PATH_HEIGHT_TEXT_WEEKDAY = HOURLY_PATH_HEIGHT_LABEL;
const HOURLY_PATH_HEIGHT_TEXT_WEEKEND = HOURLY_PATH_HEIGHT_LABEL;
const HOURLY_PATH_HEIGHT_GAP_2 = 30;
const HOURLY_PATH_HEIGHT_OPTION = HOURLY_PATH_HEIGHT_LABEL;

const HOURLY_PATH_Y_TEXT_TITLE     = HOURLY_PATH_Y;
const HOURLY_PATH_Y_TEXT_TITLE_SUB = HOURLY_PATH_Y_TEXT_TITLE + HOURLY_PATH_HEIGHT_TEXT_TITLE;
const HOURLY_PATH_Y_GAP_1          = HOURLY_PATH_Y_TEXT_TITLE_SUB + HOURLY_PATH_HEIGHT_TEXT_TITLE_SUB;
const HOURLY_PATH_Y_COUNT          = HOURLY_PATH_Y_GAP_1 + HOURLY_PATH_HEIGHT_GAP_1;
const HOURLY_PATH_Y_TEXT_HOUR      = HOURLY_PATH_Y_COUNT + HOURLY_PATH_HEIGHT_COUNT;
const HOURLY_PATH_Y_TEXT_WEEKDAY   = HOURLY_PATH_Y_TEXT_HOUR + HOURLY_PATH_HEIGHT_TEXT_HOUR;
const HOURLY_PATH_Y_TEXT_WEEKEND   = HOURLY_PATH_Y_TEXT_WEEKDAY + HOURLY_PATH_HEIGHT_TEXT_WEEKDAY;
const HOURLY_PATH_Y_GAP_2          = HOURLY_PATH_Y_TEXT_WEEKEND + HOURLY_PATH_HEIGHT_TEXT_WEEKEND;
const HOURLY_PATH_Y_OPTION         = HOURLY_PATH_Y_GAP_2 + HOURLY_PATH_HEIGHT_GAP_2;
const HOURLY_PATH_Y_END            = HOURLY_PATH_Y_OPTION + HOURLY_PATH_HEIGHT_OPTION;

const HOURLY_PATH_WIDTH_PATH = 3;
const HOURLY_PATH_WIDTH_BAR = HOURLY_PATH_WIDTH / 24;

// -------------------------------------------------

const DISPLAY_TYPE_HOURLY = 
[
    {index: 0, name: "All",                         count_scale: 2000},
    {index: 1, name: "Return to Different Station", count_scale: 2000},
    {index: 2, name: "Return to Same Station",      count_scale: 1000},
];

var displayType_hourly_prev = DISPLAY_TYPE_HOURLY[0];
var displayType_hourly_this = DISPLAY_TYPE_HOURLY[0];

function draw_hourly_path_youbike(svg_w_px, svg_h_px, 
                                  svg_w_px_legend, svg_h_px_legend, 
                                  id_svg_main, id_svg_legend, 
                                  progress, language) {

    console.log("draw_hourly_path_youbike")

    console.log("progress", progress)

    let dataset_daily = dataset_daily_youbike

    if (dataset_daily.length <= 0) 
        return

    // --------------------------------------------------------------------------------- 
   
    draw_hourly_legend_youbike(svg_w_px_legend, svg_h_px_legend, id_svg_legend, language)

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg_main + " > svg").remove();

    let svg = d3.select(id_svg_main)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);
    
    // --------------------------------------------------------------------------------- 

    let displayType_index_prev = displayType_hourly_prev.index
    let displayType_index_this = displayType_hourly_this.index

    // --------------------------------------------------------------------------------- 

    let dataset_daily_all = dataset_daily

    // --------------------------------------------------------------------------------- 

    count_hour = [];

    count_hour_weekday = [];
    count_hour_weekend = [];
    count_hour_weekday_d = [];
    count_hour_weekend_d = [];
    count_hour_weekday_s = [];
    count_hour_weekend_s = [];

    dataset_daily_weekday = dataset_daily_all.filter(function (d) { if (d.weekday < 5) return d })
    dataset_daily_weekend = dataset_daily_all.filter(function (d) { if (d.weekday >= 5) return d })

    for (h = 0; h < 24; h++) {

        let median_weekday   = d3.median(dataset_daily_weekday, function (d) { return d.hour[h] })
        let median_weekend   = d3.median(dataset_daily_weekend, function (d) { return d.hour[h] })
        let median_weekday_d = d3.median(dataset_daily_weekday, function (d) { return d.hour_d[h] })
        let median_weekend_d = d3.median(dataset_daily_weekend, function (d) { return d.hour_d[h] })
        let median_weekday_s = d3.median(dataset_daily_weekday, function (d) { return d.hour_s[h] })
        let median_weekend_s = d3.median(dataset_daily_weekend, function (d) { return d.hour_s[h] })

        count_hour_weekday.push(median_weekday)
        count_hour_weekend.push(median_weekend)
        count_hour_weekday_d.push(median_weekday_d)
        count_hour_weekend_d.push(median_weekend_d)
        count_hour_weekday_s.push(median_weekday_s)
        count_hour_weekend_s.push(median_weekend_s)
    }

    v_count_hour = [[count_hour_weekday, count_hour_weekend],
                    [count_hour_weekday_d, count_hour_weekend_d],
                    [count_hour_weekday_s, count_hour_weekend_s]]

    count_hour_prev = v_count_hour[displayType_index_prev]
    count_hour_this = v_count_hour[displayType_index_this]

    // --------------------------------------------------------------------------------- 

    let v_max_count = [d3.max(count_hour_weekday.concat(count_hour_weekend),     function (d) { return d; }),
                       d3.max(count_hour_weekday_d.concat(count_hour_weekend_d), function (d) { return d; }),
                       d3.max(count_hour_weekday_s.concat(count_hour_weekend_s), function (d) { return d; })]

    let v_rulerMax_scaleY_count = []

    for (i in v_max_count) {

        count_scale = DISPLAY_TYPE_HOURLY[i].count_scale;
        v_rulerMax_scaleY_count.push(count_scale * (parseInt(v_max_count[i] / count_scale) + 1)); // calculate scale
    }

    // --------------------------------------------------------------------------------- 
    
    let  v_scaleY_count = []

    for (i in v_rulerMax_scaleY_count) {

        v_scaleY_count.push(d3.scaleLinear()
                                .domain([0, v_rulerMax_scaleY_count[i]]) 
                                .range([HOURLY_PATH_Y_COUNT + HOURLY_PATH_HEIGHT_COUNT, 
                                        HOURLY_PATH_Y_COUNT]));
    }

    let scaleY_count_prev = v_scaleY_count[displayType_index_prev]
    let scaleY_count_this = v_scaleY_count[displayType_index_this]

    // --------------------------------------------------------------------------------- 

    let scaleProgress_opacity = d3.scaleLinear()
                                    .domain([0, 0.1, 0.9, 1] )
                                    .range([0, 1, 1, 0])

    let opacity = scaleProgress_opacity(progress)

    // --------------------------------------------------------------------------------- 

    let scaleX = d3.scaleLinear()
                    .domain([0, INDEX_HOUR.length - 1] )
                    .range([HOURLY_PATH_X_CONTENT + 5, 
                            HOURLY_PATH_X_CONTENT + HOURLY_PATH_WIDTH_CONTENT - 5]);

    let scaleProgress_count = d3.scaleLinear()
                                    .domain([0, 0.2, 1] )
                                    .range([0, 1, 1])

    let ratio_count = scaleProgress_count(progress)

    // --------------------------------------------------------------------------------- 

    svg.append("text")
            .attr("class", "c_content_l_bold c_text_anchor_start color_white_svg")
            .attr("x", DAILY_X_LABEL)
            .attr("y", HOURLY_PATH_Y_TEXT_TITLE)
            .attr("fill-opacity", opacity) 
            .text(getText_Hourly_SubTitle(0, language))

    svg.append("text")
            .attr("class", "c_content_l c_text_anchor_start color_white_svg")
            .attr("x", DAILY_X_LABEL)
            .attr("y", HOURLY_PATH_Y_TEXT_TITLE_SUB)
            .attr("fill-opacity", opacity) 
            .text(getText_TypeName(displayType_index_this, language)) 

    // ---------------------------------------------------------------------------------

    let d3_curve_type = d3.curveCardinal;//d3.curveLinear; //d3.curveBasis; //d3.curveMonotoneX;

    count_line_ori = d3.line()
                    .x(function(d, i) { return scaleX(i); })
                    .y(function(d)  { return scaleY_count_prev(0); })
                    .curve(d3_curve_type);

    count_line_prev = d3.line()
                    .x(function(d, i) { return scaleX(i); })
                    .y(function(d)  { return scaleY_count_prev(d); })
                    .curve(d3_curve_type);

    count_line_this = d3.line()
                    .x(function(d, i) { return scaleX(i); })
                    .y(function(d)  { return scaleY_count_this(d); })
                    .curve(d3_curve_type);
    
    // ---------------------------------------------------------------------------------

    if (transition_hourly) {

        svg.append("path")
            .attr("d", count_line_ori(count_hour_prev[0]))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", HOURLY_PATH_WIDTH_PATH) 
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", opacity) 
            .transition()
            .duration(1000)
            .attr("d", count_line_this(count_hour_this[0]))

        svg.append("path")
            .attr("d", count_line_ori(count_hour_prev[1]))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", HOURLY_PATH_WIDTH_PATH) 
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", opacity) 
            .transition()
            .duration(1000)
            .attr("d", count_line_this(count_hour_this[1]))

        transition_hourly = false

    } else {

        svg.append("path")
            .attr("d", count_line_prev(count_hour_prev[0]))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", HOURLY_PATH_WIDTH_PATH) 
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", opacity) 
            .transition()
            .duration(1000)
            .attr("d", count_line_this(count_hour_this[0]))

        svg.append("path")
            .attr("d", count_line_prev(count_hour_prev[1]))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", HOURLY_PATH_WIDTH_PATH) 
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", opacity) 
            .transition()
            .duration(1000)
            .attr("d", count_line_this(count_hour_this[1]))
    }
    
    // ---------------------------------------------------------------------------------

    svg.selectAll("rect.c_rect_hourly_select")
            .data(INDEX_HOUR)
            .enter()
            .append("rect")
                .attr("class", "c_rect_hourly_select")
                .attr("id", function (d) { return "i_rect_hourly_select_" + d; } )
                .attr("x", function (d) { return scaleX(d) - (HOURLY_PATH_WIDTH_BAR / 2)})
                .attr("y", HOURLY_PATH_Y_COUNT)
                .attr("width", HOURLY_PATH_WIDTH_BAR) 
                .attr("height", HOURLY_PATH_Y_GAP_2 - HOURLY_PATH_Y_COUNT) 
                .attr("opacity", 0) 
                .on("mouseover", function (d, i) {

                    let x = scaleX(i)

                    d3.select("#i_line_hourly_select")
                        .attr("x1", x)
                        .attr("x2", x)
                        .attr("stroke", COLOR_WHITE)
                        .attr("opacity", opacity / 2) 

                    d3.select("#i_text_hourly_median_weekday_title")
                        .attr("x", x - TEXT_GAP) 
                        .attr("fill", COLOR_BLUE)
                        .attr("opacity", opacity) 

                    d3.select("#i_text_hourly_median_weekday_content")
                        .attr("x", x + TEXT_GAP) 
                        .attr("fill", COLOR_BLUE)
                        .attr("opacity", opacity) 
                        .text(FORMAT_COMMA(parseInt(count_hour_this[0][i])))

                    d3.select("#i_text_hourly_median_weekend_title")
                        .attr("x", x - TEXT_GAP) 
                        .attr("fill", COLOR_GREEN)
                        .attr("opacity", opacity) 

                    d3.select("#i_text_hourly_median_weekend_content")
                        .attr("x", x + TEXT_GAP) 
                        .attr("fill", COLOR_GREEN)
                        .attr("opacity", opacity) 
                        .text(FORMAT_COMMA(parseInt(count_hour_this[1][i])))
                })

    svg.append("text")
            .attr("id", "i_text_hourly_median_weekday_title")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", 0) 
            .attr("y", HOURLY_PATH_Y_TEXT_WEEKDAY + HOURLY_PATH_HEIGHT_TEXT_WEEKDAY - 6) 
            .attr("opacity", opacity) 
            .text(getText_Weekday(language))

    svg.append("text")
            .attr("id", "i_text_hourly_median_weekday_content")
            .attr("class", "c_content_l c_text_anchor_start")
            .attr("x", 0) 
            .attr("y", HOURLY_PATH_Y_TEXT_WEEKDAY + HOURLY_PATH_HEIGHT_TEXT_WEEKDAY - 2) 
            .attr("opacity", opacity) 
            .text("")

    svg.append("text")
            .attr("id", "i_text_hourly_median_weekend_title")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", 0) 
            .attr("y", HOURLY_PATH_Y_TEXT_WEEKEND + HOURLY_PATH_HEIGHT_TEXT_WEEKEND - 6) 
            .attr("opacity", opacity) 
            .text(getText_Weekend(language))

    svg.append("text")
            .attr("id", "i_text_hourly_median_weekend_content")
            .attr("class", "c_content_l c_text_anchor_start")
            .attr("x", 0) 
            .attr("y", HOURLY_PATH_Y_TEXT_WEEKEND + HOURLY_PATH_HEIGHT_TEXT_WEEKEND - 2) 
            .attr("opacity", opacity) 
            .text("")


    // --------------------------------------------------------------------------------- 

    for (var i = 0; i <= v_rulerMax_scaleY_count[displayType_index_this]; i += (v_rulerMax_scaleY_count[displayType_index_this] / 2)) {

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_end")
                .attr("x", HOURLY_PATH_X_LABEL + HOURLY_PATH_WIDTH_LABEL - 8)
                .attr("y", scaleY_count_this(i) + 4)
                .attr("fill", COLOR_GREY)
                .attr("opacity", opacity)
                .text(FORMAT_K(i))
    }

    // ---------------------------------------------------------------------------------

    svg.append("line")
        .attr("x1", scaleX(0))
        .attr("y1", HOURLY_PATH_Y_COUNT + HOURLY_PATH_HEIGHT_COUNT)
        .attr("x2", scaleX(INDEX_HOUR.length - 1))
        .attr("y2", HOURLY_PATH_Y_COUNT + HOURLY_PATH_HEIGHT_COUNT)
        .attr("stroke", COLOR_GREY)
        .attr("stroke-width", 0.5)
        .attr("stroke-opacity", opacity / 5);

    svg.selectAll("text.c_text_title")
            .data(INDEX_HOUR)
            .enter()
            .append("text")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", function(d) { return scaleX(d) }) 
                .attr("y", HOURLY_PATH_Y_TEXT_HOUR + HOURLY_PATH_HEIGHT_TEXT_HOUR - 10) 
                .attr("fill", COLOR_GREY)
                .attr("fill-opacity", opacity)
                .text(function(d) { 

                    let h = (d <= 12) ? d : Math.abs(d - 12)

                    return h;// + ((h < 12) ? "am" : "pm")
                });

    svg.selectAll("text.c_text_title")
            .data(INDEX_HOUR)
            .enter()
            .append("text")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", function(d) { return scaleX(d) }) 
                .attr("y", HOURLY_PATH_Y_TEXT_HOUR + HOURLY_PATH_HEIGHT_TEXT_HOUR) 
                .attr("fill", COLOR_GREY)
                .attr("fill-opacity", opacity)
                .text(function(d) { 

                    let h = ""

                    if (d == 0)
                        h = h + "am"
                    else if (d == 12 || d == 23)
                        h = h + "pm"

                    return h;// + ((h < 12) ? "am" : "pm")
                });

    // ---------------------------------------------------------------------------------
   
    svg.append("line")
                .attr("id", "i_line_hourly_select")
                .attr("x1", 0)
                .attr("y1", HOURLY_PATH_Y_COUNT)
                .attr("x2", 0)
                .attr("y2", HOURLY_PATH_Y_GAP_2)
                .attr("stroke-width", 0.5) 
                .attr("opacity", 0) 

    // ---------------------------------------------------------------------------------

    {
        svg.append("text")
            .attr("id", "i_hourly_type_title")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", HOURLY_PATH_X)
            .attr("y", HOURLY_PATH_Y_OPTION)
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity)
            .text(getText_Type(language) + " /")

        let width_option = d3.select("#i_hourly_type_title").node().getBBox().width

        svg.selectAll("text.c_text_hourly_option")
            .data(DISPLAY_TYPE_HOURLY)
            .enter()
            .append("text")
                .attr("id", function (d) { return "i_text_hourly_option_" + d.index })
                .attr("class", "c_text_hourly_option c_content_m c_text_anchor_start text_dec_underline c_cursor")
                .text(function (d, i) { return getTypeText(i, language).toUpperCase() })
                .attr("x", function (d, i) { 

                    let width_sum = 0

                    for (index in DISPLAY_TYPE_HOURLY) {

                        if (index >= i)
                            break

                        width_sum += (d3.select("#i_text_hourly_option_" + DISPLAY_TYPE_HOURLY[index].index).node().getBBox().width + TEXT_GAP_MAX)
                    }

                    return DAILY_X + width_option + TEXT_GAP_MAX + width_sum
                })                 
                .attr("y", HOURLY_PATH_Y_OPTION)
                .attr("fill", function (d) { return (d.index == displayType_index_this) ? COLOR_WHITE : COLOR_GREY}) 
                .attr("fill-opacity", opacity)
                .on("click", function(d) {

                    displayType_hourly_prev = displayType_hourly_this
                    displayType_hourly_this = d

                    draw_hourly_path_youbike(svg_w_px, svg_h_px, 
                                             svg_w_px_legend, svg_h_px_legend, 
                                             id_svg_main, id_svg_legend, 
                                             progress, language)
                })
    }

    // ---------------------------------------------------------------------------------
/*
    svg.append("line")
        .attr("x1", 0 + "px")
        .attr("y1", svg_h_px + "px")
        .attr("x2", svg_w_px + "px")
        .attr("y2", svg_h_px + "px")
        .attr("stroke", "gray")
        .attr("stroke-width", "1");
        */
}

// -------------------------------------------------

const LEGEND_HOURLY_X = 0;
const LEGEND_HOURLY_Y = 0;

const LEGEND_HOURLY_WIDTH = 300 - LEGEND_HOURLY_X;

const LEGEND_HOURLY_WIDTH_ITEM = 30;
const LEGEND_HOURLY_HEIGHT_ITEM = 10;

const LEGEND_HOURLY_WIDTH_GAP = 10;
const LEGEND_HOURLY_HEIGHT_GAP = 10;

const LEGEND_HOURLY_X_PATTERN = LEGEND_HOURLY_X;
const LEGEND_HOURLY_X_TEXT = LEGEND_HOURLY_X_PATTERN + LEGEND_HOURLY_WIDTH_GAP + LEGEND_HOURLY_WIDTH_ITEM;

const LEGEND_HOURLY_HEIGHT_WEEKDAY = LEGEND_HOURLY_HEIGHT_ITEM;
const LEGEND_HOURLY_HEIGHT_WEEKEND = LEGEND_HOURLY_HEIGHT_ITEM;
const LEGEND_HOURLY_HEIGHT_PRECP_HOUR = LEGEND_HOURLY_HEIGHT_ITEM;
const LEGEND_HOURLY_HEIGHT_PRECP = LEGEND_HOURLY_HEIGHT_ITEM;

const LEGEND_HOURLY_Y_WEEKDAY = LEGEND_HOURLY_Y;
const LEGEND_HOURLY_Y_WEEKEND = LEGEND_HOURLY_Y_WEEKDAY + LEGEND_HOURLY_HEIGHT_WEEKDAY + LEGEND_HOURLY_HEIGHT_GAP;
const LEGEND_HOURLY_Y_PRECP_HOUR = LEGEND_HOURLY_Y_WEEKEND + LEGEND_HOURLY_HEIGHT_WEEKEND + LEGEND_HOURLY_HEIGHT_GAP;
const LEGEND_HOURLY_Y_PRECP = LEGEND_HOURLY_Y_PRECP_HOUR + LEGEND_HOURLY_HEIGHT_PRECP_HOUR + LEGEND_HOURLY_HEIGHT_GAP;
const LEGEND_HOURLY_Y_END = LEGEND_HOURLY_Y_PRECP + LEGEND_HOURLY_HEIGHT_PRECP + LEGEND_HOURLY_HEIGHT_GAP;

function draw_hourly_legend_youbike(svg_w_px, svg_h_px, id_svg, language) {

    console.log("draw_hourly_legend");

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg + " > svg").remove();
    
    let svg = d3.select(id_svg)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);

    // --------------------------------------------------------------------------------- 

    svg.append("line")
            .attr("x1", LEGEND_HOURLY_X_PATTERN)
            .attr("y1", LEGEND_HOURLY_Y_WEEKDAY + (LEGEND_HOURLY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_HOURLY_X_PATTERN + LEGEND_HOURLY_WIDTH_ITEM)
            .attr("y2", LEGEND_HOURLY_Y_WEEKDAY + (LEGEND_HOURLY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_HOURLY_X_TEXT)
            .attr("y", LEGEND_HOURLY_Y_WEEKDAY + LEGEND_HOURLY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", 1) 
            .text(getText_Weekday(language))

    // -----

    svg.append("line")
            .attr("x1", LEGEND_HOURLY_X_PATTERN)
            .attr("y1", LEGEND_HOURLY_Y_WEEKEND + (LEGEND_HOURLY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_HOURLY_X_PATTERN + LEGEND_HOURLY_WIDTH_ITEM)
            .attr("y2", LEGEND_HOURLY_Y_WEEKEND + (LEGEND_HOURLY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_HOURLY_X_TEXT)
            .attr("y", LEGEND_HOURLY_Y_WEEKEND + LEGEND_HOURLY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_GREEN)
            .attr("fill-opacity", 1) 
            .text(getText_Weekend(language))
}
