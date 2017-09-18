// Wave Class
function Wave (color, posX, posY, limiter, flipWave) {

    this.mColor = color;
    this.mPosX = posX;
    this.mPosY = posY;
    this.mLimiter = limiter;
    this.mFlipWave = flipWave;
    this.yoff = 0.0;


    this.waveSpectrum = function () {
        this.spectrum = fft.analyze();
        return this.spectrum;
    }

    this.show = function (amp) {

        // beginShape();
        //     stroke(this.mColor);
        //     strokeWeight(10);
        //     smooth();
        //     this.position();
        //     this.waveSpectrum();
        //
        //         // if (this.mFlipWave){
        //         //    this.flipWaveHorizontally();
        //         //    //console.log("flip");
        //         // } else {
        //             this.amplitude();
        //         //}
        // endShape();
        this.radius = 150;

        beginShape();
        for (var a = 0; a < TWO_PI; a += 0.1) {

            this.offset = map(amp, 0, 256, -25, 25);
            this.r = this.radius + this.offset;
            this.x = this.r * cos(a);
            this.y = this.r * sin(a);
            vertex(this.x, this.y);

            //ellipse(x, y, 4, 4);
        }
        endShape();

    }

    // this.vertexWave = function () {
    //
    //     var spectrum = mfft.analyze();
    //
    //     beginShape();
    //     for (i = 0; i<spectrum.length; i++) {
    //         vertex(i, map(spectrum[i], 0, 255, height, 0) );
    //     }
    //     endShape();
    // }
    //
    this.position = function () {
        translate(this.mPosX, this.mPosY);
    }

    /* Set the amplitude of each line based on the frequency spectrum
       of that given time domain */
    this.amplitude = function () {

        //console.log("spectrum" + this.waveSpectrum.value());

        for (var i = 0; i < this.waveSpectrum().length; i++) {

            this.amp = this.waveSpectrum()[i];

            //this.y = map(this.amp/this.mLimiter, 0, 256, height, 0);

            show(amp);

            //line(i * 50, height * 2, i * 50, this.y);

           // ellipse(i * 50, this.y, i * 50, height);
        }

        //ellipse(i * 50, this.y, i * 50, height);
        return this.amp;
    }

    // this.flipWaveHorizontally = function () {
    //
    //     for (var j = this.waveSpectrum().length; j > 0; j--) {
    //
    //         this.amp = this.waveSpectrum()[j];
    //
    //         this.y = map(this.amp/this.mLimiter, 0, 256, height, 0);
    //
    //         line(j, height, j, this.y);
    //     }
    //     return this.amp;
    //
    // }

}