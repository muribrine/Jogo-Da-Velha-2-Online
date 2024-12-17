import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; 
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

class Backend {

  express_app;
  http_server;
  http_server_port;
  http_server_IP;
  socket_io;

  connections;
  waiting_socket;
  games;

  constructor(port) {
    
    // Creating express app && HTTP server.

    this.express_app = express();
    this.http_server = http.createServer(this.express_app);
    this.http_server_port = port;
    //this.http_server_IP = IP;
    this.socket_io = new Server(this.http_server);
    this.connections = [];
    this.waiting_socket = [];
    this.games = {};

    // Routing.

    this.express_app.get('/', (_req, res) => {
      console.log("[Backend (Express)] Got a request for path '/'");
      res.sendFile(__dirname + '/frontend/index.html');
    });

    this.express_app.get('/style.css', (_req, res) => {
      console.log("[Backend (Express)] Got a request for path '/style.css'")
      res.sendFile(__dirname + '/frontend/style.css');
    });

    this.express_app.get('/game.js', (_req, res) => {
      console.log("[Backend (Express)] Got a requestfor path '/game.js'");
      res.sendFile(__dirname + '/frontend/game.js');
    });

    // Socket IO

    this.socket_io.on('connection', (socket) => {

      const socket_id = 'SOCKET_' + Math.random() * Math.pow(10,18);

      this.connections.push([socket_id, socket]);
      console.log(`[Backend (SocketIO)] A new socketIO connection was created. Socket's id: ${socket_id}`);

      // All Socket events go below here

      socket.on('disconnect', () => {
        
        console.log(`[Backend (SocketIO)] The socket ${socket_id}(id) has disconnected.`);
        this.connections.filter((s) => s[0] != socket_id);

      });

      socket.on('player_ready', () => {

        console.log(`[Backend (SocketIO)] The socket ${socket_id}(id) is ready to play.`);
      
        if(this.waiting_socket[1]) {
          console.log(`[Backend (SocketIO)] The socket ${socket_id}(id) has found a match with the socket ${this.waiting_socket[0]}(id).`);
          console.log(`[Backend (SocketIO)] Creating a new game.`);

          const game_id = 'GAME_' + Math.random() * Math.pow(10,18);
          this.games[game_id] = {
            game_id: game_id,
            player_X: [socket_id, socket],
            player_O: this.waiting_socket,
            board_state: [],
            game_state: '',
          };

          console.log(`[Backend (SocketIO)] A new game has been created. ${game_id}(id).`);
          console.table(this.games[game_id]);

          this.execute_game(this.games[game_id]);

          console.log(`[Backend (SocketIO)] Cleaning queue.`);
          this.waiting_socket = [];
        } else {
          console.log(`[Backend (SocketIO)] The socket ${socket_id}(id) has found no match. Adding to queue.`);
          this.waiting_socket = [socket_id, socket];
        };

      });

    });

    // Hook HTTP server on port.

    this.http_server.listen(this.http_server_port, () => {

      console.log(`[Backend (HTTP)] HTTP server listening on port: ${this.http_server_port}`);

    });

  };

  execute_game(game) {

    const playerX = game['player_X'];
    const playerO = game['player_O'];

    const player_sockets = [playerX[1], playerO[1]];

    player_sockets.forEach(socket => {
      
      socket.on('player_clicked', (target_id, player) => {

        target_id.split(''); let coordinates = [target_id[1], target_id[4]];
        game['board_state'][coordinates[0]][coordinates[1]] = player;
        console.table(game['board_state']);

        const current_player = player == "X" ? 1 : 0;

        player_sockets[current_player].emit('turn', game['board_state'], coordinates);
      });

    });

    playerX[1].emit('game_started', 'X');
    playerO[1].emit('game_started', 'O');

    for (let sector = 0; sector < 9; sector++) { game['board_state'][sector] = [] };
    game['board_state'].forEach(sector => { for (let cell = 0; cell < 9; cell++) { sector[cell] = '' } });

    console.table(game['board_state']);

  };

}

export { Backend as Bismark }; 
