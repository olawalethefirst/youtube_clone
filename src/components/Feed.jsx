import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { SideBar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        console.log(data);
        setVideos(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategory]);

  return (
    <Stack
      sx={{ flexDirection: { sx: "column", md: "row" } }}
      height="calc(100vh - 78px)"
      overflow="hidden"
    >
      <Box
        sx={{
          height: {
            sx: "auto",
            md: "calc(100vh - 78px)",
          },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box
        p={2}
        sx={{ overflow: "auto", height: "calc(100vh - 78px)", flex: 2 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory + " "}
          <span style={{ color: "#f31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
