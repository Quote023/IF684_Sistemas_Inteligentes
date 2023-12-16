class AStar extends BuscaBase {

  constructor(terrainCosts) {
    super(terrainCosts);
    this.pq = new PriorityQueue();
    this.pais = [];
  }

}