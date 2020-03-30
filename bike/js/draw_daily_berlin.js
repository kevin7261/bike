
const BERLIN_DAILY_X = 410;
const BERLIN_DAILY_Y = 140;

const BERLIN_DAILY_WIDTH = 950 - BERLIN_DAILY_X;

const BERLIN_DAILY_WIDTH_LABEL = 30;
const BERLIN_DAILY_HEIGHT_LABEL = 25;

const BERLIN_DAILY_X_LABEL = BERLIN_DAILY_X;
const BERLIN_DAILY_X_CONTENT = BERLIN_DAILY_X + BERLIN_DAILY_WIDTH_LABEL;

const BERLIN_DAILY_WIDTH_CONTENT = 950 - BERLIN_DAILY_X_CONTENT;

const BERLIN_DAILY_HEIGHT_TITLE = BERLIN_DAILY_HEIGHT_LABEL;
const BERLIN_DAILY_HEIGHT_TITLE_SUB = BERLIN_DAILY_HEIGHT_LABEL;
const BERLIN_DAILY_HEIGHT_TEXT_COUNT = BERLIN_DAILY_HEIGHT_LABEL;
const BERLIN_DAILY_HEIGHT_COUNT = 120;
const BERLIN_DAILY_HEIGHT_TEXT_MONTH = BERLIN_DAILY_HEIGHT_LABEL;
const BERLIN_DAILY_HEIGHT_TEXT_DATE = BERLIN_DAILY_HEIGHT_LABEL;
const BERLIN_DAILY_HEIGHT_PRECP = 80;
const BERLIN_DAILY_HEIGHT_TEXT_PRECP  = BERLIN_DAILY_HEIGHT_LABEL;
const BERLIN_DAILY_HEIGHT_GAP_1 = 40;
const BERLIN_DAILY_HEIGHT_OPTION_MONTH = BERLIN_DAILY_HEIGHT_LABEL;
const BERLIN_DAILY_HEIGHT_GAP_2 = 10;
const BERLIN_DAILY_HEIGHT_OPTION_COMPANY = BERLIN_DAILY_HEIGHT_LABEL;

const BERLIN_DAILY_Y_TEXT_TITLE      = BERLIN_DAILY_Y;
const BERLIN_DAILY_Y_TEXT_TITLE_SUB  = BERLIN_DAILY_Y_TEXT_TITLE + BERLIN_DAILY_HEIGHT_TITLE;
const BERLIN_DAILY_Y_TEXT_COUNT      = BERLIN_DAILY_Y_TEXT_TITLE_SUB + BERLIN_DAILY_HEIGHT_TITLE_SUB;
const BERLIN_DAILY_Y_COUNT           = BERLIN_DAILY_Y_TEXT_COUNT + BERLIN_DAILY_HEIGHT_TEXT_COUNT;
const BERLIN_DAILY_Y_TEXT_MONTH      = BERLIN_DAILY_Y_COUNT + BERLIN_DAILY_HEIGHT_COUNT;
const BERLIN_DAILY_Y_TEXT_DATE       = BERLIN_DAILY_Y_TEXT_MONTH + BERLIN_DAILY_HEIGHT_TEXT_MONTH;
const BERLIN_DAILY_Y_PRECP           = BERLIN_DAILY_Y_TEXT_DATE + BERLIN_DAILY_HEIGHT_TEXT_DATE;
const BERLIN_DAILY_Y_TEXT_PRECP      = BERLIN_DAILY_Y_PRECP + BERLIN_DAILY_HEIGHT_PRECP;
const BERLIN_DAILY_Y_GAP_1           = BERLIN_DAILY_Y_TEXT_PRECP + BERLIN_DAILY_HEIGHT_TEXT_PRECP;
const BERLIN_DAILY_Y_OPTION_MONTH    = BERLIN_DAILY_Y_GAP_1 + BERLIN_DAILY_HEIGHT_GAP_1;
const BERLIN_DAILY_Y_GAP_2           = BERLIN_DAILY_Y_OPTION_MONTH + BERLIN_DAILY_HEIGHT_OPTION_MONTH;
const BERLIN_DAILY_Y_OPTION_COMPANY  = BERLIN_DAILY_Y_GAP_2 + BERLIN_DAILY_HEIGHT_GAP_2;
const BERLIN_DAILY_Y_END             = BERLIN_DAILY_Y_OPTION_COMPANY + BERLIN_DAILY_HEIGHT_OPTION_COMPANY;

const BERLIN_DAILY_WIDTH_BAR = 3;

const BERLIN_DAILY_COUNT_SCALE = 4000;
const BERLIN_DAILY_PRECP_SCALE = 50;

// -------------------------------------------------

