export function dijkstra(grid, startNode, finishNode){
	const visitNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = getAllNodes(grid);
	while(unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift();
		if (closestNode.isWall === true) continue;
		if (closestNode.distance === Infinity) return visitNodesInOrder;
		closestNode.isVisited = true;
		visitNodesInOrder.push(closestNode);
		if (closestNode === finishNode) return visitNodesInOrder;
		updateUnvisitedNeighbors(closestNode, grid);
	}
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.prevNode = node;
  }
}

function sortNodesByDistance(unvisitedNodes){
	unvisitedNodes.sort((nodeA,nodeB) => nodeA.distance - nodeB.distance)
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}


// Backtracks from the finishNode to find the shortest path
export function getNodesInShortestPathOrder(finishNode) {
	console.log('finishNode = ',finishNode);
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  let c=0;
  while (currentNode !== null) {
  	console.log(c);
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.prevNode;
    c+=1;
  }
  return nodesInShortestPathOrder;
}
