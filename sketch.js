
var song, fft, button, radius;

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
        var frequency = spectrum[i];
        var ampX = map(frequency, 0, 256, 400, 0);
        var ampY = map(frequency, 0, 256, 200, 300);
        var ampW = map(frequency, 0, 256, 200, 300);
        var ampZ = map(frequency, 0, 256, 400, 200);


        return [ampX, ampY, ampZ];
    }
}

function draw() {
    background(255);
    // Generate Waves. Defaults to stacking each element
    // wave.show();
    // wave2.show();
    //
    // wave3.show();


    // stroke(0);
    // // fill(0);
    //
    // strokeWeight(4);
    // /*1*/point(100, amplitude());
    // /*1*/point(100, 50);
    //
    // /*2*/point(250, 60);
    //
    // /*3*/point(300, 60);
    //
    // /*4*/point(400, 60);
    // /*4*/point(300, 200);
    // strokeWeight(1);
    //
    //
    //
    // beginShape();
    // /*1*/curveVertex(100, amplitude());
    // /*1*/curveVertex(100, 50);
    //
    // /*2*/curveVertex(250, 60);
    //
    // /*3*/curveVertex(300, 60);
    // /*3*/curveVertex(300, 60);
    //
    // /*4*/curveVertex(400, 60);
    //
    // /*5*/curveVertex(300, amplitude() / 2);
    // /*5*/curveVertex(300, 200);
    // endShape();
    translate(width /2, height /2);
    beginShape();
    vertex(493, 396);
    vertex(10, 398);
    vertex(10, 300);
    bezierVertex(amplitude()[0], 0, amplitude()[2], amplitude()[1], 493, 300);
    endShape()

}