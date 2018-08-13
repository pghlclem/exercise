/**
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise<any>}
 */
function loadImage(url) {
  return new Promise(function(resolve, reject) {
    var img = document.createElement("img");
    img.onload = function() {
      resolve(this);
    };

    img.onerror = function(e) {
      reject(e);
    };

    img.src = url;
  });
}

/**
 * Animate a element to a position
 * @param {HTMLElement} element
 * @param {number} duration
 * @param {number} x
 * @param {number} y
 * @return {Promise<any>}
 */
function animate(element, duration, x, y) {
  return new Promise(function(resolve) {
    TweenLite.to(element, duration, { x: x, y: y, onComplete: resolve });
  });
}

var images = [
  "./assets/001-yawn.png",
  "./assets/002-wink.png",
  "./assets/003-smile-1.png",
  "./assets/004-smile.png",
  "./assets/005-surprise.png",
  "./assets/006-shocked.png",
  "./assets/007-sceptic.png",
  "./assets/008-sad-2.png",
  "./assets/009-sad-1.png",
  "./assets/010-happy-3.png",
  "./assets/011-pain.png",
  "./assets/012-muted.png",
  "./assets/013-meh.png",
  "./assets/014-laugh.png",
  "./assets/015-ill.png",
  "./assets/016-happy-2.png",
  "./assets/017-happy-1.png",
  "./assets/018-cute.png",
  "./assets/019-crying.png",
  "./assets/020-crazy.png",
  "./assets/021-cool.png",
  "./assets/022-bored.png",
  "./assets/023-blush.png",
  "./assets/024-sad.png",
  "./assets/025-happy.png"
];

/// WRITE CODE UNDER HERE
var arr = [];
var arrElements = [];
var className = "part";
var dur = 0.2;
var pos = [{x:600, y:0}, {x:600, y:600}, {x:0, y:600}, {x:0, y:0}];
var posIndex = 0;
var elementIndex = 0;

images.forEach(img => arr.push(loadImage(img)));

Promise.all(arr).then(images => {
    images.forEach(img => arrElements.push(placeElement(img)));
    TweenLite.set(arrElements[0], {display:"block"});
    animateElement();
})

function placeElement(img) {
  img.className = "part";
  document.body.appendChild(img)
  return img;
}

function animateElement() {
  if(posIndex == pos.length) {
      TweenLite.set(arrElements[elementIndex], {display:"none"});
    if(elementIndex < arrElements.length-1) {
      elementIndex++;
    } else {
      elementIndex = 0;
    }
    TweenLite.set(arrElements[elementIndex], {display:"block"});
    posIndex = 0;
  }

  animate(arrElements[elementIndex], dur, pos[0].x, pos[0].y).then(animateElement)
  updatePosition();
  posIndex++;
}

function updatePosition() {
  var p = pos.shift();
  pos.push(p);
  return pos;
}