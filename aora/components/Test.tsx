import { StyleSheet, View, Dimensions, Button } from "react-native"
import { useVideoPlayer, VideoView } from "expo-video"

const remoteSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

const Movie = () => {
  const player = useVideoPlayer(remoteSource, (player) => {
    player.loop = true
    player.staysActiveInBackground = true
    // player.play()
  })

  return (
    <View className="w-100">
      <VideoView
        player={player}
        // style={{
        //   width: Dimensions.get("window").width,
        //   height: Dimensions.get("window").width * (9 / 16),
        // }}
        allowsFullscreen
        allowsPictureInPicture
        startsPictureInPictureAutomatically
      />
      <View>
        <Button
          title="Play"
          onPress={() => {
            player.play()
          }}
        />
        <Button
          title="Pause"
          onPress={() => {
            player.pause()
          }}
        />
      </View>
    </View>
  )
}

export default Movie
