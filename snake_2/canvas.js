export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const cellSize = 20;
export const width = canvas.width / cellSize;
export const height = canvas.height / cellSize;

export function drawGrid(cellSize) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
}

export function drawCell(x, y, color = "aqua") {
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

export function drawCircile(x, y, color = "green") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
        x * cellSize + cellSize / 2,
        y * cellSize + cellSize / 2,
        cellSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
}
