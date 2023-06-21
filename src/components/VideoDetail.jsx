import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();
  const { snippet, statistics } = videoDetail ?? {};
  const { title, channelId, channelTitle } = snippet ?? {};
  const { viewCount, likeCount } = statistics ?? {};

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);
      })
      .catch((error) => console.log("error in loading videoDetail: ", error));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((error) => console.log("error in loading related Videos", error));
  }, [id]);

  return (
    <Box height={{ md: "calc(100vh - 78px)" }} display="flex">
      <Stack direction={{ xs: "column", md: "row" }} width="100%">
        <Box flex={3} overflow={{ md: "scroll" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />
          {videoDetail ? (
            <>
              <Typography variant="h5" fontWeight="bold" color="white" p={2}>
                {title}{" "}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ color: "#fff" }}
                py={1}
                px={2}
              >
                <Link to={`/channel/${channelId}`}>
                  <Typography
                    variant={{ sm: "subtitle1", md: "h6" }}
                    color="#fff"
                  >
                    {channelTitle}{" "}
                    <CheckCircle
                      sx={{
                        fontSize: "12px",
                        color: "gray",
                        ml: "2px",
                      }}
                    />
                  </Typography>
                </Link>
                <Stack direction="row" gap="20px" alignItems="center">
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                </Stack>
              </Stack>
            </>
          ) : null}
        </Box>

        <Box
          px={"10px"}
          py={{ md: "10px", xs: "5px" }}
          maxWidth={{ md: "340px" }}
          boxSizing="border-box"
          sx={{ overflow: { md: "scroll" } }}
        >
          <Videos videos={videos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
