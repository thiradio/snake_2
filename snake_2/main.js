import {
    canvas,
    ctx,
    clearCanvas,
    drawGrid,
    cellSize,
    width,
    height,
    drawCell,
    drawCircile,
} from "./canvas.js";

let score = document.getElementById("score");
let scoreValue = 0;

//Масив змійки
let snake = [
    {
        x: Math.floor(width / 2),
        y: Math.floor(height / 2),
    },
];

const directions = {
    left: {
        x: -1,
        y: 0,
    },
    right: {
        x: 1,
        y: 0,
    },
    up: {
        x: 0,
        y: -1,
    },
    down: {
        x: 0,
        y: 1,
    },
};

let direction = {
    x: 1,
    y: 0,
};

//позиція спавну їжі
let food = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
};

//Функція малювання змійки
function drawSnake() {
    for (let segment of snake) {
        drawCell(segment.x, segment.y);
    }
}

//функція генерації їжі
function generateFood() {
    food.x = Math.floor(Math.random() * width);
    food.y = Math.floor(Math.random() * height);
}

//функція малювання їжі
function drawFood() {
    drawCircile(food.x, food.y, "red");
}

function update() {
    const head = snake[0];
    const newHead = {
        x: (head.x + direction.x + width) % width,
        y: (head.y + direction.y + height) % height,
    };
    snake.unshift(newHead);
    const isEaten = eatFood();
    if (!isEaten) {
        snake.pop();
    }
    collision();
}

function render() {
    clearCanvas();
    drawGrid(cellSize);
    drawSnake();
    drawFood();
}

//функція перевірки чи з'їла змійка їжу
function eatFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        document.getElementById("score").innerHTML = ++scoreValue;
        generateFood();
        return true;
    }
    return false;
}

function collision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert("Game over");
            location.reload();
        }
    }
}

//функція керування змійкою та малювання всіх елементів
function control(event) {
    if (event.key === "ArrowLeft" || event.code == "KeyA") {
        direction = directions.left;
    }
    if (event.key === "ArrowRight" || event.code == "KeyD") {
        direction = directions.right;
    }
    if (event.key === "ArrowUp" || event.code == "KeyW") {
        direction = directions.up;
    }
    if (event.key === "ArrowDown" || event.code == "KeyS") {
        direction = directions.down;
    }
}

//виклик функції керування змійкою
document.addEventListener("keydown", control);

function animate() {
    // animation logic
    update();
    render();
    setTimeout(() => window.requestAnimationFrame(animate), 110);
}

animate();
