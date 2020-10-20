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
      name: "풀무원 두부",
      barcodeNumber: "110003",
      relatedRecipes: ["두부조림", "두부찌개"],
      brand: "풀무원",
      price: "3,830",
      warnings: ["새우를 포함한 제품과 같은 제조 시설 사용", "돼지고기 포함"],
      uri: require("../../images/ingredients/풀무원두부.jpeg"),
      feature: ["비건"],
      crossReaction: [],
      allergies: ["콩"],
      type: "ingredients"
    },
    {

      division: "두부",
      name: "cj 모닝 두부",
      barcodeNumber: "1100034",
      relatedRecipes: ["두부조림", "두부 두루치기"],
      brand: "cj",
      price: "1,200",
      warnings: ["새우를 포함한 제품과 같은 제조 시설 사용", "돼지고기 포함"],
      uri: require("../../images/ingredients/cj두부.png"),
      feature: ["비건"],
      crossReaction: [],
      allergies: ["콩"],
      type: "ingredients"
    },
    {

      division: "카레",
      name: "카레여왕 구운마늘&양파",
      barcodeNumber: "",
      relatedRecipes: [],
      brand: "청정원",
      price: "2,380",
      warnings: ["알류, 메밀, 땅콩, 고등어, 게, 새우, 돼지고기, 복숭아, 호두, 오징어, 조개류(전복, 홍합 포함) 잣 혼입 가능"],
      uri: require("../../images/ingredients/카레여왕.jpeg"),
      feature: ["할랄"],
      crossReaction: [],
      allergies: ["우유", "대두", "밀", "쇠고기", "닭고기", "토마토", "조개류(굴)"],
      type: "ingredients"
    },
    {

      division: "김치",
      name: "새콤달콤 맛있는 볶음김치",
      barcodeNumber: "",
      relatedRecipes: [],
      brand: "종가집",
      price: "1,380",
      warnings: ["조개류(굴), 오징어, 우유, 밀, 닭고기 성분 혼입 가능"],
      uri: require("../../images/ingredients/볶음김치.jpeg"),
      feature: ["비건(폴로-페스코)"],
      crossReaction: [],
      allergies: ["새우", "대두"],
      type: "ingredients"
    },
    {

      division: "우유",
      name: "소화가 잘되는 우유 오리지널",
      barcodeNumber: "",
      relatedRecipes: [""],
      brand: "매일",
      price: "3,150",
      warnings: ["구매시 유통기한을 꼭 확인해주세요.", "날카로운 물건으로 개봉하실경우 우유팩까지 그어져 제품이 손상될 수 있으니 주의하셔서 개봉 부탁드립니다."],
      uri: require("../../images/ingredients/락토프리우유.jpeg"),
      feature: ["락토프리우유"],
      crossReaction: [],
      allergies: [],
      type: "ingredients"
    },
    {

      division: "밀키트",
      name: "비비고 버섯 야채죽",
      barcodeNumber: "",
      relatedRecipes: [],
      brand: "cj",
      price: "3,480",
      warnings: ["계란, 메밀, 땅콩, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 오징어, 조개류(굴, 전복, 홍합 포함), 잣을 사용한 제품과 같은 시설에서 제조"],
      uri: require("../../images/ingredients/버섯야채죽.jpeg"),
      feature: ["할랄"],
      crossReaction: [],
      allergies: ["우유", "대두", "밀", "닭고기", "쇠고기"],
      type: "ingredients"
    },
    {

      division: "양송이버섯",
      name: "GAP 충남 오감 양송이",
      barcodeNumber: "",
      relatedRecipes: ["양송이 스프"],
      brand: "오감",
      price: "4,980",
      warnings: ["별도 주의 사항 없음"],
      uri: require("../../images/ingredients/오감양송이.jpg"),
      feature: ["없음"],
      crossReaction: [],
      allergies: ["양송이 버섯"],
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
      allergies: ["두부", "굴"],
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
      allergies: ["두부", "고등어", "대두", "새우"],
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
      allergies: ["두부", "돼지고기"],
      feature: ["비건"],
      type: "recipe"
    },
    {
      division: "양송이버섯",
      name: "양송이 스프",
      ingredients: [{ name: "양송이버섯", quantity: "10개" }, { name: "양파", quantity: "1개" }, { name: "치킨스톡", quantity: "1개" }, { name: "밀가루", quantity: "2큰술" }],
      seasoning: [{ name: "버터", quantity: "2큰술" }, { name: "우유", quantity: "300ml" }, { name: "생크림", quantity: "200ml" }, { name: "소금", quantity: "1꼬집" }],
      directions: [{ order: "양송이버섯을 3등분 하고, 양파도 슬라이스 해서 잘라준다.", uri: require("../../images/recipe/양송이스프/1.jpeg") },
      { order: "팬에 버터 1큰술을 넣고 버터가 녹기 시작하면 양파와 양송이버섯을 익을 때까지만 볶아준다.", uri: require("../../images/recipe/양송이스프/2.jpg") },
      { order: "냄비를 꺼내서 버터를 1큰술 넣고, 녹기 시작하면 밀가루 2스푼을 넣어 저어 가며 루를 만든다.", uri: require("../../images/recipe/양송이스프/3.jpg") },
      { order: "그 다음 생크림 200ml와 우유 300ml를 넣고 아까 만들어둔 양송이와 양파를 넣는다.", uri: require("../../images/recipe/양송이스프/4.jpg") },
      { order: "믹서기 또는 핸드블렌더로 갈아준다.", uri: require("../../images/recipe/양송이스프/5.jpeg") },
      { order: "치킨스톡을 넣고 소금으로 간을 맞춘다.", uri: require("../../images/recipe/양송이스프/6.jpg") },
      { order: "식빵을 잘라 구워서 크루통을 만든다.", uri: require("../../images/recipe/양송이스프/7.jpg") },
      { order: "완성된 스프를 맛있게 먹는다.", uri: require("../../images/recipe/양송이스프/양송이스프.jpeg") }],
      uri: require("../../images/recipe/양송이스프/양송이스프.jpeg"),
      time: "35분",
      serving: "3 ~ 4인분",
      allergies: ["우유", "양송이 버섯"],
      feature: [],
      type: "recipe"
    },
  ]
  );
  const [userAllergy, setUserAllergy] = React.useState(["토마토", "새우", "우유"])

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
      navigation.navigate("ResultsScreen", { results: searchResult, recipes: recipe, ingredients: ingredients, userAllergy: userAllergy });
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
                  results: item, recipes: recipe, ingredients: ingredients, userAllergy: userAllergy
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
      <Image source={require("../../images/로고.png")} style={{ height: 90, width: 90 }} />
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
    marginTop: 10,
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
