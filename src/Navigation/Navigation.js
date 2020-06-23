import React from 'react';
import './Navigation.css';

function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

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
			<div className='ph3 dropdown'>
				<button className ='dropbtn br3 grow pa3 b pointer custom'> ALGORITHM: BFS </button>
				<div class="dropdown-content" id="myDropdown" onClick = myFunction >
    				<a href="#"> BFS </a>
    				<a href="#"> DFS </a>
    				<a href="#"> Dijkstra </a>
  				</div>
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