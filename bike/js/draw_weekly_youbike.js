
const WEEKLY_X = 410;
const WEEKLY_Y = 140;

const WEEKLY_WIDTH = 950 - WEEKLY_X;
const WEEKLY_HEIGHT = 300;

const WEEKLY_HEIGHT_LABEL = 25;

const WEEKLY_HEIGHT_BUTTON = 25;
const WEEKLY_WIDTH_BUTTON_SCALE = 80;
const WEEKLY_WIDTH_BUTTON_TYPE = 175;
const WEEKLY_ROUND_BUTTON = 5;

const WEEKLY_HEIGHT_TEXT_TITLE = WEEKLY_HEIGHT_LABEL;
const WEEKLY_HEIGHT_TEXT_TITLE_SUB = WEEKLY_HEIGHT_LABEL;
const WEEKLY_HEIGHT_GAP_1 = 30;
const WEEKLY_HEIGHT_NUMBER = 250;
const WEEKLY_HEIGHT_TEXT_NUMBER = WEEKLY_HEIGHT_LABEL;
const WEEKLY_HEIGHT_GAP_2 = 10;
const WEEKLY_HEIGHT_OPTION_SCALE = WEEKLY_HEIGHT_BUTTON;
const WEEKLY_HEIGHT_GAP_3 = 10;
const WEEKLY_HEIGHT_OPTION_TYPE = WEEKLY_HEIGHT_BUTTON;

const WEEKLY_Y_TEXT_TITLE     = WEEKLY_Y;
const WEEKLY_Y_TEXT_TITLE_SUB = WEEKLY_Y_TEXT_TITLE + WEEKLY_HEIGHT_TEXT_TITLE;
const WEEKLY_Y_GAP_1          = WEEKLY_Y_TEXT_TITLE_SUB + WEEKLY_HEIGHT_TEXT_TITLE_SUB;
const WEEKLY_Y_NUMBER         = WEEKLY_Y_GAP_1 + WEEKLY_HEIGHT_GAP_1;
const WEEKLY_Y_TEXT_NUMBER    = WEEKLY_Y_NUMBER + WEEKLY_HEIGHT_NUMBER;
const WEEKLY_Y_GAP_2          = WEEKLY_Y_TEXT_NUMBER + WEEKLY_HEIGHT_TEXT_NUMBER;
const WEEKLY_Y_OPTION_SCALE   = WEEKLY_Y_GAP_2 + WEEKLY_HEIGHT_GAP_2;
const WEEKLY_Y_GAP_3          = WEEKLY_Y_OPTION_SCALE + WEEKLY_HEIGHT_OPTION_SCALE;
const WEEKLY_Y_OPTION_TYPE    = WEEKLY_Y_GAP_3 + WEEKLY_HEIGHT_GAP_3;
const WEEKLY_Y_END            = WEEKLY_Y_OPTION_TYPE + WEEKLY_HEIGHT_OPTION_TYPE;

const WEEKLY_WIDTH_BAR = 3;

// -------------------------------------------------

const DISPLAY_TYPE_WEEKLY_SCALE = 
[
    {index: 0, name: "Relative"},
    {index: 1, name: "Absolute"},
];

const DISPLAY_TYPE_WEEKLY_TYPE = 
[
    {index: 0, name: "All",                         count_scale: 100000},
    {index: 1, name: "Return to Different Station", count_scale: 100000},
    {index: 2, name: "Return to Same Station",      count_scale:  10000},
];

var displayType_weekly_scale_prev = DISPLAY_TYPE_WEEKLY_SCALE[0];
var displayType_weekly_scale_this = DISPLAY_TYPE_WEEKLY_SCALE[0];

var displayType_weekly_type_prev = DISPLAY_TYPE_WEEKLY_TYPE[0];
var displayType_weekly_type_this = DISPLAY_TYPE_WEEKLY_TYPE[0];

var v_x_prev = [0, 0, 0, 0, 0, 0, 0]
var v_x_this = [0, 0, 0, 0, 0, 0, 0]

// -------------------------------------------------

