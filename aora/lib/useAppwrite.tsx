import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { getAllPosts } from "./appwrite"

interface User {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: any[] // Replace `any[]` with the appropriate type if known
  $updatedAt: string
  accountId: string
  avatar: string
  email: string
  username: string
}

interface Document {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: any[] // Replace `any[]` with the appropriate type if known
  $updatedAt: string
  Title?: string
  prompt?: string
  thumbnail?: string
  users?: User // Reference the `User` interface here
  video: string
}

interface useAppwriteProps {
  fn: () => Promise<any[]>
}

const useAppwrite = ({ fn }: useAppwriteProps) => {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await fn()

      setData(response)
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()
  return { data, isLoading, refetch }
}

export default useAppwrite
