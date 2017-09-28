
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

    fft = new p5.FFT(0.95, 64);

    var dark = color('rgba(22, 25, 37, .85)');
    var grey = color('rgb(142, 137, 137)');
    var purple = color('rgb(106, 63, 190)');
    var lightPurple = color('rgb(200, 109, 215)');

    wave = new CurveWave(purple, 1.2);
    wave2 = new CurveWave(grey, 2);
    wave3 = new CurveWave(dark, 4);

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0);
    // Generate Waves. Defaults to stacking each element

    wave.show();
    wave2.show();
    wave3.show();

}