import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Home.css";

type Direction = 'N' | 'E' | 'S' | 'W';

const initialDirection: Direction = 'N';
const directions: Direction[] = ['N', 'E', 'S', 'W'];

function RobotPage() {
  const startPosition = { x: 4, y: 4 };
  const [robotPosition, setRobotPosition] = useState(startPosition);
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [commands, setCommands] = useState<string>("");
  const [path, setPath] = useState<{ x: number, y: number }[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const moveRobot = (commandString: string) => {
    let x = robotPosition.x;
    let y = robotPosition.y;
    let currentDirection = direction;
    const newPath = [{ x, y }];

    const moveForward = () => {
      switch (currentDirection) {
        case 'N':
          y = y > 0 ? y - 1 : y;
          break;
        case 'E':
          x = x < 8 ? x + 1 : x;
          break;
        case 'S':
          y = y < 8 ? y + 1 : y;
          break;
        case 'W':
          x = x > 0 ? x - 1 : x;
          break;
      }
      newPath.push({ x, y });
    };

    for (const command of commandString) {
      switch (command) {
        case 'L':
          currentDirection = directions[(directions.indexOf(currentDirection) + 3) % 4];
          break;
        case 'R':
          currentDirection = directions[(directions.indexOf(currentDirection) + 1) % 4];
          break;
        case 'W':
          moveForward();
          break;
      }
    }

    setRobotPosition({ x, y });
    setDirection(currentDirection);
    setPath(newPath);
  };

  const handleCommandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommands(event.target.value);
  };

  const handleCalculateClick = () => {
    if (commands.trim() === "") {
      // If commands are empty, reset everything to initial state
      setRobotPosition(startPosition);
      setDirection(initialDirection);
      setPath([]);
      setIsCalculated(false);
    } else {
      // Otherwise, proceed with calculating the robot's movement
      setIsCalculated(true);
      moveRobot(commands);
    }
  };

  const createGrid = () => {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      const columns = [];
      for (let j = 0; j < 9; j++) {
        let cellColor = "#ffffff"; // สีเริ่มต้นของเซลล์

        // มาร์คจุดเริ่มต้นเป็นสีเขียวเสมอ
        if (i === startPosition.y && j === startPosition.x) {
          cellColor = "#8AAF73"; // สีเขียวสำหรับจุดเริ่มต้น
        }

        // มาร์คตำแหน่งที่หุ่นยนต์เดินผ่านเป็นสีเทา
        else if (path.some(pos => pos.x === j && pos.y === i)) {
          cellColor = "#D3D3D3"; // สีเทาสำหรับตำแหน่งที่เดินผ่าน
        }

        // มาร์คตำแหน่งสุดท้ายของหุ่นยนต์เป็นสีแดง ก็ต่อเมื่อมีการกดปุ่มคำนวณแล้ว
        if (isCalculated && i === robotPosition.y && j === robotPosition.x) {
          cellColor = "#FF0000"; // สีแดงสำหรับตำแหน่งสุดท้าย
        }

        columns.push(
          <Box
            key={`${i}-${j}`}
            sx={{
              width: 40,
              height: 40,
              border: "1px solid gray",
              backgroundColor: cellColor, // กำหนดสีพื้นหลังของเซลล์
              display: "inline-block",
              boxSizing: "border-box",
            }}
          ></Box>
        );
      }
      rows.push(
        <Box key={i} sx={{ display: "flex" }}>
          {columns}
        </Box>
      );
    }
    return rows;
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
              value={commands}
              onChange={handleCommandChange}
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
              onClick={handleCalculateClick}
            >
              <span>คำนวณ</span>
            </Button>
          </Box>
        </Box>
        <Box className="box-grid">
          <Box sx={{ mb: 2 }}>
            <span>ตำแหน่งปัจจุบัน ({robotPosition.x},{robotPosition.y})</span>
          </Box>
          <Box>{createGrid()}</Box>
        </Box>
      </Box>
    </Container>
  );
}

export default RobotPage;
