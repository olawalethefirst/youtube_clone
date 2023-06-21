import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromApi";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  console.log(videos);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => {
        setChannelDetail(data.items[0]);
      })
      .catch((error) => console.log(error));

    fetchFromAPI(`search?part=snippet&channelId=${id}&order=date`)
      .then((data) => {
        console.log(data);
        setVideos(data?.items);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Box minHeight="95vh">
      <div
        style={{
          height: "300px",
          background:
            "linear-gradient(90deg, rgba(0,140,120,1) 0%, rgba(0,240,150,1) 60%, rgba(255,255,255,1) 100%)",
          zIndex: 10,
        }}
      />
      <ChannelCard channelDetail={channelDetail} marginTop={"-110px"} />
      <Box display="flex" p="20px">
        <Box>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
