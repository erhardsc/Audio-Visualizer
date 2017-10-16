
p5.disableFriendlyErrors = true;

let song, fft;

//Colors
let dark;
let grey;
let purple;

let waves = [];

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

    let myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('visualizer');

    fft = new p5.FFT();
    fft.smooth(0.95);

    dark = color('rgba(11, 10, 10, .65)');
    grey = color('rgba(142, 137, 137, .65)');
    purple = color('rgb(106, 63, 190)');


    song.play();
}

// Should be replaces with a function that detects how many songs are playing in the visualizer
function mousePressed() {

    let wave;

    if (waves.length == 0){
        wave = new Wave(purple, .45);
        waves.push(wave);
    } else if (waves.length == 1){
        wave = new Wave(grey, .65);
        waves.push(wave);
    } else if (waves.length == 2) {
        wave = new Wave(dark, .75);
        waves.push(wave);
    } else if (waves.length == 3) {
        wave = new Wave(purple, .85);
        waves.push(wave);
    } else if (waves.length == 4) { // allow a max of 5 waves
        wave = new Wave(dark, .95);
        waves.push(wave);
    }

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background("rgb(22,25,37)");
    noStroke();

    // // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    let fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 50);

    // There can only be a total of 5 visualizers
    for (let i = 0; i < waves.length; i++){
        waves[i].show();
    }

}

function playerVisualizer() {
    push();

    stroke(255);
    line(0, height / 2, width, height /2);

    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255);
    strokeWeight(1);
    for (let i = 0; i< waveform.length; i++){
        let x = map(i, 0, waveform.length, 0, width);
        let y = map( waveform[i], -1, 1, 0, height);
        vertex(x,y);
    }
    endShape();

    pop();
}