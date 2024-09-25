import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { NEWS } from "./api/api";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  img: any;
  category: string;
  content: string;
}

export default function App() {
  const [loadedFonts] = useFonts({
    New_York_Semibold: require("./assets/Fonts/New_York_Small_Semibold.ttf"),
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("Ukraine");
  const [newsOnScreen, setNewsOnScreen] = useState<NewsItem[]>([]);

  const latestNews = () => {
    const sorted = NEWS.sort((item1, item2) =>
      item1.date.localeCompare(item2.date)
    );
    return sorted.slice(0, 5);
  };

  const categories = () => {
    const uniqueCategories = [...new Set(NEWS.map((news) => news.category))];
    return uniqueCategories.map((category, index) => ({
      id: (index + 10).toString(),
      title: category,
    }));
  };

  const newsToDisplay = (category: string) => {
    const newsToShow = NEWS.filter((story) => story.category === category).sort(
      (item1, item2) => item2.date.localeCompare(item1.date)
    );
    setNewsOnScreen(newsToShow);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    newsToDisplay(selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <TextInput style={styles.searchInput} placeholder="Search..." />
          <Ionicons name="search-outline" style={styles.searchIcon} />
        </View>

        <TouchableOpacity>
          <View style={styles.bellContainer}>
            <Ionicons name="notifications-outline" style={styles.bell} />
          </View>
        </TouchableOpacity>
      </View>

      {loadedFonts && (
        <View style={styles.latestNews}>
          <Text style={styles.latestNewsTitle}>Latest News</Text>

          <View style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="arrow-forward-outline" style={styles.seeAllArrow} />
          </View>
        </View>
      )}

      <View style={styles.carouselContainer}>
        <FlatList
          data={latestNews()}
          renderItem={({ item }) => (
            <View style={styles.newsContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.img} style={styles.newsListImg} />
                <View style={styles.overlay}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={250}
          decelerationRate="fast"
          bounces={false}
        />
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.category,
                selectedCategory === item.title && styles.selectedCategory,
              ]}
              onPress={() => {
                setSelectedCategory(item.title);
                newsToDisplay(item.title);
              }}
            >
              <Text
                style={[
                  styles.categoryTitle,
                  selectedCategory === item.title &&
                    styles.selectedCategoryTitle,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={8}
          bounces={false}
        />
      </View>

      <View style={styles.newsListContainer}>
        <FlatList
          data={newsOnScreen}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
            <View style={styles.newsItemContainer}>
              <Image source={item.img} style={styles.newsItemImage} />
              <View style={styles.overlay}>
                <Text style={styles.newsItemTitle}>{item.title}</Text>
                <Text style={styles.newsItemDate}>
                  Published: {formatDate(item.date)}
                </Text>
              </View>
            </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#F0F1FA",
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
