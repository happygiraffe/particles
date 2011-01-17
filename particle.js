var particles = [],
    animateIntervalId,
    BORDER = 20;

function Particle(x, y) {
  this.x = x;
  this.y = y;

  // Velocity
  this.velX = 0;
  this.velY = 0;

  // Size
  this.size = 1;
}
Particle.prototype = {
  draw: function(ctx) {
    ctx.save();
    ctx.beginPath();
    // A full circle.
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.stroke();
    ctx.restore();
  },
  update: function() {
    this.x += this.x * this.velX;
    this.y += this.y * this.velY;
  },
};

function rnd(lower, upper) {
  var maxima = Math.max(upper, lower),
      minima = Math.min(upper, lower),
      value = Math.random() * (maxima - minima);
  return value + minima;
}

function roundRand(lower, upper) {
  return Math.round(rnd(lower, upper))
}

function animate() {
  var ctx = document.getElementById('c').getContext('2d'),
      p;
  console.log('animate()')
  blank(ctx);
  for (var i=0; i < particles.length; i++) {
    p = particles[i];
    p.update();
    p.draw(ctx);
  };
}

function blank(ctx) {
  // Draw a dark gray border.
  ctx.fillStyle = 'rgb(64,64,64)';
  ctx.fillRect(0, 0, c.width, c.height);

  /// Empty middle.
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(BORDER, BORDER, c.width-(BORDER*2), c.height-(BORDER*2))
}

function main () {
  var ctx = document.getElementById('c').getContext('2d'),
      p;
  console.log(ctx);

  blank(ctx);

  // Draw 20 random particles.
  var minWidth = BORDER,
      maxWidth = ctx.canvas.width - BORDER,
      minHeight = BORDER,
      maxHeight = ctx.canvas.height - BORDER;
  for (var i=0; i < 20; i++) {
    p = new Particle(roundRand(minWidth, maxWidth),
                     roundRand(minHeight, maxHeight));
    p.velX = 0.01;
    p.velY = 0.01;
    p.draw(ctx);
    particles.push(p);
  }

  animateIntervalId = setInterval(animate, 250);
}

// Just for the console.
function stop() {
  clearInterval(animateIntervalId);
}

document.body.onload = main;
