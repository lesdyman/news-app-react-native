import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { NEWS } from "../../api/api";
import { NewsItem } from "../../types/NewsItem";
import { styles } from "./styles";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";

interface Props {
  navigation: NativeStackNavigatorProps;
}

export const Main: React.FC<Props> = ({ navigation }) => {
  const [loadedFonts] = useFonts({
    New_York_Semibold: require("../../assets/Fonts/New_York_Small_Semibold.ttf"),
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
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Article", { item })}
            >
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
};
