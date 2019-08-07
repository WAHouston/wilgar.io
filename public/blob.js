function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.velocity = createVector(0, 0);

  this.update = function() {
    var newvelocity = createVector(mouseX - width / 2, mouseY - height / 2);
    newvelocity.setMag(3);
    this.velocity.lerp(newvelocity, 0.2);
    this.pos.add(this.velocity);
  };

  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      return true;
    } else {
      return false;
    }
  };

  this.constrain = function() {
    blob.pos.x = constrain(blob.pos.x, -width, width);
    blob.pos.y = constrain(blob.pos.y, -height, height);
  };

  this.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}
