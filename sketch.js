
p5.disableFriendlyErrors = true;

var song, fft, button, radius;

var ctx;

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

    var dark = color('rgba(11, 10, 10, .65)');
    var grey = color('rgba(142, 137, 137, .65)');
    var purple = color('rgb(106, 63, 190)');

    wave = new CurveWave(purple, 4);
    wave2 = new CurveWave(grey, 3);
    wave3 = new CurveWave(dark, 2);

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function amplitude(){
    var spectrum = fft.analyze();

    for (var i = 0; i < spectrum.length; i++) {
        // Peak 1
        var peak1_leftControlX = map(spectrum[i], 0, 256, width*.15, width*.2);
        var peak1_leftControlY = map(spectrum[i], 0, 256, height*.45, height*.25);
        var peak1_anchorX = map(spectrum[i], 0, 256, width*.35, width*.4);
        var peak1_anchorY = map(spectrum[i], 0, 256, height*.85, height*.9);

        // Peak 2
        var peak2_leftControlX = map(spectrum[i], 0, 256, width*.55, width*.63);
        var peak2_leftControlY = map(spectrum[i], 0, 256, height*.75, height*.55);
        var peak2_anchorX = map(spectrum[i], 0, 256, width*.8, width*.75);
        var peak2_anchorY = map(spectrum[i], 0, 256, height*.8, height*.85);

        // Peak 3
        var peak3_leftControlX = map(spectrum[i], 0, 256, width*.92, width*.98);
        var peak3_leftControlY = map(spectrum[i], 0, 256, height*.58, height*.38);

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
    //background(255);
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    var fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 50);

    var dark = color('rgba(11, 10, 10, .65)');
    var grey = color('rgba(142, 137, 137, .65)');
    var purple = color('rgb(106, 63, 190)');

    noStroke();

    fill(purple);
    //Set gradient color scheme
    // var gradient = ctx.createRadialGradient(width, width, width, width, height, 0);
    // gradient.addColorStop(0, "rgb(48, 35, 174)");
    // gradient.addColorStop(1, "rgb(200,109,215)");
    // ctx.fillStyle = gradient;

    beginShape();
    vertex(10,height *.98);
    vertex(10,height * .8);
    bezierVertex(amplitude()[0],amplitude()[1] -100,  width*.25,height*.85,  amplitude()[2],amplitude()[3]); //Peak-1
    bezierVertex(width*.55,height*.86,  amplitude()[4],amplitude()[5] - 200,  amplitude()[6],amplitude()[7]); //Peak-2
    bezierVertex(width*.86,amplitude()[6],  amplitude()[8] - 100,amplitude()[9] -200,  width*.98,height*.7); //Peak-3
    vertex(width * .98,height *.98);
    endShape();

    fill(grey);
    beginShape();
    vertex(10,height *.98);
    vertex(10,height * .8);
    bezierVertex(amplitude()[0],amplitude()[1] - 150,  width*.25,height*.85,  amplitude()[2],amplitude()[3]); //Peak-1
    bezierVertex(width*.55,height*.86,  amplitude()[4],amplitude()[5] - 100,  amplitude()[6],amplitude()[7]); //Peak-2
    bezierVertex(width*.86,amplitude()[6],  amplitude()[8],amplitude()[9] - 100,  width*.98,height*.7); //Peak-3
    vertex(width * .98,height *.98);
    endShape();

    fill(dark);
    beginShape();
    vertex(10,height *.98);
    vertex(10,height * .8);
    bezierVertex(amplitude()[0],amplitude()[1],  width*.25,height*.85,  amplitude()[2],amplitude()[3]); //Peak-1
    bezierVertex(width*.55,height*.86,  amplitude()[4],amplitude()[5],  amplitude()[6],amplitude()[7]); //Peak-2
    bezierVertex(width*.86,amplitude()[6],  amplitude()[8],amplitude()[9],  width*.98,height*.7); //Peak-3
    vertex(width * .98,height *.98);
    endShape();


}