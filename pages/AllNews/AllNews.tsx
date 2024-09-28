import { Animated, Modal, SafeAreaView, StyleSheet, View} from "react-native";
import { NewsStory } from "../../components/NewsStory/NewsStory";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamList";
import React, { useRef } from "react";

type AllNewsProps = RouteProp<RootStackParamList, "AllNews">;

interface Props {
  route: AllNewsProps,
  navigation: NativeStackNavigatorProps,
}

const ITEM_SIZE = 135;

const AllNews: React.FC<Props> = ({route, navigation}) => {

  const { NEWS } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
  <SafeAreaView>
      <Animated.FlatList
      data={NEWS}
      onScroll={Animated.event(
        [
        {nativeEvent: {contentOffset: {y: scrollY}}}
      ],
      {useNativeDriver: true}
        )}
      renderItem={({ item, index }) => {
      
        const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
        const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.5)];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        }
      );
        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
        return (
          <Animated.View
          style={[
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
          >
        <NewsStory item={item} navigation={navigation}/>
        </Animated.View>
      )}}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 20, paddingTop: 40, }}
       />
  </SafeAreaView>
)};



export default React.memo(AllNews);