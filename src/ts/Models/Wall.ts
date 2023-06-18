import {Canvas} from "../framework-2023/Canvas";
import {Square} from "../framework-2023/shapes/Square";
import {Random} from "../framework-2023/Helpers/Random";
import {settings} from "../settings";
import {Animatable} from "../framework-2023/Types/Animatable";
import {detectSquareCollision} from "../Helpers/helpers";
import {Birdie} from "./Birdie";
import {Score} from "../framework-2023/GameDisplay/Score";
import {GameStatus} from "../framework-2023/Types/GameStatus";

export class Wall implements Animatable{
    private readonly canvas : Canvas;
    private squares: Square[];
    private size: number;
    private hit: boolean;
    private value: number;
    private birdie: Birdie;
    private score: Score;
    private gameStatus: GameStatus;

    constructor(canvas: Canvas, size : number, birdie : Birdie, score:Score, gameStatus : GameStatus) {
        this.canvas = canvas;
        this.size = size;
        this.birdie = birdie;
        this.score = score;
        this.gameStatus = gameStatus;
        this.hit = false;
        this.initSquare();
    }


    private generateRandomNumberBetween1and10(){
        return Math.trunc(Random.nextInt(1, 11));
    }

    private initSquare(){
        const randomNumber = this.generateRandomNumberBetween1and10();
        this.squares = [];
        this.hit = false;


        switch(randomNumber){
            case 1 :
                this.value = settings.wall.maxValue;
                this.squares.push(new Square({canvas: this.canvas, color: settings.wall.backgroundColor, position: {x: this.canvas.width , y: this.canvas.height - this.size - settings.background.gap}, side: this.size}));

                this.squares.push(new Square({canvas: this.canvas, color: settings.wall.backgroundColor, position: {x: this.canvas.width , y: this.canvas.height - (this.size + settings.background.gap) * 2}, side: this.size}));
                break;
            case 2 :
                this.value = settings.wall.maxValue
                this.squares.push(new Square({canvas: this.canvas, color: settings.wall.backgroundColor, position: {x: this.canvas.width , y: settings.background.gap}, side: this.size}));

                this.squares.push(new Square({canvas: this.canvas, color: settings.wall.backgroundColor, position: {x: this.canvas.width , y: settings.background.gap + (settings.background.gap + this.size)}, side: this.size}));
                break;
            case 3 :
            case 4 :
            case 5 :
            case 6 :
                this.value = settings.wall.minValue;
                this.squares.push(new Square({canvas: this.canvas, color: settings.wall.backgroundColor, position: {x: this.canvas.width , y: settings.background.gap}, side: this.size}));
                break;
            case 7 :
            case 8 :
            case 9 :
            case 10 :
                this.value = settings.wall.minValue;
                this.squares.push(new Square({canvas: this.canvas, color: settings.wall.backgroundColor, position: {x: this.canvas.width , y: this.canvas.height - this.size - settings.background.gap}, side: this.size}));
                break;
        }
    }

    clear(): void {
        this.squares.forEach((square)=>{
            square.clear()
        })
    }

    draw(): void {
        this.squares.forEach((square)=>{
            square.draw();
            this.canvas.ctx.font = "bolder 48px helvetica";
            this.canvas.ctx.textAlign = "center";
            this.canvas.ctx.textBaseline = "middle";
            this.canvas.ctx.fillStyle = settings.wall.color;
            this.canvas.ctx.fillText(`+${this.value}`, square.position.x + (this.size/2), square.position.y + (this.size/2));
        })
    }

    update(): void {
        this.detectCollision();

        if (this.squares[0].position.x < -this.size){
            if (!this.hit){
                this.squares.forEach(()=>{
                    this.score.increment();
                });
            }
            this.initSquare();
        } else {
            this.squares.forEach((square)=>{
                square.position.x -= settings.wall.speed;
            })
        }
    }

    private detectCollision(){
        for (let i = 0; i < this.squares.length; i++){
            if (detectSquareCollision(this.squares[i].position, this.birdie.position, this.size)){
                this.gameStatus.start = false;
            }
        }
    }

    reset(){
        this.squares.forEach((square)=>{
            square.clear();
        });
        this.squares = []
        this.initSquare();
    }

}