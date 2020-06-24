import React, {Component} from 'react';
import './App.css';
import Node from './Node/Node';
import Navigation from './Navigation/Navigation';
import {dijkstra,getNodesInShortestPathOrder} from './Algorithms/dijkstra';
import {bfs,getNodesInShortestPathOrderBfs} from './Algorithms/bfs';


    // isStart
    // isFinish
    // isWall(bool)
    // isVisited(bool)
    // distance
    // prevNode


const START_NODE_ROW = 8;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const threshold = 0.1;

const getInitialGrid = () => {
  const grid = [];
  for(let row=0;row<18;row++){
    const currRow = [];
    for(let col=0;col<50;col++){
      currRow.push(createNode(col,row));
    }
    grid.push(currRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    isVisited: false,
    distance: Infinity,
    prevNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  }
  newGrid[row][col]=newNode;
  return newGrid;
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      visitedNodesInOrder: [],
      choice: 'BFS'
    }
  }

  componentDidMount(){
    const grid = getInitialGrid();
    this.setState({grid});
  }


  //loads the choice
  loadChoice = (choice) => {
    this.setState({choice});
  }


  //handlers for mouse events
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }


   // function to clear path
  animateClearPath(){
    const {visitedNodesInOrder} = this.state;
    console.log(visitedNodesInOrder);
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      if(!node.isStart && !node.isFinish){
        document.getElementById(`node-${node.row}-${node.col}`).className ='node clear';
      }
    }
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className ='node node-start';
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className ='node node-finish';
  }

  handleClearPath = (event) => {
    console.log('clearPath')
    const {grid} = this.state;
    for (let i=0;i<18;i++) {
      for (let j=0;j<50;j++) {
        grid[i][j].isVisited = false;
        grid[i][j].distance = Infinity;
      }
    }
    this.animateClearPath();
    this.setState({grid});
  }


  // function to clear the maze
  handleClearMaze = (event) => {
    console.log('clickkk ');
    const {grid} = this.state;
    for (let i=0;i<18;i++) {
      for (let j=0;j<50;j++) {
        grid[i][j].isWall = false;
        grid[i][j].isVisited = false;
        grid[i][j].distance = Infinity;
      }
    }
    this.setState({grid});
  }


  // function to generate maze
  handleGenerateMaze = (event) => {
    console.log('click');
    console.log("clearmaze func calling through handleGenerateMaze")
    this.handleClearMaze();
    const {grid} = this.state;
    const newGrid = [];
    for (let i=0;i<18;i++) {
      for (let j=0;j<50;j++) {
        if (i === 0 || j === 0 || i === 17 || j === 49) {
          grid[i][j].isWall = true;
          newGrid.push(grid[i][j]);
        }
        else if(i % 2 === 0 && j % 2 === 0 ) {
          if(Math.random()>threshold){
            grid[i][j].isWall = true;
            newGrid.push(grid[i][j]);
            let a = Math.random() < 0.5 ? 0 : (Math.random() < 0.5 ? -1 : 1);
            let b = a !== 0 ? 0 : (Math.random() < 0.5 ? -1 : 1);
            grid[i+a][j+b].isWall = true;
            newGrid.push(grid[i+a][j+b]);
          }
        }
      }
    }
    this.setState({grid});
  }


  //visual animation 
  animateAlgorithm(nodesInShortestPathOrder) {
    const {visitedNodesInOrder} = this.state;
    console.log("in visual animation Algorithm");
    console.log(visitedNodesInOrder);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    console.log('called animateShortestPath');
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }


  //Dijkstra Algorithm
  visualizeDijkstra = () =>{
    const {grid} = this.state;
    console.log("in visual dijkstra Algorithm");
    this.handleClearPath();
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.setState({visitedNodesInOrder});
    this.animateAlgorithm(nodesInShortestPathOrder);
  }


  // Bfs Algorithm
  visualizeBfs = () => {
    const {grid} = this.state;
    console.log("in visual bfs Algorithm");
    this.handleClearPath();
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    console.log("before setting state:" , visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBfs(finishNode);
    this.setState({visitedNodesInOrder});
    console.log("before setting state:" , this.state.visitedNodesInOrder);
    this.animateAlgorithm(nodesInShortestPathOrder);
  }

  // visualize algorithm 
  visualizeAlgorithm = () => {
    const {choice} = this.state;
    if(choice === 'BFS')
      this.visualizeBfs();
    else if(choice === 'Dijkstra')
      this.visualizeDijkstra();
  }

  render(){
    const {grid, mouseIsPressed} = this.state;
    return (
      <div>
        <h1 className="heading f1 georgia washed-yellow">PATH FINDING VISUALIZER</h1>
        <Navigation 
          handleGenerateMaze={this.handleGenerateMaze}
          handleClearMaze = {this.handleClearMaze}
          handleClearPath = {this.handleClearPath}
          visualizeAlgorithm = {this.visualizeAlgorithm}
          loadChoice = {this.loadChoice}/>
        <div className="App grid">
          {
            grid.map((row,rowIdx) => {
              return(
                <div className= "set-margin" key={rowIdx} >
                  {
                    row.map((node,nodeIdx) => {
                      const {row,col,isStart,isFinish,isWall} = node;
                      return (
                        <Node 
                          key={nodeIdx}
                          col={col}
                          row = {row}
                          isFinish = {isFinish}
                          isStart = {isStart}
                          isWall = {isWall}
                          mouseIsPressed = {mouseIsPressed}
                          onMouseDown = {(row, col) => {
                            this.handleMouseDown(row, col)
                          }}
                          onMouseEnter = {(row, col) => {
                            this.handleMouseEnter(row,col)
                          }}
                          onMouseUp = {() => this.handleMouseUp()}
                        ></Node>
                      );
                    })
                  }
                </div>
              );
            })
          }  
        </div>
      </div>
    );
  }
}

export default App;