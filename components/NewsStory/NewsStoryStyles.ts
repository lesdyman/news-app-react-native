import { StyleSheet } from "react-native";

export const newsStoryStyles = StyleSheet.create({
  newsItemContainer: {
    height: 128,
    marginBottom: 8,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 16,
  },
  newsItemOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
  },
  newsItemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  newsItemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    alignSelf: "center",
  },
  newsItemDate: {
    position: "absolute",
    bottom: 5,
    right: 5,
    color: "#fff",
    fontSize: 12,
    padding: 2,
    borderRadius: 4,
  },
});
