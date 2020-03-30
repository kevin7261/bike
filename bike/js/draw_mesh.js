
function draw_mesh(svg_w_px, svg_h_px, 
                   svg_w_px_legend, svg_h_px_legend, 
                   id_svg_main, id_svg_legend, 
                   progress, section, language) {

    switch (section) {
        
        case SECTION.YOUBIKE: draw_mesh_youbike(svg_w_px, svg_h_px, 
                                                svg_w_px_legend, svg_h_px_legend, 
                                                id_svg_main, id_svg_legend, 
                                                progress, language)
                              break

        case SECTION.BERLIN:  draw_mesh_berlin(svg_w_px, svg_h_px, 
                                               svg_w_px_legend, svg_h_px_legend, 
                                               id_svg_main, id_svg_legend, 
                                               progress, language) 
                              break
    }
}

// -------------------------------------------------

function draw_mesh_text(section, language) {

    let text_title_youbike = ""
    let text_content_youbike = ""
    let text_title_berlin = ""
    let text_content_berlin = ""

    switch (language) {

      case LANGUAGE.EN: 
      {
        text_title_youbike = dataset_text.mesh.youbike.title.en
        text_content_youbike = dataset_text.mesh.youbike.content.en
        text_title_berlin = dataset_text.mesh.berlin.title.en
        text_content_berlin = dataset_text.mesh.berlin.content.en

        break
      }
      case LANGUAGE.ZH: 
      {
        text_title_youbike = dataset_text.mesh.youbike.title.zh
        text_content_youbike = dataset_text.mesh.youbike.content.zh
        text_title_berlin = dataset_text.mesh.berlin.title.zh
        text_content_berlin = dataset_text.mesh.berlin.content.zh

        break
      }
      case LANGUAGE.DE: 
      {
        text_title_youbike = dataset_text.mesh.youbike.title.de
        text_content_youbike = dataset_text.mesh.youbike.content.de
        text_title_berlin = dataset_text.mesh.berlin.title.de
        text_content_berlin = dataset_text.mesh.berlin.content.de

        break
      }
    }

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_mesh").html(text_title_youbike)
                d3.select("#i_content_mesh").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_mesh_berlin").html(text_title_berlin)
                d3.select("#i_content_mesh_berlin").html(text_content_berlin)

                break
            }
    }
}

function draw_mesh_text_mobile(section) {

    let text_title_youbike = dataset_text.mesh_mobile.youbike.title.en
    let text_content_youbike = dataset_text.mesh_mobile.youbike.content.en
    let text_title_berlin = dataset_text.mesh_mobile.berlin.title.en
    let text_content_berlin = dataset_text.mesh_mobile.berlin.content.en

    switch (section) {

        case SECTION.YOUBIKE:
            {
                d3.select("#i_title_mesh_mobile").html(text_title_youbike)
                d3.select("#i_content_mesh_mobile").html(text_content_youbike)

                break
            }

        case SECTION.BERLIN:
            {
                d3.select("#i_title_mesh_berlin_mobile").html(text_title_berlin)
                d3.select("#i_content_mesh_berlin_mobile").html(text_content_berlin)

                break
            }
    }
}
