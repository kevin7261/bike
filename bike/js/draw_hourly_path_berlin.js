
const BERLIN_HOURLY_PATH_X = 410;
const BERLIN_HOURLY_PATH_Y = 140;

const BERLIN_HOURLY_PATH_WIDTH = 950 - BERLIN_HOURLY_PATH_X;
const BERLIN_HOURLY_PATH_HEIGHT = 300;

const BERLIN_HOURLY_PATH_WIDTH_LABEL = 25;
const BERLIN_HOURLY_PATH_HEIGHT_LABEL = 25;

const BERLIN_HOURLY_PATH_X_LABEL = BERLIN_HOURLY_PATH_X;
const BERLIN_HOURLY_PATH_X_CONTENT = BERLIN_HOURLY_PATH_X_LABEL + BERLIN_HOURLY_PATH_WIDTH_LABEL;

const BERLIN_HOURLY_PATH_WIDTH_CONTENT = 950 - BERLIN_HOURLY_PATH_X_CONTENT;

const BERLIN_HOURLY_PATH_HEIGHT_TEXT_TITLE = BERLIN_HOURLY_PATH_HEIGHT_LABEL;
const BERLIN_HOURLY_PATH_HEIGHT_TEXT_TITLE_SUB = BERLIN_HOURLY_PATH_HEIGHT_LABEL;
const BERLIN_HOURLY_PATH_HEIGHT_GAP_1 = 30;
const BERLIN_HOURLY_PATH_HEIGHT_COUNT = 250;
const BERLIN_HOURLY_PATH_HEIGHT_TEXT_HOUR = BERLIN_HOURLY_PATH_HEIGHT_LABEL;
const BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKDAY = BERLIN_HOURLY_PATH_HEIGHT_LABEL;
const BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKEND = BERLIN_HOURLY_PATH_HEIGHT_LABEL;
const BERLIN_HOURLY_PATH_HEIGHT_GAP_2 = 30;
const BERLIN_HOURLY_PATH_HEIGHT_OPTION = BERLIN_HOURLY_PATH_HEIGHT_LABEL;

const BERLIN_HOURLY_PATH_Y_TEXT_TITLE     = BERLIN_HOURLY_PATH_Y;
const BERLIN_HOURLY_PATH_Y_TEXT_TITLE_SUB = BERLIN_HOURLY_PATH_Y_TEXT_TITLE + BERLIN_HOURLY_PATH_HEIGHT_TEXT_TITLE;
const BERLIN_HOURLY_PATH_Y_GAP_1          = BERLIN_HOURLY_PATH_Y_TEXT_TITLE_SUB + BERLIN_HOURLY_PATH_HEIGHT_TEXT_TITLE_SUB;
const BERLIN_HOURLY_PATH_Y_COUNT          = BERLIN_HOURLY_PATH_Y_GAP_1 + BERLIN_HOURLY_PATH_HEIGHT_GAP_1;
const BERLIN_HOURLY_PATH_Y_TEXT_HOUR      = BERLIN_HOURLY_PATH_Y_COUNT + BERLIN_HOURLY_PATH_HEIGHT_COUNT;
const BERLIN_HOURLY_PATH_Y_TEXT_WEEKDAY   = BERLIN_HOURLY_PATH_Y_TEXT_HOUR + BERLIN_HOURLY_PATH_HEIGHT_TEXT_HOUR;
const BERLIN_HOURLY_PATH_Y_TEXT_WEEKEND   = BERLIN_HOURLY_PATH_Y_TEXT_WEEKDAY + BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKDAY;
const BERLIN_HOURLY_PATH_Y_GAP_2          = BERLIN_HOURLY_PATH_Y_TEXT_WEEKEND + BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKEND;
const BERLIN_HOURLY_PATH_Y_OPTION         = BERLIN_HOURLY_PATH_Y_GAP_2 + BERLIN_HOURLY_PATH_HEIGHT_GAP_2;
const BERLIN_HOURLY_PATH_Y_END            = BERLIN_HOURLY_PATH_Y_OPTION + BERLIN_HOURLY_PATH_HEIGHT_OPTION;

const BERLIN_HOURLY_PATH_WIDTH_PATH = 3;
const BERLIN_HOURLY_PATH_WIDTH_BAR = BERLIN_HOURLY_PATH_WIDTH / 24;

