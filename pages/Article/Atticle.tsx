import { Image, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamList";

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

  return (
    <View style={articleStyles.generalContainer}>

      <View style={articleStyles.photoContainer}>
        <Image source={item.img} style={articleStyles.photo} />
      </View>

      {loadedFonts && (
        <View style={articleStyles.titleBlock}>
          <Text style={articleStyles.title}>{item.title}</Text>
        </View>
      )}

      <ScrollView style={articleStyles.scrollView}>
        <View style={articleStyles.textBlock}>
          <Text style={articleStyles.text}>{item.content}</Text>
        </View>
      </ScrollView>

    </View>
  );
};

const articleStyles = StyleSheet.create({
  generalContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  photoContainer: {
    width: "100%",
    height: 340,
  },
  photo: {
    width: "100%",
    height: '100%',
    resizeMode: "cover",
  },
  titleBlock: {
    position: "absolute",
    height: 141,
    width: 311,
    backgroundColor: "#a4a3ab",
    borderRadius: 16,
    borderColor: "#a4a3ab",
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    top: 240,
    zIndex: 2,
    opacity: .9,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "New_York_Semibold",
    marginHorizontal: 24,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 5,
    zIndex: 1,
    marginTop: -15,
  },
  textBlock: {
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 15,
  },
  text: {
    textAlign: "justify",
    marginTop: 80,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Nunito',
  },
});
