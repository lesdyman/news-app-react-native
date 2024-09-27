import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamList";
import { BlurView } from 'expo-blur';
import { useRef } from "react";
import { Dimensions } from 'react-native';

const BASIC_IMG_HEIGHT = 340;

type ArticlePageRouteProp = RouteProp<RootStackParamList, "Article">;

interface Props {
  route: ArticlePageRouteProp;
}

export const Article: React.FC<Props> = ({ route }) => {
  const [loadedFonts] = useFonts({
    New_York_Semibold: require("../../assets/Fonts/New_York_Small_Semibold.ttf"),
    Nunito: require('../../assets/Fonts/Nunito-VariableFont_wght.ttf'),
  });

  const { item } = route.params;

  const scrollReff = useRef(new Animated.Value(0)).current;
  

  const getImageTransformStyle = (scroll: Animated.Value) => ({
    transform: [
      {
        translateY: scroll.interpolate({
          inputRange: [-BASIC_IMG_HEIGHT, 0, BASIC_IMG_HEIGHT, BASIC_IMG_HEIGHT + 1],
          outputRange: [
            -BASIC_IMG_HEIGHT / 2,
            0,
            BASIC_IMG_HEIGHT * 0.7,
            BASIC_IMG_HEIGHT * 0.7,
          ],
        }),
      },
    ],
  });

  const titleBlockOpacity = scrollReff.interpolate({
    inputRange: [0, 240],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollReff } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={articleStyles.generalContainer}
        contentContainerStyle={articleStyles.contentContainer}
        bounces={false}
      >
        <View style={articleStyles.photoContainer}>
          <Animated.Image
            source={item.img}
            style={[articleStyles.photo, getImageTransformStyle(scrollReff)]}
          />
        </View>
        {loadedFonts && (
          <Animated.View style={[articleStyles.titleBlock, {opacity: titleBlockOpacity}]}>
            <BlurView style={articleStyles.blurView}>
              <Text style={articleStyles.title}>{item.title}</Text>
            </BlurView>
          </Animated.View>
        )}
        <View style={articleStyles.textBlock}>
          <Text style={articleStyles.text}>{item.content}</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const articleStyles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: 'relative',
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  photoContainer: {
    width: "100%",
    height: BASIC_IMG_HEIGHT,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleBlock: {
    position: "absolute",
    height: 141,
    width: 311,
    backgroundColor: "rgba(245, 245, 245, 0.6)",
    borderRadius: 16,
    borderColor: "rgb(245, 245, 245)",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    top: 240,
    zIndex: 2,
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "New_York_Semibold",
    marginHorizontal: 24,
  },
  textBlock: {
    borderRadius: 16,
    backgroundColor: "#fff",
    marginTop: -15,
  },
  text: {
    paddingTop: 88,
    paddingHorizontal: 25,
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 10,
    fontFamily: "Nunito",
  },
  blurView: {
    height: "100%",
    width: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
