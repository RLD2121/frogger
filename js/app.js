//Array to push all enemies in
var allEnemies = [];

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 65;
    this.speed = Math.random() * 300 + 100; 
    this.sprite = 'images/enemy-bug.png';

};

//Function to use to randomize enemy position 
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    if (this.x > 505) {
        this.x = getRandomArbitrary(-1000,-100);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//    Draw Box used to fine tune collision box 
//    drawBox(this.x, this.y + 77, 100, 65, "red");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    
    this.x = x;
    this.y = y;
    this.width = 5
    this.height = 79;
    this.speed = 100;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lives = 3;
    this.heart = 'images/Heart.png';
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


//Pushing each enemy to the allEnemies array
allEnemies.push(new Enemy(0,220));
allEnemies.push(new Enemy(-300,140));
allEnemies.push(new Enemy(-80,50));
allEnemies.push(new Enemy(-200,220));
allEnemies.push(new Enemy(-150, 140));
allEnemies.push(new Enemy(-300,50));

var player = new Player(200,400);

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.checkCollision();
    
    //Code for keeping player within the map and tracking scoreboard
    if (this.x > 400){
        this.x = 400;
    } else if (this.x < 0){
        this.x = 0;
    }  else if (this.y > 400){
        this.y = 400;
    }  else if (this.y == -50) {
        this.score ++;
        this.reset();
    }  
};

//Collision Box
Player.prototype.checkCollision = function (){
    for (var i = 0; i < allEnemies.length; i++){
        if ((player.x + 16) < allEnemies[i].x + allEnemies[i].width &&
           (player.x + 16) + (player.width + 63) > allEnemies[i].x &&
           (player.y + 63) < (allEnemies[i].y + 77) + allEnemies[i].height &&
           player.height + (player.y + 63)> (allEnemies[i].y + 77)) {
            
           console.log("Collision Detected!");
           this.lives --;
           this.reset();
        }
        
    }
}

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//    Draw Box used to fine tune collision box    
//    drawBox(this.x + 16, this.y + 63, 70, 79, "blue"); 
    
//Code below for creation of hearts
    var x = 0; 
    for (var i = 0; i < this.lives; i++) {
    ctx.drawImage(Resources.get(this.heart), x, 0, 40,60);
    x = x + 40;
  }
    
//Action for when the player runs out of lives
    if(this.lives < 0){
        ctx.drawImage(Resources.get('images/gameOver.png'), 0, 0, 505,606);
    }
};

//Player movement
Player.prototype.handleInput = function (direction){
    switch(direction) {
        case 'left':
            this.x -= 100;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'up':
            this.y -= 90;
            break;
        case 'down':
            this.y += 90;
            break;
                    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//drawBox used to fine tune collision box
//function drawBox(x, y, width, height, color) {
//    ctx.beginPath();
//    ctx.rect(x, y, width, height);
//    ctx.lineWidth = 2;
//    ctx.strokeStyle = color;
//    ctx.stroke();
//};
