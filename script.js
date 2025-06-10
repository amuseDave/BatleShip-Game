import Player from './Models/Player.js';
import Ship from './Models/Ship.js';
import GameBoard from './Models/GameBoard.js';
import { buildDOMGameBoard } from './utils.js';

const gameContainerEl = document.getElementById('game-container');

const NPC = new Player();

console.log(NPC);

gameContainerEl.append(buildDOMGameBoard(NPC.gameBoard.size));
