import { View, Text, TouchableOpacity, Image, TextInput } from "react-native"
import React, { useState } from "react"
import { icons } from "../constants"

interface SearchInputProps {
  title: string
  value: string
  placeholder: string
  handleChangeText: (text: string) => void
  otherStyles: string
  keyboardType: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 flex flex-row items-center ${
        isFocused ? "border-secondary" : "border-black-200 space-x-4"
      }`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