const DISPLAY_TYPE_DAILY_MONTH_BERLIN = 
[
    {index: 0, display_index: [0, 1, 2], month: [ 4, 5, 6], name: getMonthText( 4, g_language).toUpperCase()},
    {index: 1, display_index: [0, 1, 2], month: [ 4, 5, 6], name: getMonthText( 5, g_language).toUpperCase()},
    {index: 2, display_index: [1, 2, 3], month: [ 5, 6, 7], name: getMonthText( 6, g_language).toUpperCase()},
    {index: 3, display_index: [2, 3, 4], month: [ 6, 7, 8], name: getMonthText( 7, g_language).toUpperCase()},
    {index: 4, display_index: [3, 4, 5], month: [ 7, 8, 9], name: getMonthText( 8, g_language).toUpperCase()},
    {index: 5, display_index: [4, 5, 6], month: [ 8, 9,10], name: getMonthText( 9, g_language).toUpperCase()},
    {index: 6, display_index: [5, 6, 7], month: [ 9,10,11], name: getMonthText(10, g_language).toUpperCase()},
    {index: 7, display_index: [5, 6, 7], month: [ 9,10,11], name: getMonthText(11, g_language).toUpperCase()},
];

const DISPLAY_TYPE_DAILY_BERLIN_COMPANY = 
[
    {index: 0, name: "All"},
    {index: 1, name: "Nextbike"},
    {index: 2, name: "LIDL-Bike"},
    {index: 3, name: "Mobike"},
];

var displayType_daily_month_berlin_prev = DISPLAY_TYPE_DAILY_MONTH_BERLIN[0];
var displayType_daily_month_berlin_this = DISPLAY_TYPE_DAILY_MONTH_BERLIN[0];

var displayType_daily_berlin_company_prev = DISPLAY_TYPE_DAILY_BERLIN_COMPANY[0];
var displayType_daily_berlin_company_this = DISPLAY_TYPE_DAILY_BERLIN_COMPANY[0];

// -------------------------------------------------

var daily_transition_berlin = true;

