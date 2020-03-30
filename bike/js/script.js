// using d3 for convenience
var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');
var progress = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {

  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.8);

  step.style('height', stepH + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {

  console.log("handleStepEnter", response.index);

  g_draw_content = response.index

  switch (g_version) {

    case VERSION.YOUBIKE: {

      if (g_draw_content == DRAW_CONTENT.MESH_YOUBIKE) {
        $("#outro_info_main").css("display", "block")
        $("#outro_info_main").animate({height: "75px"}, 100)
      }
      else {
        $("#outro_info_main").animate({height: "-1px"}, 100)
        $("#outro_info_main").css("display", "none")
      }

      break
    }
    case VERSION.COMPARE: {

      if (g_draw_content == DRAW_CONTENT.MESH_BERLIN) {
        $("#outro_info_main").css("display", "block")
        $("#outro_info_main").animate({height: "75px"}, 100)
      }
      else {
        $("#outro_info_main").animate({height: "-1px"}, 100)
        $("#outro_info_main").css("display", "none")
      }

      break
    }
  }

  switch (g_draw_content) {

    case DRAW_CONTENT.WEEKLY_YOUBIKE: {
      transition_weekly = true
      break
    }
    case DRAW_CONTENT.WEEKLY_BERLIN: {
      transition_weekly_berlin = true
      break
    }
    case DRAW_CONTENT.DAILY_YOUBIKE: {
      transition_daily = true
      break
    }
    case DRAW_CONTENT.DAILY_BERLIN: {
      transition_daily_berlin = true
      break
    }
    case DRAW_CONTENT.HOURLY_YOUBIKE: {
      transition_hourly = true
      break
    }
    case DRAW_CONTENT.HOURLY_BERLIN: {
      transition_hourly_berlin = true
      break
    }
    case DRAW_CONTENT.DURATION_DISTANCE_YOUBIKE: {
      transition_duration = true
      transition_distance = true
      break
    }
    case DRAW_CONTENT.DURATION_DISTANCE_BERLIN: {
      transition_duration_berlin = true
      transition_distance_berlin = true
      break
    }
    case DRAW_CONTENT.MESH_YOUBIKE: {
      transition_mesh = true
      break
    }
    case DRAW_CONTENT.MESH_BERLIN: {
      transition_mesh_berlin = true
      break
    }
  }

  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update graphic based on step
  //figure.select('p').text(response.index + 1);
}

function handleStepProgress(callback) {

  console.log("handleStepProgress", callback.progress);

  progress = callback.progress;

  draw_content(g_draw_content, g_version, g_language)
}

// scrollama event handlers
function handleStepExit(response) {

  console.log("handleStepExit", response.index);
}

function setupStickyfill() {

  d3.selectAll('.sticky').each(function () {
    Stickyfill.add(this);
  });
}

function init() {

  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.setup({
    step: '#scrolly article .step',
    offset: 0.66,//0.66,//0.5,//0.75,//0.33,
    debug: false,//true, // the line
    progress: true
  })
    .onStepEnter(handleStepEnter)
    .onStepProgress(handleStepProgress)
    .onStepExit(handleStepExit)


  // setup resize event
  window.addEventListener('resize', handleResize);
}

// kick things off
init();