var transition_weekly = true;

function draw_weekly_youbike(svg_w_px, svg_h_px, 
                             svg_w_px_legend, svg_h_px_legend, 
                             id_svg_main, id_svg_legend, 
                             progress, language) {

    console.log("draw_weekly_youbike")

    console.log("progress", progress)

    let dataset_weekly = dataset_weekly_youbike

    if (dataset_weekly.length <= 0) 
        return

    // --------------------------------------------------------------------------------- 

    draw_weekly_legend_youbike(svg_w_px_legend, svg_h_px_legend, id_svg_legend, language)

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg_main + " > svg").remove();

    let svg = d3.select(id_svg_main)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px)

    // --------------------------------------------------------------------------------- 

    let scaleProgress_opacity = d3.scaleLinear()
                                    .domain([0, 0.1, 0.9, 1])
                                    .range([0, 1, 1, 0])

    let opacity = scaleProgress_opacity(progress)

    // --------------------------------------------------------------------------------- 

    let displayType_index_scale_prev = displayType_weekly_scale_prev.index
    let displayType_index_scale_this = displayType_weekly_scale_this.index

    let displayType_index_type_prev = displayType_weekly_type_prev.index
    let displayType_index_type_this = displayType_weekly_type_this.index

    // --------------------------------------------------------------------------------- 

    let v_max_median = [d3.max(dataset_weekly, function (d) { return d.count_median; }),
                        d3.max(dataset_weekly, function (d) { return d.count_d_median; }),
                        d3.max(dataset_weekly, function (d) { return d.count_s_median; })]

    let count_scale = DISPLAY_TYPE_WEEKLY_TYPE[0].count_scale;
    let rulerMax_scaleX_absolute = count_scale * (parseInt(v_max_median[0] / count_scale) + 1); // calculate scale

    // --------------------------------------------------------------------------------- 

    let scaleX_relative = d3.scaleLinear()
                                .domain([0, 1])
                                .range([0, WEEKLY_WIDTH - 15])

    let scaleX_absolute = d3.scaleLinear()
                                .domain([0, rulerMax_scaleX_absolute])
                                .range([0, WEEKLY_WIDTH - 15])

    // --------------------------------------------------------------------------------- 
    
    let scaleY = d3.scaleBand()
                        .domain(INDEX_WEEKDAY)
                        .range([WEEKLY_Y_NUMBER, WEEKLY_Y_NUMBER + WEEKLY_HEIGHT_NUMBER])
                        .paddingInner(0.1); 

    // --------------------------------------------------------------------------------- 

    svg.append("text")
            .attr("class", "color_white_svg c_content_l_bold")
            .attr("x", WEEKLY_X)
            .attr("y", WEEKLY_Y_TEXT_TITLE)
            .attr("fill-opacity", opacity) 
            .text(getText_Weekly_SubTitle(0, language))

    let title_sub_2 = ""

    switch (language) {
        
        case 0: 

            title_sub_2 = getText_ScaleName(displayType_index_scale_this, language) + " of " + 
                          getText_TypeName(displayType_index_type_this, language)

            break
        
        case 1:

            title_sub_2 = getText_TypeName(displayType_index_type_this, language) + "的" +
                          getText_ScaleName(displayType_index_scale_this, language) 
                        
            break
        
        case 2:

            title_sub_2 = getText_ScaleName(displayType_index_scale_this, language) + " of " + 
                          getText_TypeName(displayType_index_type_this, language)
                        
            break
    }

    svg.append("text")
            .attr("class", "color_white_svg c_content_l")
            .attr("x", WEEKLY_X)
            .attr("y", WEEKLY_Y_TEXT_TITLE_SUB)
            .attr("fill-opacity", opacity) 
            .text(title_sub_2)

    // --------------------------------------------------------------------------------- 

    for (i in dataset_weekly) {

        let d = dataset_weekly[i]

        let x = WEEKLY_X

        switch (displayType_index_scale_this) {

            case 0:

                x = x + scaleX_relative(getMedianCount(d, displayType_index_type_this) / v_max_median[displayType_index_type_this]) 
                break;

            case 1:

                x = x + scaleX_absolute(getMedianCount(d, displayType_index_type_this)) 
                break;
        }
                    
        v_x_prev[i] = v_x_this[i]
        v_x_this[i] = x
    }

    svg.selectAll("text.c_text_title")
            .data(dataset_weekly)
            .enter()
            .append("text")
                .attr("id", function (d) { return "i_text_title_" + d.weekday })
                .attr("class", "c_text_title c_content_m c_text_anchor_start")
                .attr("x", WEEKLY_X)
                .attr("y", function (d) { return scaleY(d.weekday) - 8} )
                .attr("fill", function (d) { return SCALE_COLOR_BLUE(d.weekday); })
                .attr("fill-opacity", opacity) 
                .text(function (d) { return getWeekdayText(d.weekday, language).toUpperCase() })

    // --------------------------------------------------------------------------------- 

    if (transition_weekly) {

        svg.selectAll("line.c_line_weekly_count")
            .data(dataset_weekly)
            .enter()
            .append("line")
                .attr("class", "c_line_weekly_count")
                .attr("x1", WEEKLY_X)
                .attr("y1", function (d) { return scaleY(d.weekday) } )
                .attr("x2", WEEKLY_X)
                .attr("y2", function (d) { return scaleY(d.weekday) } )
                .attr("stroke", function (d) { return SCALE_COLOR_BLUE(d.weekday); })
                .attr("stroke-opacity", opacity) 
                .attr("stroke-width", WEEKLY_WIDTH_BAR) 
                .attr("fill-opacity", 0) 
                .transition()
                .duration(1000)
                .attr("x2", function (d, i) { return v_x_this[i] }) 

        svg.selectAll("text.c_text_content")
                .data(dataset_weekly)
                .enter()
                .append("text")
                    .attr("id", function (d) { return "i_text_content_" + d.weekday })
                    .attr("class", function () 
                    {
                        let c = "c_text_content c_content_l"

                        if (displayType_index_scale_this == 1 && displayType_index_type_this == 2) 
                            c += " c_text_anchor_start"
                        else
                            c += " c_text_anchor_end"

                         return c
                    })
                    .attr("x", WEEKLY_X)
                    .attr("y", function (d) { return scaleY(d.weekday) - 8} )
                    .attr("fill-opacity", 0) 
                    .attr("fill", function (d) { return SCALE_COLOR_BLUE(d.weekday); })
                    .text(function (d) { 

                        let text = ""

                        switch (displayType_index_scale_prev) {

                            case 0:

                                text = FORMAT_PERCENT_2(getMedianCount(d, displayType_index_type_prev) / v_max_median[displayType_index_type_prev]).replace("%", "")
                                break;
                            
                            case 1:

                                text = FORMAT_COMMA(parseInt(getMedianCount(d, displayType_index_type_prev)))
                                break;
                        }

                        return text
                    })
                    .transition()
                    .duration(1000)
                    .attr("x", function (d, i) { return v_x_this[i] }) 
                    .attr("fill-opacity", opacity) 
                    .text(function (d) { 

                        let text = ""

                        switch (displayType_index_scale_this) {

                            case 0:

                                text = FORMAT_PERCENT_2(getMedianCount(d, displayType_index_type_this) / v_max_median[displayType_index_type_this]).replace("%", "")
                                break;
                            
                            case 1:

                                text = FORMAT_COMMA(parseInt(getMedianCount(d, displayType_index_type_this)))
                                break;
                        }

                        return text
                    })
                    
        transition_weekly = false

    } else {

        svg.selectAll("line.c_line_weekly_count")
                .data(dataset_weekly)
                .enter()
                .append("line")
                    .attr("class", "c_line_weekly_count")
                    .attr("x1", WEEKLY_X)
                    .attr("y1", function (d) { return scaleY(d.weekday) } )
                    .attr("x2", function (d, i) { return v_x_prev[i] }) 
                    .attr("y2", function (d) { return scaleY(d.weekday) } ) 
                    .attr("stroke", function (d) { return SCALE_COLOR_BLUE(d.weekday); })
                    .attr("stroke-opacity", opacity) 
                    .attr("stroke-width", WEEKLY_WIDTH_BAR) 
                    .attr("fill-opacity", 0) 
                    .transition()
                    .duration(1000)
                    .attr("x2", function (d, i) { return v_x_this[i] }) 

        svg.selectAll("text.c_text_content")
                .data(dataset_weekly)
                .enter()
                .append("text")
                    .attr("id", function (d) { return "i_text_content_" + d.weekday })
                    .attr("class", function () 
                    {
                        let c = "c_text_content c_content_l"

                        if (displayType_index_scale_this == 1 && displayType_index_type_this == 2) 
                            c += " c_text_anchor_start"
                        else
                            c += " c_text_anchor_end"

                         return c
                    })
                    .attr("x", function (d, i) { return v_x_prev[i] }) 
                    .attr("y", function (d) { return scaleY(d.weekday) - 8} )
                    .attr("fill-opacity", opacity) 
                    .attr("fill", function (d) { return SCALE_COLOR_BLUE(d.weekday); })
                    .text(function (d) { 

                        let text = ""

                        switch (displayType_index_scale_prev) {

                            case 0:

                                text = FORMAT_PERCENT_2(getMedianCount(d, displayType_index_type_prev) / v_max_median[displayType_index_type_prev]).replace("%", "")
                                break;
                            
                            case 1:

                                text = FORMAT_COMMA(parseInt(getMedianCount(d, displayType_index_type_prev)))
                                break;
                        }

                        return text
                    })
                    .transition()
                    .duration(1000)
                    .attr("x", function (d, i) { return v_x_this[i] }) 
                    .text(function (d) { 

                        let text = ""

                        switch (displayType_index_scale_this) {

                            case 0:

                                text = FORMAT_PERCENT_2(getMedianCount(d, displayType_index_type_this) / v_max_median[displayType_index_type_this]).replace("%", "")
                                break;
                            
                            case 1:

                                text = FORMAT_COMMA(parseInt(getMedianCount(d, displayType_index_type_this)))
                                break;
                        }

                        return text
                    })
    }

    // --------------------------------------------------------------------------------- 
    
    switch (displayType_index_scale_this) {

        case 0:

            for (var i = 0; i <= 1; i += 0.5) {

                svg.append("text")
                        .attr("class", "c_content_m c_text_anchor_middle")
                        .attr("x", WEEKLY_X + scaleX_relative(i))
                        .attr("y", WEEKLY_Y_TEXT_NUMBER - 10)
                        .attr("width", scaleX_relative(i)) 
                        .attr("height", WEEKLY_HEIGHT_TEXT_NUMBER) 
                        .attr("fill", COLOR_GREY) 
                        .attr("opacity", opacity) 
                        .text(FORMAT_PERCENT(i).replace("%", ""))
            }

            break;
                            
        case 1:

            count_max = rulerMax_scaleX_absolute + 1
            count_step = parseInt(count_max / 2)

            for (var i = 0; i < count_max; i += count_step) {

                svg.append("text")
                        .attr("class", "c_content_m c_text_anchor_middle")
                        .attr("x", WEEKLY_X + scaleX_absolute(i))
                        .attr("y", WEEKLY_Y_TEXT_NUMBER - 10)
                        .attr("width", scaleX_absolute(i)) 
                        .attr("height", WEEKLY_HEIGHT_TEXT_NUMBER) 
                        .attr("fill", COLOR_GREY) 
                        .attr("opacity", opacity) 
                        .text(FORMAT_K(i))
            }
            
            break;
    }

    // ---------------------------------------------------------------------------------

    {
        svg.append("text")
            .attr("id", "i_weekly_scale_title")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", WEEKLY_X)
            .attr("y", WEEKLY_Y_OPTION_SCALE)
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity)
            .text(getText_Scale(language) + " /")

        let width_option = d3.select("#i_weekly_scale_title").node().getBBox().width

        svg.selectAll("text.c_text_weekly_option_scale")
                .data(DISPLAY_TYPE_WEEKLY_SCALE)
                .enter()
                .append("text")
                    .attr("id", function (d) { return "i_text_weekly_option_type_" + d.index })
                    .attr("class", "c_text_weekly_option_scale c_content_m c_text_anchor_start text_dec_underline c_cursor")
                    .text(function (d, i) { return getScaleText(i, language).toUpperCase() })
                    .attr("x", function (d, i) { 

                        let width_sum = 0

                        for (index in DISPLAY_TYPE_WEEKLY_TYPE) {

                            if (index >= i)
                                break

                            width_sum += (d3.select("#i_text_weekly_option_type_" + DISPLAY_TYPE_WEEKLY_SCALE[index].index).node().getBBox().width + TEXT_GAP_MAX)
                        }

                        return WEEKLY_X + width_option + TEXT_GAP_MAX + width_sum
                    })
                    .attr("y", WEEKLY_Y_OPTION_SCALE)
                    .attr("fill", function (d) { return (d.index == displayType_index_scale_this) ? COLOR_WHITE : COLOR_GREY}) 
                    .attr("fill-opacity", opacity)
                    .on("click", function(d) {

                        displayType_weekly_scale_prev = displayType_weekly_scale_this
                        displayType_weekly_scale_this = d

                        draw_weekly_youbike(svg_w_px, svg_h_px, 
                                            svg_w_px_legend, svg_h_px_legend, 
                                            id_svg_main, id_svg_legend, 
                                            progress, language)
                    })
    }

    // ---------------------------------------------------------------------------------

    {
        svg.append("text")
            .attr("id", "i_weekly_type_title")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", WEEKLY_X)
            .attr("y", WEEKLY_Y_OPTION_TYPE)
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity)
            .text(getText_Type(language) + " /")

        let width_option = d3.select("#i_weekly_type_title").node().getBBox().width;

        svg.selectAll("text.c_text_weekly_option_type")
            .data(DISPLAY_TYPE_WEEKLY_TYPE)
            .enter()
            .append("text")
                .attr("id", function (d) { return "i_text_weekly_option_" + d.index })
                .attr("class", "c_text_weekly_option_type c_content_m c_text_anchor_start text_dec_underline c_cursor")
                .text(function (d, i) { return getTypeText(i, language).toUpperCase() })
                .attr("x", function (d, i) { 

                    let width_sum = 0

                    for (index in DISPLAY_TYPE_WEEKLY_TYPE) {

                        if (index >= i)
                            break

                        width_sum += (d3.select("#i_text_weekly_option_" + DISPLAY_TYPE_WEEKLY_TYPE[index].index).node().getBBox().width + TEXT_GAP_MAX)
                    }

                    return WEEKLY_X + width_option + TEXT_GAP_MAX + width_sum
                })
                .attr("y", WEEKLY_Y_OPTION_TYPE)
                .attr("fill", function (d) { return (d.index == displayType_index_type_this) ? COLOR_WHITE : COLOR_GREY}) 
                .attr("fill-opacity", opacity)
                .on("click", function(d) {

                    displayType_weekly_type_prev = displayType_weekly_type_this
                    displayType_weekly_type_this = d

                    draw_weekly_youbike(svg_w_px, svg_h_px, 
                                        svg_w_px_legend, svg_h_px_legend, 
                                        id_svg_main, id_svg_legend, 
                                        progress, language)
                })
    }

    // ---------------------------------------------------------------------------------
    /*
    svg.append("line")
        .attr("x1", 0 )
        .attr("y1", svg_h_px )
        .attr("x2", svg_w_px )
        .attr("y2", svg_h_px )
        .attr("stroke", "gray")
        .attr("stroke-width", "1");
        */
}

