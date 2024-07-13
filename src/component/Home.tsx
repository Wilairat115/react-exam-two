import { Box, Button, Container, TextField } from "@mui/material";
import "./Home.css";

function HomePage() {
  const createGrid = () => {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      const columns = [];
      for (let j = 0; j < 9; j++) {
        let cellColor = "#ffffff"; // สีเริ่มต้นของเซลล์

        // กำหนดให้เซลล์ที่แถวที่ 5 และคอลัมน์ที่ 5 เป็นสีเขียว
        if (i === 4 && j === 4) {
          cellColor = "#8AAF73";
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
            <TextField className="TextField-input" fullWidth id="fullWidth" />
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
            >
              <span>คำนวณ</span>
            </Button>
          </Box>
        </Box>
        <Box className="box-grid">
          <Box sx={{ mb: 2 }}>
            <span>ตำแหน่งปัจจุบัน (0,0)</span>
          </Box>
          <Box>{createGrid()}</Box>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
