
function key(event){
    if(event.which == 13) { 

        if(rw == 0){

            tw = setInterval(tkoff,100);
            rs.play();

            mis();
            miss();
            missi();
            rw = setInterval(run,100);
            rs.play();

            bw = setInterval(b,100);
            sw = setInterval(updateScore,100);
            fw = setInterval(move,100);
            fww = setInterval(movee,100);
            fwd = setInterval(mov,100);
        }
    }

    if(event.which == 38){
        if(jw == 0){
            clearInterval(rw);
            rs.pause();
            jw = setInterval(jump,120);
            js.play();
        }
    }

    if(event.which == 40){
        if(dw == 0){
            clearInterval(rw);
            rs.pause();
            dw = setInterval(down,120);
            js.play();
        }
    }
}

var rs = new Audio("audio/fly.mp3");
rs.loop = true;

var js = new Audio("audio/dive.mp3");
var bs = new Audio("audio/blow.mp3");

// missile creation margins
var marg = 2000;
function mis(){
    for(var y = 0; y<20; y++ ) {
        var i = document.createElement("img");
        i.src = "images/missile.gif";
        i.className = "m";
        i.id = "a" + y;
        i.style.marginLeft = marg + "px";
        marg = marg + 1000;
        document.getElementById("b").appendChild(i);
    }
}

var margg = 5000;
function miss(){
    for(var y = 0; y<10; y++ ) {
        var ii = document.createElement("img");
        ii.src = "images/missile2.gif";
        ii.className = "mm";
        ii.id = "c" + y;
        ii.style.marginLeft = margg + "px";
        margg = margg + 1400;
        document.getElementById("b").appendChild(ii);
    }
}

var margi = 7000;
function missi(){
    for(var y = 0; y<10; y++ ) {
        var im = document.createElement("img");
        im.src = "images/missile2.gif";
        im.className = "mi";
        im.id = "d" + y;
        im.style.marginLeft = margi + "px";
        margi = margi + 1500;
        document.getElementById("b").appendChild(im);
    }
}

// flying animation
var rw = 0;
var r = 1;
function run(){
    var rimg = document.getElementById("plane");
    r = r + 1;
    if (r == 3) {
        r = 1;
    }
    rimg.src = "images/Fly (" + r +").png";
}

// single mt variable for plane vertical position
var mt = 300;

// helper collision function with adjustable shrink values
function isColliding(planeRect, missileRect, opts) {
    
    opts = opts || {};

    let sPL = opts.shrinkPlaneLeft || 0;
    let sPR = opts.shrinkPlaneRight || 0;
    let sPT = opts.shrinkPlaneTop || 0;
    let sPB = opts.shrinkPlaneBottom || 0;

    let sMT = opts.shrinkMissileTop || 0;
    let sMB = opts.shrinkMissileBottom || 0;

    let adjustedPlane = {
        left: planeRect.left + sPL,
        right: planeRect.right - sPR,
        top: planeRect.top + sPT,
        bottom: planeRect.bottom - sPB
    };

    let adjustedMissile = {
        left: missileRect.left,
        right: missileRect.right,
        top: missileRect.top + sMT,
        bottom: missileRect.bottom - sMB
    };

    return (
        adjustedPlane.left < adjustedMissile.right &&
        adjustedPlane.right > adjustedMissile.left &&
        adjustedPlane.top < adjustedMissile.bottom &&
        adjustedPlane.bottom > adjustedMissile.top
    );
}

// game over helper
function triggerGameOver(){
    // Stop all intervals safely
    if(rw){ clearInterval(rw); rw = 0; }
    if(jw && jw !== -1){ clearInterval(jw); jw = -1; }
    if(dw){ clearInterval(dw); dw = 0; }
    if(bw){ clearInterval(bw); bw = 0; }
    if(fw){ clearInterval(fw); fw = 0; }
    if(sw){ clearInterval(sw); sw = 0; }
    if(fww){ clearInterval(fww); fww = 0; }
    if(fwd){ clearInterval(fwd); fwd = 0; }

    // Stop all sounds
    if(rs){ rs.pause(); rs.currentTime = 0; } // fly sound
    if(js){ js.pause(); js.currentTime = 0; } // dive/jump sound

    // Start death animation and blow sound
    if(!dew){ dew = setInterval(dead, 100); }
    if(bs){ bs.play(); }
}



// MOVE - missiles batch 'a' (missile.gif) 
var fw = 0;
function move() {

    // plane rect once per frame
    var planeElem = document.getElementById("plane");
    if (!planeElem) return;
    let planeRect = planeElem.getBoundingClientRect();

    // hitbox tuning 
    let hitOptions = {
        shrinkPlaneLeft: 28,    
        shrinkPlaneRight: 8,
        shrinkPlaneTop: 8,
        shrinkPlaneBottom: 8,
        shrinkMissileTop: 15,   
        shrinkMissileBottom: 15
    };

    // loop through created missiles 
    for (var y = 0; y < 20; y++) {
        var missile = document.getElementById("a" + y);
        if (!missile) continue;

        // Move missile by using inline style marginLeft
        let cur = parseInt(missile.style.marginLeft || 0);
        if (isNaN(cur)) {
            
            cur = parseInt(getComputedStyle(missile).marginLeft) || 0;
        }
        cur = cur - 23;
        missile.style.marginLeft = cur + "px";

        // Collision detection
        let missileRect = missile.getBoundingClientRect();

        if (isColliding(planeRect, missileRect, hitOptions)) {
            triggerGameOver();
            return; // stop processing after collision
        }
    }
}

