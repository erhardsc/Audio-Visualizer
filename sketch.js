
// Member variables
var song, fft, button, wave, wave1, wave2;

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
    var clientHeight = document.getElementById('visualizer').clientHeight;
    var clientWidth = document.getElementById('visualizer').clientWidth;

    console.log("Height" + clientHeight);
    console.log("Width" + clientWidth);


    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('visualizer');


    fft = new p5.FFT(0.9, 64);

    var dark = color('rgba(22, 25, 37, .85)');
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

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0);
    // Generate Waves. Defaults to stacking each element
    wave.show();
    wave1.show();
    wave2.show();

}