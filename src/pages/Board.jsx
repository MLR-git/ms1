//Utility Imports
import { React, useState, useEffect } from "react";
import { buildSnakeSpaces, buildNeighbours, showEmptyCells } from "../utils";
import produce from 'immer';
//Image Imports
import snek from "../images/Snek.png";
import sand from "../images/PixelSand.png";
import nug from "../images/Gold Nug.png";
import gotNug from "../images/GotNug.png";
//Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
//Component Imports
import Cell from '../Components/Cell';

const Board = () => {
//Specify the parameters of the gameboard
    const setup = {width: 10, height: 10, snakes: 20};

//Create a virtual gameboard as a 2D array using these parameters
    const gameboard = () => {
        const {width, height, snakes} = setup;
        //Create a 1D array of length width
        //and fill it with
        //a map of elements which are unspecified because
        const grid = Array(width).fill().map((_,indexH) => 
            //they are new arrays of the length height
            //filled with
            //a map of elements which are specified as objects
            Array(height).fill().map((_,indexW) => ({
                //with the parameters of x location, y location, snake status, and neighbouring snake #
                x: indexH,
                y: indexW,
                isSnake: false,
                neighbours: 0,
                isRevealed: false,
                isPoint: true,
                isFlagged: false
            }))
        );
        //Then, build the grid out of the two arrays with utility functions
        let snakeArray = buildSnakeSpaces(grid, height, width, snakes);
        let neighbourArray = buildNeighbours(snakeArray, height, width);
        return neighbourArray;
    };


//Execute the gameboard function to realize the gameboard in UI
    const [grid, setGrid] = useState(() => gameboard(setup));
    
//Score value
/* localStorage?
    const [score, setScore] = useState(
        JSON.parse(localStorage.getItem("score")) || 0
    );
      
    useEffect(() => {
        localStorage.setItem("score", JSON.stringify(score));
    }, [score]);    
*/
//Regular
const [score, setScore] = useState(0);
const scoreStyle = {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    
    backgroundImage: 'url(' + require('../images/Gold Nug.png') + ')', 
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center", 
    height: "100%",
    
    fontWeight: "bold",
    fontSize: "125%"
}

const [gameStatus, setGameStatus] = useState("Dig to unearth gold nuggets! Careful for snakes!");

//Player Inputs
    //Left Click
    const leftClick = (event, x, y) => {
        event.preventDefault();
        //If space is already revealed, just exit
        if(grid[x][y].isRevealed || grid[x][y].isFlagged || gameStatus == "Death by Snake! Try a new digsite.") return;
        //Update the grid...
        const updatedGrid = produce(grid, (draft) => {
            //Reveal clicked space
            Object.assign(draft[x][y], {isRevealed: true});
            
            /*
            if(draft[x][y].isEmpty){
                showEmptyCells(setup.height, setup.width, x, y, draft); 
            }
            */
            //If the space has not been clicked before, add point
            if(!draft[x][y].isSnake && draft[x][y].isPoint){
                setScore(score + 1);
            }
            //Remove the point from clicked space
            Object.assign(draft[x][y], {isPoint: false});
        });
        setGrid(updatedGrid);

        if(updatedGrid[x][y].isSnake){
            return setGameStatus("Death by Snake! Try a new digsite.");
        }
    };

    //Right Click
    const rightClick = (event, x, y) => {
    event.preventDefault();
    if(grid[x][y].isRevealed) return;
    const updatedGrid = produce(grid, (draft) => {
        draft[x][y].isFlagged = !draft[x][y].isFlagged;
    });
    setGrid(updatedGrid);
    }

    //Reset Board
    const newDig = (e, setup) => {
        e.preventDefault();
        setGameStatus("Dig to unearth gold nuggets! Careful for snakes!");
        setScore(0);
        setGrid(gameboard(setup));
    }

   

    
//UI
    return (
    <div style={{backgroundImage: 'url(' + require('../images/PixelSand.png') + ')', backgroundPosition: "top center", height: "90%"}}>
        <Container fluid>
            <Row style={{backgroundColor: "yellow"}}>
                <Col style={{textAlign: "center"}}>
                    <h1>Desert Treasure!</h1>
                </Col>
            </Row>
            <Row>
                <Col style={{height:"75px"}}>
                    <table style={{width: "100%", height:"100%"}}>
                        <tr>
                            <td style={{width: "33.333%"}}>
                                <div style={scoreStyle}>
                                    &nbsp;{score}
                                </div>
                            </td>
                            <td style={{width: "33.333%", textAlign: "center"}}>
                                <Button variant="primary" onClick={(e)=> newDig(e, setup)}>New Digsite</Button>
                            </td>
                            <td style={{width: "33.333%", textAlign: "center", height: "100%", backgroundColor: "white", borderRadius:"10px"}}>
                                {gameStatus}
                            </td>
                        </tr>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col>
                <div style={{display: 'grid', 
                    gridTemplateColumns: `repeat(${setup.width}, 50px)`, 
                    gridTemplateRows: `repeat(${setup.height}, 50px)`,
                    textAlign: "center", 
                    justifyContent: "center"
                    }}>
                {
                    grid.map((row, i)=> row.map((col, j)=> (
                        <Cell onLClick={(e, i, j) => leftClick(e, i, j)} 
                        onRClick={(e, i, j) => rightClick(e, i, j)} 
                        key={`${i}-${j}`} 
                        col={col} i={i} j={j} snek={snek} gotNug={gotNug}/>
                    )))
                }
                </div>
                </Col>
            </Row>
            <Row>
                <Col style={{marginTop: "10px"}}>
                <h1 style={{width: "100%", textAlign: "center", textDecoration: "underlined", backgroundColor: "yellow", margin: "0"}}>
                    Leaderboard
                </h1>
                </Col>
            </Row>
        </Container>
    </div>
    );
};

export default Board;