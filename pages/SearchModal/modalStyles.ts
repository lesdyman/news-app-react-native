import { StyleSheet } from "react-native";

export const modalStyle = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: "#f5f5dc",
  },
  modalHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  modalContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
  },
  modalTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    height: 32,
    width: 32,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  closeButtonIcon: {
    fontSize: 20,
    color: "white",
  },
  resultItem: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#B7B7B7",
    width: "100%",
    marginVertical: 4,
    gap: 8,
    shadowColor: "#B17457",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
    opacity: .8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  itemCategory: {
    fontSize: 12,
    fontStyle: "italic",
  },
});
