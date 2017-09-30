
p5.disableFriendlyErrors = true;
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
        var amp = map(spectrum[i], 0, 256, height*19/32, 600);


        return amp;
    }
}

function draw() {
    background(255);
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    var fps = frameRate();
    fill(0);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 50);

    // Generate Waves. Defaults to stacking each element
    // push();
    // translate(width, height * .8);
    // scale(-.5,1);
    // wave.show();
    // pop();
    //
    // push();
    // translate(0, height * .8);
    // wave.show();
    // pop();
    //
    // push();
    // translate(0, height * .8);
    // scale(1.3,1);
    // wave2.show();
    // pop();
    //
    // push();
    // translate(width, height * .8);
    // scale(-1,1);
    // wave3.show();
    // pop();
    strokeWeight(4);
    //point(width*.57,height*.8);
     //point(width*.8,height*.91);
    strokeWeight(1);

    // line(width*.93,height*.6, width*.8,height*.65);
    //  line(width * .98,height*.7, width*.94,height*.67);

    beginShape();
    noFill();
    vertex(10,height *.98);
    vertex(10,height * .8);
    bezierVertex(width*.05,height*.6,  width*.1,height*.6,   width*.14,height*.65);//peak1-left
    bezierVertex(width*.2,height*.75,  width*.2,height*.88,   width*.3,height*.94);//peak1-right

    bezierVertex(width*.4,height*.95,  width*.4,height*.8,   width*.55,height*.82);//peak2-left
    bezierVertex(width*.62,height*.82,  width*.62,height*.95,   width*.8,height*.89);//peak2-right

    bezierVertex(width*.95,height*.78,  width*.8,height*.65,   width*.93,height*.6);//peak3-left
    bezierVertex(width*.97,height*.61,  width*.96,height*.67,   width * .98,height*.7);//peak3-right
    vertex(width * .98,height *.98);

    endShape();

}