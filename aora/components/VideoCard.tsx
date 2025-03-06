import { View, Text, Image, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { icons } from "@/constants"
import { useVideoPlayer, VideoSource, VideoView } from "expo-video"
import { useEvent } from "expo"

interface VideoCardProps {
  video: video
}

interface video {
  Title: string
  thumbnail: string
  video: string
  users: users
}

interface users {
  username: string
  avatar: string
}

const VideoCard: React.FC<VideoCardProps> = ({
  video: {
    Title,
    thumbnail,
    video,
    users: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false)

  const videoSource: VideoSource = video

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true
  })

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  })

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 m-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {Title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {isPlaying ? (
        <View className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
          <VideoView
            // className=" rounded-[33px] mt-3 bg-white/10 absolute border"
            style={{
              width: "100%",
              height: 200,
            }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            contentFit="contain"
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (isPlaying) {
              setPlay(false)
              player.pause()
            } else {
              setPlay(true)
              player.play()
            }
          }}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard
