var particles = [],
    animateIntervalId,
    NPARTICLES = 5,
    nframes = 0,
    MAX_FRAMES = 200,
    BOUNCE = 0.6, // How much is velocity reduced by on collision?
    DRAG = 0.97,
    GRAVITY = 0.9;

function Particle(ctx, x, y) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;

  // Velocity
  this.velX = 0;
  this.velY = 0;
  
  // Drag
  this.drag = DRAG;
  
  // Gravity
  this.gravity = GRAVITY;

  // Size
  this.size = 10;
  
  // Color
  this.color = 'rgb(255,255,255)';
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

    // And a square in the middle.
    this.ctx.rect(x-(this.size/2), y-(this.size/2), this.size, this.size);
    this.ctx.rect(x-(this.size/4), y-(this.size/4), this.size/2, this.size/2);

    this.ctx.closePath();
    this.ctx.strokeStyle = this.color;
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
  toString: function() {
    return 'Particle(' + this.x + ', ' + this.y + ')';
  },
  update: function() {
    var newX = this.x + this.velX,
        newY = this.y + this.velY;

    // Drag
    this.velX *= this.drag;
    this.velY *= this.drag;
    
    // Gravity
    newY -= this.gravity;

    // Edge collision detection.
    if ((newX + this.size) >= this.maxX()) {
      this.velX *= -BOUNCE;
      newX = this.maxX() - this.size;
    } else if ((newX - this.size) <= this.minX()) {
      this.velX *= -BOUNCE;
      newX = this.minX() + this.size;
    }
    if ((newY + this.size) >= this.maxY()) {
      this.velY *= -BOUNCE;
      newY = this.maxY() - this.size;
    } else if ((newY - this.size) <= this.minY()) {
      this.velY *= -BOUNCE;
      newY = this.minY() + this.size;
    }
    // TODO: particle collision detection.
    this.x = newX;
    this.y = newY;
  }
};

// Just for the console.
function stop() {
  clearInterval(animateIntervalId);
  console.log("Stopping.");
}

function rnd(lower, upper) {
  var maxima = Math.max(upper, lower),
      minima = Math.min(upper, lower),
      value = Math.random() * (maxima - minima);
  return value + minima;
}

function rndColor() {
  function rndByte() {
    return Math.round(rnd(0,255));
  }
  return 'rgb(' + rndByte() + ',' + rndByte() + ',' + rndByte() +')';
}

function blank(ctx) {
  var c = ctx.canvas;

  /// Empty middle.
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, c.width, c.height);
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

function main () {
  var ctx = document.getElementById('c').getContext('2d'),
      p;

  blank(ctx);

  // Draw 20 random particles.
  for (var i=0; i < NPARTICLES; i++) {
    p = new Particle(ctx, 0, 0);
    p.velX = rnd(-10, 10);
    p.velY = rnd(-5, 5);
    p.color = rndColor();
    p.draw(ctx);
    particles.push(p);
  }

  animateIntervalId = setInterval(animate, 100);
}

document.body.onload = main;