function draw_daily_berlin(svg_w_px, svg_h_px, 
                           svg_w_px_legend, svg_h_px_legend, 
                           id_svg_main, id_svg_legend, 
                           progress, language) {

    console.log("draw_daily_berlin")

    console.log("progress", progress)

    let dataset_daily = dataset_daily_berlin

    if (dataset_daily.length <= 0) 
        return   

    // --------------------------------------------------------------------------------- 

    let dataset_daily_all = dataset_daily

    let dataset_daily_prev = dataset_daily.filter(function(d) { 

        if (d.month == displayType_daily_month_berlin_prev.month[0] ||
            d.month == displayType_daily_month_berlin_prev.month[1] ||
            d.month == displayType_daily_month_berlin_prev.month[2]) 
            return d 
    })

    let dataset_daily_this = dataset_daily.filter(function(d) { 

        if (d.month == displayType_daily_month_berlin_this.month[0] ||
            d.month == displayType_daily_month_berlin_this.month[1] ||
            d.month == displayType_daily_month_berlin_this.month[2])
            return d 
    })

    // --------------------------------------------------------------------------------- 

    let dataset_daily_data = []

    for (let i = 0; i < (30 + 31 + 31); i++) {

        dataset_daily_data.push({index: i})

        dataset_daily_data[i].count_prev = 0
        dataset_daily_data[i].count_0_prev = 0
        dataset_daily_data[i].count_1_prev = 0
        dataset_daily_data[i].count_2_prev = 0
        dataset_daily_data[i].precp_prev = 0

        dataset_daily_data[i].year = 0
        dataset_daily_data[i].month = 0
        dataset_daily_data[i].date = 0
        dataset_daily_data[i].weekday = 0
        dataset_daily_data[i].count = 0
        dataset_daily_data[i].count_0 = 0
        dataset_daily_data[i].count_1 = 0
        dataset_daily_data[i].count_2 = 0
        dataset_daily_data[i].precp = 0
    }

    let index = 0

    for (i in dataset_daily_prev) {

        dataset_daily_data[index].count_prev = dataset_daily_prev[i].count
        dataset_daily_data[index].count_0_prev = dataset_daily_prev[i].count_0
        dataset_daily_data[index].count_1_prev = dataset_daily_prev[i].count_1
        dataset_daily_data[index].count_2_prev = dataset_daily_prev[i].count_2
        dataset_daily_data[index].precp_prev = dataset_daily_prev[i].precp

        index++
    }

    index = 0

    for (i in dataset_daily_this) {

        dataset_daily_data[index].year = dataset_daily_this[i].year
        dataset_daily_data[index].month = dataset_daily_this[i].month
        dataset_daily_data[index].date = dataset_daily_this[i].date
        dataset_daily_data[index].weekday = dataset_daily_this[i].weekday
        dataset_daily_data[index].count = dataset_daily_this[i].count
        dataset_daily_data[index].count_0 = dataset_daily_this[i].count_0
        dataset_daily_data[index].count_1 = dataset_daily_this[i].count_1
        dataset_daily_data[index].count_2 = dataset_daily_this[i].count_2
        dataset_daily_data[index].precp = dataset_daily_this[i].precp

        index++
    }

    // --------------------------------------------------------------------------------- 

    draw_daily_legend_berlin(svg_w_px_legend, svg_h_px_legend, id_svg_legend, language)

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg_main + " > svg").remove()

    let svg = d3.select(id_svg_main)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px)

    // --------------------------------------------------------------------------------- 

    let scaleProgress_count = d3.scaleLinear()
                                    .domain([0, 0.1, 1])
                                    .range([0, 1, 1])

    let scaleProgress_precp = d3.scaleLinear()
                                    .domain([0, 0.1, 0.2, 1])
                                    .range([0, 0, 1, 1])

    let scaleProgress_opacity = d3.scaleLinear()
                                    .domain([0, 0.1, 0.9, 1])
                                    .range([0, 1, 1, 0])

    let opacity = scaleProgress_opacity(progress)

    // --------------------------------------------------------------------------------- 

    let displayType_index_month_prev = displayType_daily_month_berlin_prev.index
    let displayType_index_month_this = displayType_daily_month_berlin_this.index

    let displayType_index_company_prev = displayType_daily_berlin_company_prev.index
    let displayType_index_company_this = displayType_daily_berlin_company_this.index

    // --------------------------------------------------------------------------------- 

    let min_day = d3.min(dataset_daily_this, function (d) { return parseInt((d.year * 10000) + (d.month * 100) + d.date) })
    let max_day = d3.max(dataset_daily_this, function (d) { return parseInt((d.year * 10000) + (d.month * 100) + d.date) })

    let min_year = parseInt(min_day.toString().substring(0, 4))
    let max_year = parseInt(max_day.toString().substring(0, 4))
    let min_month = parseInt(min_day.toString().substring(4, 6)) - 1
    let max_month = parseInt(max_day.toString().substring(4, 6)) - 1
    let min_date = parseInt(min_day.toString().substring(6, 8))
    let max_date = parseInt(max_day.toString().substring(6, 8))

    //console.log(min_year, min_month, min_date)
    //console.log(max_year, max_month, max_date)

    // -----

    let max_count = d3.max(dataset_daily_all, function (d) { return d.count; })
    let max_precp = d3.max(dataset_daily_all, function (d) { return d.precp; })

    let rulerMax_count = BERLIN_DAILY_COUNT_SCALE * (parseInt(max_count / BERLIN_DAILY_COUNT_SCALE) + 1) // calculate scale
    let rulerMax_precp = BERLIN_DAILY_PRECP_SCALE * (parseInt(max_precp / BERLIN_DAILY_PRECP_SCALE) + 1) // calculate scale

    // -----

    let scaleX = d3.scaleLinear()
                        .domain([0, (30 + 31 + 31)])
                        .range([(BERLIN_DAILY_WIDTH_BAR / 2), 
                                 BERLIN_DAILY_WIDTH_CONTENT - (BERLIN_DAILY_WIDTH_BAR / 2)])

    let scaleY_count = d3.scaleLinear()
                                .domain([0, rulerMax_count])
                                .range([0, BERLIN_DAILY_HEIGHT_COUNT])

    let scaleY_precp = d3.scaleLinear()
                                .domain([0, rulerMax_precp])
                                .range([0, BERLIN_DAILY_HEIGHT_PRECP])

    // --------------------------------------------------------------------------------- 

    svg.append("text")
            .attr("class", "color_white_svg c_content_l_bold c_text_anchor_start")
            .attr("x", BERLIN_DAILY_X_LABEL)
            .attr("y", BERLIN_DAILY_Y_TEXT_TITLE)
            .attr("fill-opacity", opacity) 
            .text(getText_Daily_SubTitle(1, language))

    let month_start = displayType_daily_month_berlin_this.month[0]
    let month_end = displayType_daily_month_berlin_this.month[2]

    let title_sub_2 = ""

    switch (language) {
        
        case LANGUAGE.EN: 

            title_sub_2 = getMonthText(month_start, language) + " - " + 
                          getMonthText(month_end, language) + " of " + 
                          displayType_daily_berlin_company_this.name

            break
        
        case LANGUAGE.EN: 

            let company_name = displayType_daily_berlin_company_this.name
            
            if (displayType_index_company_this == 0)
                company_name = getText_All(language) 

            title_sub_2 = company_name + " " + 
                          "(" + getMonthText(month_start, language) + " - " + 
                          getMonthText(month_end, language) + ")"
                        
            break
        
        case LANGUAGE.DE:

            break
    }

    svg.append("text")
            .attr("class", "color_white_svg c_content_l c_text_anchor_start")
            .attr("x", BERLIN_DAILY_X_LABEL)
            .attr("y", BERLIN_DAILY_Y_TEXT_TITLE_SUB)
            .attr("fill-opacity", opacity) 
            .text(title_sub_2)

    // ---------------------------------------------------------------------------------

    svg.selectAll("text.c_text_daily_month")
            .data(dataset_daily_data.filter(function(d) { if (d.date == 1) return d }))
            .enter()
                .append("text")
                .attr("class", "c_text_daily_month c_content_m c_text_anchor_middle")
                .attr("x", function(d) { return BERLIN_DAILY_X_CONTENT + scaleX(d.index) }) 
                .attr("y", BERLIN_DAILY_Y_TEXT_MONTH + (BERLIN_DAILY_HEIGHT_TEXT_DATE / 2)) 
                .attr("fill", COLOR_GREY) 
                .attr("fill-opacity", opacity) 
                .attr("stroke-opacity", 0) 
                .text(function(d) { return getMonthText(d.month, language).toUpperCase() })

    for (var i = rulerMax_count; i > 0; i -= (rulerMax_count / 2)) {

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_end")
                .attr("x", BERLIN_DAILY_X_LABEL + BERLIN_DAILY_WIDTH_LABEL - 8) 
                .attr("y", BERLIN_DAILY_Y_COUNT + BERLIN_DAILY_HEIGHT_COUNT - scaleY_count(i) + 4)
                .attr("fill", COLOR_GREY)
                .attr("opacity", opacity) 
                .text(FORMAT_K(i))
    }

    svg.append("text")
        .attr("class", "c_content_m c_text_anchor_end")
        .attr("x", BERLIN_DAILY_X_LABEL + BERLIN_DAILY_WIDTH_LABEL - 5) 
        .attr("y", BERLIN_DAILY_Y_PRECP + 4)
        .attr("fill", COLOR_GREY)
        .attr("opacity", opacity) 
        .text(0)

    for (var i = BERLIN_DAILY_PRECP_SCALE; i > 0; i -= (BERLIN_DAILY_PRECP_SCALE / 2)) {

        svg.append("text")
                .attr("class", "c_content_m c_text_anchor_end")
                .attr("x", BERLIN_DAILY_X_LABEL + BERLIN_DAILY_WIDTH_LABEL - 8) 
                .attr("y", BERLIN_DAILY_Y_PRECP + scaleY_precp(i) + 4)
                .attr("fill", COLOR_GREY)
                .attr("opacity", opacity) 
                .text(i)//.text(i + "mm")
    }

    // ---------------------------------------------------------------------------------

    if (transition_daily_berlin) {

        svg.selectAll("rect.c_rect_daily_count")
            .data(dataset_daily_data)
            .enter()
            .append("rect")
                .attr("class", "c_rect_daily_count")
                .attr("x", function (d) { return BERLIN_DAILY_X_CONTENT + scaleX(d.index) - (BERLIN_DAILY_WIDTH_BAR / 2) })
                .attr("y", BERLIN_DAILY_Y_COUNT + BERLIN_DAILY_HEIGHT_COUNT)
                .attr("width", BERLIN_DAILY_WIDTH_BAR) 
                .attr("height", 0)
                .attr("fill", function (d) { return SCALE_COLOR_BLUE(d.weekday) })
                .attr("opacity", opacity) 
                .transition()
                .duration(1000)
                .attr("y", function (d) { 

                                let count = 0

                                switch (displayType_index_company_this) {
                                    case 0: count = d.count; break;
                                    case 1: count = d.count_0; break;
                                    case 2: count = d.count_1; break;
                                    case 3: count = d.count_2; break;
                                }

                                let height = (scaleY_count(count))

                                let y = BERLIN_DAILY_Y_COUNT + BERLIN_DAILY_HEIGHT_COUNT - height

                                return y 
                            })
                .attr("height", function (d) { 

                                let count = 0

                                switch (displayType_index_company_this) {
                                    case 0: count = d.count; break;
                                    case 1: count = d.count_0; break;
                                    case 2: count = d.count_1; break;
                                    case 3: count = d.count_2; break;
                                }

                                let height = (scaleY_count(count))

                                return height
                            })

        svg.selectAll("rect.c_rect_daily_precp")
            .data(dataset_daily_data)
            .enter()
            .append("rect")
                .attr("class", "color_white_svg c_rect_daily_precp")
                .attr("x", function (d) { return BERLIN_DAILY_X_CONTENT + scaleX(d.index) - ((BERLIN_DAILY_WIDTH_BAR - 1) / 2) })
                .attr("y", BERLIN_DAILY_Y_PRECP)
                .attr("width", BERLIN_DAILY_WIDTH_BAR) 
                .attr("height", 0)
                .attr("opacity", opacity) 
                .transition()
                .duration(1000)
                .attr("height", function (d) { return scaleY_precp(d.precp) })

        transition_daily_berlin = false
    
    } else {

        svg.selectAll("rect.c_rect_daily_count")
            .data(dataset_daily_data)
            .enter()
            .append("rect")
                .attr("class", "c_rect_daily_count")
                .attr("x", function (d) { return BERLIN_DAILY_X_CONTENT + scaleX(d.index) - (BERLIN_DAILY_WIDTH_BAR / 2) })
                .attr("y", function (d) { 

                                let count_prev = 0

                                switch (displayType_index_company_prev) {
                                    case 0: count_prev = d.count_prev; break;
                                    case 1: count_prev = d.count_0_prev; break;
                                    case 2: count_prev = d.count_1_prev; break;
                                    case 3: count_prev = d.count_2_prev; break;
                                }

                                let height = scaleY_count(count_prev)

                                let y = BERLIN_DAILY_Y_COUNT + BERLIN_DAILY_HEIGHT_COUNT - height

                                return y 
                            })
                .attr("width", BERLIN_DAILY_WIDTH_BAR) 
                .attr("height", function (d) { 

                                let count_prev = 0

                                switch (displayType_index_company_prev) {
                                    case 0: count_prev = d.count_prev; break;
                                    case 1: count_prev = d.count_0_prev; break;
                                    case 2: count_prev = d.count_1_prev; break;
                                    case 3: count_prev = d.count_2_prev; break;
                                }

                                let height = scaleY_count(count_prev)

                                return height
                            })
                .attr("fill", function (d) { return SCALE_COLOR_BLUE(d.weekday) })
                .attr("opacity", opacity) 
                .transition()
                .duration(1000)
                .attr("y", function (d) { 

                                let count = 0

                                switch (displayType_index_company_this) {
                                    case 0: count = d.count; break;
                                    case 1: count = d.count_0; break;
                                    case 2: count = d.count_1; break;
                                    case 3: count = d.count_2; break;
                                }

                                let height = (scaleY_count(count))

                                let y = BERLIN_DAILY_Y_COUNT + BERLIN_DAILY_HEIGHT_COUNT - height

                                return y 
                            })
                .attr("height", function (d) { 

                                let count = 0

                                switch (displayType_index_company_this) {
                                    case 0: count = d.count; break;
                                    case 1: count = d.count_0; break;
                                    case 2: count = d.count_1; break;
                                    case 3: count = d.count_2; break;
                                }

                                let height = (scaleY_count(count))

                                return height
                            })

        svg.selectAll("rect.c_rect_daily_precp")
            .data(dataset_daily_data)
            .enter()
            .append("rect")
                .attr("class", "color_white_svg c_rect_daily_precp")
                .attr("x", function (d) { return BERLIN_DAILY_X_CONTENT + scaleX(d.index) - ((BERLIN_DAILY_WIDTH_BAR - 1) / 2) })
                .attr("y", BERLIN_DAILY_Y_PRECP)
                .attr("width", BERLIN_DAILY_WIDTH_BAR) 
                .attr("height", function (d) { return scaleY_precp(d.precp_prev) })
                .attr("opacity", opacity) 
                .transition()
                .duration(1000)
                .attr("height", function (d) { return scaleY_precp(d.precp) })
    }

    svg.selectAll("rect.c_rect_data_loss")
        .data(dataset_daily_data)
        .enter()
        .append("rect")
            .attr("class", "c_rect_data_loss")
            .attr("x", function (d) { return BERLIN_DAILY_X_CONTENT + scaleX(d.index) - (BERLIN_DAILY_WIDTH_BAR / 2) })
            .attr("y", BERLIN_DAILY_Y_COUNT + BERLIN_DAILY_HEIGHT_COUNT + 0.5)
            .attr("width", BERLIN_DAILY_WIDTH_BAR) 
            .attr("height", STROKE_WIDTH)
            .attr("fill", COLOR_RED)
            .attr("fill-opacity",  function (d) { 

                let display = false

                if (d.date > 0) {

                    switch (displayType_index_company_prev) {
                        case 0: if (d.count_0_prev < 200 ||
                                    d.count_1_prev < 200 ||
                                    d.count_2_prev < 200)   
                                display = true; 
                                break;
                        case 1: if (d.count_0_prev < 200) display = true; break;
                        case 2: if (d.count_1_prev < 200) display = true; break;
                        case 3: if (d.count_2_prev < 200) display = true; break;
                    }
                } 

                return (display) ? opacity : 0
            }) 
            .transition()
            .duration(1000)
            .attr("fill-opacity",  function (d) { 

                let display = false

                if (d.date > 0) {

                    switch (displayType_index_company_this) {
                        case 0: if (d.count_0 < 200 ||
                                    d.count_1 < 200 ||
                                    d.count_2 < 200)   
                                display = true; 
                                break;
                        case 1: if (d.count_0 < 200) display = true; break;
                        case 2: if (d.count_1 < 200) display = true; break;
                        case 3: if (d.count_2 < 200) display = true; break;
                    }
                } 

                return (display) ? opacity : 0
            }) 

    // ---------------------------------------------------------------------------------
   
    svg.selectAll("rect.c_rect_daily_select")
            .data(dataset_daily_data)
            .enter()
            .append("rect")
                .attr("class", "c_rect_daily_select")
                .attr("id", function (d) { return "i_rect_daily_select_" + d.index; } )
                .attr("x", function (d) { return DAILY_X_CONTENT + scaleX(d.index) - (DAILY_WIDTH_BAR * 2.5 / 2) })
                .attr("y", BERLIN_DAILY_Y_TEXT_COUNT)
                .attr("width", BERLIN_DAILY_WIDTH_BAR * 2.5) 
                .attr("height", BERLIN_DAILY_Y_GAP_1 - BERLIN_DAILY_Y_TEXT_COUNT) 
                .attr("opacity", 0) 
                .on("mouseover", function (d) {

                    if (d.month == 0)
                        return

                    let x = DAILY_X_CONTENT + scaleX(d.index)
                    let color = SCALE_COLOR_BLUE(d.weekday)

                    d3.select("#i_line_daily_select_count")
                        .attr("x1", x)
                        .attr("x2", x)
                        .attr("stroke", color)
                        .attr("opacity", opacity / 2) 

                    d3.select("#i_line_daily_select_precp")
                        .attr("x1", x)
                        .attr("x2", x)
                        .attr("stroke", COLOR_WHITE)
                        .attr("opacity", opacity / 2) 

                    // ------------------------------------------------------

                    d3.select("#i_text_daily_date_title")
                        .attr("x", x - TEXT_GAP) 
                        .attr("fill", color)
                        .attr("opacity", opacity) 

                    date = d.date + "." + d.month + "." + d.year

                    d3.select("#i_text_daily_date_content")
                        .attr("x", x + TEXT_GAP) 
                        .attr("fill", color)
                        .attr("opacity", opacity) 
                        .text("")
                            .append('tspan')
                                .text(date)
                            .append('tspan')
                                .attr('class', 'c_font_size_rem_1 c_letter_spacing_M0_25')
                                .text(" (" + getWeekdayText(d.weekday, language).toUpperCase() + ")")

                    // ---------

                    d3.select("#i_text_daily_label_count_title")
                        .attr("x", x - TEXT_GAP) 
                        .attr("fill", color)
                        .attr("opacity", opacity) 

                    let count = 0

                    switch (displayType_index_company_this) {
                        case 0: count = d.count; break;
                        case 1: count = d.count_0; break;
                        case 2: count = d.count_1; break;
                        case 3: count = d.count_2; break;
                    }

                    d3.select("#i_text_daily_label_count_content")
                        .attr("x", x + TEXT_GAP) 
                        .attr("fill", color)
                        .attr("opacity", opacity) 
                        .text(FORMAT_COMMA(count))

                    // ---------

                    d3.select("#i_text_daily_precp_title")
                        .attr("x", x - TEXT_GAP) 
                        .attr("opacity", opacity) 

                    d3.select("#i_text_daily_precp_content")
                        .attr("x", x + TEXT_GAP) 
                        .attr("opacity", opacity) 
                        .text("")
                            .append('tspan')
                                .text(d.precp)
                            .append('tspan')
                                .attr('class', 'c_font_size_rem_1 c_letter_spacing_M0_25')
                                .text(" mm")
                })
    
    // ---------------------------------------------------------------------------------

    svg.append("text")
            .attr("id", "i_text_daily_date_title")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", 0) 
            .attr("y", BERLIN_DAILY_Y_TEXT_DATE + 8) 
            .attr("opacity", opacity) 
            .text(getText_Date(language).toUpperCase())

    svg.append("text")
            .attr("id", "i_text_daily_date_content")
            .attr("class", "c_content_l c_text_anchor_start")
            .attr("x", 0) 
            .attr("y", BERLIN_DAILY_Y_TEXT_DATE + 12) 
            .attr("opacity", opacity) 
            .text("")

    svg.append("text")
            .attr("id", "i_text_daily_label_count_title")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", 0) 
            .attr("y", BERLIN_DAILY_Y_TEXT_COUNT + 8) 
            .attr("opacity", opacity) 
            .text(getText_NumberOfTrips(language).toUpperCase())

    svg.append("text")
            .attr("id", "i_text_daily_label_count_content")
            .attr("class", "c_content_l c_text_anchor_start")
            .attr("x", 0) 
            .attr("y", BERLIN_DAILY_Y_TEXT_COUNT + 12) 
            .attr("opacity", opacity) 
            .text("")

    svg.append("text")
            .attr("id", "i_text_daily_precp_title")
            .attr("class", "c_content_m c_text_anchor_end")
            .attr("x", 0) 
            .attr("y", BERLIN_DAILY_Y_TEXT_PRECP + BERLIN_DAILY_HEIGHT_TEXT_PRECP - 8) 
            .attr("fill", COLOR_WHITE)
            .attr("opacity", opacity) 
            .text(getText_Precipitation(language).toUpperCase())

    svg.append("text")
            .attr("id", "i_text_daily_precp_content")
            .attr("class", "c_content_l c_text_anchor_start ")
            .attr("x", 0) 
            .attr("y", BERLIN_DAILY_Y_TEXT_PRECP + BERLIN_DAILY_HEIGHT_TEXT_PRECP - 4) 
            .attr("fill", COLOR_WHITE)
            .attr("opacity", opacity) 
            .text("")

    // ---------------------------------------------------------------------------------
   
    svg.append("line")
                .attr("id", "i_line_daily_select_count")
                .attr("x1", 0)
                .attr("y1", BERLIN_DAILY_Y_TEXT_COUNT)
                .attr("x2", 0)
                .attr("y2", BERLIN_DAILY_Y_PRECP)
                .attr("stroke-width", 0.5) 
                .attr("opacity", 0) 
                
    svg.append("line")
                .attr("id", "i_line_daily_select_precp")
                .attr("x1", 0)
                .attr("y1", BERLIN_DAILY_Y_PRECP)
                .attr("x2", 0)
                .attr("y2", BERLIN_DAILY_Y_GAP_1)
                .attr("stroke-width", 0.5) 
                .attr("opacity", 0) 

    // ---------------------------------------------------------------------------------

    {
        svg.append("text")
            .attr("id", "i_daily_month_title")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", BERLIN_DAILY_X)
            .attr("y", BERLIN_DAILY_Y_OPTION_MONTH)
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity)
            .text(getText_Month(language) + " /")

        let width_option = d3.select("#i_daily_month_title").node().getBBox().width

        svg.selectAll("text.c_text_daily_option_month")
            .data(DISPLAY_TYPE_DAILY_MONTH_BERLIN)
            .enter()
            .append("text")
                .attr("id", function (d) { return "i_text_daily_option_month_" + d.index })
                .attr("class", "c_text_daily_option_month c_content_m c_text_anchor_start text_dec_underline c_cursor")
                .text(function (d, i) { return getMonthText(i + 4, language).toUpperCase()  })
                .attr("x", function (d, i) { 

                    let width_sum = 0

                    for (index in DISPLAY_TYPE_DAILY_MONTH_BERLIN) {

                        if (index >= i)
                            break

                        width_sum += (d3.select("#i_text_daily_option_month_" + DISPLAY_TYPE_DAILY_MONTH_BERLIN[index].index).node().getBBox().width + TEXT_GAP_MAX)
                    }

                    return DAILY_X + width_option + TEXT_GAP_MAX + width_sum
                })             
                .attr("y", BERLIN_DAILY_Y_OPTION_MONTH)
                .attr("fill", function (d) { 

                    let color = COLOR_GREY

                    for (let i in displayType_daily_month_berlin_this.display_index) {

                        if (d.index == displayType_daily_month_berlin_this.display_index[i]) {
                            
                            color = COLOR_WHITE
                            
                            break
                        }
                    }

                    return color
                })                 
                .attr("fill-opacity", opacity)
                .on("click", function(d) {

                    displayType_daily_month_berlin_prev = displayType_daily_month_berlin_this
                    displayType_daily_month_berlin_this = d

                    displayType_daily_berlin_company_prev = displayType_daily_berlin_company_this

                    d3.selectAll(".c_rect_daily_option_month")
                        .attr("fill", COLOR_WHITE)

                    d3.selectAll(".c_text_daily_option_month")
                        .attr("fill", COLOR_GREY)

                    {
                        let color = COLOR_WHITE

                        for (let i in displayType_daily_month_berlin_this.display_index) {

                            d3.select("#i_text_daily_option_month_" + displayType_daily_month_berlin_this.display_index[i])
                                .attr("fill", COLOR_WHITE)
                        }
                    }

                    draw_daily_berlin(svg_w_px, svg_h_px, 
                                      svg_w_px_legend, svg_h_px_legend, 
                                      id_svg_main, id_svg_legend, 
                                      progress, language)
                })
    }

    // ---------------------------------------------------------------------------------

    {
        svg.append("text")
            .attr("id", "i_daily_company_title")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", BERLIN_DAILY_X)
            .attr("y", BERLIN_DAILY_Y_OPTION_COMPANY)
            .attr("fill", COLOR_WHITE) 
            .attr("fill-opacity", opacity)
            .text(getText_Company(language) + " /")

        let width_option = d3.select("#i_daily_company_title").node().getBBox().width

        svg.selectAll("text.c_text_daily_option_company")
            .data(DISPLAY_TYPE_DAILY_BERLIN_COMPANY)
            .enter()
            .append("text")
                .attr("id", function (d) { return "i_text_daily_option_company_" + d.index })
                .attr("class", "c_text_daily_option_company c_content_m c_text_anchor_start text_dec_underline c_cursor")
                .text(function (d, i) {

                    let name = d.name

                    if (i == 0)
                        name = getText_All(language) 

                    return name.toUpperCase() 
                })
                .attr("x", function (d, i) { 

                    let width_sum = 0

                    for (index in DISPLAY_TYPE_DAILY_BERLIN_COMPANY) {

                        if (index >= i)
                            break

                        width_sum += (d3.select("#i_text_daily_option_company_" + DISPLAY_TYPE_DAILY_BERLIN_COMPANY[index].index).node().getBBox().width + TEXT_GAP_MAX)
                    }

                    return WEEKLY_X + width_option + TEXT_GAP_MAX + width_sum
                })
                .attr("y", BERLIN_DAILY_Y_OPTION_COMPANY)
                .attr("fill", function (d) { return (d.index == displayType_index_company_this) ? COLOR_WHITE : COLOR_GREY}) 
                .attr("fill-opacity", opacity)
                .on("click", function(d) {

                    displayType_daily_month_berlin_prev = displayType_daily_month_berlin_this

                    displayType_daily_berlin_company_prev = displayType_daily_berlin_company_this
                    displayType_daily_berlin_company_this = d

                    d3.selectAll(".c_text_daily_option_company")
                        .attr("fill", COLOR_GREY)

                    d3.select("#i_text_daily_option_company_" + d.index)
                        .attr("fill", COLOR_WHITE)

                    draw_daily_berlin(svg_w_px, svg_h_px, 
                                      svg_w_px_legend, svg_h_px_legend, 
                                      id_svg_main, id_svg_legend, 
                                      progress, language)              
                })
    }

    // ---------------------------------------------------------------------------------
