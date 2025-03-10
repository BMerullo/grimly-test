import { View, Text, Image } from "react-native"
import React, { useState } from "react"

import { images } from "../constants"
import CustomButton from "./CustomButton"
import { router } from "expo-router"

interface EmptyStateProps {
  title: string
  subTitle: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subTitle }) => {
  const [isSubmitting, setIsSubmitting] = useState(true)
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
        textStyles=""
      />
    </View>
  )
}

export default EmptyState
