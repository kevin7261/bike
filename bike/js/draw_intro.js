
function draw_intro(svg_w_px, svg_h_px, id_svg_main, progress, version, language){

    console.log("progress", progress)

    // --------------------------------------------------------------------------------- 

    if (progress < 0.9) {

        //$("#div_id_top_basic").hide("fast");
        $("#div_id_top_basic").animate({height: "0px"}, 200);
        $("#div_id_top_basic").css("display", "none");
    }
    else if (progress >= 0.9) {

        //$("#div_id_top_basic").show("fast");
        $("#div_id_top_basic").css("display", "block");
        $("#div_id_top_basic").animate({height: "25px"}, 200);
    }

    // --------------------------------------------------------------------------------- 

    switch (version) {

      case VERSION.YOUBIKE: draw_intro_youbike(svg_w_px, svg_h_px, id_svg_main, progress, language); break
      case VERSION.COMPARE: draw_intro_berlin(svg_w_px, svg_h_px, id_svg_main, progress, language); break
  }
}

// -------------------------------------------------

function draw_intro_text(version, language) {

    let text_title_youbike = ""
    let text_content_youbike = ""
    let text_title_berlin = ""
    let text_content_berlin = ""

    switch (language) {
        
      case LANGUAGE.EN: 
      {
        text_title_youbike = dataset_text.intro.youbike.title.en
        text_content_youbike = dataset_text.intro.youbike.content.en
        text_title_berlin = dataset_text.intro.berlin.title.en
        text_content_berlin = dataset_text.intro.berlin.content.en

        break
      }
      case LANGUAGE.ZH: 
      {
        text_title_youbike = dataset_text.intro.youbike.title.zh
        text_content_youbike = dataset_text.intro.youbike.content.zh
        text_title_berlin = dataset_text.intro.berlin.title.zh
        text_content_berlin = dataset_text.intro.berlin.content.zh

        break
      }
      case LANGUAGE.DE: 
      {
        text_title_youbike = dataset_text.intro.youbike.title.de
        text_content_youbike = dataset_text.intro.youbike.content.de
        text_title_berlin = dataset_text.intro.berlin.title.de
        text_content_berlin = dataset_text.intro.berlin.content.de

        break
      }
    }

    switch (version) {

        case VERSION.YOUBIKE:
            {
                d3.select("#i_title_intro").html(text_title_youbike)
                d3.select("#i_content_intro").html(text_content_youbike)

                break
            }

        case VERSION.COMPARE:
            {
                d3.select("#i_title_intro").html(text_title_berlin)
                d3.select("#i_content_intro").html(text_content_berlin)

                break
            }
    }
}

function draw_intro_text_mobile(version) {

    let text_title_youbike = dataset_text.intro_mobile.youbike.title.en
    let text_content_youbike = dataset_text.intro_mobile.youbike.content.en
    let text_title_berlin = dataset_text.intro_mobile.berlin.title.en
    let text_content_berlin = dataset_text.intro_mobile.berlin.content.en

    switch (version) {

        case VERSION.YOUBIKE:
            {
                d3.select("#i_title_intro_mobile").html(text_title_youbike)
                d3.select("#i_content_intro_mobile").html(text_content_youbike)

                break
            }

        case VERSION.COMPARE:
            {
                d3.select("#i_title_intro_mobile").html(text_title_berlin)
                d3.select("#i_content_intro_mobile").html(text_content_berlin)

                break
            }
    }
}
