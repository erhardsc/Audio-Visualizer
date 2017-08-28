function Wave (color, posX, posY, limiter, flipWave) {

    this.mColor = color;
    this.mPosX = posX;
    this.mPosY = posY;
    this.mLimiter = limiter;
    this.mFlipWave = flipWave;


    this.waveSpectrum = function () {
        this.spectrum = fft.analyze();
        return this.spectrum;
    }

    this.show = function () {
        beginShape();
            stroke(this.mColor);
            strokeWeight(100);
            smooth();
            this.position();
            this.waveSpectrum();

                // if (this.mFlipWave){
                //    this.flipWaveHorizontally();
                //    //console.log("flip");
                // } else {
                    this.amplitude();
                //}
        endShape();
    }

    this.position = function () {
        translate(this.mPosX, this.mPosY);
    }

    this.amplitude = function () {

        for (var i = 0; i < this.waveSpectrum().length; i++) {

            this.amp = this.waveSpectrum()[i];

            this.y = map(this.amp/this.mLimiter, 0, 256, height, 0);

            line(i, height * 2, i, this.y);
        }
        return this.amp;
    }

    this.flipWaveHorizontally = function () {

        for (var j = this.waveSpectrum().length; j > 0; j--) {

            this.amp = this.waveSpectrum()[j];

            this.y = map(this.amp/this.mLimiter, 0, 256, height, 0);

            line(j, height, j, this.y);
        }
        return this.amp;

    }

}