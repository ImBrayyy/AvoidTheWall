class Obstacle {
    constructor() {
        this.x = 0;
        this.y = random(300);
        this.width = random(0, 450);
        this.height = 10;
        this.speed = 15; 
        this.spacing = 60;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.width, this.height);
        rect(this.x + this.spacing + this.width, this.y, width - (this.x + this.spacing + this.width), this.height);
    }
    

    update() {
        this.y += this.speed;
    
        // If the obstacle is below the visible area, reset its position
        if (this.y > height + this.height / 2) {
            this.width = random(0, 450);
            this.height = 10;
    
            this.x = 0;
            this.y = 0; // Adjust the spawn point as needed

            for (let agent of population.population) {
                agent.score += 300;
            }            
        }
    }
    
}
