
var human = new render.DisplayObjectContainer();
human.x = -50;
human.y = -120;
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x = 10;
head.y = 0;
var trunk = new render.Bitmap();
trunk.x = 15;
trunk.y = 65;
var left_arm = new render.Bitmap();
left_arm.x = 70;
left_arm.y = 45;
var right_arm = new render.Bitmap();
right_arm.x = 0;
right_arm.y = 45;
var left_leg = new render.Bitmap();
left_leg.x = 60;
left_leg.y = 100;
var right_leg = new render.Bitmap();
right_leg.x = 40;
right_leg.y = 100;

head.source = "head.png";
trunk.source = "body.png";
left_arm.source = "L_arm.png";
right_arm.source = "R_arm.png";
left_leg.source = "L_leg.png";
right_leg.source = "R_leg.png";

humanContainer.addChild(human);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(head);
human.addChild(trunk);
human.addChild(left_arm);
human.addChild(right_arm);

var renderCore = new render.RenderCore();

renderCore.start(humanContainer, ["L_leg.png", "R_leg.png", "head.png", "body.png","L_arm.png","R_arm.png"]);
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x = 100;
head.source = "wander-icon.jpg";
humanContainer.addChild(head);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);

class HumanBody extends Body {
    
    
    vx:number = 5;
    

    onTicker(duringTime: number) {
        this.x = 100;//+= duringTime * this.vx;
        this.y = 100;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);










