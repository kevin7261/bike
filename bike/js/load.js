
var g_sFilePath = "json";

var dataset_weekly_youbike = [];
var dataset_weekly_berlin = [];
var dataset_daily_youbike = [];
var dataset_daily_berlin = [];
var dataset_mesh_youbike = [];
var dataset_mesh_berlin = [];
var dataset_text = null

function loadData_Weekly_YouBike(sFilePath, sFileName) {

  let sPathName = sFilePath + "/" + sFileName + ".json"

  d3.json(sPathName).then(function(dataset) {

    dataset_weekly_youbike = dataset.filter(function (d) { return (d.year == 2019); })[0].data;
  });
}

function loadData_Weekly_Berlin(sFilePath, sFileName) {

  let sPathName = sFilePath + "/" + sFileName + ".json"

  d3.json(sPathName).then(function(dataset) {

    dataset_weekly_berlin = dataset[0].data;
  });
}

function loadData_Daily_YouBike(sFilePath, sFileName) {

  let sPathName = sFilePath + "/" + sFileName + ".json"

  d3.json(sPathName).then(function(dataset) {

    dataset_daily_youbike = dataset.filter(function (d) { return (d.year == 2019); })[0].data
  });
}

function loadData_Daily_Berlin(sFilePath, sFileName) {

  let sPathName = sFilePath + "/" + sFileName + ".json"

  d3.json(sPathName).then(function(dataset) {

    dataset_daily_berlin = dataset[0].data
  });
}

function loadData_Mesh_YouBike(sFilePath, sFileName) {

  let sPathName = sFilePath + "/" + sFileName + ".json"

  d3.json(sPathName).then(function(dataset) {

    dataset_mesh_youbike = dataset.filter(function (d) { return (d.year == 2019); })[0].data;

    draw_content(g_draw_content, g_version, g_language)

    draw_mesh_legend_youbike(dataset_mesh_youbike, 300, 300, "#div_id_legend_mesh")
  });
}

function loadData_Mesh_Berlin(sFilePath, sFileName) {

  let sPathName = sFilePath + "/" + sFileName + ".json"

  d3.json(sPathName).then(function(dataset) {

    dataset_mesh_berlin = dataset[0].data;

    draw_mesh_legend_berlin(dataset_mesh_berlin, 300, 300, "#div_id_legend_mesh_berlin")
  });
}

function loadData_Mesh_Text(sFilePath, sFileName) {

  let sPathName = sFilePath + "/" + sFileName + ".json"

  d3.json(sPathName).then(function(dataset) {

    dataset_text = dataset

    draw_text(g_version, g_language)
  });
}

