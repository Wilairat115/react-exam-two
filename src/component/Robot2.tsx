import { Box, Button, Container, TextField } from "@mui/material";
import { useRef, useState } from "react";
import "./Home.css";

function Robot2Page() {
  const commandRef = useRef<HTMLInputElement>();
  const gridSize = 11;
  const turnPattern: [number, number][] = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  const createGrid = () => {
    return Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  };

  const middleIndex = Math.floor(gridSize / 2);
  const initGrid = createGrid();
  initGrid[middleIndex][middleIndex] = 2;

  const [grid, setGrid] = useState<number[][]>(initGrid);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([middleIndex, middleIndex]); // เพิ่ม currentState สำหรับเก็บตำแหน่งปัจจุบันของ Robot

  const CalculateClick = () => {
    if (!commandRef.current?.value) {
      setGrid(initGrid);
      setCurrentPosition([middleIndex, middleIndex]);
      return;
    }

    let turn = 0;
    let current: [number, number] = [middleIndex, middleIndex];
    const path: [number, number][] = [[middleIndex, middleIndex]];

    for (const com of commandRef.current?.value || '') {
      if (com === "L") {
        turn = (turn + 1) % 4;
      } else if (com === "R") {
        turn = (turn - 1 + 4) % 4;
      } else if (com === "W") {
        const move: [number, number] = [
          current[0] + turnPattern[turn][0],
          current[1] + turnPattern[turn][1],
        ];
        path.push(move);
        current = move;
        setCurrentPosition(move); // อัปเดตตำแหน่งปัจจุบันของ Robot
      } else {
        continue;
      }
    }

    const newGrid = createGrid();
    path.forEach(([x, y]) => {
      newGrid[x][y] = 1;
    });

    const [startX, startY] = path[0];
    const [endX, endY] = path[path.length - 1];

    newGrid[startX][startY] = 2;
    newGrid[endX][endY] = 3;

    setGrid(newGrid);
  };

  return (
    <Container>
      <Box className="container-center">
        <Box>
          <span>Robot Walk</span>
          <Box className="box-command">
            <span>&nbsp;คำสั่ง Robot Walk</span>
          </Box>
          <Box sx={{ width: 450 }}>
            <TextField
              className="TextField-input"
              fullWidth
              id="fullWidth"
              inputRef={commandRef}
            />
          </Box>
          <Box className="box-button">
            <Button
              sx={{
                bgcolor: "#97B3C7",
                color: "black",
                mt: 4,
                width: 125,
                height: 50,
                borderRadius: "15px",
                "&:hover": { bgcolor: "#6C93B0" },
              }}
              onClick={CalculateClick}
            >
              <span>คำนวณ</span>
            </Button>
          </Box>
        </Box>
        <Box className="box-grid">
          <Box sx={{ mb: 2 }}>
            <span>
              ตำแหน่งปัจจุบัน ({currentPosition[0]},{currentPosition[1]})
            </span>
          </Box>
          <Box>
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                {row.map((cell, cellIndex) => {
                  return (
                    <div
                      key={cellIndex}
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid lightgray",
                        backgroundColor:
                          cell === 1
                            ? "gray"
                            : cell === 2
                            ? "#8AAF73"
                            : cell === 3
                            ? "#FF0000"
                            : "white",
                      }}
                    ></div>
                  );
                })}
              </div>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Robot2Page;
