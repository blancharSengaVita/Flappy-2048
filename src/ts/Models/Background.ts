import {Canvas} from "../framework-2023/Canvas";
import {Square} from "../framework-2023/shapes/Square";
import {settings} from "../settings";
import {Animatable} from "../framework-2023/Types/Animatable";

export class Background implements Animatable {
    private readonly canvas : Canvas;
    private readonly squares : Square[];
    private readonly sideLength : number;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.squares = [];
        this.sideLength = (canvas.height - (settings.background.gap*5)) /settings.background.numberOfItemsPerLine;

        for (let i = 0; i < settings.background.numberOfItemsPerLine; i++) {
            for (let j = 0; j < settings.background.numberOfItemsPerLine; j++) {
                this.squares.push(new Square({canvas: this.canvas, color: settings.background.color, position: {x:settings.background.gap + (i * this.sideLength) + (i * settings.background.gap), y:settings.background.gap + (j * this.sideLength) + (j * settings.background.gap)}, side:this.sideLength}));
            }
        }
    }

    draw(): void {
        this.squares.forEach((square)=>{
            square.draw();
        })
    }

    clear(): void {

    }

    update(): void {

    }


}