// -------------------------------------------------

const DISPLAY_TYPE_HOURLY_BERLIN = 
[
    {index: 0, name: "All",       count_scale: 100},
    {index: 1, name: "Nextbike",  count_scale: 100},
    {index: 2, name: "LIDL-Bike", count_scale: 100},
    {index: 3, name: "Mobike",    count_scale: 100},
];

var displayType_hourly_berlin_prev = DISPLAY_TYPE_HOURLY_BERLIN[0];
var displayType_hourly_berlin_this = DISPLAY_TYPE_HOURLY_BERLIN[0];

function draw_hourly_path_berlin(svg_w_px, svg_h_px, 
                                 svg_w_px_legend, svg_h_px_legend, 
                                 id_svg_main, id_svg_legend, 
                                 progress, language) {

    console.log("draw_hourly_path_berlin");

    console.log("progress", progress)

    let dataset_daily = dataset_daily_berlin
    
    if (dataset_daily.length <= 0) 
        return

    // --------------------------------------------------------------------------------- 

    draw_hourly_legend_berlin(svg_w_px_legend, svg_h_px_legend, id_svg_legend, language)

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg_main + " > svg").remove();

    let svg = d3.select(id_svg_main)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);
    
    // --------------------------------------------------------------------------------- 

    let displayType_index_prev = displayType_hourly_berlin_prev.index
    let displayType_index_this = displayType_hourly_berlin_this.index

    // --------------------------------------------------------------------------------- 

    let dataset_hourly_all = dataset_daily

    // --------------------------------------------------------------------------------- 

    count_hour = [];

    count_hour_weekday = [];
    count_hour_weekend = [];
    count_hour_weekday_0 = [];
    count_hour_weekend_0 = [];
    count_hour_weekday_1 = [];
    count_hour_weekend_1 = [];
    count_hour_weekday_2 = [];
    count_hour_weekend_2 = [];

    dataset_hourly_weekday = dataset_hourly_all.filter(function (d) { if (d.weekday < 5) return d })
    dataset_hourly_weekend = dataset_hourly_all.filter(function (d) { if (d.weekday >= 5) return d })

    for (h = 0; h < 24; h++) {

        let median_weekday   = d3.median(dataset_hourly_weekday, function (d) { return d.hour[h] })
        let median_weekend   = d3.median(dataset_hourly_weekend, function (d) { return d.hour[h] })
        let median_weekday_0 = d3.median(dataset_hourly_weekday, function (d) { return d.hour_0[h] })
        let median_weekend_0 = d3.median(dataset_hourly_weekend, function (d) { return d.hour_0[h] })
        let median_weekday_1 = d3.median(dataset_hourly_weekday, function (d) { return d.hour_1[h] })
        let median_weekend_1 = d3.median(dataset_hourly_weekend, function (d) { return d.hour_1[h] })
        let median_weekday_2 = d3.median(dataset_hourly_weekday, function (d) { return d.hour_2[h] })
        let median_weekend_2 = d3.median(dataset_hourly_weekend, function (d) { return d.hour_2[h] })

        count_hour_weekday.push(median_weekday)
        count_hour_weekend.push(median_weekend)
        count_hour_weekday_0.push(median_weekday_0)
        count_hour_weekend_0.push(median_weekend_0)
        count_hour_weekday_1.push(median_weekday_1)
        count_hour_weekend_1.push(median_weekend_1)
        count_hour_weekday_2.push(median_weekday_2)
        count_hour_weekend_2.push(median_weekend_2)
    }

    v_count_hour = [[count_hour_weekday, count_hour_weekend],
                    [count_hour_weekday_0, count_hour_weekend_0],
                    [count_hour_weekday_1, count_hour_weekend_1],
                    [count_hour_weekday_2, count_hour_weekend_2]]

    count_hour_prev = v_count_hour[displayType_index_prev]
    count_hour_this = v_count_hour[displayType_index_this]

    // --------------------------------------------------------------------------------- 

    let v_max_count = [d3.max(count_hour_weekday.concat(count_hour_weekend),     function (d) { return d; }),
                       d3.max(count_hour_weekday_0.concat(count_hour_weekend_0), function (d) { return d; }),
                       d3.max(count_hour_weekday_1.concat(count_hour_weekend_1), function (d) { return d; }),
                       d3.max(count_hour_weekday_2.concat(count_hour_weekend_2), function (d) { return d; })]

    let v_rulerMax_scaleY_count = []

    for (i in v_max_count) {

        count_scale = DISPLAY_TYPE_HOURLY_BERLIN[i].count_scale;
        v_rulerMax_scaleY_count.push(count_scale * (parseInt(v_max_count[i] / count_scale) + 1)); // calculate scale
    }

    // --------------------------------------------------------------------------------- 
    
    let  v_scaleY_count = []

    for (i in v_rulerMax_scaleY_count) {

        v_scaleY_count.push(d3.scaleLinear()
                                .domain([0, v_rulerMax_scaleY_count[i]]) 
                                .range([BERLIN_HOURLY_PATH_Y_COUNT + BERLIN_HOURLY_PATH_HEIGHT_COUNT, 
                                        BERLIN_HOURLY_PATH_Y_COUNT]));
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
                    .range([BERLIN_HOURLY_PATH_X_CONTENT + 5, 
                            BERLIN_HOURLY_PATH_X_CONTENT + BERLIN_HOURLY_PATH_WIDTH_CONTENT - 5]);

    let scaleProgress_count = d3.scaleLinear()
                                    .domain([0, 0.2, 1] )
                                    .range([0, 1, 1])

    let ratio_count = scaleProgress_count(progress)

    // --------------------------------------------------------------------------------- 

    svg.append("text")
            .attr("class", "c_content_l_bold c_text_anchor_start color_white_svg")
            .attr("x", DAILY_X_LABEL)
            .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_TITLE)
            .attr("fill-opacity", opacity) 
            .text(getText_Hourly_SubTitle(1, language))

    let company_name = displayType_hourly_berlin_this.name
        
    if (displayType_index_this == 0)
        company_name = getText_All(language) 

    svg.append("text")
            .attr("class", "c_content_l c_text_anchor_start color_white_svg")
            .attr("x", DAILY_X_LABEL)
            .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_TITLE_SUB)
            .attr("fill-opacity", opacity) 
            .text(company_name) 

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

    if (transition_hourly_berlin) {

        svg.append("path")
            .attr("d", count_line_ori(count_hour_prev[0]))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", BERLIN_HOURLY_PATH_WIDTH_PATH) 
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", opacity) 
            .transition()
            .duration(1000)
            .attr("d", count_line_this(count_hour_this[0]))

        svg.append("path")
            .attr("d", count_line_ori(count_hour_prev[1]))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", BERLIN_HOURLY_PATH_WIDTH_PATH) 
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", opacity) 
            .transition()
            .duration(1000)
            .attr("d", count_line_this(count_hour_this[1]))

        transition_hourly_berlin = false

    } else {

        svg.append("path")
            .attr("d", count_line_prev(count_hour_prev[0]))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", BERLIN_HOURLY_PATH_WIDTH_PATH) 
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", opacity) 
            .transition()
            .duration(1000)
            .attr("d", count_line_this(count_hour_this[0]))

        svg.append("path")
            .attr("d", count_line_prev(count_hour_prev[1]))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", BERLIN_HOURLY_PATH_WIDTH_PATH) 
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
                .attr("x", function (d) { return scaleX(d) - (BERLIN_HOURLY_PATH_WIDTH_BAR / 2)})
                .attr("y", BERLIN_HOURLY_PATH_Y_COUNT)
                .attr("width", BERLIN_HOURLY_PATH_WIDTH_BAR) 
                .attr("height", BERLIN_HOURLY_PATH_Y_GAP_2 - BERLIN_HOURLY_PATH_Y_COUNT) 
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
            .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_WEEKDAY + BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKDAY - 6) 
            .attr("opacity", opacity) 
            .text(getText_Weekday(language))

    svg.append("text")
            .attr("id", "i_text_hourly_median_weekday_content")
            .attr("class", "c_content_l c_text_anchor_start")
            .attr("x", 0) 
            .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_WEEKDAY + BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKDAY - 2) 
            .attr("opacity", opacity) 
            .text("")

    svg.append("text")
            .attr("id", "i_text_hourly_median_weekend_title")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", 0) 
            .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_WEEKEND + BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKEND - 6) 
            .attr("opacity", opacity) 
            .text(getText_Weekend(language))

    svg.append("text")
            .attr("id", "i_text_hourly_median_weekend_content")
            .attr("class", "c_content_l c_text_anchor_start")
            .attr("x", 0) 
            .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_WEEKEND + BERLIN_HOURLY_PATH_HEIGHT_TEXT_WEEKEND - 2) 
            .attr("opacity", opacity) 
            .text("")


    // --------------------------------------------------------------------------------- 

    for (var i = 0; i <= v_rulerMax_scaleY_count[displayType_index_this]; i += (v_rulerMax_scaleY_count[displayType_index_this] / 2)) {

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_end")
                .attr("x", BERLIN_HOURLY_PATH_X_LABEL + BERLIN_HOURLY_PATH_WIDTH_LABEL - 8)
                .attr("y", scaleY_count_this(i) + 4)
                .attr("fill", COLOR_GREY)
                .attr("opacity", opacity)
                .text((i))
    }

    // ---------------------------------------------------------------------------------

    svg.append("line")
        .attr("x1", scaleX(0))
        .attr("y1", BERLIN_HOURLY_PATH_Y_COUNT + BERLIN_HOURLY_PATH_HEIGHT_COUNT)
        .attr("x2", scaleX(INDEX_HOUR.length - 1))
        .attr("y2", BERLIN_HOURLY_PATH_Y_COUNT + BERLIN_HOURLY_PATH_HEIGHT_COUNT)
        .attr("stroke", COLOR_GREY)
        .attr("stroke-width", 0.5)
        .attr("stroke-opacity", opacity / 5);

    svg.selectAll("text.c_text_title")
            .data(INDEX_HOUR)
            .enter()
            .append("text")
                .attr("class", "c_content_m c_text_anchor_middle")
                .attr("x", function(d) { return scaleX(d) }) 
                .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_HOUR + BERLIN_HOURLY_PATH_HEIGHT_TEXT_HOUR - 10) 
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
                .attr("y", BERLIN_HOURLY_PATH_Y_TEXT_HOUR + BERLIN_HOURLY_PATH_HEIGHT_TEXT_HOUR) 
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
                .attr("y1", BERLIN_HOURLY_PATH_Y_COUNT)
                .attr("x2", 0)
                .attr("y2", BERLIN_HOURLY_PATH_Y_GAP_2)
                .attr("stroke-width", 0.5) 
                .attr("opacity", 0) 

    // ---------------------------------------------------------------------------------

    {
        svg.append("text")
                .attr("id", "i_hourly_company_title")
                .attr("class", "c_content_m c_text_anchor_start")
                .attr("x", HOURLY_PATH_X)
                .attr("y", HOURLY_PATH_Y_OPTION)
                .attr("fill", COLOR_WHITE) 
                .attr("fill-opacity", opacity)
                .text(getText_Company(language) + " /")

        let width_option = d3.select("#i_hourly_company_title").node().getBBox().width

        svg.selectAll("text.c_text_hourly_option")
            .data(DISPLAY_TYPE_HOURLY_BERLIN)
            .enter()
            .append("text")
                .attr("id", function (d) { return "i_text_daily_option_company_" + d.index })
                .attr("class", "c_text_hourly_option c_content_m c_text_anchor_start text_dec_underline c_cursor")
                .text(function (d, i) {

                    let name = d.name

                    if (i == 0)
                        name = getText_All(language) 

                    return name.toUpperCase() 
                })
                .attr("x", function (d, i) { 

                    let width_sum = 0

                    for (index in DISPLAY_TYPE_HOURLY_BERLIN) {

                        if (index >= i)
                            break

                        width_sum += (d3.select("#i_text_daily_option_company_" + DISPLAY_TYPE_HOURLY_BERLIN[index].index).node().getBBox().width + TEXT_GAP_MAX)
                    }

                    return WEEKLY_X + width_option + TEXT_GAP_MAX + width_sum
                })
                .attr("y", BERLIN_HOURLY_PATH_Y_OPTION)
                .attr("fill", function (d) { return (d.index == displayType_index_this) ? COLOR_WHITE : COLOR_GREY}) 
                .attr("fill-opacity", opacity)
                .on("click", function(d) {

                    displayType_hourly_berlin_prev = displayType_hourly_berlin_this
                    displayType_hourly_berlin_this = d

                    draw_hourly_path_berlin(svg_w_px, svg_h_px, 
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

const LEGEND_BERLIN_HOURLY_X = 0;
const LEGEND_BERLIN_HOURLY_Y = 0;

const LEGEND_BERLIN_HOURLY_WIDTH = 300 - LEGEND_BERLIN_HOURLY_X;

const LEGEND_BERLIN_HOURLY_WIDTH_ITEM = 30;
const LEGEND_BERLIN_HOURLY_HEIGHT_ITEM = 10;

const LEGEND_BERLIN_HOURLY_WIDTH_GAP = 10;
const LEGEND_BERLIN_HOURLY_HEIGHT_GAP = 10;

const LEGEND_BERLIN_HOURLY_X_PATTERN = LEGEND_BERLIN_HOURLY_X;
const LEGEND_BERLIN_HOURLY_X_TEXT = LEGEND_BERLIN_HOURLY_X_PATTERN + LEGEND_BERLIN_HOURLY_WIDTH_GAP + LEGEND_BERLIN_HOURLY_WIDTH_ITEM;

const LEGEND_BERLIN_HOURLY_HEIGHT_WEEKDAY = LEGEND_BERLIN_HOURLY_HEIGHT_ITEM;
const LEGEND_BERLIN_HOURLY_HEIGHT_WEEKEND = LEGEND_BERLIN_HOURLY_HEIGHT_ITEM;
const LEGEND_BERLIN_HOURLY_HEIGHT_PRECP_HOUR = LEGEND_BERLIN_HOURLY_HEIGHT_ITEM;
const LEGEND_BERLIN_HOURLY_HEIGHT_PRECP = LEGEND_BERLIN_HOURLY_HEIGHT_ITEM;

const LEGEND_BERLIN_HOURLY_Y_WEEKDAY = LEGEND_BERLIN_HOURLY_Y;
const LEGEND_BERLIN_HOURLY_Y_WEEKEND = LEGEND_BERLIN_HOURLY_Y_WEEKDAY + LEGEND_BERLIN_HOURLY_HEIGHT_WEEKDAY + LEGEND_BERLIN_HOURLY_HEIGHT_GAP;
const LEGEND_BERLIN_HOURLY_Y_PRECP_HOUR = LEGEND_BERLIN_HOURLY_Y_WEEKEND + LEGEND_BERLIN_HOURLY_HEIGHT_WEEKEND + LEGEND_BERLIN_HOURLY_HEIGHT_GAP;
const LEGEND_BERLIN_HOURLY_Y_PRECP = LEGEND_BERLIN_HOURLY_Y_PRECP_HOUR + LEGEND_BERLIN_HOURLY_HEIGHT_PRECP_HOUR + LEGEND_BERLIN_HOURLY_HEIGHT_GAP;
const LEGEND_BERLIN_HOURLY_Y_END = LEGEND_BERLIN_HOURLY_Y_PRECP + LEGEND_BERLIN_HOURLY_HEIGHT_PRECP + LEGEND_BERLIN_HOURLY_HEIGHT_GAP;

function draw_hourly_legend_berlin(svg_w_px, svg_h_px, id_svg, language) {

    console.log("draw_hourly_legend_berlin");

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg + " > svg").remove();
    
    let svg = d3.select(id_svg)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);

    // --------------------------------------------------------------------------------- 

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_HOURLY_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_HOURLY_Y_WEEKDAY + (LEGEND_BERLIN_HOURLY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_HOURLY_X_PATTERN + LEGEND_BERLIN_HOURLY_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_HOURLY_Y_WEEKDAY + (LEGEND_BERLIN_HOURLY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_HOURLY_X_TEXT)
            .attr("y", LEGEND_BERLIN_HOURLY_Y_WEEKDAY + LEGEND_BERLIN_HOURLY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", 1) 
            .text(getText_Weekday(language))

    // -----

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_HOURLY_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_HOURLY_Y_WEEKEND + (LEGEND_BERLIN_HOURLY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_HOURLY_X_PATTERN + LEGEND_BERLIN_HOURLY_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_HOURLY_Y_WEEKEND + (LEGEND_BERLIN_HOURLY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_HOURLY_X_TEXT)
            .attr("y", LEGEND_BERLIN_HOURLY_Y_WEEKEND + LEGEND_BERLIN_HOURLY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_GREEN)
            .attr("fill-opacity", 1) 
            .text(getText_Weekend(language))
}

