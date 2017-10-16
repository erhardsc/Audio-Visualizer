class Wave {
    constructor(color, adjuster) {
        this.color = color;
        this.adjuster = adjuster;
    }

    show() {
        this.spectrum = fft.analyze();

        this.scaled = this.splitOctives(this.spectrum, 3);
        this.len = this.scaledSpectrum.length;

        push();
        fill(this.color);
        noStroke();
        beginShape();
        curveVertex(0, height);
        for (let i = 0; i < this.len; i++) {
            this.point = this.smoothPoint(this.scaled, i, 2);
            this.x = map(i, 0, this.len-1, 0, width);
            this.y = map(this.point, 0, 255, height, height * this.adjuster);
            curveVertex(this.x, this.y);
        }
        curveVertex(width, height);
        endShape(CLOSE);
        pop();
    }

    /**
     *  Divides an fft array into octaves with each
     *  divided by three, or by a specified "slicesPerOctave".
     *
     *  There are 10 octaves in the range 20 - 20,000 Hz,
     *  so this will result in 10 * slicesPerOctave + 1
     *
     *  @method splitOctaves
     *  @param {Array} spectrum Array of fft.analyze() values
     *  @param {Number} [slicesPerOctave] defaults to thirds
     *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
     *                                 of octaves
     */

    splitOctives(spectrum, slicesPerOctave){
        this.scaledSpectrum = [];
        this.len = spectrum.length;

        // default to thirds
        this.n = slicesPerOctave|| 3;
        this.nthRootOfTwo = Math.pow(2, 1/this.n);

        // the last N bins get their own
        this.lowestBin = slicesPerOctave;

        this.binIndex = this.len - 1;
        this.i = this.binIndex;


        while (this.i > this.lowestBin) {
            this.nextBinIndex = round( this.binIndex/this.nthRootOfTwo );

            if (this.nextBinIndex === 1) return;

            this.total = 0;
            this.numBins = 0;

            // add up all of the values for the frequencies
            for (this.i = this.binIndex; this.i > this.nextBinIndex; this.i--) {
                this.total += spectrum[this.i];
                this.numBins++;
            }

            // divide total sum by number of bins
            this.energy = this.total/this.numBins;
            this.scaledSpectrum.push(this.energy);

            // keep the loop going
            this.binIndex = this.nextBinIndex;
        }

        // add the lowest bins at the end
        for (let j = this.i; j > 0; j--) {
            this.scaledSpectrum.push(this.spectrum[j]);
        }

        // reverse so that array has same order as original array (low to high frequencies)
        this.scaledSpectrum.reverse();

        return this.scaledSpectrum;
    }

    smoothPoint(spectrum, index, numberOfNeighbors){
        // default to 2 neighbors on either side
        this.neighbors = numberOfNeighbors || 2;
        this.len = spectrum.length;

        this.val = 0;

        // start below the index
        this.indexMinusNeighbors = index - this.neighbors;
        this.smoothedPoints = 0;

        for (let i = this.indexMinusNeighbors; i < (index+this.neighbors) && i < this.len; i++) {
            // if there is a point at spectrum[i], tally it
            if (typeof(spectrum[i]) !== 'undefined') {
                this.val += spectrum[i];
                this.smoothedPoints++;
            }
        }

        this.val = this.val/this.smoothedPoints;

        return this.val;
    }

}