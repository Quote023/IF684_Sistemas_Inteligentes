let grid;
let indiceAlgoritmo = undefined;
let trocarAlgoritmo = false;
let agente;
let algoritmo;
let novoCaminho = false;
let iteracao = 0;
const ALGORITMOS = [
  AStar,
  BFS,
  DFS,
  GS,
  UCS
]

function setup() {
  grid = new Grid();
  grid.display();
}

function draw() {
  //Nenhum algoritmo definido = n fazer nada.
  if (indiceAlgoritmo === undefined) return;
  if (trocarAlgoritmo) {
    agente = new Agente(grid.inicio.x, grid.inicio.y)
    algoritmo = new ALGORITMOS[indiceAlgoritmo](grid.terreno);
    iteracao = 0;
    trocarAlgoritmo = false;
    novoCaminho = true;
  }
  if (novoCaminho) {
    const caminho = algoritmo.buscarCaminho(grid.inicio, grid.fim);
    agente.definirCaminho(caminho);
    novoCaminho = false;
  }

  grid.display();
  if (iteracao >= 0) iteracao += algoritmo.display();
  if (iteracao >= 1) iteracao += agente.percorrerCaminho();

  if (!mesmaPosicao(agente.pos, CelulaToPosicao(grid.fim))) return;

  grid.novoFim();
  novoCaminho = true;
  iteracao = 0;
}