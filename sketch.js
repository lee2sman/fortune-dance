//Fortune Dance
//by Lee Tusman - August 2017
//for Silpakorn University-DMA Exchange exhibit at BACC / Bangkok Art and Culture Center
//project collaborators: Ku Siriwich Sodprasert, Jutamad Thammatonsiri, Tuangkamol Thongburisute
//cc0

//vars
var textX = 1000;
var allFortunes;
var whichFortune;
var whichVideo;
var myFont;
var stage = 1;
var scroll = true;
var faded = 90;
var videos = [];
var isplaying = false;

// BUTTONS (ideally with makey makey)
// mouse click = Make A Wish!
// left arrow = ACCEPT / YES
// right arrow = REJECT / NO

function preload() {
  allFortunes = loadStrings('assets/fortunes.txt');
  myFont = loadFont('fonts/IMFell-Regular.ttf');    
    videos[0] = createVideo("videos/video0.mp4"); //this video needs to be replaced
    videos[0].hide();
    videos[1] = createVideo("videos/video1.mp4");
    videos[1].hide();
    videos[2] = createVideo("videos/video2.mp4");
    videos[2].hide();
}

function setup() { 
   createCanvas(windowWidth, windowHeight);  //if much more videos change this to for loop to load&&hide

} 

function draw() { 
  background(15);
  //font styling
  textFont(myFont);
  fill(220, 90);
    
  switch (stage) {
    case 1:
      //Make a wish
      isplaying = false;
      makeAWish();
      break;
    case 2:
      // tell a fortune
      fortune();
      break;
    case 3:
      //dance
      dance();
      break;
    }
}

function makeAWish() {
    s = "Make A Wish";
    textAlign(CENTER);
  	textSize(windowHeight/4);  //choose font size
  	textX = windowWidth/2; 
    
    //display wish
    text(s, textX, windowHeight/2);
}

function fortune() {
    fill(220,90);
    textSize(windowHeight/6);
    textAlign(CENTER,CENTER);
    text(s, 0,0,windowWidth,(7/8)*windowHeight);
    
    fill(220,faded);
    textSize(windowHeight/8);
    textAlign(BOTTOM,CENTER);
    text("Yes             No",windowWidth/2,windowHeight-50);
    faded=faded-0.5;
    if (faded < 0){
       faded = 90; 
    }
}

function dance() {
      image(videos[whichVideo],0,0,windowWidth,windowHeight);
         if (!isplaying) {
             
          videos[whichVideo].play();
          isplaying=true;
         }
     
       if (videos[whichVideo].time() >= 3) {
           videoOver();
       }
        
        
        //videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
}

function videoOver() {
    console.log("stopping video now"); 
    videos[whichVideo].pause();
    videos[whichVideo].time(0);
    //videos[whichVideo].play();
    stage = 1;
}

function mousePressed(){
    if (stage === 1){
        whichFortune = floor(random(allFortunes.length)); //picks random fortune from list
        s = allFortunes[whichFortune];
        stage = 2;  
    }
}

function keyPressed() {
    console.log(videos.length);
    if (stage === 2) {
        if (keyCode === LEFT_ARROW) {
        //accepted
        //pick random video from array
        whichVideo = floor(random(videos.length)); 
        console.log(whichVideo);
        stage = 3;
     } 
    if (keyCode === RIGHT_ARROW) {
        // not accepted
        whichFortune = floor(random(allFortunes.length)); 
        s = allFortunes[whichFortune];
        stage = 2;
        }
    }
}
