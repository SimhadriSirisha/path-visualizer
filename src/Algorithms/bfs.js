export function bfs(grid, startNode, finishNode){
	const visitNodesInOrder = [], queue = [];
	startNode.isVisited = true;
	queue.push(startNode);
	while(queue.length){
		const currNode = queue.shift();
		if (currNode.isWall === true) continue;
		visitNodesInOrder.push(currNode);
    console.log("after pushing nodes : ",visitNodesInOrder);
		if (currNode === finishNode) return visitNodesInOrder;
		getUnvisitedNeighbours(currNode, grid, queue);
	}
}

function getUnvisitedNeighbours(node, grid, queue) {
  let neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  neighbors = neighbors.filter(neighbor => !neighbor.isVisited);
  for (let neighbor of neighbors){
  	neighbor.prevNode = node;
  	neighbor.isVisited = true;
  	queue.push(neighbor);
  }
}

export function getNodesInShortestPathOrderBfs(finishNode) {
	console.log('finishNode = ',finishNode);
	const nodesInShortestPathOrder = [];
	let currentNode = finishNode;
    while (currentNode !== null) {
  		console.log(currentNode.row,' ',currentNode.col);
    	nodesInShortestPathOrder.unshift(currentNode);
    	currentNode = currentNode.prevNode;
  	}
    return nodesInShortestPathOrder;
}
