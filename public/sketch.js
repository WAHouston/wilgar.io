var socket;
var blob;
var blobs = [];
var zoom = 1;

function setup() {
  createCanvas(600, 600);
  socket = io.connect();
  blob = new Blob(random(width), random(height), random(8, 24));
  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };
  socket.emit("start", data);
  socket.on("heartbeat", function(data) {
    blobs = data;
  });
}
function draw() {
  background(0);
  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.2);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (var i = blobs.length - 1; i >= 0; i--) {
    var id = blobs[i].id;
    if (id.substring(2, id.length) !== socket.id) {
      fill(0, 0, 255);
      ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);
    }
  }

  blob.show();
  if (mouseIsPressed) {
    blob.update();
  }
  blob.constrain();

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };

  socket.emit("update", data);
}
