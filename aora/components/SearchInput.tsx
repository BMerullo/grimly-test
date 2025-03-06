import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native"
import React, { useState } from "react"
import { icons } from "../constants"
import { router, usePathname } from "expo-router"

interface SearchInputProps {
  title?: string
  value?: string
  placeholder?: string
  handleChangeText?: (text: string) => void
  otherStyles?: string
  keyboardType?: string
  initialQuery?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialQuery,
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)

  // const [showPassword, setShowPassword] = useState(false)
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || "")

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 flex flex-row items-center ${
        isFocused ? "border-secondary" : "border-black-200 space-x-4"
      }`}
    >
      <TextInput
        className={`text-base mt-0.5 text-white flex-1 font-pregular ${
          isFocused ? "border-secondary" : "border-black-200 space-x-4"
        }`}
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0)"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            )
          }
          if (pathname.startsWith("/search")) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
