
p5.disableFriendlyErrors = true;

var song, fft, button, radius;

var ctx;

var peakDetect;

var wave;
var wave2;
var wave3;

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

    ctx = myCanvas.drawingContext;

    fft = new p5.FFT();
    fft.smooth(0.95);
    peakDetect = new p5.PeakDetect();

    var dark = color('rgba(11, 10, 10, .65)');
    var grey = color('rgba(142, 137, 137, .65)');
    var purple = color('rgb(106, 63, 190)');

    // wave = new CurveWave(purple, 4);
    // wave2 = new CurveWave(grey, 3);
    // wave3 = new CurveWave(dark, 2);

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function amplitude(){
    var spectrum = fft.analyze();
    peakDetect.update(fft);
    //console.log(fft.getEnergy(200, 250));


    for (var i = 0; i < spectrum.length; i++) {

        if ( fft.getEnergy(150, 250) ) {
            // Peak 1
            var peak1_leftControlX = map(spectrum[i], 0, 256, width * .15, width * .2);
            var peak1_leftControlY = map(spectrum[i], 0, 256, height * .45, height * .25);
            var peak1_anchorX = map(spectrum[i], 0, 256, width * .35, width * .4);
            var peak1_anchorY = map(spectrum[i], 0, 256, height * .85, height * .9);
        }

            // Peak 2
            var peak2_leftControlX = map(spectrum[i], 0, 256, width * .55, width * .63);
            var peak2_leftControlY = map(spectrum[i], 0, 256, height * .75, height * .55);
            var peak2_anchorX = map(spectrum[i], 0, 256, width * .8, width * .78);
            var peak2_anchorY = map(spectrum[i], 0, 256, height * .8, height * .82);

            // Peak 3
            var peak3_leftControlX = map(spectrum[i], 0, 256, width * .92, width * .98);
            var peak3_leftControlY = map(spectrum[i], 0, 256, height * .58, height * .38);


        return [peak1_leftControlX, //0
                peak1_leftControlY, //1
                peak1_anchorX, //2
                peak1_anchorY, //3

                peak2_leftControlX, //4
                peak2_leftControlY, //5
                peak2_anchorX, //6
                peak2_anchorY, //7

                peak3_leftControlX, //8
                peak3_leftControlY]; //9
    }
}

function draw() {
    background("rgb(22,25,37)");
    // //background(255);
    // // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    var fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 50);
    //
    var dark = color('rgba(11, 10, 10, .65)');
    var grey = color('rgba(142, 137, 137, .65)');
    var purple = color('rgb(106, 63, 190)');
    //
    noStroke();
    //
    // fill(purple);
    // //Set gradient color scheme
    // // var gradient = ctx.createRadialGradient(width, width, width, width, height, 0);
    // // gradient.addColorStop(0, "rgb(48, 35, 174)");
    // // gradient.addColorStop(1, "rgb(200,109,215)");
    // // ctx.fillStyle = gradient;
    // beginShape();
    // vertex(0,height);
    // vertex(0,height * .8);
    // bezierVertex(amplitude()[0],amplitude()[1] -100,  width*.25,height*.85,  amplitude()[2],amplitude()[3]); //Peak-1
    // bezierVertex(width*.55,height*.86,  amplitude()[4],amplitude()[5] - 200,  amplitude()[6],amplitude()[7]); //Peak-2
    // bezierVertex(width*.86,amplitude()[7],  amplitude()[8] - 100,amplitude()[9] -200,  width,height*.7); //Peak-3
    // vertex(width,height);
    // endShape();
    var spectrum = fft.analyze();
    var newBuffer = [];

    // scaledSpectrum is a new, smaller array of more meaningful values
    var scaledSpectrum = splitOctaves(spectrum, 3);
    var len = scaledSpectrum.length;
    push();
    fill(purple);
    // draw shape
    beginShape();

    // one at the far corner
    curveVertex(0, height);

    for (var i = 0; i < len; i++) {
        var point = smoothPoint(scaledSpectrum, i, 2);
        var x = map(i, 0, len-1, 0, width);
        var y = map(point, 0, 255, height, height*.45);
        curveVertex(x, y);
    }

    // one last point at the end
    curveVertex(width, height);

    endShape(CLOSE);

    pop();
    push();
    fill(grey);
    // draw shape
    beginShape();

    // one at the far corner
    curveVertex(0, height);

    for (var i = 0; i < len; i++) {
        var point = smoothPoint(scaledSpectrum, i, 3);
        var x = map(i, 0, len-1, 0, width);
        var y = map(point, 0, 255, height, height*.65);
        curveVertex(x, y);
    }

    // one last point at the end
    curveVertex(width, height);

    endShape(CLOSE);
    pop();

    push();
    fill(dark);
    // draw shape
    beginShape();

    // one at the far corner
    curveVertex(0, height);

    for (var i = 0; i < len; i++) {
        var point = smoothPoint(scaledSpectrum, i, 5);
        var x = map(i, 0, len-1, 0, width);
        var y = map(point, 0, 255, height, height*.7);
        curveVertex(x, y);
    }

    // one last point at the end
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