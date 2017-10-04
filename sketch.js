
p5.disableFriendlyErrors = true;

var song, fft, button, radius;

//Colors
var dark = color('rgba(11, 10, 10, .65)');
var grey = color('rgba(142, 137, 137, .65)');
var purple = color('rgb(106, 63, 190)');

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

// Need to work on getting a function that loads sound from what is currently being played
function preload() {
    song = loadSound('Atmosphere-Sunshine.mp3');
}

function setup() {

    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('visualizer');

    fft = new p5.FFT();
    fft.smooth(0.95);

    dark = color('rgba(11, 10, 10, .65)');
    grey = color('rgba(142, 137, 137, .65)');
    purple = color('rgb(106, 63, 190)');

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background("rgb(22,25,37)");
    noStroke();

    // // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    var fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 50);

    var spectrum = fft.analyze();

    // scaledSpectrum is a new, smaller array of more meaningful values
    var scaledSpectrum = splitOctaves(spectrum, 3);
    var len = scaledSpectrum.length;

    // Wave 1
    push();
    fill(purple);
    noStroke();
    beginShape();
    curveVertex(0, height);
    for (var i = 0; i < len; i++) {
        var point = smoothPoint(scaledSpectrum, i, 2);
        var x = map(i, 0, len-1, 0, width);
        var y = map(point, 0, 255, height, height*.45);
        curveVertex(x, y);
    }
    curveVertex(width, height);
    endShape(CLOSE);
    pop();

    // Wave 2
    push();
    fill(grey);
    noStroke();
    beginShape();
    curveVertex(0, height);
    for (var i = 0; i < len; i++) {
        var point = smoothPoint(scaledSpectrum, i);
        var x = map(i, 0, len-1, 0, width);
        var y = map(point, 0, 255, height, height*.65);
        curveVertex(x, y);
    }
    curveVertex(width, height);
    endShape(CLOSE);
    pop();

    // Wave 3
    push();
    fill(dark);
    noStroke();
    beginShape();
    curveVertex(0, height);
    for (var i = 0; i < len; i++) {
        var point = smoothPoint(scaledSpectrum, i, 4);
        var x = map(i, 0, len-1, 0, width);
        var y = map(point, 0, 255, height, height*.7);
        curveVertex(x, y);
    }
    curveVertex(width, height);
    endShape(CLOSE);
    pop();

}

/**
 *  Divides an fft array into octaves with each
 *  divided by three, or by a specified "slicesPerOctave".
 *
 *  There are 10 octaves in the range 20 - 20,000 Hz,
 *  so this will result in 10 * slicesPerOctave + 1
 *
 *  @method splitOctaves
 *  @param {Array} spectrum Array of fft.analyze() values
 *  @param {Number} [slicesPerOctave] defaults to thirds
 *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
 *                                 of octaves
 */

function splitOctaves(spectrum, slicesPerOctave) {
    var scaledSpectrum = [];
    var len = spectrum.length;

    // default to thirds
    var n = slicesPerOctave|| 3;
    var nthRootOfTwo = Math.pow(2, 1/n);

    // the last N bins get their own
    var lowestBin = slicesPerOctave;

    var binIndex = len - 1;
    var i = binIndex;


    while (i > lowestBin) {
        var nextBinIndex = round( binIndex/nthRootOfTwo );

        if (nextBinIndex === 1) return;

        var total = 0;
        var numBins = 0;

        // add up all of the values for the frequencies
        for (i = binIndex; i > nextBinIndex; i--) {
            total += spectrum[i];
            numBins++;
        }

        // divide total sum by number of bins
        var energy = total/numBins;
        scaledSpectrum.push(energy);

        // keep the loop going
        binIndex = nextBinIndex;
    }

    // add the lowest bins at the end
    for (var j = i; j > 0; j--) {
        scaledSpectrum.push(spectrum[j]);
    }

    // reverse so that array has same order as original array (low to high frequencies)
    scaledSpectrum.reverse();

    return scaledSpectrum;
}

// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {

    // default to 2 neighbors on either side
    var neighbors = numberOfNeighbors || 2;
    var len = spectrum.length;

    var val = 0;

    // start below the index
    var indexMinusNeighbors = index - neighbors;
    var smoothedPoints = 0;

    for (var i = indexMinusNeighbors; i < (index+neighbors) && i < len; i++) {
        // if there is a point at spectrum[i], tally it
        if (typeof(spectrum[i]) !== 'undefined') {
            val += spectrum[i];
            smoothedPoints++;
        }
    }

    val = val/smoothedPoints;

    return val;
}