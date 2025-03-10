import { View, Text, FlatList, Image, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import SearchInput from "@/components/SearchInput"
import EmptyState from "@/components/EmptyState"
import VideoCard from "@/components/VideoCard"
import { searchPosts } from "@/lib/appwrite"
import useAppwrite from "@/lib/useAppwrite"
import { useLocalSearchParams } from "expo-router"

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

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite({
    fn: () => searchPosts(query as string),
  })

  console.log("Query being searched", query, posts)

  // const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query as string} />
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

export default Search
