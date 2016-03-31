module game {


}

var human = new render.DisplayObjectContainer();
human.x = -50;
human.y = -120;
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x = 10;
head.y = 0;
var trunk = new render.Bitmap();
trunk.x = 20;
var left_arm = new render.Bitmap();
left_arm.x = -10;
left_arm.y = 30;
var right_arm = new render.Bitmap();
right_arm.x = 95;
right_arm.y = 30;
var left_leg = new render.Bitmap();
left_leg.x = 0;
left_leg.y = 130;
var right_leg = new render.Bitmap();
right_leg.x = 60;
right_leg.y = 120;

head.source = "head.png";
trunk.source = "body.png";
left_arm.source = "L_arm.png";
right_arm.source = "R_arm.png";
left_leg.source = "L_leg.png";
right_leg.source = "R_leg.png";

humanContainer.addChild(human);
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(head);
human.addChild(trunk);

var renderCore = new render.RenderCore();

renderCore.start(humanContainer, ["L_arm.png","R_arm.png", "L_leg.png", "R_leg.png", "head.png", "body.png"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x += this.vx*duringTime;
         this.rotation += Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200; 
ticker.start([body]);
