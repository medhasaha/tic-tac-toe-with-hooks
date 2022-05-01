import "./styles.css";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  container: {
    border: "4px solid royalblue",
    borderRadius: 8,
    margin: "20px 0px"
  },
  block: {
    border: "1px solid royalblue",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  ticksO: {
    color: "green"
  },
  ticksX: {
    color: "orangered"
  }
});

//possible combinations
const obj = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const App = (props) => {
  const [turn, setTurn] = useState(0); //to determine current player
  const [p1_arr, set_p1_arr] = useState([]); // array to save all moves of player 1
  const [p2_arr, set_p2_arr] = useState([]); // array to save all moves of player 2
  const [winner, setWinner] = useState(false); // boolean value to determine if winner found and game is over
  const [draw, setDraw] = useState(false); // boolean value for game draw

  useEffect(() => {
    checkWinner();
  }, [p1_arr, p2_arr]);

  // utility func to check if winner if found
  const checkWinner = () => {
    // console.log("[checkWinner turn]: ",turn);
    let isSubset = -1;
    if (turn === 0) {
      // console.log("[checkwinner p1_arr]: ", p1_arr)
      isSubset = obj.findIndex((item) => item.every((i) => p1_arr.includes(i)));
    } else if (turn === 1) {
      // console.log("[checkwinner p2_arr]: ", p2_arr)
      isSubset = obj.findIndex((item) => item.every((i) => p2_arr.includes(i)));
    }
    // console.log("[isSubset]: ", isSubset)
    if (isSubset >= 0) {
      setWinner(true);
    } else if (isSubset === -1 && p1_arr.length + p2_arr.length === 9) {
      setDraw(true);
    } else {
      p1_arr.length === 0 && p2_arr.length === 0
        ? setTurn(0)
        : turn === 0
        ? setTurn(1)
        : setTurn(0);
    }
  };

  // function called on clicking any one square in grid
  const click = (e, id) => {
    let curr_player = turn;
    let arr = [];
    if (curr_player === 0) {
      arr = [...p1_arr];
      arr.push(id);
    } else {
      arr = [...p2_arr];
      arr.push(id);
    }
    curr_player === 0 ? set_p1_arr(arr) : set_p2_arr(arr);
  };

  const { classes } = props;
  return (
    <div className="App" style={{ width: "300px" }}>
      <Typography variant="h6">TIC TAC TOE </Typography>
      <Typography variant="subtitle1">
        Next Player : {turn === 0 ? "Player 1" : "Player 2"}
      </Typography>

      <Grid container className={classes.container}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((block, id) => {
          return (
            <Grid
              item
              xs={4}
              key={id}
              onClick={!winner && !draw ? (e) => click(e, id) : null}
            >
              <Paper className={classes.block}>
                {p1_arr.includes(id) ? (
                  <Typography variant="h6" className={classes.ticksX}>
                    X
                  </Typography>
                ) : p2_arr.includes(id) ? (
                  <Typography variant="h6" className={classes.ticksO}>
                    O
                  </Typography>
                ) : (
                  ""
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h6">
        {winner
          ? turn === 0
            ? "Winner is : Player 1"
            : "Winner is : Player 2"
          : draw
          ? "Game Draw"
          : ""}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(App);
