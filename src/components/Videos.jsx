import { Box, Stack } from "@mui/material";
import React from "react";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, justifyContent = "start" }) => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent={justifyContent}
      gap={"10px"}
      marginBottom="20px"
    >
      {videos?.map((item, i) => {
        if (item.id?.videoId || item.id?.channelId)
          return (
            <Box
              key={item.id?.kind + (item.id?.videoId || item.id?.channelId)}
              sx={{
                width: { md: "320px", sm: "calc(50% - 5px)", xs: "100%" },
              }}
            >
              {item.id.channelId ? <ChannelCard channelDetail={item} /> : null}
              {item.id.videoId ? <VideoCard video={item} /> : null}
            </Box>
          );

        return null;
      })}
    </Stack>
  );
};

export default Videos;
