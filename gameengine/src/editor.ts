
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;
        public stroke:render.Bitmap;
        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 800;
            this.cache.height = 600;
            this.stroke=new render.Bitmap("box2.jpg","box2");

        }
        getChild(row:number,col:number){
            var rows=mapData.length;
            var cols=mapData[0].length;
            return this.children[row*cols+col];
        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }
    export class Mapdata{
        material:string;
        walkable:number;
        constructor(material,walkable){
            this.material=material;
            this.walkable=walkable;
        }
    }
 

    export class Material{
        material:render.Bitmap;
        walkable:number;
        constructor(source:string,name:string,walkable:number) {
            this.material=new render.Bitmap(source,name);
            this.walkable=walkable;

        }
        public setWalkable(walkable:number){
            this.walkable=walkable;
        }
        public IsWalkableMaterial():number{
            return this.walkable;
        }

        
    }
    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;
        public walkable: number;
        public material: Material;


        constructor() {
            super("road1.jpg","Tile");
        }

        public setWalkable(value) {
            if(value==0){
                this.material=new Material("road1.jpg","road",value);
            }
            else{
                this.material=new Material("box1.jpg","box",value);
            }
            this.source=this.material.material.source;
            this.name=this.material.material.name;
            this.walkable=value;
        }
        public setMaterial(material:Material){
           this.material=material;
          
           this.source=this.material.material.source;
           this.name=this.material.material.name;
           this.walkable=this.material.walkable;
           
        }
        public toString():string{
            if(this.material.material.name
            ){
            return "row:"+this.ownedRow+"\ncol:"+this.ownedCol+"\nwalkable:"+this.walkable+"\nmaterial:"+this.material.material.name;}
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {

        currentmaterial:Material;

  
        constructor(materials:editor.Material[]){
            super();


            var materialradio=new ui.MaterialRadio(materials);
            materialradio.radiobuttons[0].text="road";
            materialradio.radiobuttons[1].text="box";
            materialradio.radiobuttons[2].text="bar";
            
            var walkableradio=new ui.WalkableRadio(materials);
            walkableradio.radiobuttons[0].text="可走";
            walkableradio.radiobuttons[1].text="不可走";
            
            this.currentmaterial=materialradio.setMaterial;

            var submit=new ui.Button("确认");
            submit.height=50;
            submit.y=280;
            var save=new ui.Button("保存");
            save.height=50;
            save.x=120;
            save.y=280;
            submit.onClick=()=>{
                if(currenttile){
                var rows = mapData.length;
                var cols = mapData[0].length;

                this.currentmaterial=materialradio.setMaterial;
                this.currentmaterial.walkable=walkableradio.walkable;
                
                var child=<editor.Tile>mapEditor.getChild(currenttile.ownedCol,currenttile.ownedRow);
                
                
               child.setMaterial(this.currentmaterial);
                information.Update(child);
                }
                else
                alert("请先选择网格！");
                

                
            }
            save.onClick=()=>{
                storage.saveFile(mapEditor);
               alert("保存成功！");
            }
            
            walkableradio.x=180;
            
            this.addChild(materialradio);
            this.addChild(walkableradio);
            this.addChild(submit);
            this.addChild(save);
        }
  
        
    
        
    }
}
