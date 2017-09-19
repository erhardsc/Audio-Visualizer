
var song, fft, button, wave, wave1, wave2, radius;

var blob;

var physics;
var clientHeight;
var clientWidth;

// Create dynamic array of particles & Springs
var particles = [];
var springs = [];



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

    console.log("div Height: " + clientHeight);
    console.log("div Width: " + clientWidth);
    console.log("P5 Width: " + width);
    console.log("P5 Height: " + height);
    console.log("Window Height: " + window.innerHeight);
    console.log("Window Width: " + window.innerWidth);


    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
    myCanvas.parent('visualizer');

    // Mobile responsiveness. Does not work on Windows Phone 7.8 and 8. Sorry Windows
    if (isMobileDevice()) {
        radius = 1000;
    } else {
        radius = constrain(window.innerWidth, 500, 700);
    }


    fft = new p5.FFT(0.95, 32);
    //physics = new VerletPhysics2D;

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

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

//Add spring physics to each particle
function springPhysics(){

    for (particle in particles){
        fill(255);
    }
}

function draw() {
    background(0);
    // Generate Waves. Defaults to stacking each element
    // wave.show();
    // wave1.show();
    // wave2.show();

    //blob.show();

    var spectrum = fft.analyze();

    translate(window.innerWidth / 2, window.innerHeight * 1.5);
    //translate(width / 2, height / 2);

    beginShape();
    stroke(255,0,0);

    for (var a = PI; a < TWO_PI; a += 0.1) {
        //particles.push(a); // Populate array

        for (var i = 0; i < spectrum.length; i++) {
            var amp = spectrum[i];


            // for (var x = 0; x < particles.length; x++) {
            //     var particle = particles[x];
            //     particle = map(amp, 0, 256, 0, 100);
            //     var r = radius + particle;
            //     //console.log(r);
            //     var x = r * cos(a) * 2;
            //     var y = r * sin(a);
            //     //vertex(x, y);
            //     ellipse(x, y, 4, 4);
            // }

        }

        var offset = map(amp, 0, 256, 0, 400);
        var r = radius + offset;
        //console.log(r);
        var x = r * cos(a) * 2;
        var y = r * sin(a);
        vertex(x, y);
        //ellipse(x, y, 4, 4);

    }

    endShape();

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

}