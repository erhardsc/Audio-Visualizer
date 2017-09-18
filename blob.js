// Blob Class
function Blob(x, y, r) {

    this.r = r;

    this.show = function() {
        fill(255);


        beginShape();

        for (var a = 0; a < TWO_PI; a += 0,1) {
            var x = this.r * cos(a);
            var y = this.r * sin(a);

            vertex(x, y);
        }

        endShape();
    }



}