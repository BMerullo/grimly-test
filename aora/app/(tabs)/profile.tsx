import { View, Text, FlatList, Image, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
// import SearchInput from "@/components/SearchInput"
import EmptyState from "@/components/EmptyState"
import VideoCard from "@/components/VideoCard"
import { getUserPosts, signOut } from "@/lib/appwrite"
import useAppwrite from "@/lib/useAppwrite"
import { useGlobalContext } from "@/context/GlobalProvider"
import { TouchableOpacity } from "react-native"
import { icons } from "@/constants"
import InfoBox from "@/components/InfoBox"
import { router } from "expo-router"

interface Item {
  id: number
  $id: string
}

interface EmptySpace {
  title: string
}

interface Error {
  error: string
}

const Profile = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext()

  const { data: posts } = useAppwrite({
    fn: () => (user ? getUserPosts(user.$id) : Promise.resolve([])),
  })

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace("/sign-in")
  }

  // const [refreshing, setRefreshing] = useState(false)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
