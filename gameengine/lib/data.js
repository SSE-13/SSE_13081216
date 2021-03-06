var fs = require("fs");
var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function () {
            var map_path = __dirname + "/map.json";
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        };
        Storage.prototype.saveFile = function () {
            var json = { "map": [mapData[0], mapData[1], mapData[2], mapData[3], mapData[4], mapData[5], mapData[6], mapData[7]] };
            var obj = JSON.stringify(json);
            var map_path = __dirname + "/map.json";
            fs.writeFile(map_path, obj, function (err) {
                if (err)
                    throw err;
                console.log('Save Done!');
                alert("Save Done!");
            });
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
