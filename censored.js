;(function(global) {
  'use strict';

  function Censored(el) {

    var md = false;
    var er = false;

    var img = document.getElementById(el);

    img.onload = function() {
      var wrapper = document.createElement('div');
      wrapper.style.position = 'relative'
      var parent = img.parentNode;
      parent.insertBefore(wrapper, img);
      var canvas1 = document.createElement('canvas');
      canvas1.height = img.height;
      canvas1.width = img.width;
      canvas1.style.position = 'absolute';
      var ctx1 = canvas1.getContext('2d');
      ctx1.mozImageSmoothingEnabled = false;
      ctx1.webkitImageSmoothingEnabled = false;
      ctx1.imageSmoothingEnabled = false;
      var w = img.width * 0.1;
      var h = img.height * 0.1;
      ctx1.drawImage(img, 0, 0, w, h);
      ctx1.drawImage(canvas1, 0, 0, w, h, 0, 0, canvas1.width, canvas1.height);
      var canvas2 = document.createElement('canvas');
      canvas2.height = img.height;
      canvas2.width = img.width;
      canvas2.style.position = 'absolute';
      var ctx2 = canvas2.getContext('2d');
      ctx2.drawImage(img, 0, 0);
      var canvas3 = document.createElement('canvas');
      canvas3.height = img.height;
      canvas3.width = img.width;
      canvas3.style.position = 'absolute';
      var ctx3 = canvas3.getContext('2d');
      wrapper.appendChild(canvas1);
      wrapper.appendChild(canvas2);
      wrapper.appendChild(canvas3);
      parent.removeChild(img);

      canvas3.addEventListener('mousedown', function() {
        md = true;
      });

      canvas3.addEventListener('mouseup', function() {
        md = false;
      });

      canvas3.addEventListener('mousemove', function(e) {
        if (md) {
          if (er) {
            ctx3.clearRect(e.pageX - 20, e.pageY - 20, 40, 40);
          } else {
            ctx3.putImageData(ctx1.getImageData(e.pageX - 20, e.pageY - 20, 40, 40), e.pageX - 20, e.pageY - 20);
          }
        }
      });

      document.addEventListener('keydown', function(e) {
        if (e.altKey) {
          er = true;
        }
      });

      document.addEventListener('keyup', function(e) {
        er = false;
      });

    };

  }

  global.Censored = Censored;

})(window);
