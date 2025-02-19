import {
  View,
  Text,
  FlatList,
  FlatListProps,
  ViewToken,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native"
import React, { useEffect, useState } from "react"
import * as Animatable from "react-native-animatable"
import { icons } from "@/constants"
import { useVideoPlayer, VideoSource, VideoView } from "expo-video"
import { useEvent } from "expo"

const zoomIn: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
}

const zoomOut: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 1.1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
}

interface TrendingItemProps {
  activeItem: Post
  item: Post
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)
  const videoSource: VideoSource = item.video

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true
  })

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  })

  return (
    <Animatable.View
      className="mr-5 ml-5  justify-center item-center"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <View className="h-5/6 justify-center items-center bg-white/10 rounded-[33px] mt-3">
          <VideoView
            // className=" rounded-[33px] mt-3 bg-white/10 absolute border"
            style={{
              width: 180,
              height: 100,
            }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            contentFit="contain"
          />
        </View>
      ) : (
        <TouchableOpacity
          className=" justify-center items-center"
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
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

interface Post {
  id: number
  $id: string
  thumbnail: string
  video: string
}

interface TrendingProps {
  posts: Post[]
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item)
    }
  }
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 170 }}
      horizontal
    />
  )
}

export default Trending
