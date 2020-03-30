
function draw_weekly(svg_w_px, svg_h_px, 
                     svg_w_px_legend, svg_h_px_legend, 
                     id_svg_main, id_svg_legend, 
                     progress, section, language) {

    switch (section) {

        case SECTION.YOUBIKE: draw_weekly_youbike(svg_w_px, svg_h_px, 
                                                  svg_w_px_legend, svg_h_px_legend, 
                                                  id_svg_main, id_svg_legend, 
                                                  progress, language)
                              break

        case SECTION.BERLIN:  draw_weekly_berlin(svg_w_px, svg_h_px, 
                                                 svg_w_px_legend, svg_h_px_legend, 
                                                 id_svg_main, id_svg_legend, 
                                                 progress, language) 
                              break
    }
}

// -------------------------------------------------

function draw_weekly_text(section, language) {

    let text_title_youbike = ""
    let text_content_youbike = ""
    let text_title_berlin = ""
    let text_content_berlin = ""

    switch (language) {
        
      case LANGUAGE.EN: 
      {
        text_title_youbike = dataset_text.weekly.youbike.title.en
        text_content_youbike = dataset_text.weekly.youbike.content.en
        text_title_berlin = dataset_text.weekly.berlin.title.en
        text_content_berlin = dataset_text.weekly.berlin.content.en

        break
      }
      case LANGUAGE.ZH: 
      {
        text_title_youbike = dataset_text.weekly.youbike.title.zh
        text_content_youbike = dataset_text.weekly.youbike.content.zh
        text_title_berlin = dataset_text.weekly.berlin.title.zh
        text_content_berlin = dataset_text.weekly.berlin.content.zh

        break
      }
      case LANGUAGE.DE: 
      {
        text_title_youbike = dataset_text.weekly.youbike.title.de
        text_content_youbike = dataset_text.weekly.youbike.content.de
        text_title_berlin = dataset_text.weekly.berlin.title.de
        text_content_berlin = dataset_text.weekly.berlin.content.de

        break
      }
    }

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_weekly").html(text_title_youbike)
                d3.select("#i_content_weekly").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_weekly_berlin").html(text_title_berlin)
                d3.select("#i_content_weekly_berlin").html(text_content_berlin)

                break
            }
    }
}

function draw_weekly_text_mobile(section) {

    let text_title_youbike = dataset_text.weekly_mobile.youbike.title.en
    let text_content_youbike = dataset_text.weekly_mobile.youbike.content.en
    let text_title_berlin = dataset_text.weekly_mobile.berlin.title.en
    let text_content_berlin = dataset_text.weekly_mobile.berlin.content.en

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_weekly_mobile").html(text_title_youbike)
                d3.select("#i_content_weekly_mobile").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_weekly_berlin_mobile").html(text_title_berlin)
                d3.select("#i_content_weekly_berlin_mobile").html(text_content_berlin)

                break
            }
    }
}
