window.onload = function () {
    var md = false;
    var er = false;
    document.getElementById('eraser').onclick = function(){
        console.log("er")
        er = er ? false : true;
    }
    var ctx = document.getElementById('canvas').getContext('2d');
    var ctx2 = document.getElementById('canvas2').getContext('2d');
    var ctx3 = document.getElementById('canvas3').getContext('2d');
    var img = new Image();
    img.src = 'jobs.jpg';
    img.onload = function(){
        ctx.drawImage(img,0,0);
        ctx2.drawImage(img,0,0);
        P = new Pixastic(ctx);
        P['mosaic']({blockSize : 8}).done(function() {

        });
        // ctx.drawImage(Pixastic.process(img, "mosaic", {blockSize:10}),0,0);
    }
    window.onmousedown = function(){
        md = true;
    }
    window.onmouseup = function(){
        md = false;
    }
    window.onmousemove = function(e) {
        if (md) {
            if(er){
                ctx3.clearRect(e.pageX-20,e.pageY-20,40,40);
            }else{
                ctx3.putImageData(ctx.getImageData(e.pageX-20,e.pageY-20,40,40),e.pageX-20,e.pageY-20);
            }
        }
    }
}
