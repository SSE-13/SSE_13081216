function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var road = new editor.Material("road1.jpg", "road", 0);
var box = new editor.Material("box1.jpg", "box", 0);
var bar = new editor.Material("bar1.jpg", "bar", 0);
var materials = new Array();
materials.push(road);
materials.push(box);
materials.push(bar);
var currenttile;
//读取json配置文件
/*function LoadData(callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", __dirname + "/mapsave.json", true);
    xmlhttp.send(null);
    xmlhttp.onload = onloadComplete
    function onloadComplete() {
        var data = JSON.parse(xmlhttp.responseText);
        callback(data);
    }



}

LoadData(function(data){
    console.log(data[0][0].walkable,data[0][0].material);
})*/
function onTileClick(tile) {
    currenttile = tile;
    if (mapEditor.children[mapEditor.children.length] != mapEditor.stroke) {
        mapEditor.addChild(mapEditor.stroke);
    }
    mapEditor.stroke.x = tile.x;
    mapEditor.stroke.y = tile.y;
    information.Update(tile);
    console.log(tile.toString());
}
var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var mapEditor = createMapEditor();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
var information = new ui.Information();
information.x = 200;
var panel = new editor.ControlPanel(materials);
panel.x = 300;
panel.y = 150;
stage.addChild(information);
stage.addChild(panel);
renderCore.start(stage, ["box1.jpg", "bar1.jpg", "road1.jpg", "box2.jpg"]);
