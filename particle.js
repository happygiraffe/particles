var particles = [],
    animateIntervalId,
    NPARTICLES = 5,
    nframes = 0,
    MAX_FRAMES = 100,
    BOUNCE = 0.6; // How much is velocity reduced by on collision?

function Particle(ctx, x, y) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;

  // Velocity
  this.velX = 0;
  this.velY = 0;

  // Size
  this.size = 10;
}

Particle.prototype = {
  draw: function() {
    // TODO: see if I can use the builtin canvas translate() instead.
    var x = this.translatedX(),
        y = this.translatedY();
    this.ctx.save();
    this.ctx.beginPath();
    // A full circle.
    this.ctx.arc(x, y, this.size, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.strokeStyle = 'rgb(255,255,255)';
    this.ctx.stroke();
    this.ctx.restore();
  },
  minX: function() {
    return -(this.ctx.canvas.width / 2);
  },
  maxX: function() {
    return this.ctx.canvas.width / 2;
  },
  minY: function() {
    return -(this.ctx.canvas.height / 2);
  },
  maxY: function() {
    return this.ctx.canvas.height / 2;
  },
  // Place the centre in the middle of the canvas.
  translatedX: function() {
    return this.x + (this.ctx.canvas.width / 2);
  },
  // Place the centre in the middle of the canvas, *and upside down.*
  translatedY: function() {
    return (this.ctx.canvas.height / 2) - this.y;
  },
  update: function() {
    var newX = Math.round(this.x + (this.x * this.velX)),
        newY = Math.round(this.y + (this.y * this.velY));
    // Collision detection.
    if ((newX + this.size) >= this.maxX()) {
      this.velX *= -BOUNCE;
      newX = this.maxX() - this.size;
    } else if ((newX - this.size) <= this.minX()) {
      this.velX *= -BOUNCE;
      newx = this.minX() + this.size;
    }
    if ((newY + this.size) >= this.maxY()) {
      this.velY *= -BOUNCE;
      newY = this.maxY() - this.size;
    } else if ((newY - this.size) <= this.minY()) {
      this.velY *= -BOUNCE;
      newY = this.minY() + this.size;
    }
    this.x = newX;
    this.y = newY;
  }
};

function rnd(lower, upper) {
  var maxima = Math.max(upper, lower),
      minima = Math.min(upper, lower),
      value = Math.random() * (maxima - minima);
  return value + minima;
}

function roundRand(lower, upper) {
  return Math.round(rnd(lower, upper));
}

function animate() {
  var ctx = document.getElementById('c').getContext('2d'),
      p;
  console.log('animate()');
  blank(ctx);
  for (var i=0; i < particles.length; i++) {
    p = particles[i];
    p.update();
    p.draw();
  }
  nframes += 1;
  if (nframes >= MAX_FRAMES) {
    stop();
  }
}

function blank(ctx) {
  var c = ctx.canvas;

  /// Empty middle.
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, c.width, c.height);
}

function main () {
  var ctx = document.getElementById('c').getContext('2d'),
      p;

  blank(ctx);

  // Draw 20 random particles.
  var minWidth = -(ctx.canvas.width/2),
      maxWidth = (ctx.canvas.width/2),
      minHeight = -(ctx.canvas.height/2),
      maxHeight = (ctx.canvas.height/2);
  for (var i=0; i < NPARTICLES; i++) {
    p = new Particle(ctx,
                     roundRand(minWidth, maxWidth),
                     roundRand(minHeight, maxHeight));
    p.velX = rnd(0.01, 0.05);
    p.velY = rnd(0.01, 0.05);
    p.draw(ctx);
    particles.push(p);
  }

  animateIntervalId = setInterval(animate, 250);
}

// Just for the console.
function stop() {
  clearInterval(animateIntervalId);
  console.log("Stopping.");
}

document.body.onload = main;
