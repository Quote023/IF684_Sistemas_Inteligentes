let grid;
let indiceAlgoritmo = undefined;
let trocarAlgoritmo = false;
let agente;
let algoritmo;
let iteracao = 0;
const ALGORITMOS = [
  AStar,
  BFS,
  DFS,
  GS,
  UCS
]

function setup() {
  grid = new Grid(N_LINHAS, N_COLS, TAM_CELS, CORES_TERRENO, CUSTO_TERRENO);
  grid.display();
}

function draw() {
  //Nenhum algoritmo definido = n fazer nada.
  if (indiceAlgoritmo === undefined) return;
  if (trocarAlgoritmo) {
    agente = new Agente(grid.inicio.x, grid.inicio.y)
    algoritmo = new ALGORITMOS[indiceAlgoritmo](grid.terreno);
  }
  if (iteracao === 0) {
    const caminho = algoritmo.buscarCaminho(grid.inicio, grid.fim);
    agente.definirCaminho(caminho);
  }

  grid.display();
  if (iteracao >= 1) algoritmo.display(grid.cellSize);
  if (iteracao >= 2) agente.percorrerCaminho();
  if (agente.pos.x !== grid.fim.x || agente.pos.y !== grid.fim.y) return;

  grid.novoFim();
  iteracao = 0;
}