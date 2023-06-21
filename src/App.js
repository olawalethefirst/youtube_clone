import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "./components";

const App = () => (
  <ThemeProvider
    theme={createTheme({
      breakpoints: {
        values: {
          xs: 0, // Extra small devices (portrait phones)
          sm: 600, // Small devices (landscape phones)
          md: 960, // Medium devices (tablets)
          lg: 1280, // Large devices (desktops)
          xl: 1920,
        },
      },
    })}
  >
    <BrowserRouter>
      <Box sx={{ background: "#000" }}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" exact element={<VideoDetail />} />
          <Route path="/channel/:id" exact element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" exact element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </ThemeProvider>
);
export default App;
