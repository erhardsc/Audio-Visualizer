
var song, fft, button, radius;

var clientHeight;
var clientWidth;

var wave;

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

    // Variable for adding the visualizer to the div #visualizer in the DOM
    clientHeight = document.getElementById('visualizer').clientHeight;
    clientWidth = document.getElementById('visualizer').clientWidth;

    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('visualizer');

    // Mobile responsiveness. Does not work on Windows Phone 7.8 and 8. Sorry Windows
    if (isMobileDevice()) {
        radius = 1000;
    } else {
        radius = constrain(window.innerWidth, 500, 700);
    }

    fft = new p5.FFT(0.95, 32);

    var dark = color('rgba(22, 25, 37, .85)');
    var grey = color('rgb(142, 137, 137)');
    var purple = color('rgb(106, 63, 190)');
    var lightPurple = color('rgb(200, 109, 215)');

    var xpos = window.innerWidth / 2;
    var ypos = window.innerHeight * 1.5;

    wave = new ParticleWave(xpos, ypos, radius, 2, 255);

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0);
    // Generate Waves. Defaults to stacking each element
    wave.show();
    // wave1.show();
    // wave2.show();

}