import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite"
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.bjm.aoro",
  projectId: "6785df08000ffb4f2a5c",
  databaseId: "6785e79200029abf7322",
  userCollectionId: "6785e8e400250b40f467",
  videoCollectionId: "6785e9270007ee257888",
  storageId: "6785ed1c0007e266ed2d",
}

const client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)
    const newUser = await databases.createDocument(
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

    return newUser
  } catch (error) {
    console.log(error)
    console.log(config.databaseId)
    throw new Error(error)
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    throw new Error(error)
  }
}
