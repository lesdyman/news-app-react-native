import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NewsItem } from "../../types/NewsItem";
import { formatDate } from "../../utils/utils";
import { modalStyle } from "./modalStyles";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  searchResults: NewsItem[];
  navigation: any;
}

const SearchModal: React.FC<Props> = ({
  isVisible,
  onClose,
  searchResults,
  navigation,
}) => {
  return (
    <Modal animationType="slide" visible={isVisible}>
      <SafeAreaView style={modalStyle.safeAreaStyle}>
        <View style={modalStyle.modalHeader}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={modalStyle.closeButton}>
              <Ionicons name="close" style={modalStyle.closeButtonIcon} />
            </View>
          </TouchableWithoutFeedback>
          <Text style={modalStyle.modalTitle}>Search results:</Text>
        </View>

        <View style={modalStyle.modalContainer}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Article", { item });
                  onClose();
                }}
              >
                <View style={modalStyle.resultItem}>
                  <Text style={modalStyle.itemTitle}>{item.title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={modalStyle.itemCategory}>
                      Category: {item.category}
                    </Text>
                    <Text style={modalStyle.itemCategory}>
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
    </Modal>
  );
};

export default SearchModal;
