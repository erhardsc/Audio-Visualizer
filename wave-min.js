function Wave(t,i){this.color=t,this.adjuster=i,this.show=function(){this.spectrum=fft.analyze(),this.scaled=this.splitOctives(this.spectrum,3),this.len=this.scaledSpectrum.length,push(),fill(this.color),noStroke(),beginShape(),curveVertex(0,height);for(var t=0;t<this.len;t++)this.point=this.smoothPoint(this.scaled,t,2),this.x=map(t,0,this.len-1,0,width),this.y=map(point,0,255,height,height*this.adjuster),curveVertex(this.x,this.y);curveVertex(width,height),endShape(CLOSE),pop()},this.splitOctives=function(t,i){for(this.scaledSpectrum=[],this.len=t.length,this.n=i||3,this.nthRootOfTwo=Math.pow(2,1/this.n),this.lowestBin=i,this.binIndex=this.len-1,this.i=this.binIndex;this.i>this.lowestBin;){if(this.nextBinIndex=round(this.binIndex/this.nthRootOfTwo),1===this.nextBinIndex)return;for(this.total=0,this.numBins=0,this.i=this.binIndex;this.i>this.nextBinIndex;this.i--)this.total+=t[this.i],this.numBins++;this.energy=this.total/this.numBins,this.scaledSpectrum.push(this.energy),this.binIndex=this.nextBinIndex}for(this.j=this.i;this.j>0;this.j--)this.scaledSpectrum.push(this.spectrum[this.j]);return this.scaledSpectrum.reverse(),this.scaledSpectrum},this.smoothPoint=function(t,i,s){this.neighbors=s||2,this.len=t.length,this.val=0,this.indexMinusNeighbors=i-this.neighbors,this.smoothedPoints=0;for(var h=this.indexMinusNeighbors;h<i+this.neighbors&&h<this.len;h++)void 0!==t[h]&&(this.val+=t[h],this.smoothedPoints++);return this.val=this.val/this.smoothedPoints,this.val}}