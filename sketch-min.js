function toggleSong(){song.isPlaying()?song.pause():song.play()}function preload(){song=loadSound("Atmosphere-Sunshine.mp3")}function setup(){clientHeight=document.getElementById("visualizer").clientHeight,clientWidth=document.getElementById("visualizer").clientWidth,createCanvas(window.innerWidth,window.innerHeight).parent("visualizer"),radius=isMobileDevice()?1e3:constrain(window.innerWidth,500,700),fft=new p5.FFT(.95,64);var e=color("rgba(22, 25, 37, .85)"),t=color("rgb(142, 137, 137)"),i=color("rgb(106, 63, 190)"),n=color("rgb(200, 109, 215)"),o=window.innerWidth/2,r=window.innerHeight;button=createButton("toggle"),button.mousePressed(toggleSong),song.play()}function isMobileDevice(){return void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile")}function windowResized(){resizeCanvas(window.innerWidth,window.innerHeight)}function amplitude(){for(var e=fft.analyze(),t=0;t<e.length;t++){var i=e[t];return map(i,0,256,200,3e3)}}function draw(){background(150),translate(0,height/2),stroke(0),strokeWeight(4),point(0,amplitude()),point(0,50),point(width,60),point(width,height),point(0,height),point(0,height),strokeWeight(1),beginShape(),curveVertex(0,amplitude()),curveVertex(0,50),curveVertex(width,60),curveVertex(width,height),curveVertex(0,height),curveVertex(0,height),endShape()}var song,fft,button,radius,clientHeight,clientWidth,wave,wave2;