let current_player = "Esperando por oponente";

let current_sector = [undefined, undefined];
let current_cell = [undefined, undefined];
let last_cell_id = '';

let all_free_flag = true;
let won_flag = false;

let game_is_playing = false;

function game_loop() {

  try {
    document.getElementById("player_indicator").innerText = `${current_player}`;
    if(won_flag) {
      document.getElementById("player_indicator").innerText = `Venceu!`;
    };
    check_for_capture();
    last_update();
    check_for_win();

    update_classes();

    requestAnimationFrame(game_loop);
  } catch (error) {
    console.warn();
  };
};

function last_update() {

  let sectors = Array.from(document.getElementsByClassName("Sector"));

  sectors.forEach(sector => {

    if (sector.innerHTML == "<h3>X</h3>" || sector.innerHTML == "<h3>O</h3>" || sector.innerHTML == "<h3>&nbsp;</h3>") {
      if( sectors.indexOf(sector) == last_cell_id[1] ) {
      
        last_cell_id = '';
      
      }
    };

  });

};

function check_for_capture() {

    let sectors = Array.from(document.getElementsByClassName("Sector"));

    sectors.forEach(sector => {

        try {

            let cells = Array.from(sector.children[0].children);

            if(cells.length == 9) {

            if // 0 == 1 == 2 != " "
            (
                cells[0].innerText ==
                cells[1].innerText &&
                cells[1].innerText ==
                cells[2].innerText &&
                cells[0].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[0].innerText}</h3>`;
            } else if // 3 == 4 == 5 != " "
            (
                cells[3].innerText ==
                cells[4].innerText &&
                cells[4].innerText ==
                cells[5].innerText &&
                cells[3].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[3].innerText}</h3>`;
            } else if // 6 == 7 == 8 != " "
            (
                cells[6].innerText ==
                cells[7].innerText &&
                cells[7].innerText ==
                cells[8].innerText &&
                cells[6].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[6].innerText}</h3>`;
            } else if // 0 == 3 == 6 != " "
            (
                cells[0].innerText ==
                cells[3].innerText &&
                cells[3].innerText ==
                cells[6].innerText &&
                cells[0].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[0].innerText}</h3>`;
            } else if // 1 == 4 == 7 != " "
            (
                cells[1].innerText ==
                cells[4].innerText &&
                cells[4].innerText ==
                cells[7].innerText &&
                cells[1].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[1].innerText}</h3>`;
            } else if // 2 == 5 == 8 != " "
            (
                cells[2].innerText ==
                cells[5].innerText &&
                cells[5].innerText ==
                cells[8].innerText &&
                cells[2].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[2].innerText}</h3>`;
            } else if // 0 == 4 == 8 != " "
            (
                cells[0].innerText ==
                cells[4].innerText &&
                cells[4].innerText ==
                cells[8].innerText &&
                cells[0].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[0].innerText}</h3>`;
            } else if // 2 == 4 == 6 != " "
            (
                cells[2].innerText ==
                cells[4].innerText &&
                cells[4].innerText ==
                cells[6].innerText &&
                cells[2].innerText != ""
            ) {
                sector.innerHTML = `<h3>${cells[2].innerText}</h3>`;
            }

            if(
                cells[0].innerText != "" &&
                cells[1].innerText != "" &&
                cells[2].innerText != "" &&
                cells[3].innerText != "" &&
                cells[4].innerText != "" &&
                cells[5].innerText != "" &&
                cells[6].innerText != "" &&
                cells[7].innerText != "" &&
                cells[8].innerText != ""
            ) {
                sector.innerHTML = "<h3>&nbsp;</h3>";
            }

            };

        } catch (error) {console.warn(error)};

    });

    if(current_sector[1]) {

        if(current_sector[1].children[0].attributes.length == 0) {
            current_sector = [undefined, undefined];
            current_cell = [undefined, undefined];
            all_free_flag = true;
        };
    }

};

function check_for_win() {

    let sectors = Array.from(document.getElementsByClassName("Sector"));

    if // 0 == 1 == 2 != " "
        (
        sectors[0].innerHTML ==
        sectors[1].innerHTML &&
        sectors[1].innerHTML ==
        sectors[2].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[0].innerHTML}</h3>`;
    } else if // 3 == 4 == 5 != " "
        (
        sectors[3].innerHTML ==
        sectors[4].innerHTML &&
        sectors[4].innerHTML ==
        sectors[5].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[3].innerHTML}</h3>`;
    } else if // 6 == 7 == 8 != " "
        (
        sectors[6].innerHTML ==
        sectors[7].innerHTML &&
        sectors[7].innerHTML ==
        sectors[8].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[6].innerHTML}</h3>`;
    } else if // 0 == 3 == 6 != " "
        (
        sectors[0].innerHTML ==
        sectors[3].innerHTML &&
        sectors[3].innerHTML ==
        sectors[6].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[0].innerHTML}</h3>`;
    } else if // 1 == 4 == 7 != " "
        (
        sectors[1].innerHTML ==
        sectors[4].innerHTML &&
        sectors[4].innerHTML ==
        sectors[7].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[1].innerHTML}</h3>`;
    } else if // 2 == 5 == 8 != " "
        (
        sectors[2].innerHTML ==
        sectors[5].innerHTML &&
        sectors[5].innerHTML ==
        sectors[8].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[2].innerHTML}</h3>`;
    } else if // 0 == 4 == 8 != " "
        (
        sectors[0].innerHTML ==
        sectors[4].innerHTML &&
        sectors[4].innerHTML ==
        sectors[8].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[0].innerHTML}</h3>`;
    } else if // 2 == 4 == 6 != " "
        (
        sectors[2].innerHTML ==
        sectors[4].innerHTML &&
        sectors[4].innerHTML ==
        sectors[6].innerHTML
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>${sectors[2].innerHTML}</h3>`;
    }

    if (
        sectors[0].children[0].attributes.length == 0 &&
        sectors[1].children[0].attributes.length == 0 &&
        sectors[2].children[0].attributes.length == 0 &&
        sectors[3].children[0].attributes.length == 0 &&
        sectors[4].children[0].attributes.length == 0 &&
        sectors[5].children[0].attributes.length == 0 &&
        sectors[6].children[0].attributes.length == 0 &&
        sectors[7].children[0].attributes.length == 0 &&
        sectors[8].children[0].attributes.length == 0
    ) {
        document.getElementById("Game_Board").classList.add("Won");
        won_flag = true;
        document.getElementById("Game_Board").innerHTML = `<h3>Empate</h3>`;
    }

};

function update_classes() {

    if(!all_free_flag || !game_is_playing) {

        let sectors = Array.from(document.getElementsByClassName("Sector"));

        sectors.forEach(sector => {

            try {
                let cells = Array.from(sector.children[0].children);

                cells.forEach(cell => {
                    cell.classList.add("Inactive");
                });
            } catch (error) { console.warn(error)};

        });

        try {
          if(game_is_playing) {
              let active_cells = Array.from(current_sector[1].children[0].children);
              active_cells.forEach(cell => {
                  cell.classList.remove("Inactive");
              });
          };
        } catch (error) { console.warn(error)};

    } else {

        let sectors = Array.from(document.getElementsByClassName("Sector"));

        sectors.forEach(sector => {

            try {
                let cells = Array.from(sector.children[0].children);

                cells.forEach(cell => {
                    cell.classList.remove("Inactive");
                });
            } catch (error) { console.warn(error) };

        });
    }

    try {
      
      if(last_cell_id != '') {
      
        document.getElementById(last_cell_id).className = "Cell Last";

      };

    } catch (error) { console.warn(`${last_cell_id} | ${error}`) };

}


let socket = new io();
document.getElementById("Jogar").onclick = () => { socket.emit('player_ready', 0) };

socket.on('game_started', (team) => {

  current_player = `Jogador: ${team}`;
  game_is_playing = team == 'X' ? true : false;
  all_free_flag = team == 'X' ? true : false;

  try {
  document.addEventListener("click", e => {
    if(e.target.attributes[0].value == "Cell" && document.getElementById(e.target.id).innerText == "" && game_is_playing) {
        all_free_flag = false;
        current_cell = [e.target.id, document.getElementById(e.target.id)];
        current_sector = [`Sec_${e.target.id[4]}`, document.getElementById(`Sec_${e.target.id[4]}`)]
        current_cell[1].innerText = team;

        socket.emit('player_clicked', e.target.id, team);
        if(last_cell_id) {
          document.getElementById(last_cell_id).className = "Cell Inactive";
          last_cell_id = '';
        }
        game_is_playing = false;

    };
  });
  } catch (error) { console.warn(error) };

});

socket.on('turn', (board_state, coords) => {
  game_is_playing = true;

  const new_sector = coords[1];

  current_sector = [`Sec_${new_sector}`, document.getElementById(`Sec_${new_sector}`)];

  for (let s = 0; s < 9; s++) {
  for (let c = 0; c < 9; c++) {
   
    try {
        document.getElementById(`S${s}_c${c}`).innerText = board_state[s][c];
    } catch (error) {};

  };
  };

  last_cell_id = `S${coords[0]}_c${coords[1]}`;

});

game_loop();

