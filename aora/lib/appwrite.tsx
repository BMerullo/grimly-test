import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite"

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.bjm.aoro",
  projectId: "6785df08000ffb4f2a5c",
  databaseId: "6785e79200029abf7322",
  userCollectionId: "6785e8e400250b40f467",
  videoCollectionId: "6785e9270007ee257888",
  storageId: "6785ed1c0007e266ed2d",
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config

const client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export interface NewUser {
  accountId: string
  email: string
  username: string
  avatar: string
}

export interface DBUser {
  accountId: string
  email: string
  username: string
  avatar: string
  $id: string // Appwrite's document ID
  $createdAt: string // Document creation timestamp
  $updatedAt: string // Document update timestamp
}

export const createUser = async (
  email: string,
  password: string,
  username: string
): Promise<NewUser> => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw new Error("Failed to create account")

    const avatarUrl = avatars.getInitials(username)

    // Use the signIn function after account creation
    await signIn(email, password)

    // Create the user document in the database
    const newUserDocument = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )

    // Return the new user document with the correct structure
    return {
      accountId: newUserDocument.accountId,
      email: newUserDocument.email,
      username: newUserDocument.username,
      avatar: newUserDocument.avatar,
    }
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Unable to create user")
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.error("Error signing in:", error)
    throw new Error("Unable to sign in")
  }
}

export const getCurrentUser = async (): Promise<DBUser | null> => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw new Error("No current account found")

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("No user document found for the current account")
    }

    return currentUser.documents[0] as unknown as DBUser // Return the first document as a DBUser
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null // Return null in case of an error
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId)
    return posts.documents
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ])
    return posts.documents
  } catch (error) {
    throw new Error(error as string)
  }
}

export const searchPosts = async (query: string): Promise<any[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.contains("Title", query),
    ])
    return posts.documents
  } catch (error) {
    throw new Error(error as string)
  }
}