/*
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", svg_h_px)
        .attr("x2", svg_w_px)
        .attr("y2", svg_h_px)
        .attr("stroke", "gray")
        .attr("stroke-width", "1")
        */
}

// -------------------------------------------------

const LEGEND_BERLIN_DAILY_X = 0;
const LEGEND_BERLIN_DAILY_Y = 0;

const LEGEND_BERLIN_DAILY_WIDTH = 300 - LEGEND_BERLIN_DAILY_X;

const LEGEND_BERLIN_DAILY_WIDTH_ITEM = 30;
const LEGEND_BERLIN_DAILY_HEIGHT_ITEM = 10;

const LEGEND_BERLIN_DAILY_WIDTH_GAP = 10;
const LEGEND_BERLIN_DAILY_HEIGHT_GAP = 10;

const LEGEND_BERLIN_DAILY_X_PATTERN = LEGEND_BERLIN_DAILY_X;
const LEGEND_BERLIN_DAILY_X_TEXT = LEGEND_BERLIN_DAILY_X_PATTERN + LEGEND_BERLIN_DAILY_WIDTH_GAP + LEGEND_BERLIN_DAILY_WIDTH_ITEM;

const LEGEND_BERLIN_DAILY_HEIGHT_WEEKDAY = LEGEND_BERLIN_DAILY_HEIGHT_ITEM;
const LEGEND_BERLIN_DAILY_HEIGHT_WEEKEND = LEGEND_BERLIN_DAILY_HEIGHT_ITEM;
const LEGEND_BERLIN_DAILY_HEIGHT_PRECP = LEGEND_BERLIN_DAILY_HEIGHT_ITEM;
const LEGEND_BERLIN_DAILY_HEIGHT_DATA_LOSS = LEGEND_BERLIN_DAILY_HEIGHT_ITEM;

