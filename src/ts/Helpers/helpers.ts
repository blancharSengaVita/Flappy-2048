import {Position} from "../framework-2023/Types/Position";

export function detectSquareCollision(rect1: Position, rect2: Position, size: number): boolean {
    return rect1.x < rect2.x + size &&
        rect1.x + size > rect2.x &&
        rect1.y < rect2.y + size &&
        size + rect1.y > rect2.y;
}