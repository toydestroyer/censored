window.onload = function() {
  var md = false;
  var er = false;

  document.getElementById('eraser').onclick = function() {
    er = er ? false : true;
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var ctx2 = document.getElementById('canvas2').getContext('2d');
  var ctx3 = document.getElementById('canvas3').getContext('2d');
  var img = new Image();
  img.src = 'jobs.jpg';
  img.onload = function() {
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx2.drawImage(img, 0, 0);
    w = canvas.width * 0.1,
    h = canvas.height * 0.1;
    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
  }
  window.onmousedown = function() {
    md = true;
  }
  window.onmouseup = function() {
    md = false;
  }
  window.onmousemove = function(e) {
    if (md) {
      if (er) {
        ctx3.clearRect(e.pageX - 20, e.pageY - 20, 40, 40);
      } else {
        ctx3.putImageData(ctx.getImageData(e.pageX - 20, e.pageY - 20, 40, 40), e.pageX - 20, e.pageY - 20);
      }
    }
  }
}
