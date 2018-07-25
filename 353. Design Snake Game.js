/**
Design a Snake game that is played on a device with screen size = width x height. Play the game online if you are not familiar with the game.

The snake is initially positioned at the top left corner (0,0) with length = 1 unit.

You are given a list of food's positions in row-column order. When a snake eats the food, its length and the game's score both increase by 1.

Each food appears one by one on the screen. For example, the second food will not appear until the first food was eaten by the snake.

When a food does appear on the screen, it is guaranteed that it will not appear on a block occupied by the snake.

Example:
Given width = 3, height = 2, and food = [[1,2],[0,1]].

Snake snake = new Snake(width, height, food);

Initially the snake appears at position (0,0) and the food at (1,2).

|S| | |
| | |F|

snake.move("R"); -> Returns 0

| |S| |
| | |F|

snake.move("D"); -> Returns 0

| | | |
| |S|F|

snake.move("R"); -> Returns 1 (Snake eats the first food and right after that, the second food appears at (0,1) )

| |F| |
| |S|S|

snake.move("U"); -> Returns 1

| |F|S|
| | |S|

snake.move("L"); -> Returns 2 (Snake eats the second food)

| |S|S|
| | |S|

snake.move("U"); -> Returns -1 (Game over because snake collides with border)
 */
/**
 * Algorithm: deque + set
 * 1. Map 2D info into 1D by head = rowHead * width + colHead
 * 2. Declare a deque to store head, deque[0] => head, deque[-1] => tail
 * 3. Declare a set to store same copy head for O(1) look up for eating body case
 * 
 */
/**
 * Initialize your data structure here.
        @param width - screen width
        @param height - screen height 
        @param food - A list of food positions
        E.g food = [[1,1], [1,0]] means the first food is positioned at [1,1], the second is at [1,0].
 * @param {number} width
 * @param {number} height
 * @param {number[][]} food
 */
class SnakeGame {
    constructor(width, height, food) {
        this.width = width;
        this.height = height;
        this.food = food;
        this.set = new Set();
        this.set.add(0);
        this.body = [];
        this.body.push(0);
        this.score = 0;
        this.foodIndex = 0;
    }

    /**
     * Moves the snake.
            @param direction - 'U' = Up, 'L' = Left, 'R' = Right, 'D' = Down 
            @return The game's score after the move. Return -1 if game over. 
            Game over when snake crosses the screen boundary or bites its body. 
     * @param {string} direction
     * @return {number}
     */
    move(direction) {
        // case 0: game over, do nothing
        if (this.score === -1) {
            return -1;
        }

        // compute new head
        let rowHead = Math.floor(this.body[0] / this.width);
        let colHead = this.body[0] % this.width;

        switch (direction) {
            case "U" : rowHead -= 1;
                        break;
            case "D" : rowHead += 1;
                        break;
            case "L" : colHead -= 1;
                        break;
            default : colHead += 1;
        }

        let head = rowHead * this.width + colHead;

        // case 1: out of boundary or eating body
        // new head is legal to be in old tail's position, remove it from set temporarily
        this.set.delete(this.body[this.body.length-1]); 
        if (rowHead < 0 || rowHead === this.height || colHead < 0 || colHead === this.width || this.set.has(head)) {
            this.score = -1;
            return this.score;
        }

        // add head for case2 and case3
        this.set.add(head);
        this.body.unshift(head);

        // case2: eating food, keep tail, add head
        if (this.foodIndex < this.food.length && rowHead === this.food[this.foodIndex][0] && colHead === this.food[this.foodIndex][1]) {
            // old tail does not change, so add it back to set
            this.set.add(this.body[this.body.length-1]);
            this.foodIndex += 1;
            this.score += 1;
            return this.score;
        }

        // case3: normal moce, remove tail, add head
        this.body.pop();
        return this.score;
    }
}