function getMedianCount(d, displayType_index) {

    let count = 0

    switch (displayType_index) {
        case 0: count = d.count_median; break;
        case 1: count = d.count_d_median; break;
        case 2: count = d.count_s_median; break;
    }

    return count
}

// -------------------------------------------------

const LEGEND_WEEKLY_X = 0;
const LEGEND_WEEKLY_Y = 0;

const LEGEND_WEEKLY_WIDTH = 300 - LEGEND_WEEKLY_X;

const LEGEND_WEEKLY_WIDTH_ITEM = 30;
const LEGEND_WEEKLY_HEIGHT_ITEM = 10;

const LEGEND_WEEKLY_WIDTH_GAP = 10;
const LEGEND_WEEKLY_HEIGHT_GAP = 10;

const LEGEND_WEEKLY_X_PATTERN = LEGEND_WEEKLY_X;
const LEGEND_WEEKLY_X_TEXT = LEGEND_WEEKLY_X_PATTERN + LEGEND_WEEKLY_WIDTH_GAP + LEGEND_WEEKLY_WIDTH_ITEM;

const LEGEND_WEEKLY_HEIGHT_WEEKDAY = LEGEND_WEEKLY_HEIGHT_ITEM;
const LEGEND_WEEKLY_HEIGHT_WEEKEND = LEGEND_WEEKLY_HEIGHT_ITEM;
const LEGEND_WEEKLY_HEIGHT_PRECP_HOUR = LEGEND_WEEKLY_HEIGHT_ITEM;
const LEGEND_WEEKLY_HEIGHT_PRECP = LEGEND_WEEKLY_HEIGHT_ITEM;