// MOVE for 'c' missiles (mm)
var fww = 0;
function movee(){
    var planeElem = document.getElementById("plane");
    if (!planeElem) return;
    let planeRect = planeElem.getBoundingClientRect();

    let hitOptionsC = {
        shrinkPlaneLeft: 28,
        shrinkPlaneRight: 8,
        shrinkPlaneTop: 8,
        shrinkPlaneBottom: 8,
        shrinkMissileTop: 12,
        shrinkMissileBottom: 12
    };

    for(var y = 0; y < 10; y++){
        var dd = document.getElementById("c" + y);
        if (!dd) continue;

        let cur = parseInt(dd.style.marginLeft || 0);
        if (isNaN(cur)) cur = parseInt(getComputedStyle(dd).marginLeft) || 0;
        cur = cur - 20;
        dd.style.marginLeft = cur + "px";

        let missileRect = dd.getBoundingClientRect();
        if (isColliding(planeRect, missileRect, hitOptionsC)) {
            triggerGameOver();
            return;
        }
    }
}

// MOVE for 'd' missiles (mi)
var fwd = 0;
function mov(){
    var planeElem = document.getElementById("plane");
    if (!planeElem) return;
    let planeRect = planeElem.getBoundingClientRect();

    let hitOptionsD = {
        shrinkPlaneLeft: 28,
        shrinkPlaneRight: 8,
        shrinkPlaneTop: 8,
        shrinkPlaneBottom: 8,
        shrinkMissileTop: 12,
        shrinkMissileBottom: 12
    };

    for(var y = 0; y < 10; y++){
        var dm = document.getElementById("d" + y);
        if (!dm) continue;

        let cur = parseInt(dm.style.marginLeft || 0);
        if (isNaN(cur)) cur = parseInt(getComputedStyle(dm).marginLeft) || 0;
        cur = cur - 20;
        dm.style.marginLeft = cur + "px";

        let missileRect = dm.getBoundingClientRect();
        if (isColliding(planeRect, missileRect, hitOptionsD)) {
            triggerGameOver();
            return;
        }
    }
}

// Jump / Up animation
var jw = 0;
var j = 1;
function jump() {
   var jimg = document.getElementById("plane");

   if(j<=8) { 
    mt = mt - 20;
   }

   if(j>=9) {
    mt = mt + 20;
   }

   jimg.style.marginTop = mt + "px";
   j = j+1;
   
   if(j == 17){
    j = 1;
    clearInterval(jw);
    jw = 0;

    rw = setInterval(run,100);
    rs.play();
    if(bw == 0){
      bw = setInterval(b,100);
    }
   }
   jimg.src = "images/Shoot ("+j+").png";
}

// Down animation
var dw = 0;
var d = 1;
function down() {
   var dimg = document.getElementById("plane");

   if(d<=8) {
    mt = mt + 20;
   }

   if(d>=9) { 
    mt = mt - 20;
   }

   dimg.style.marginTop = mt + "px";
   d = d+1;
   
   if(d == 17){
    d = 1;
    clearInterval(dw);
    dw = 0;

    rw = setInterval(run,100);
    rs.play();
    if(bw == 0){
      bw = setInterval(b,100);
    }
   }
   dimg.src = "images/Shoot ("+d+").png";
}

// Takeoff animation
var mt = 520;   // plane starts near bottom
var tw = 0;
var t = 1;

function tkoff() {
   var timg = document.getElementById("plane");

   // Plane should rise until mt reaches 260px
   if (mt > 260) { 
        mt = mt - 17;  
        if (mt < 260) mt = 260; // clamp to mid position
   }

   timg.style.marginTop = mt + "px";
   t = t + 1;

   if (t == 17) {
        t = 1;
        clearInterval(tw);
        tw = 0;

        rw = setInterval(run,100);
        rs.play();
        if(bw == 0){
            bw = setInterval(b,100);
        }
   }

   timg.src = "images/Tkof ("+t+").png";
}


// Death sequence
var dew = 0;
var de = 1;
function dead(){
    var deimg = document.getElementById("plane");
    de = de+1;
    
    if(de == 4){
        de = 1;
        deimg.style.marginTop = "290px";
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = u;
    }

    deimg.src = "images/Dead ("+de+").png";
}

// Background movement
var bw = 0;
var x = 0;
function b(){
    x = x-20;
    document.getElementById("b").style.backgroundPositionX = x + "px";
}

// Score
var sw = 0;
var u = 0;
function updateScore(){
    u = u+5;
    document.getElementById("score").innerHTML = u;
}

// Restart
function re(){
    location.reload();
}
