
function draw_hourly(svg_w_px, svg_h_px, 
                     svg_w_px_legend, svg_h_px_legend, 
                     id_svg_main, id_svg_legend, 
                     progress, section, language) {

    switch (section) {

        case SECTION.YOUBIKE: draw_hourly_path_youbike(svg_w_px, svg_h_px, 
                                                       svg_w_px_legend, svg_h_px_legend, 
                                                       id_svg_main, id_svg_legend, 
                                                       progress, language)
                              break

        case SECTION.BERLIN:  draw_hourly_path_berlin(svg_w_px, svg_h_px, 
                                                      svg_w_px_legend, svg_h_px_legend, 
                                                      id_svg_main, id_svg_legend, 
                                                      progress, language)
                              break
    }
}

// -------------------------------------------------

function draw_hourly_text(section, language) {

    let text_title_youbike = ""
    let text_content_youbike = ""
    let text_title_berlin = ""
    let text_content_berlin = ""

    switch (language) {
        
      case LANGUAGE.EN: 
      {
        text_title_youbike = dataset_text.hourly.youbike.title.en
        text_content_youbike = dataset_text.hourly.youbike.content.en
        text_title_berlin = dataset_text.hourly.berlin.title.en
        text_content_berlin = dataset_text.hourly.berlin.content.en

        break
      }
      case LANGUAGE.ZH: 
      {
        text_title_youbike = dataset_text.hourly.youbike.title.zh
        text_content_youbike = dataset_text.hourly.youbike.content.zh
        text_title_berlin = dataset_text.hourly.berlin.title.zh
        text_content_berlin = dataset_text.hourly.berlin.content.zh

        break
      }
      case LANGUAGE.DE: 
      {
        text_title_youbike = dataset_text.hourly.youbike.title.de
        text_content_youbike = dataset_text.hourly.youbike.content.de
        text_title_berlin = dataset_text.hourly.berlin.title.de
        text_content_berlin = dataset_text.hourly.berlin.content.de

        break
      }
    }

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_hourly").html(text_title_youbike)
                d3.select("#i_content_hourly").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_hourly_berlin").html(text_title_berlin)
                d3.select("#i_content_hourly_berlin").html(text_content_berlin)

                break
            }
    }
}

function draw_hourly_text_mobile(section) {

    let text_title_youbike = dataset_text.hourly_mobile.youbike.title.en
    let text_content_youbike = dataset_text.hourly_mobile.youbike.content.en
    let text_title_berlin =dataset_text.hourly_mobile.berlin.title.en
    let text_content_berlin = dataset_text.hourly_mobile.berlin.content.en

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_hourly_mobile").html(text_title_youbike)
                d3.select("#i_content_hourly_mobile").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_hourly_berlin_mobile").html(text_title_berlin)
                d3.select("#i_content_hourly_berlin_mobile").html(text_content_berlin)

                break
            }
    }
}
