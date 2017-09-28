// curveWave class

function CurveWave(color, limiter){

    this.color = color;
    this.limiter = limiter;

    this.amplitude = function (){
        this.spectrum = fft.analyze();

        for (var i = 0; i < this.spectrum.length; i++) {
            this.frequency = this.spectrum[i];
            this.amp = map(this.frequency * this.limiter, 0, 256, 200, 3000);

            return this.amp;
        }
    }

    this.show = function () {
        noStroke();
        fill(this.color);
        this.position();
        beginShape();
        /*2*/curveVertex(0, this.amplitude());
        /*2*/curveVertex(0, 50);
        /*3*/curveVertex(width, 60);
        /*4*/curveVertex(width, height);
        /*1*/curveVertex(0, height);
        /*1*/curveVertex(0, height);
        endShape();
    }

    this.position = function () {
        translate(0, height/2);
    }
}