class Population {
    constructor(size) {
        this.size = size;
        this.population = [];
        this.savedAgents = [];

        for(let i = 0; i<this.size; i++) {
            this.population.push(new Agent(20))
        }
    }

    show() {
        for(let agent of this.population) {
            agent.show();
        }
    }

    checkCollisions() {
        for(let j = this.population.length - 1; j >= 0; j--) {
            if(this.population[j].checkCollisions()) {
                this.savedAgents.push(this.population.splice(j,1)[0])
            }
        }
    }

    nextGeneration() {

        this.calculateFitness()

        for(let i = 0; i<this.size; i++) {
            this.population[i] = this.pickOne();
        }

        for(let wall of walls) {
            wall.width = random(0, 450);
            wall.height = 10;
    
            wall.x = 0;
            wall.y = 0; // Adjust the spawn point as needed
        }

        this.savedAgents = [];
    }


    pickOne() {
        var index = 0;
        var r = random(1);

        while(r > 0) {
            r = r - this.savedAgents[index].fitness;
            index++;
        }
        index--;

        let agent = this.savedAgents[index];
        let child = new Agent(20,agent.brain)
        child.mutate();
        return child;

    }

    

    calculateFitness() {
        // let distance = Math.abs((wall.x + wall.spacing/2 + wall.width) - this.x) + 0.01

        let sum = 0;
        for(let agent of this.savedAgents) {
            sum += agent.score;
        }

        for (let agent of this.savedAgents) {
            agent.fitness = (agent.score) / sum; 
        }
        
    }
}