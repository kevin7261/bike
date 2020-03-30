
function draw_duration_distance(svg_w_px, svg_h_px, 
                                id_svg_main, 
                                progress, section, language) {

    switch (section) {

        case SECTION.YOUBIKE: draw_duration_distance_youbike(svg_w_px, svg_h_px, 
                                                            id_svg_main,
                                                            progress, language)
                              break

        case SECTION.BERLIN:  draw_duration_distance_berlin(svg_w_px, svg_h_px, 
                                                            id_svg_main,
                                                            progress, language)
                              break
    }
}

// -------------------------------------------------

function draw_duration_distance_text(section, language) {

    let text_title_youbike = ""
    let text_content_youbike = ""
    let text_title_berlin = ""
    let text_content_berlin = ""

    switch (language) {
        
      case LANGUAGE.EN: 
      {
        text_title_youbike = dataset_text.duration_distance.youbike.title.en
        text_content_youbike = dataset_text.duration_distance.youbike.content.en
        text_title_berlin = dataset_text.duration_distance.berlin.title.en
        text_content_berlin = dataset_text.duration_distance.berlin.content.en

        break
      }
      case LANGUAGE.ZH: 
      {
        text_title_youbike = dataset_text.duration_distance.youbike.title.zh
        text_content_youbike = dataset_text.duration_distance.youbike.content.zh
        text_title_berlin = dataset_text.duration_distance.berlin.title.zh
        text_content_berlin = dataset_text.duration_distance.berlin.content.zh

        break
      }
      case LANGUAGE.DE: 
      {
        text_title_youbike = dataset_text.duration_distance.youbike.title.de
        text_content_youbike = dataset_text.duration_distance.youbike.content.de
        text_title_berlin = dataset_text.duration_distance.berlin.title.de
        text_content_berlin = dataset_text.duration_distance.berlin.content.de

        break
      }
    }

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_duration_distance").html(text_title_youbike)
                d3.select("#i_content_duration_distance").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_duration_distance_berlin").html(text_title_berlin)
                d3.select("#i_content_duration_distance_berlin").html(text_content_berlin)

                break
            }
    }
}

function draw_duration_distance_text_mobile(section) {

    let text_title_youbike = dataset_text.duration_distance_mobile.youbike.title.en
    let text_content_youbike = dataset_text.duration_distance_mobile.youbike.content.en
    let text_title_berlin = dataset_text.duration_distance_mobile.berlin.title.en
    let text_content_berlin = dataset_text.duration_distance_mobile.berlin.content.en

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_duration_distance_mobile").html(text_title_youbike)
                d3.select("#i_content_duration_distance_mobile").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_duration_distance_berlin_mobile").html(text_title_berlin)
                d3.select("#i_content_duration_distance_berlin_mobile").html(text_content_berlin)

                break
            }
    }
}