// curveWave class

function CurveWave(color, limiter){

    this.color = color;
    this.limiter = limiter;

    this.amplitude = function (){
        this.spectrum = fft.analyze();

        for (var i = 0; i < this.spectrum.length; i++) {
            this.frequency = this.spectrum[i];
            this.ampX = map(this.frequency, 0, 256, -10, 1000);
            this.ampY = map(this.frequency * this.limiter, 0, 256, 300, 3000);

            return [this.ampX, this.ampY];
        }
    }

    this.show = function () {

        push(); // Save state

        noStroke();
        fill(this.color);
        this.position();

        beginShape();
        /*2*/curveVertex(this.amplitude()[0], this.amplitude()[1]); // Adjust angle of curve
        /*2*/curveVertex(0, 50);
        /*3*/curveVertex(width, 60);
        /*4*/curveVertex(width, height);
        /*1*/curveVertex(0, height);
        /*1*/curveVertex(0, height);
        endShape();

        pop(); // Restore state
    }

    this.position = function () {
        translate(0, height * 0.8);
    }
}