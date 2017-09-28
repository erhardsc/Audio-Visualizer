
var song, fft, button, radius;

var clientHeight;
var clientWidth;

var wave, wave2;

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

    fft = new p5.FFT(0.95, 64);

    var dark = color('rgba(22, 25, 37, .85)');
    var grey = color('rgb(142, 137, 137)');
    var purple = color('rgb(106, 63, 190)');
    var lightPurple = color('rgb(200, 109, 215)');

    var xpos = window.innerWidth / 2;
    var ypos = window.innerHeight;

    //wave = new ParticleWave(xpos, ypos * 1.5, radius, 2, purple);
    //wave2 = new ParticleWave(xpos, ypos / 2, radius, 2, grey);

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

function amplitude(){
    var spectrum = fft.analyze();

    for (var i = 0; i < spectrum.length; i++) {
        var frequency = spectrum[i];
        var amp = map(frequency, 0, 256, 200, 3000);

        return amp;
    }
}

function draw() {
    background(150);
    // Generate Waves. Defaults to stacking each element
    //wave.show();
    //wave2.show();

    translate(0, height/2);

    stroke(0);

    strokeWeight(4);
    /*1*/point(0, amplitude());
    /*1*/point(0, 50);
    /*2*/point(width, 60);
    /*3*/point(width, height);
    /*4*/point(0, height);
    /*4*/point(0, height);
    strokeWeight(1);

    beginShape();
    /*2*/curveVertex(0, amplitude());
    /*2*/curveVertex(0, 50);
    /*3*/curveVertex(width, 60);
    /*4*/curveVertex(width, height);
    /*1*/curveVertex(0, height);
    /*1*/curveVertex(0, height);
    endShape();

    // strokeWeight(4);
    // point(0, height);
    // point(0, height * 0.6);
    // point(width, height * 0.6);
    // point(width, height);
    // strokeWeight(1);
    // stroke(255);
    // fill(40);
    //
    // beginShape();
    // curveVertex(mouseX, mouseY);
    // curveVertex(0, height * 0.4);
    // curveVertex(width, height * 0.4);
    // curveVertex(width , height);
    // endShape();

}