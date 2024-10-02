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
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { NewsItem } from "../../types/NewsItem";
import { styles } from "./styles";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { NewsStory } from "../../components/NewsStory/NewsStory";
import { Dimensions } from "react-native";
import SearchModal from "../SearchModal/SearchModal";
import database from '../../db/firestore';
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = 218;
const ITEM_MARGIN = 20;

const snapToInterval =
  ITEM_WIDTH + ITEM_MARGIN * 2 + (SCREEN_WIDTH - ITEM_WIDTH) / 2;

interface Props {
  navigation: NativeStackNavigatorProps;
}

export const Main: React.FC<Props> = ({ navigation }) => {
  const [loadedFonts] = useFonts({
    New_York_Semibold: require("../../assets/Fonts/New_York_Small_Semibold.ttf"),
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("Culture");
  const [newsOnScreen, setNewsOnScreen] = useState<NewsItem[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);

  const saveNewsToLocalStorage = async (newsArray: NewsItem[]) => {
    try {
      await AsyncStorage.setItem("news", JSON.stringify(newsArray));
    } catch (error) {
      console.error("Error saving news to localStorage:", error);
    }
  };

  const getNewsFromLocalStorage = async () => {
    try {
      const newsData = await AsyncStorage.getItem("news");
      if (newsData) {
        const parsedNews = JSON.parse(newsData) as NewsItem[];
        setAllNews(parsedNews);
        updateNewsOnScreen(selectedCategory, parsedNews);
        setLatestNews(parsedNews.slice(0, 5));
      }
    } catch (error) {
      console.error("Error retrieving news from localStorage:", error);
    }
  };

  const fetchNewsFromFirestore = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(database, "news"));
      const newsArray: NewsItem[] = [];
      const storage = getStorage();

      for (const doc of querySnapshot.docs) {
        const newsData = doc.data() as NewsItem;
        const newsItemWithId = { ...newsData, id: doc.id };

        if (newsItemWithId.img) {
          const imgRef = ref(storage, newsItemWithId.img);
          try {
            newsItemWithId.img = await getDownloadURL(imgRef);
          } catch (error) {
            console.error("Error loading image from Firebase Storage:", error);
            newsItemWithId.img = null;
          }
        } else {
          console.log("No image found for story:", newsItemWithId.title);
        }

        newsArray.push(newsItemWithId);
      }

      await saveNewsToLocalStorage(newsArray);
    } catch (error) {
      console.error("Error occurred during fetching data from Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateNewsOnScreen = (category: string, newsArray: NewsItem[]) => {
    const filteredNews = newsArray.filter((item) => item.category === category);
    setNewsOnScreen(filteredNews);
  };

  useEffect(() => {
    getNewsFromLocalStorage();
    fetchNewsFromFirestore();
  }, []);

  useEffect(() => {
    updateNewsOnScreen(selectedCategory, allNews);
  }, [selectedCategory, allNews]);

  const categories = () => {
    const uniqueCategories = [...new Set(allNews.map((news) => news.category))];
    return uniqueCategories.map((category, index) => ({
      id: (index + 10).toString(),
      title: category,
    })).sort((category1, category2) => category1.title.localeCompare(category2.title));
  };

  const resetInput = () => {
    setSearchInput("");
    setSearchResults([]);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setLoading(true);

    setTimeout(() => {
      fetchNewsFromFirestore();
      getNewsFromLocalStorage();
      updateNewsOnScreen(selectedCategory, allNews);
      setRefreshing(false);
      setLoading(false);
    }, 2000);
  };

  const filterNews = (input: string) => {
    const filtered = allNews.filter(
      (newsItem) =>
        newsItem.title.toLowerCase().includes(input.toLowerCase()) ||
        newsItem.description.toLowerCase().includes(input.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSearchSubmit = () => {
    filterNews(searchInput);
    if (searchInput.trim().length > 0) {
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    updateNewsOnScreen(selectedCategory, allNews);
  }, [selectedCategory, allNews]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchInput}
            onChangeText={(text) => {
              setSearchInput(text);
              filterNews(text);
            }}
            onSubmitEditing={handleSearchSubmit}
          />
          {searchInput ? (
            <TouchableWithoutFeedback onPress={() => resetInput()}>
              <Ionicons name="close" style={styles.searchIcon} />
            </TouchableWithoutFeedback>
          ) : (
            <Ionicons name="search-outline" style={styles.searchIcon} />
          )}
        </View>

        <TouchableOpacity onPress={() => handleRefresh()}>
          <View style={styles.bellContainer}>
            <Ionicons name="notifications-outline" style={styles.bell} />
          </View>
        </TouchableOpacity>
      </View>

      {loadedFonts && (
        <View style={styles.latestNews}>
          <Text style={styles.latestNewsTitle}>Latest News</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("AllNews", { allNews, navigation })}
          >
            <View style={styles.seeAllContainer}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons
                name="arrow-forward-outline"
                style={styles.seeAllArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.carouselContainer}>
        {loading && (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        )}
        <FlatList
          data={latestNews}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Article", { item })}
            >
              <View style={styles.newsContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.img }} style={styles.newsListImg} />
                  <View style={styles.overlay}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={snapToInterval}
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
                updateNewsOnScreen(item.title, allNews);
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
            <NewsStory item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
      <SearchModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSearchInput('');
        }}
        searchResults={searchResults}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
