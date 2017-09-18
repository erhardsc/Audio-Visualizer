
var song, fft, button, wave, wave1, wave2;
var blob;

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


    fft = new p5.FFT(0.95, 128);

    var dark = color('rgba(22, 25, 37, .85)');
    var grey = color('rgb(142, 137, 137)');
    var purple = color('rgb(106, 63, 190)');
    var lightPurple = color('rgb(200, 109, 215)');

    wave = new Wave(purple, -10, 50, 1.2);
    wave1 = new Wave(grey, 0, 0, 2);
    wave2 = new Wave(dark, 0, 0, 8);

    blob = new Blob(0, 0, 32);

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
    // wave.show();
    // wave1.show();
    // wave2.show();

    //blob.show();

    var spectrum = fft.analyze();


    //translate(width / 2, height * 1.5);
    translate(width / 2, height / 2);

    var radius = 150;
    //var radius = 1000;

    beginShape();
    stroke(255,0,0);
    //fill(255);

    var particles = [];

    for (var a = 0; a < TWO_PI; a += 0.1) {
        particles.push(a);
        //var offset = map(noise(xoff, yoff), 0, 1, -25, 25);
        var r = radius;
        var x = r * cos(a);
        var y = r * sin(a);
        //vertex(x, y);
        ellipse(x, y, 4, 4);
    }
    endShape();

    var particle;

    for (particle in particles){
        fill(255);
    }






    // beginShape();
    // stroke(255,0,0);
    //
    // for (var a = 0; a < width; a += 32) {
    //
    //     var x = a;
    //
    //     for (var i = 0; i < spectrum.length; i++) {
    //
    //         var amp = spectrum[i];
    //         var y = map(amp, 0, 256, height / 2, 50);
    //
    //
    //
    //     }
    //
    //     //vertex(x, y);
    //     //console.log(x);
    //
    //     ellipse(x, y, 4, 4);
    // }
    // endShape();

    // var waveform = fft.waveform('sine');
    // noFill();
    // beginShape();
    // stroke(255,0,0); // waveform is red
    // strokeWeight(10);
    // for (var i = 0; i< waveform.length; i++){
    //     var x = map(i, 0, waveform.length, 0, width);
    //     var y = map( waveform[i], -1, 1, 0, height);
    //     vertex(x,y);
    // }
    // endShape();


}