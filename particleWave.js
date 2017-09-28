
// ParticleWave class constructor

function ParticleWave(xpos, ypos, radius, flattener, color) {

    // Declare members
    this.mX = xpos;
    this.mY = ypos;
    this.mRadius = radius;
    this.mColor = color;
    this.mFlattener = flattener;

    this.waveSpectrum = function () {
        this.spectrum = fft.analyze();
        return this.spectrum;
    }

    this.show = function () {
        fill(this.mColor);
        beginShape();
        this.position();
        this.waveSpectrum();

        for (var a = PI; a < TWO_PI; a += 0.1) {
            for (var i = 0; i < this.waveSpectrum().length; i++) {
                this.amp = this.waveSpectrum()[i];
                this.offset = map(this.amp, 0, 256, 0, 400);
                this.r = this.mRadius + this.offset;
                this.x = this.r * cos(a) * this.mFlattener;
                this.y = this.r * sin(a);
                vertex(this.x, this.y);
                //ellipse(this.x, this.y, 4, 4);
            }

        }
        endShape();

    }

    this.position = function () {
        translate(this.mX, this.mY);
    }



}