import { View, Text, FlatList, Image, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "../../constants"
import SearchInput from "@/components/SearchInput"
import Trending from "@/components/Trending"
import EmptyState from "@/components/EmptyState"
import VideoCard from "@/components/VideoCard"
import { RefreshControl } from "react-native-gesture-handler"
import { getAllPosts, getLatestPosts } from "@/lib/appwrite"
import useAppwrite from "@/lib/useAppwrite"
import { useGlobalContext } from "@/context/GlobalProvider"

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

const Home = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext()

  const { data: posts, refetch } = useAppwrite({ fn: getAllPosts })

  const { data: latestPosts } = useAppwrite({ fn: getLatestPosts })

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  // console.log(posts)

  // const data: Item[] = [
  //   { id: 1, $id: "1" },
  //   { id: 2, $id: "2" },
  //   { id: 3, $id: "3" },
  // ]

  // const posts: Post[] = [
  //   { id: 1, $id: "1" },
  //   { id: 2, $id: "2" },
  //   { id: 3, $id: "3" },
  // ]

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              title=""
              value=""
              placeholder="Search for a video topic"
              otherStyles=""
              keyboardType=""
              handleChangeText={() => ({})}
            />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home
