import { View, Text, TouchableOpacity } from "react-native"

interface CustomButtonProps {
  title: string
  handlePress: () => void
  containerStyles: string
  textStyles: string
  isLoading?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } disabled={isLoading}`}
    >
      <Text className={`tx-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