const LEGEND_BERLIN_DAILY_Y_WEEKDAY = LEGEND_BERLIN_DAILY_Y;
const LEGEND_BERLIN_DAILY_Y_WEEKEND = LEGEND_BERLIN_DAILY_Y_WEEKDAY + LEGEND_BERLIN_DAILY_HEIGHT_WEEKDAY + LEGEND_BERLIN_DAILY_HEIGHT_GAP;
const LEGEND_BERLIN_DAILY_Y_PRECP = LEGEND_BERLIN_DAILY_Y_WEEKEND + LEGEND_BERLIN_DAILY_HEIGHT_WEEKEND + LEGEND_BERLIN_DAILY_HEIGHT_GAP;
const LEGEND_BERLIN_DAILY_Y_DATA_LOSS = LEGEND_BERLIN_DAILY_Y_PRECP + LEGEND_BERLIN_DAILY_HEIGHT_PRECP + LEGEND_BERLIN_DAILY_HEIGHT_GAP;
const LEGEND_BERLIN_DAILY_Y_END = LEGEND_BERLIN_DAILY_Y_DATA_LOSS + LEGEND_BERLIN_DAILY_HEIGHT_DATA_LOSS + LEGEND_BERLIN_DAILY_HEIGHT_GAP;

function draw_daily_legend_berlin(svg_w_px, svg_h_px, id_svg, language) {

    console.log("draw_daily_legend_berlin");

    // --------------------------------------------------------------------------------- 

    d3.select(id_svg + " > svg").remove();

    let svg = d3.select(id_svg)
                    .append("svg")
                        .attr("width", svg_w_px)
                        .attr("height", svg_h_px);

    // --------------------------------------------------------------------------------- 

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_DAILY_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_DAILY_Y_WEEKDAY + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_DAILY_X_PATTERN + LEGEND_BERLIN_DAILY_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_DAILY_Y_WEEKDAY + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_BLUE) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_DAILY_X_TEXT)
            .attr("y", LEGEND_BERLIN_DAILY_Y_WEEKDAY + LEGEND_BERLIN_DAILY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_BLUE)
            .attr("fill-opacity", 1) 
            .text(getText_Weekday(language))

    // -----

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_DAILY_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_DAILY_Y_WEEKEND + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_DAILY_X_PATTERN + LEGEND_BERLIN_DAILY_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_DAILY_Y_WEEKEND + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_GREEN) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_DAILY_X_TEXT)
            .attr("y", LEGEND_BERLIN_DAILY_Y_WEEKEND + LEGEND_BERLIN_DAILY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_GREEN)
            .attr("fill-opacity", 1) 
            .text(getText_Weekend(language))

    // -----

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_DAILY_X_PATTERN)
            .attr("y1", LEGEND_BERLIN_DAILY_Y_PRECP + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_DAILY_X_PATTERN + LEGEND_BERLIN_DAILY_WIDTH_ITEM)
            .attr("y2", LEGEND_BERLIN_DAILY_Y_PRECP + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_WHITE) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_DAILY_X_TEXT)
            .attr("y", LEGEND_BERLIN_DAILY_Y_PRECP + LEGEND_BERLIN_DAILY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_WHITE)
            .attr("fill-opacity", 1) 
            .text(getText_Precipitation(language))

    // -----

    svg.append("line")
            .attr("x1", LEGEND_BERLIN_DAILY_X_PATTERN + (LEGEND_BERLIN_DAILY_WIDTH_ITEM / 2) - 2)
            .attr("y1", LEGEND_BERLIN_DAILY_Y_DATA_LOSS + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("x2", LEGEND_BERLIN_DAILY_X_PATTERN + (LEGEND_BERLIN_DAILY_WIDTH_ITEM / 2) + 2)
            .attr("y2", LEGEND_BERLIN_DAILY_Y_DATA_LOSS + (LEGEND_BERLIN_DAILY_HEIGHT_ITEM / 2))
            .attr("stroke", COLOR_RED) 
            .attr("stroke-width", STROKE_WIDTH) 
            .attr("stroke-opacity", 1) 
            .attr("fill-opacity", 0) 

    svg.append("text")
            .attr("class", "c_content_m c_text_anchor_start")
            .attr("x", LEGEND_BERLIN_DAILY_X_TEXT)
            .attr("y", LEGEND_BERLIN_DAILY_Y_DATA_LOSS + LEGEND_BERLIN_DAILY_HEIGHT_GAP)
            .attr("stroke-opacity", 0) 
            .attr("fill", COLOR_RED)
            .attr("fill-opacity", 1) 
            .text(getText_DataLoss(language))
}
