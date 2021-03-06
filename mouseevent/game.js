var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
renderCore.start(humanContainer, ["L_leg.png", "R_leg.png", "head.png", "body.png", "L_arm.png", "R_arm.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
        this.vrotation = Math.PI / 2;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.rotation += this.vrotation * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200;
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var isHead = 0;
var ClickedHead = false;
var isLeg = 0;
var ClickedLeg = false;
var headHitTest = function (localPoint, displayObject) {
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    console.log(localPoint);
    if (localPoint.x <= Math.abs(displayObject.x * 6) && localPoint.y <= Math.abs(displayObject.y) &&
        localPoint.x > 0 && localPoint.y > 0) {
        isHead += 1;
        ClickedHead = true;
    }
    return ClickedHead;
};
var LegHitTest = function (localPoint, displayObject) {
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);
    console.log(localPoint);
    if (localPoint.x > 0 && localPoint.x <= Math.abs(displayObject.x * 2) && localPoint.y > 0 && localPoint.y < Math.abs(displayObject.y * 2)) {
        isLeg += 1;
        ClickedLeg = true;
    }
    return ClickedLeg;
};
var HeadOnClick = function () {
    if (isHead == 1) {
        if (body.vx != 0) {
            body.vx *= -1;
            body.vrotation *= -1;
        }
        if (body.vx == 0) {
            isHead = 0;
        }
    }
    if (isHead != 1) {
        body.vx = 5;
        body.vrotation = Math.PI / 2;
        isHead = 0;
    }
    ClickedHead = false;
    console.log("clickhead:" + isHead);
};
var LegOnClick = function () {
    if (isLeg == 1) {
        body.vx = 0;
        body.vrotation = 0;
        body.rotation = 0;
    }
    if (isLeg >= 1) {
        isLeg = 0;
    }
    ClickedLeg = false;
    console.log("clickleg:" + isLeg);
};
eventCore.register(head, headHitTest, HeadOnClick);
eventCore.register(left_leg, headHitTest, LegOnClick);
eventCore.register(right_leg, headHitTest, LegOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ2hELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDZCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ2YsSUFBSSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztBQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMvQixJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNaLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDYixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNiLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2pCLElB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