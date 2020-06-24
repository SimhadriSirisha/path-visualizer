import React from 'react';
import './Navigation.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			algo: 'BFS'
		}
	}

	handleChoice = (algo) => {
		this.setState({algo});
		this.props.loadChoice(algo);
	}

	render(){
		const {handleGenerateMaze,handleClearMaze,handleClearPath,visualizeAlgorithm} = this.props;
		const {algo} = this.state;
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
					<DropdownButton id="dropdown-basic-button" title={`Algorithm: ${algo}`} bsPrefix = "br3 grow pa3 b pointer custom">
	  					<Dropdown.Item href="#" bsPrefix="dropdown-item" onClick = {() => this.handleChoice('BFS')}> BFS </Dropdown.Item>
	  					<Dropdown.Item href="#" bsPrefix="dropdown-item" onClick = {() => this.handleChoice('DFS')}> DFS </Dropdown.Item>
	  					<Dropdown.Item href="#" bsPrefix="dropdown-item" onClick = {() => this.handleChoice('Dijkstra')}> Dijkstra </Dropdown.Item>
					</DropdownButton>
				</div>
				<div className='ph3'>
					<button className ='br3 grow pa3 b pointer custom' onClick = {visualizeAlgorithm}> VISUALIZE </button>
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
}

export default Navigation;