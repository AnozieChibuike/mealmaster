import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default Button = ({ text, color, bg, disabled = false,textColor= 'black', ...props }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", }}>
      <TouchableOpacity
        style={[style.button, { backgroundColor: disabled ? "grey" : bg }]}
        disabled={disabled}
        {...props}
      >
        {disabled ? (
          <ActivityIndicator color={color} />
        ) : (
          <Text style={{ color: textColor,  fontWeight: 'bold', fontSize: 20 }}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
    marginBottom: 20,
    borderRadius: 25,
  },
});
