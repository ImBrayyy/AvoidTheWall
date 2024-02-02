let bob;


let walls = []
let wallCount = 1;
let wall;

let generation = 0;


let population; 

function setup() {
    let canvas = createCanvas(500,700)
    canvas.parent('canvasContainer')

    for (let i = 0; i < wallCount; i++) {
        // Ensure walls are within the canvas boundaries
        const x = random(width - 150); // Adjust the width of the walls as needed
        const y = random(height);
        const w = random(50, 400);
        const h = 10;
        wall = new Obstacle(x, y, w, h)
        walls.push(wall);
    }

    population = new Population(200);

}



function draw() {
    background(0);

   
    for(let i = 0; i<population.population.length; i++) {
        population.population[i].update();
        population.population[i].think();
    }

    for(let i = 0; i<wallCount; i++) {
        walls[i].show();
        walls[i].update();
    }

    if(population.population.length == 0) {
        population.nextGeneration();
        generation++
    }

    population.show();
    population.checkCollisions();



    document.getElementById("populationCount").innerText = `Number of Agents Alive: ${population.population.length}`
    document.getElementById("generation").innerText = `Generation: ${generation}`


}


document.addEventListener('keydown', (e) => {
    if(e.key == 'ArrowLeft') {
        bob.moveLeft()
    }
    if (e.key == 'ArrowRight') {
        bob.applyForce(createVector(bob.movementSpeed, 0));
    }
    
})