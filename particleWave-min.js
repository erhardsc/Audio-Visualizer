function ParticleWave(t,i,s,h,e){this.mX=t,this.mY=i,this.mRadius=s,this.mColor=e,this.mFlattener=h,this.waveSpectrum=function(){return this.spectrum=fft.analyze(),this.spectrum},this.show=function(){beginShape(),this.position(),this.waveSpectrum(),fill(this.mColor);for(var t=PI;t<TWO_PI;t+=.1){for(var i=0;i<this.waveSpectrum().length;i++)this.amp=this.waveSpectrum()[i];this.offset=map(this.amp,0,256,0,400),this.r=this.mRadius+this.offset,this.x=this.r*cos(t)*this.mFlattener,this.y=this.r*sin(t),vertex(this.x,this.y)}endShape()},this.position=function(){translate(this.mX,this.mY)}}