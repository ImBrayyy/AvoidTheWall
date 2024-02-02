class Agent {
    constructor(radius, brain) {
        this.pos = createVector(random(width), height - 20);
        this.radius = radius;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxVelocity = 12;
        this.movementSpeed = 10;

        this.dead = false;

        this.score = 0;
        this.fitness = 0;
    

        if(brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(4,6,2);
        }
        
    }

    think() {
        let inputs = [];
    
       
        // Calculate gap information dynamically
        let gapStart = walls[0].x + walls[0].width;
        let gapEnd = walls[0].x + walls[0].width + walls[0].spacing;

        inputs[0] = this.pos.x / width;
        inputs[1] = gapStart / width;
        inputs[2] = gapEnd / width;
        inputs[3] = (walls[0].height - this.pos.y) / height;

 
    
        let output = this.brain.predict(inputs);
    
        if (output[0] > output[1]) {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }
    

    show() {
        stroke(255, 255, 255);
        fill(255, 255, 255, 0.5 * 255); // Use highlightColor if available
        ellipse(this.pos.x, this.pos.y, this.radius);
    }

    update() {
        if(this.dead) { return }

        this.score ++ 

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.pos.add(this.velocity);
        this.acceleration.mult(0);

        this.handleWallCollisions();


    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    handleWallCollisions() {
        // Left wall collision
        if (this.pos.x - this.radius / 2 < 0) {
            this.pos.x = this.radius / 2;
            this.velocity.x = 0;
        }

        // Right wall collision
        if (this.pos.x + this.radius / 2 > width) {
            this.pos.x = width - this.radius / 2;
            this.velocity.x = 0;
        }
    }

    moveLeft() {
        this.applyForce(createVector(-this.movementSpeed, 0));
    }

    moveRight() { 
        this.applyForce(createVector(this.movementSpeed, 0))
    }

    checkCollisions() {
        for (let wall of walls) {
            // Check if the agent collides with either part of the wall
            if (
                // Check collision with the first rectangle
                (
                    (this.pos.x + this.radius / 2 > wall.x && this.pos.x - this.radius / 2 < wall.x + wall.width) &&
                    (this.pos.y + this.radius / 2 > wall.y && this.pos.y - this.radius / 2 < wall.y + wall.height)
                ) ||
                // Check collision with the second rectangle
                (
                    (this.pos.x + this.radius / 2 > wall.x + wall.spacing + wall.width) &&
                    (this.pos.x - this.radius / 2 < width) &&
                    (this.pos.y + this.radius / 2 > wall.y && this.pos.y - this.radius / 2 < wall.y + wall.height)
                )
            ) {
                return true; // Collision detected
            }
        }
        return false; // No collision detected
    }
    
    
    
    
       

    mutate() {
        this.brain.mutate(0.1);
    }

}

