import { Image, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { formatDate } from "../../utils/utils";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { NewsItem } from "../../types/NewsItem";
import React from "react";
import { newsStoryStyles } from "./NewsStoryStyles";

interface Props {
  navigation: NativeStackNavigatorProps;
  item: NewsItem;
}

export const NewsStory: React.FC<Props> = ({ navigation, item }) => (
  <TouchableWithoutFeedback
    onPress={() => navigation.navigate("Article", { item })}
  >
    <View style={newsStoryStyles.newsItemContainer}>
      <Image source={item.img} style={newsStoryStyles.newsItemImage} />
      <View style={newsStoryStyles.newsItemOverlay}>
        <Text style={newsStoryStyles.newsItemTitle}>{item.title}</Text>
        <Text style={newsStoryStyles.newsItemDate}>
          Published: {formatDate(item.date)}
        </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);
