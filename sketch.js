var song;
var fft;
var button;
var wave;
var wave1;
var wave2;

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    song = loadSound('Atmosphere-Sunshine.mp3');
}

function setup() {
    createCanvas(256, 256);

    fft = new p5.FFT(0.95, 256);

    var dark = color('rgb(22, 25, 37)');
    var grey = color('rgb(142, 137, 137)');
    var purple = color('rgb(106, 63, 190)');
    var lightPurple = color('rgb(200, 109, 215)');

    wave = new Wave(purple, -10, 50, 1.2);
    wave1 = new Wave(grey, 0, 0, 2);
    wave2 = new Wave(dark, 0, 0, 8);

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
}

function draw() {
    background(0);
    // Generate Waves. Defaults to stacking each element
    wave.show();
    wave1.show();
    wave2.show();

}