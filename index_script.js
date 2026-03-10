function updateViewportText() {
    const viewportInfoElement = document.getElementById("viewport-info");
    const verticallTextLabel = document.getElementById("vc-line-text");
    const horizontalTextLabel = document.getElementById("hz-line-text");
    
    viewportInfoElement.innerText = window.innerWidth + "x" + window.innerHeight;
    horizontalTextLabel.innerText = window.innerWidth + "px";
    verticallTextLabel.innerText = window.innerHeight + "px";
}

function setElementsOpacity(mainTitleOpacity, viewportOpacity, linesOpacity, gridOpacity) {
    const mainTitle = document.getElementById("main-title");
    const viewportDiv = document.getElementById("viewport-div");
    const dashedLines = document.getElementsByClassName("line-div");
    const grid = document.getElementById("grid");

    mainTitle.style.setProperty("--main-title-opacity", String(mainTitleOpacity));
    viewportDiv.style.opacity = String(viewportOpacity);
    for (let lineDiv of dashedLines) {
        lineDiv.style.opacity = String(linesOpacity);
    }
    grid.style.opacity = String(gridOpacity);
}

function fadeToTransparent() {
    clearTimeout(fadeTimeout);

    fadeTimeout = setTimeout(() => {
        setElementsOpacity(0.3, 0, 0, 1);
        // generateGrid();
    }, 1000);
}

let fadeTimeout, resizeTimeout;

function refadeOnResize() {
    clearTimeout(fadeTimeout);
    clearTimeout(resizeTimeout);

    setElementsOpacity(1, 1, 0.5, 0);

    resizeTimeout = setTimeout(() => {
        fadeToTransparent();
        // generateGrid();
    }, 500);
}

function randomGrayColor() {
    const randomVal = Math.random();
    const threshold = 1, grayLimit = 240;

    const randomThreshold = Math.floor(randomVal * (256 - grayLimit)) + grayLimit;
    const hexValue = randomThreshold.toString(16).padStart(2, '0');

    const color1 = `#${hexValue}${hexValue}${hexValue}`, color2 = "white";
    return randomVal < threshold ? color1 : color2;
}

function generatePixel(pixelSize) {
    const pixel = document.createElement('div');

    pixel.classList.add('pixel');
    pixel.style.width = `${pixelSize}px`;
    pixel.style.height = `${pixelSize}px`;
    pixel.style.backgroundColor = randomGrayColor();
    pixel.style.animationDelay = `${Math.random() * 1000}ms`;

    return pixel;
}

let lastScreenW = 0, lastScreenH = 0;

function generateGrid() {
    if (screen.width === lastScreenW && screen.height === lastScreenH) return;
    lastScreenW = screen.width;
    lastScreenH = screen.height;

    const pixelSize = 12;
    const grid = document.getElementById('grid');
    const gridWidth = Math.floor(screen.width / pixelSize) + 1;
    const gridHeight = Math.floor(screen.height / pixelSize) + 1;

    grid.style.gridTemplateColumns = `repeat(${gridWidth}, ${pixelSize}px)`;
    grid.style.gridTemplateRows = `repeat(${gridHeight}, ${pixelSize}px)`;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        fragment.appendChild(generatePixel(`${pixelSize}px`));
    }

    grid.innerHTML = '';
    grid.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', function() {
    updateViewportText();
    fadeToTransparent();

    window.addEventListener('resize', () => {
        updateViewportText();
        refadeOnResize();
    });
});
