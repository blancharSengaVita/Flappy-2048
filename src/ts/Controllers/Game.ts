import {Canvas} from "../framework-2023/Canvas";
import {settings} from "../settings";
import {Background} from "../Models/Background";
import {Animate} from "../framework-2023/Animate";
import {Wall} from "../Models/Wall";
import {Birdie} from "../Models/Birdie";
import {GameStatus} from "../framework-2023/Types/GameStatus";
import {Score} from "../framework-2023/GameDisplay/Score";

export class Game {

    private readonly backgroundCanvas: Canvas
    private background: Background;
    private wallCanvas: Canvas;
    private wall: Wall;
    private itemSize: number;
    private readonly animation: Animate;
    private birdieCanvas: Canvas;
    private birdie: Birdie;
    private gameStatus: GameStatus;
    private score: Score;

    constructor() {
        this.gameStatus = {start: false}
        this.score = new Score(document.querySelector(settings.score.selector));
        this.backgroundCanvas = new Canvas(document.querySelector(settings.background.selector), {
            height: settings.dimensions.height,
            width: settings.dimensions.width
        });
        this.background = new Background(this.backgroundCanvas);

        this.background.draw();

        this.itemSize = Math.trunc((this.backgroundCanvas.height - (settings.background.gap * 5)) / settings.background.numberOfItemsPerLine);
        this.birdieCanvas = new Canvas(document.querySelector(settings.birdie.selector), {
            height: settings.dimensions.height,
            width: settings.dimensions.width
        });
        this.birdie = new Birdie(this.birdieCanvas, this.itemSize);
        this.wallCanvas = new Canvas(document.querySelector(settings.wall.selector), {
            height: settings.dimensions.height,
            width: settings.dimensions.width
        })
        this.wall = new Wall(this.wallCanvas, this.itemSize, this.birdie, this.score, this.gameStatus);

        this.wall.draw();


        this.animation = new Animate(this.gameStatus);
        this.animation.registerForAnimation(this.wall);
        this.animation.registerForAnimation(this.birdie);
        this.birdie.draw();
        // this.animation.start();

        this.addEventListener();
    }


    private addEventListener() {
        addEventListener('keyup', (e) => {
            if (!this.gameStatus.start) {
                this.wall.reset();
                this.birdie.clear();
                this.birdie.reset();
                this.gameStatus.start = true;
                this.animation.start();
            } else {
                e.preventDefault();
                this.birdie.goUp();
            }
        });

    }
}