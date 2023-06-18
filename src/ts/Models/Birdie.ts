import {Canvas} from "../framework-2023/Canvas";
import {Square} from "../framework-2023/shapes/Square";
import {Animatable} from "../framework-2023/Types/Animatable";
import {ISquare} from "../framework-2023/Types/ISquare";
import {settings} from "../settings";

export class Birdie extends Square {
    protected readonly canvas: Canvas;
    private itemSize: number;
    private velocity: number;
    private gravity: number;
    private lift: number;

    constructor(canvas: Canvas, itemSize: number) {
        super({
            canvas: canvas,
            color: settings.wall.backgroundColor,
            position: {
                x: settings.background.gap,
                y: canvas.width / 2 - itemSize / 2
            },
            side: itemSize
        });
        this.canvas = canvas;
        this.itemSize = itemSize;
        this.velocity = 0;
        this.gravity = settings.birdie.gravity;
        this.lift = settings.birdie.lift
    }

     update() {
        this.velocity += this.gravity
        this.velocity *= settings.birdie.velocityConstraint;
        this.position.y += this.velocity;
        this.position.y = Math.trunc(this.position.y);
    }

    goUp() {
        this.velocity += this.lift;
    }

    reset(){
        this.position.y =  this.canvas.width / 2 - this.itemSize / 2;
    }
}


