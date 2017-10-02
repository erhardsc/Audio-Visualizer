
p5.disableFriendlyErrors = true;

var song, fft, button, radius;

var ctx;

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

    ctx = myCanvas.drawingContext;

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
        var amp = map(spectrum[i], 0, 256, 600, 100);

        // Peak 1
        var peak1_leftControlX = map(spectrum[i], 0, 256, width*.15, width*.2);
        var peak1_leftControlY = map(spectrum[i], 0, 256, height*.45, height*.35);

        // Peak 2
        var peak2_leftControlX = map(spectrum[i], 0, 256, width*.55, width*.63);
        var peak2_leftControlY = map(spectrum[i], 0, 256, height*.75, height*.65);

        // Peak 3
        var peak3_leftControlX = map(spectrum[i], 0, 256, width*.88, width*.98);
        var peak3_leftControlY = map(spectrum[i], 0, 256, height*.95, height*.85);

        return [peak1_leftControlX,
                peak1_leftControlY,
                peak2_leftControlX,
                peak2_leftControlY,
                peak3_leftControlX,
                peak3_leftControlY];
    }
}

function draw() {
    //background("rgb(22,25,37)");
    background(255);
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    var fps = frameRate();
    fill(0);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, 50);

    // Set gradient color scheme
    // var gradient = ctx.createRadialGradient(width*.14, amplitude(), width, width, height, 0);
    // gradient.addColorStop(0, "rgb(48, 35, 174)");
    // gradient.addColorStop(1, "rgb(200,109,215)");
    // ctx.fillStyle = gradient;

    strokeWeight(10)
    //point(width*.094,height*.62);
    strokeWeight(1);


         // Peak 1
    //RED
    stroke(255,0,0);
    line(width*.35,height*.85, width*.15,height*.35);

    //GREEN
    stroke(0,255,0);
    line(width*.35,height*.85, width*.25,height*.85);

         // Peak 2
    //RED
    stroke(255,0,0);
    line(width*.80,height*.8, width*.55,height*.86);

    //GREEN
    stroke(0,255,0);
    line(width*.80,height*.8, width*.55,height*.65);


         // Peak 3
    //RED
    stroke(255,0,0);
    line(width*.98,height*.7, width*.88,height*.85);

    //GREEN
    stroke(0,255,0);
    line(width*.98,height*.7, width*.92,height*.48);


    stroke(0);
    noFill();

    beginShape();
    vertex(10,height *.98);
    vertex(10,height * .8);
    bezierVertex(width*.15,height*.35,  width*.25,height*.85,  width*.35,height*.85); //Peak-1
    bezierVertex(width*.55,height*.86,  width*.55,height*.65,  width*.80,height*.8); //Peak-2
    bezierVertex(width*.88,height*.85,  width*.92,height*.48,  width*.98,height*.7); //Peak-3
    vertex(width * .98,height *.98);

    endShape();
    // beginShape();
    //
    // vertex(10,height *.98);
    // vertex(10,height * .8);
    // bezierVertex(amplitude()[0],height*.76,  width*.05,height*.6,   amplitude()[1],height*.60);//peak1-left
    // bezierVertex(amplitude()[2],height*.60,  width*.2,height*.80,   width*.3,height*.90);//peak1-right
    //
    // // bezierVertex(width*.4,height*.95,  width*.4,height*.8,   width*.55,height*.82);//peak2-left
    // // bezierVertex(width*.62,height*.82,  width*.62,height*.95,   width*.8,height*.89);//peak2-right
    // //
    // // bezierVertex(width*.95,height*.78,  width*.8,height*.65,   width*.93,height*.6);//peak3-left
    // // bezierVertex(width*.97,height*.61,  width*.96,height*.67,   width * .98,height*.7);//peak3-right
    // // vertex(width * .98,height *.98);
    //
    // endShape();

}