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
      resolve(null);
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

/**
 *
 * @param element
 * @return {Promise<any>}
 */
function appendElement(element, container = document.body) {
  container.appendChild(element);
  return Promise.resolve(element);
}

function removeElement(element) {
  if (element.parentElement) {
    const parent = element.parentElement;
    parent.removeChild(element);
  }
  return Promise.resolve(element);
}

function animatePositions(element, duration, positions) {
  return positions
  	.reduce(
  		(prom, position) =>
  			prom.then(() => animate(element, duration, position.x, position.y)),
  		Promise.resolve()
  	)
  	.then(() => element);

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

var positions = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: 0 }
];

positions = positions.map(position => ({
  x: position.x * window.innerWidth / 2,
  y: position.y * window.innerHeight / 2
}));

/// WRITE CODE UNDER HERE
Promise.all(images.map(loadImage))
  .then(images =>
    images.reduce(
      (prom, image) =>
        prom.then(() =>
          appendElement(image)
            .then(image => animatePositions(image, 1, positions))
            .then(image => removeElement(image))
        ),
      Promise.resolve()
    )
  )
  .then(() => alert("DONE"));
