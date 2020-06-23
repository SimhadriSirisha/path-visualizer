import React from 'react';
import './Navigation.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const Navigation = ({handleGenerateMaze,visualizeDijkstra,handleClearMaze,handleClearPath}) => {

	return (
		<div className = 'content'>
			<div className='ph3'>
				<button className ='br3 grow pa3 b pointer custom'> HELP </button>
			</div>
			<div className='ph3'>
				<button className ='br3 grow pa3 b pointer custom' onClick = {handleGenerateMaze} > GENERATE MAZE </button>
			</div>
			<div className='ph3'>
				<button className ='br3 grow pa3 b pointer custom' onClick = {handleClearMaze}> CLEAR MAZE </button>
			</div>
			<div className='ph1'>
				<DropdownButton id="dropdown-basic-button" title=" Algorithm: BFS " bsPrefix = "br3 grow pa3 b pointer custom">
  					<Dropdown.Item href="#"> BFS </Dropdown.Item>
  					<Dropdown.Item href="#"> DFS </Dropdown.Item>
  					<Dropdown.Item href="#"> Dijkstra </Dropdown.Item>
				</DropdownButton>
			</div>
			<div className='ph3'>
				<button className ='br3 grow pa3 b pointer custom' onClick = {visualizeDijkstra}> VISUALIZE </button>
			</div>
			<div className='ph3'>
				<button className ='br3 grow pa3 b pointer custom' onClick = {handleClearPath}> CLEAR PATH </button>
			</div>
			<div className='ph3'>
				<button className ='br3 grow pa3 b pointer custom'> ADD WEIGHT </button>
			</div>
		</div>
	)
}

export default Navigation;