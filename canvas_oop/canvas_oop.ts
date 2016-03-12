/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 10;

    color = '#FF5566';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
        context.font = "40px Arial bold";
        context.fillStyle = '#FFFFFF';
        context.fillText('13081216', 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


// var rect = new Rect();
// rect.width = 400;
// rect.height = 100;
// rect.color = '#00FF00'


// var rect2 = new Rect();
// rect2.width = 300;
// rect2.height = 50;
// rect2.x = 200;
// rect2.y = 200;
// rect2.rotation = Math.PI / 8;
// rect2.color = '#00FFFF'

var text = new TextField();
text.x = 10;


var bitmap2 = new Bitmap();
bitmap2.source = 'logo.png';
bitmap2.x=70;
bitmap2.y=600;

var bitmap3 = new Bitmap();
bitmap3.source = 'start.png';
bitmap3.x=270;
bitmap3.y=880;

var bitmap4 = new Bitmap();
bitmap4.source = 'bg.png';




//button
var rect = new Rect();
rect.x = 430;
rect.y = 600;
rect.width = 150;
rect.height = 50;

var text2 = new TextField();
text2.x = 450;
text2.y = 610;

//渲染队列
var renderQueue = [bitmap4,bitmap2,bitmap3];
//资源加载列表
var imageList = ['bg.png','logo.png','start.png',text];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})