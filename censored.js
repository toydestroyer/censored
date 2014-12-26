;(function(global) {
  'use strict';

  function Censored(el, ratio) {

    this.md = false;
    this.eraser = false;

    var img = document.getElementById(el);

    var t = this;

    t.toggleEraser = function(val) {
      t.eraser = val;
    };

    var canvas1 = document.createElement('canvas');
    var ctx1 = canvas1.getContext('2d');
    var canvas2 = document.createElement('canvas');
    var ctx2 = canvas2.getContext('2d');
    var canvas3 = document.createElement('canvas');
    var ctx3 = canvas3.getContext('2d');

    img.onload = function() {
      var wrapper = document.createElement('div');
      wrapper.style.position = 'relative'
      var parent = img.parentNode;
      parent.insertBefore(wrapper, img);
      canvas1.height = img.height;
      canvas1.width = img.width;
      canvas1.style.position = 'absolute';
      ctx1.mozImageSmoothingEnabled = false;
      ctx1.webkitImageSmoothingEnabled = false;
      ctx1.imageSmoothingEnabled = false;
      var w = img.width * (0.01 * ratio);
      var h = img.height * (0.01 * ratio);
      ctx1.drawImage(img, 0, 0, w, h);
      ctx1.drawImage(canvas1, 0, 0, w, h, 0, 0, canvas1.width, canvas1.height);
      canvas2.height = img.height;
      canvas2.width = img.width;
      canvas2.style.position = 'absolute';
      ctx2.drawImage(img, 0, 0);
      canvas3.height = img.height;
      canvas3.width = img.width;
      canvas3.style.position = 'absolute';
      wrapper.appendChild(canvas1);
      wrapper.appendChild(canvas2);
      wrapper.appendChild(canvas3);
      parent.removeChild(img);

    };

    canvas3.addEventListener('mousedown', function() {
      t.md = true;
    });

    canvas3.addEventListener('mousedown', mouseMoveEvent);

    canvas3.addEventListener('mouseup', function() {
      t.md = false;
    });

    canvas3.addEventListener('mousemove', mouseMoveEvent);

    function mouseMoveEvent(e) {
      if (t.md) {
        if (t.eraser) {
          ctx3.clearRect(e.layerX - 20, e.layerY - 20, 40, 40);
        } else {
          ctx3.putImageData(ctx1.getImageData(e.layerX - 20, e.layerY - 20, 40, 40), e.layerX - 20, e.layerY - 20);
        }
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.altKey) {
        t.toggleEraser(true);
      }
    });

    document.addEventListener('keyup', function(e) {
      t.toggleEraser(false);
    });

  };

  global.Censored = Censored;

})(window);
