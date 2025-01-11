import { View, Text } from "react-native"
import React from "react"

interface FormFieldProps {
  title: string
  value: string
  placeholder: string
  handleChangeText: (text: string) => void
  otherStyles: string
  keyboardType: string
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  return (
    <View className={`space-y-2`}>
      <Text className="text-base text-gray-100 font-pmedium">FormField</Text>
    </View>
  )
}

export default FormField
