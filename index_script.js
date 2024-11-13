function updateViewportText() {
    const viewportInfoElement = document.getElementById("viewport-info");
    const horizontalLines = document.getElementsByClassName("hz-line-text");
    const verticallLines = document.getElementsByClassName("vc-line-text");
    
    viewportInfoElement.innerText = window.innerWidth + "x" + window.innerHeight;
    for (let lineDiv of horizontalLines) lineDiv.innerHTML = window.innerWidth + "px";
    for (let lineDiv of verticallLines) lineDiv.innerText = window.innerHeight + "px";
    
}

function randomGrayColor(threshold, grayLimit) {
    const randomVal = Math.floor(Math.random() * (256 - grayLimit)) + grayLimit;
    const hexValue = randomVal.toString(16).padStart(2, '0');

    const color1 = `#${hexValue}${hexValue}${hexValue}`, color2 = "white";
    return Math.random() < threshold ? color1 : color2;
}

function randomPixelColor(opacity) {
    const threshold = 0.75, max = 256 * threshold;
    const r = max + Math.floor(Math.random() * max);
    const g = max + Math.floor(Math.random() * max);
    const b = max + Math.floor(Math.random() * max);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function generatePixel(pixelSize, trailColor) {
    const threshold = 1, grayLimit = 200, whiteLimit = 0.5, mouseOutDelay = 200;
    const pixel = document.createElement('div');

    pixel.classList.add('pixel');
    pixel.style.width = pixelSize;
    pixel.style.height = pixelSize;
    pixel.style.backgroundColor = Math.random() < whiteLimit ? randomPixelColor(1) : randomGrayColor(threshold, grayLimit);
    
    pixel.addEventListener('mouseover', () => {
        pixel.style.backgroundColor = '#ffce54';
        
    });
    pixel.addEventListener('mouseout', () => {
        setTimeout(() => {
            pixel.style.backgroundColor = '#ffebba';
        }, mouseOutDelay);

        setTimeout(() => {
            pixel.style.backgroundColor = randomPixelColor(1);
        }, mouseOutDelay * 5);
    });

    return pixel;
}

let timeout;

function fadeToTransparent() {
    const duration = 0.75;
    const body = document.getElementById("body");
    clearTimeout(timeout);

    const mainTitle = document.getElementById("main-title");
    const viewportDiv = document.getElementById("viewport-div");
    const gridBackground = document.getElementById("grid");
    const dashedLines = document.getElementsByClassName("line-div");

    timeout = setTimeout(() => {
        body.style.backgroundColor = 'var(--secondary)';
        mainTitle.style.opacity = '0.3';
        viewportDiv.style.opacity = '0';
        gridBackground.style.opacity = '1';
        for (let lineDiv of dashedLines) lineDiv.style.opacity = '0';
    }, 0);
}

function pageTransition(id) {
    let redirect;
    const middle = document.getElementById("middle");
    const middleBox = document.getElementsByClassName("middle-box");

    switch (id) {
        case 1:
            redirect = "about_me"
            break;
    
        case 2:
            redirect = "projects"
            break;
    
        case 3:
            redirect = "notes"
            break;
    
        case 4:
            redirect = "resources"
            break;
    
        default:
            redirect = "index"
            break;
    }

    for (let opt of middleBox) {
        opt.style.pointerEvents = 'none';
        opt.style.opacity = '0';
    }

    setTimeout(() => {
        middle.style.transitionDuration = '1s';
        middle.style.transitionTimingFunction = "cubic-bezier(.9,0,.5,1)";
        middle.style.scale = 150 * Math.floor(Math.max(screen.width, screen.height) / 300) + "%";

        setTimeout(() => {
            window.location.href = redirect + ".html";
            middle.style.scale = "100%";
            
            setTimeout(() => {
                for (let opt of middleBox) {
                    opt.style.pointerEvents = 'fill';
                    opt.style.opacity = '1';
                }
            }, 1000);
        }, 800);
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const renderGrid = true;

    updateViewportText();
    fadeToTransparent();
    
    const pixelSize = 12, gridGap = 0, trailColor = 'rgb(128, 128, 128)';
    const grid = document.getElementById('grid');
    const gridWidth = Math.floor(screen.width / pixelSize) + 1;
    const gridHeight = Math.floor(screen.height / pixelSize) + 1;

    grid.style.gap = `${gridGap}px`;
    grid.style.gridTemplateColumns = `repeat(${gridWidth}, ${pixelSize}px)`;
    grid.style.gridTemplateRows = `repeat(${gridHeight}, ${pixelSize}px)`;
    
    for (let i = 0; renderGrid && i < gridWidth * gridHeight; i++) {
        grid.appendChild(generatePixel(pixelSize, trailColor));
    }

    window.addEventListener('resize', () => {
        updateViewportText();
        fadeToTransparent();
    });
});
