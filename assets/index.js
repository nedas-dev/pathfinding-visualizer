import DepthFirstPaths from './js/DepthFirstPaths.js'
import Graph from './js/Graph.js'

let graph = new Graph(13);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(0, 6);
graph.addEdge(0, 5);
graph.addEdge(6, 4);
graph.addEdge(4, 3);
graph.addEdge(4, 5);
graph.addEdge(3, 5);

graph.addEdge(7, 8);

graph.addEdge(9, 10);
graph.addEdge(9, 12);
graph.addEdge(9, 11);
graph.addEdge(11, 12);

let pathFinder = new DepthFirstPaths(graph, 6);
console.log(pathFinder.pathTo(3));
