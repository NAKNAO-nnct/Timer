// モジュールオブジェクトの初期化
var fs = require("fs");
var server = require("http").createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  var output = fs.readFileSync("./chat.html", "utf-8");
  res.end(output);
}).listen(9500);  // portを指定

var io = require("socket.io").listen(server);

// イベントの定義
io.sockets.on("connection", function (socket) {

  // メッセージ送信カスタムイベント
  socket.on("publish", function (data) {
    console.log(data);
    io.sockets.emit("publish", { value: data.value });
  });
});