const LEGEND_WEEKLY_Y_WEEKDAY = LEGEND_WEEKLY_Y;
const LEGEND_WEEKLY_Y_WEEKEND = LEGEND_WEEKLY_Y_WEEKDAY + LEGEND_WEEKLY_HEIGHT_WEEKDAY + LEGEND_WEEKLY_HEIGHT_GAP;
const LEGEND_WEEKLY_Y_PRECP_HOUR = LEGEND_WEEKLY_Y_WEEKEND + LEGEND_WEEKLY_HEIGHT_WEEKEND + LEGEND_WEEKLY_HEIGHT_GAP;
const LEGEND_WEEKLY_Y_PRECP = LEGEND_WEEKLY_Y_PRECP_HOUR + LEGEND_WEEKLY_HEIGHT_PRECP_HOUR + LEGEND_WEEKLY_HEIGHT_GAP;
const LEGEND_WEEKLY_Y_END = LEGEND_WEEKLY_Y_PRECP + LEGEND_WEEKLY_HEIGHT_PRECP + LEGEND_WEEKLY_HEIGHT_GAP;

function draw_weekly_legend_youbike(svg_w_px, svg_h_px, id_svg, language) {

    console.log("draw_weekly_legend_youbike");

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg + " > svg").remove();
    
    let svg = d3.select(id_svg)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);

    // --------------------------------------------------------------------------------- 

    svg.append("line")
            .attr("x1", LEGEND_WEEKLY_X_PATTERN)
            .attr("y1", LEGEND_WEEKLY_Y_WEEKDAY + (LEGEND_WEEKLY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_WEEKLY_X_PATTERN + LEGEND_WEEKLY_WIDTH_ITEM)
            .attr("y2", LEGEND_WEEKLY_Y_WEEKDAY + (LEGEND_WEEKLY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_WEEKLY_X_TEXT)
            .attr("y", LEGEND_WEEKLY_Y_WEEKDAY + LEGEND_WEEKLY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", 1) 
            .text(getText_Weekday(language))

    // -----

    svg.append("line")
            .attr("x1", LEGEND_WEEKLY_X_PATTERN)
            .attr("y1", LEGEND_WEEKLY_Y_WEEKEND + (LEGEND_WEEKLY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_WEEKLY_X_PATTERN + LEGEND_WEEKLY_WIDTH_ITEM)
            .attr("y2", LEGEND_WEEKLY_Y_WEEKEND + (LEGEND_WEEKLY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_WEEKLY_X_TEXT)
            .attr("y", LEGEND_WEEKLY_Y_WEEKEND + LEGEND_WEEKLY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_GREEN)
            .attr("fill-opacity", 1) 
            .text(getText_Weekend(language))
}
