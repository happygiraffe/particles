var particles = [];

function Particle(x, y) {
  this.x = x;
  this.y = y;
}
Particle.prototype = {
  draw: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x+1, this.y+1);
    ctx.stroke();
    ctx.closePath();
  },
  update: function() {
    // TODO
  },
};

function rnd(lower, upper) {
  var maxima = Math.max(upper, lower),
      minima = Math.min(upper, lower),
      value = Math.random() * (maxima - minima);
  return value + minima;
}

function main () {
  var ctx = document.getElementById('c').getContext('2d'),
      p,
      round = Math.round,
      border = 20;
  console.log(ctx);

  // Draw a dark gray border.
  ctx.fillStyle = 'rgb(64,64,64)';
  ctx.fillRect(0, 0, c.width, c.height);
  
  /// Empty middle.
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(border, border, c.width-(border*2), c.height-(border*2))
  
  // Draw 20 random particles.
  var minWidth = border,
      maxWidth = ctx.canvas.width - border,
      minHeight = border,
      maxHeight = ctx.canvas.height - border;
  for (var i=0; i < 20; i++) {
    p = new Particle(round(rnd(minWidth, maxWidth)),
                     round(rnd(minHeight, maxHeight)));
    p.draw(ctx);
    particles.push(p);
  }
}

document.body.onload = main;
