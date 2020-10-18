import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Dimensions, Modal, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask'

const { width, height } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([
    {

      division: "두부",
      name: "국산 콩두부",
      barcodeNumber: "110003",
      relatedRecipes: ["두부조림", "두부찌개"],
      brand: "풀무원",
      price: "5190",
      warnings: ["새우를 포함한 제품과 같은 제조 시설 사용", "돼지고기 포함"],
      uri: require("../../images/ingredients/풀무원두부.jpeg"),
      feature: ["비건"],
      crossReaction: [""],
      allergies: ["콩"],
      type: "ingredients"
    },
    {

      division: "두부",
      name: "미국산 콩두부",
      barcodeNumber: "1100034",
      relatedRecipes: ["두부조림", "두부 두루치기"],
      brand: "cj",
      price: "6000",
      warnings: ["새우를 포함한 제품과 같은 제조 시설 사용", "돼지고기 포함"],
      uri: require("../../images/ingredients/cj두부.png"),
      feature: ["비건"],
      crossReaction: [""],
      allergies: ["콩"],
      type: "ingredients"
    },
  ]
  );
  const [recipe, setRecipe] = useState([
    {
      division: "두부",
      name: "두부조림",
      ingredients: [{ name: "재료 1", quantity: "1" }, { name: "재료 2", quantity: "2" }, { name: "재료 3", quantity: "3" }],
      seasoning: [{ name: "양념 1", quantity: "1" }, { name: "양념 2", quantity: "2" }],
      directions: [{ order: "1번 순서", uri: require("../../images/recipe/두부조림/1.jpeg") },
      { order: "2번 순서", uri: require("../../images/recipe/두부조림/2.jpeg") },
      { order: "3번 순서", uri: require("../../images/recipe/두부조림/3.jpeg") }],
      uri: require("../../images/recipe/두부조림/두부조림.jpeg"),
      time: "30분",
      serving: "2인분",
      allergies: ["두부"],
      feature: ["비건"],
      type: "recipe"
    },
    {
      division: "두부",
      name: "두부찌개",
      ingredients: [{ name: "재료 1", quantity: "1" }, { name: "재료 2", quantity: "2" }, { name: "재료 3", quantity: "3" }],
      seasoning: [{ name: "양념 1", quantity: 1 }, { name: "양념 2", quantity: 2 }],
      directions: [{ order: "1번 순서", uri: require("../../images/recipe/두부조림/1.jpeg") },
      { order: "2번 순서", uri: require("../../images/recipe/두부조림/2.jpeg") },
      { order: "3번 순서", uri: require("../../images/recipe/두부조림/3.jpeg") }],
      uri: require("../../images/recipe/두부찌개/두부찌개.jpeg"),
      time: "30분",
      serving: "2인분",
      allergies: ["두부"],
      feature: ["비건"],
      type: "recipe"
    },
    {
      division: "두부",
      name: "두부 두루치기",
      ingredients: [{ name: "재료 1", quantity: "1" }, { name: "재료 2", quantity: "2" }, { name: "재료 3", quantity: "3" }],
      seasoning: [{ name: "양념 1", quantity: 1 }, { name: "양념 2", quantity: 2 }],
      directions: [{ order: "1번 순서", uri: require("../../images/recipe/두부조림/1.jpeg") },
      { order: "2번 순서", uri: require("../../images/recipe/두부조림/2.jpeg") },
      { order: "3번 순서", uri: require("../../images/recipe/두부조림/3.jpeg") }],
      uri: require("../../images/recipe/두부두루치기/두부두루치기.jpeg"),
      time: "30분",
      serving: "2인분",
      allergies: ["두부"],
      feature: ["비건"],
      type: "recipe"
    },
    {
      division: "김치",
      name: "두부 두루치기",
      ingredients: [{ name: "재료 1", quantity: "1" }, { name: "재료 2", quantity: "2" }, { name: "재료 3", quantity: "3" }],
      seasoning: [{ name: "양념 1", quantity: 1 }, { name: "양념 2", quantity: 2 }],
      ddirections: [{ order: "1번 순서", uri: require("../../images/recipe/두부조림/1.jpeg") },
      { order: "2번 순서", uri: require("../../images/recipe/두부조림/2.jpeg") },
      { order: "3번 순서", uri: require("../../images/recipe/두부조림/3.jpeg") }],
      uri: require("../../images/recipe/두부두루치기/두부두루치기.jpeg"),
      time: "30분",
      serving: "2인분",
      allergies: ["두부"],
      feature: ["비건"],
      type: "recipe"
    },
  ]
  );

  const [value, onChangeText] = React.useState("");
  const [visible, setVisible] = React.useState("false");
  const [barcode, setBarcode] = "";

  const filterList = (list) => {
    return list.filter(listItem => listItem.name.toLowerCase().includes(value.toLowerCase()));
  }

  const submitEvent = (list) => {
    if (value === "") {
      alert("검색어를 입력하세요");
    } else {
      const searchResult = Array.from(new Set(filterList(list)));
      navigation.navigate("ResultsScreen", { results: searchResult, recipes: recipe });
    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputContainer}
            placeholder="음식 검색"
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={() => submitEvent(ingredients)}
            value={value} />
          <TouchableOpacity
            style={styles.mdSearchContainer}
            onPress={() => submitEvent(ingredients)}
          >
            <Ionicons name="md-search" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            styles={styles.mdBarcodeContainer}
            onPress={() => {
              setVisible("true");
              console.log(visible)
            }}>
            <Ionicons name="md-barcode" size={30} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.filterContainer}
          data={filterList(ingredients)}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ResultsScreen", {
                  results: item, recipes: recipe
                })}
              >
                {value === "" ? <View></View> :
                  <Text>
                    {item.name}
                  </Text>}

              </TouchableOpacity>)

          }}
        />
      </View>
      <Modal visible={visible} transparent={true} style={styles.modalContainer}>
        <Text>안녕</Text>
      </Modal>
    </SafeAreaView >
  );
}

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../../images/로고.png")} style={{ height: 100, width: 100 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    marginTop: 20,
    width: width - 30,

  },
  searchContainer: {
    flexDirection: "row",
    paddingTop: 100,
    alignItems: "center",
    borderBottomWidth: 1,
    width: width - 50,
  },
  inputContainer: {
    flex: 9,
    fontSize: 25
  },
  mdSearchContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10
  },
  mdBarcodeContainer: {
    flex: 1,

  },
  filterContainer: {

  },
  contentContainer: {
    flex: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa"
  },
});
