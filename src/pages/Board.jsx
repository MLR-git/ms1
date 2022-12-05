import React from "react";
import { buildSnakeSpaces, buildNeighbours, buildNumberSpaces } from "../utils";
import snek from "../images/Snek.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Board = () => {
    const dimensions = {width: 10, height: 10};
    //Create a 1D array of length width
    const grid = Array(dimensions.width)
        //The fill method fills this array with the specified values
        .fill()
        //The map method goes over the elements and fills them with other elements
        .map((_,indexH) => 
            //Those elements being new arrays of the length height
            Array(dimensions.height)
                .fill()
                .map((_,indexW) => ({
                    x: indexH,
                    y: indexW,
                    isSnake: false,
                    neighbours: 0,
                }))
                );
    console.log('grid :>> ', grid)

    let snakeArray = buildSnakeSpaces(grid, dimensions.height, dimensions.width, 20);
    let neighbourArray = buildNeighbours(snakeArray, dimensions.height, dimensions.width);

    /*
    const snakeStyle = {
        backgroundImage: 'url(../../images/Snek.png)'
    }
    */
    return (
        
    <div>
        <Container fluid="md">
            <Row>
                <Col style={{textAlign: "center"}}>
                    <h1>
                        <Button variant="primary" style={{textAlign: "center"}}>New Dig</Button>
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{display: 'grid', 
                    gridTemplateColumns: `repeat(${dimensions.width}, 50px)`, 
                    gridTemplateRows: `repeat(${dimensions.height}, 50px)`,
                    textAlign: "center", 
                    justifyContent: "center"
                    }}>
                    {
                        neighbourArray.map((row, i)=> row.map((col, j)=> (
                        <div style={{ 
                        border: "1px solid black", 
                        placeContent: 'center center', 
                        display: 'flex', 
                        alignItems: 'center',
                        backgroundImage: 'url(' + require('../images/PixelSand.png') + ')',
                        fontSize: "140%",
                        color: "palegreen",
                        fontWeight: "bold",
                        }}>
                            {col.isSnake ? <img src={snek} alt="snek" width="90%"/> : `${col.neighbours ? col.neighbours : "" }`}
                        </div>
                        )))
                    }
                    </div>
                </Col>
            </Row>
        </Container>
    </div>);
};

export default Board;