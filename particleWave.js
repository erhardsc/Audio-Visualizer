
// ParticleWave class constructor

function ParticleWave(x, y, radius) {

    // Declare members
    this.mX = x;
    this.mY = y;
    this.mRadius = radius;

    this.waveSpectrum = function () {
        this.spectrum = fft.analyze();
        return this.spectrum;
    }

    this.show = function () {

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

    }

    this.position = function () {
        translate(this.X, this.Y);
    }



}