module ui {

    var eventCore: events.EventCore = events.EventCore.getInstance();

    export class Button extends render.DisplayObjectContainer {

        public onClick: Function;
        public get text(): string {
            return this._text;
        }

        public set text(value: string) {
            this._text = value;
            this.label.text = value;
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.background.width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this.background.height = value;
        }


        private background: render.Rect;
        private label: render.TextField;
        private _text: string = "label";



        constructor(text: string) {

            super();
            this.background = new render.Rect();
            this.background.width = this.width;
            this.background.height = this.height;
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.textAlign = "center";
            this.label.text = text
            this.addChild(this.background);
            this.addChild(this.label);

            eventCore.register(this, events.displayObjectRectHitTest, () => {
                if (this.onClick) {
                    this.onClick(this);
                }
            });


        }
        setColor(color: string) {
            this.background.color = color;
        }







    }
    export class RadioButton extends Button {
        checked: boolean
        constructor(text: string) {
            super(text);
            this.checked = false;
        }
        IsChecked() {
            return this.checked;
        }

    }
    export class Radio extends render.DisplayObjectContainer {
        radiobuttons: Array<RadioButton>;
        offsetx: number;
        offsety: number;
        num:number;
      
        constructor(num:number,materials:editor.Material[]) {
            super();
            this.radiobuttons = [];
            //this.offsetx=0;
            this.offsety = 10;
            this.num=num;
            for (var i = 0; i < this.num; i++) {
                this.radiobuttons.push(new RadioButton("NONAME"));
                                this.radiobuttons[i].height=50;
                //this.radiobuttons[i].x=(this.radiobuttons[i].width+this.offsetx)*i;
                this.radiobuttons[i].y = (this.radiobuttons[i].height + this.offsety) * i;

                
                this.addChild(this.radiobuttons[i]);
                
            }
        }
        Check(radiobutton:RadioButton) {
            this.radiobuttons.forEach(element => {
                if (element==radiobutton) {
                    element.checked=true;
                    element.setColor("#6fa8dc");

                }
                else {
                    element.checked=false;
                    element.setColor("#b1c8dd");
                }
            });
        }
    }
    export class MaterialRadio extends Radio{
        setMaterial:editor.Material;
        constructor(materials:editor.Material[]){
            super(materials.length,materials);
            this.Check(this.radiobuttons[0]);
             this.setMaterial=materials[0];
            for(var i=0;i < this.num;i++){
                this.radiobuttons[i].onClick = (evt) => {

                    //alert(this.radiobuttons.indexOf(evt));
                    this.setMaterial=materials[this.radiobuttons.indexOf(evt)];
                    this.Check(evt);
                }
            }
        }
    }
    export class WalkableRadio extends Radio{
        walkable:number;
        constructor(materials:editor.Material[]){
            super(2,materials);

             this.Check(this.radiobuttons[0]);
             this.walkable=0;
             this.radiobuttons[0].onClick=(evt)=>{
                 this.walkable=0;
                 this.Check(evt);
             }
             this.radiobuttons[1].onClick=(evt)=>{
                 this.walkable=1;
                 this.Check(evt);
             }
        }
    }
    export class Information extends render.DisplayObjectContainer{
        informations:Array<render.TextField>;
        constructor(){
            super();
            this.informations=[];
            for(var i=0;i < 4;i++){
            this.informations.push(new render.TextField());
            this.informations[i].height=30;
            this.informations[i].y=(this.informations[i].height+5)*i;
            this.informations[i].textAlign="left";
            this.addChild(this.informations[i]);
        }
            this.informations[0].text="行:--";
            this.informations[1].text="列:--";
            this.informations[2].text="可走性:--";
            this.informations[3].text="素材:--";
            
            
            
        }
        Update(tile:editor.Tile){
            this.informations[0].text="行:"+(tile.ownedRow+1);
            this.informations[1].text="列:"+(tile.ownedCol+1);
            this.informations[2].text="可走性:"+(tile.walkable==0?"可走":"不可走");
            this.informations[3].text="素材:"+tile.material.material.name;
        }
    }



}