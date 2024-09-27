import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    gap: 16,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 32,
    padding: 5,
    borderWidth: 0.2,
    borderRadius: 16,
    borderColor: "rgba(129, 129, 129, 0.8)",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 2,
    width: "90%",
  },
  searchIcon: {
    alignSelf: "flex-end",
    padding: 2,
    fontSize: 16,
    color: "#818181",
    opacity: 0.8,
  },
  bellContainer: {
    backgroundColor: "#FF3A44",
    borderRadius: 16,
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  bell: {
    fontSize: 24,
    color: "#fff",
  },
  latestNews: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 24,
  },
  latestNewsTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "New_York_Semibold",
  },
  seeAllContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  seeAllText: {
    color: "#0080FF",
    fontSize: 12,
  },
  seeAllArrow: {
    color: "#0080FF",
    fontSize: 12,
  },
  carouselContainer: {
    marginTop: 16,
    marginLeft: 15,
  },
  newsContainer: {
    width: 345,
    marginRight: 8,
    marginBottom: 8,
  },
  imageContainer: {
    position: "relative",
  },
  newsListImg: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 16,
  },
  newsTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    marginTop: 90,
  },
  newsDescription: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    color: "#fff",
  },
  categoryContainer: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  category: {
    backgroundColor: "#fff",
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderWidth: 1,
    borderColor: "#F0F1FA",
    borderRadius: 16,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 32,
    color: "#000",
    width: "100%",
  },
  selectedCategory: {
    backgroundColor: "#FF3A44",
  },
  selectedCategoryTitle: {
    color: "#fff",
  },
  newsListContainer: {
    flex: 1,
    flexGrow: 1,
  },
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