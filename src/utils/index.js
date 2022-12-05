export const buildSnakeSpaces = (snakePlaces, height, width, snakeNumber) => {
    let snakeTotal = 0;
    while(snakeTotal < snakeNumber){
        let randomX = Math.floor(Math.random() * width);
        let randomY = Math.floor(Math.random() * height);

        if(!snakePlaces[randomX][randomY].isSnake){
            snakePlaces[randomX][randomY].isSnake = true;
            snakeTotal++;
        }
    }
    return snakePlaces;
};

export const buildNumberSpaces = (i, j, data, height, width) => {
    let neighbours = [];
    const surroundings = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    surroundings.forEach(([x, y]) => {
        const newX = i + x;
        const newY = j + y;
        if(newX >= 0 && newX < width && newY >= 0 && newY < height){
            neighbours.push(data[newX][newY]);
        }
    });
return neighbours;

};

export const buildNeighbours = (data, height, width) => {
    let copy = data;
    for(let i = 0; i < width; i++){
        for(let j = 0; j < width; j++){
            let snakes = 0;
            const area = buildNumberSpaces(data[i][j].x, data[i][j].y, data, height, width)
            area.map((value)=> {
                if(value.isSnake){
                    return snakes++;
                }
                return 0;
            })
            copy[i][j].neighbours = snakes;
        }
    }
    return copy;
}