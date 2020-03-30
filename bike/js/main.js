
function draw_text(version, language) {

  document.title = getText_Title(version, language)

  $("#div_id_top_basic").text(getText_Title(version, language))

  draw_intro_text(version, language)
  draw_intro_text_mobile(version)
  draw_weekly_text(SECTION.YOUBIKE, language)
  draw_weekly_text_mobile(SECTION.YOUBIKE)
  draw_weekly_text(SECTION.BERLIN, language)
  draw_weekly_text_mobile(SECTION.BERLIN)
  draw_daily_text(SECTION.YOUBIKE, language)
  draw_daily_text_mobile(SECTION.YOUBIKE)
  draw_daily_text(SECTION.BERLIN, language)
  draw_daily_text_mobile(SECTION.BERLIN)
  draw_hourly_text(SECTION.YOUBIKE, language)
  draw_hourly_text_mobile(SECTION.YOUBIKE)
  draw_hourly_text(SECTION.BERLIN, language)
  draw_hourly_text_mobile(SECTION.BERLIN)
  draw_duration_distance_text(SECTION.YOUBIKE, language)
  draw_duration_distance_text_mobile(SECTION.YOUBIKE)
  draw_duration_distance_text(SECTION.BERLIN, language)
  draw_duration_distance_text_mobile(SECTION.BERLIN)
  draw_mesh_text(SECTION.YOUBIKE, language)
  draw_mesh_text_mobile(SECTION.YOUBIKE)
  draw_mesh_text(SECTION.BERLIN, language)
  draw_mesh_text_mobile(SECTION.BERLIN)
}

// -----------------------

function draw_content(draw_content, version, language) {

  $(".c_title_city_taipei").text("　" + getText_Taipei(language) + "　");
  $(".c_title_city_berlin").text("　" + getText_Berlin(language) + "　");

  switch (draw_content) {

    case DRAW_CONTENT.INTRO:          draw_intro(960, 720, "#div_id_main_basic", progress, version, language); break
    case DRAW_CONTENT.WEEKLY_YOUBIKE: draw_weekly(1200, 720, 300, 300, "#div_id_main_basic", "#div_id_legend_weekly", progress, SECTION.YOUBIKE, language); break
    case DRAW_CONTENT.WEEKLY_BERLIN:  draw_weekly(1200, 720, 300, 300, "#div_id_main_basic", "#div_id_legend_weekly_berlin", progress, SECTION.BERLIN, language); break
    case DRAW_CONTENT.DAILY_YOUBIKE:  draw_daily(1200, 720, 300, 300, "#div_id_main_basic", "#div_id_legend_daily", progress, SECTION.YOUBIKE, language); break
    case DRAW_CONTENT.DAILY_BERLIN:   draw_daily(1200, 720, 300, 300, "#div_id_main_basic", "#div_id_legend_daily_berlin", progress, SECTION.BERLIN, language); break
    case DRAW_CONTENT.HOURLY_YOUBIKE: draw_hourly(1200, 720, 300, 300, "#div_id_main_basic", "#div_id_legend_hourly", progress, SECTION.YOUBIKE, language); break
    case DRAW_CONTENT.HOURLY_BERLIN:  draw_hourly(1200, 720, 300, 300, "#div_id_main_basic", "#div_id_legend_hourly_berlin", progress, SECTION.BERLIN, language); break
    case DRAW_CONTENT.DURATION_DISTANCE_YOUBIKE: draw_duration_distance(1200, 720, "#div_id_main_basic", progress, SECTION.YOUBIKE, language); break
    case DRAW_CONTENT.DURATION_DISTANCE_BERLIN:  draw_duration_distance(1200, 720, "#div_id_main_basic", progress, SECTION.BERLIN, language); break
    case DRAW_CONTENT.MESH_YOUBIKE:   draw_mesh(1200, 900, 300, 300, "#div_id_main_basic", "#div_id_legend_mesh", progress, SECTION.YOUBIKE, language); break
    case DRAW_CONTENT.MESH_BERLIN:    draw_mesh(1200, 900, 300, 300, "#div_id_main_basic", "#div_id_legend_mesh_berlin", progress, SECTION.BERLIN, language); break
  }
}
