import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Dimensions, Modal, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';


const { width, height } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([
    {

      division: "두부",
      name: "풀무원 두부",
      barcodeNumber: "8801114111154",
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
      barcodeNumber: "8801007069883",
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
      barcodeNumber: "8801052739991",
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
      barcodeNumber: "8801024053667",
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
      barcodeNumber: "8801121102398",
      relatedRecipes: "",
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
      barcodeNumber: "8801007745718",
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
      barcodeNumber: "0430000320967",
      relatedRecipes: ["양송이 스프"],
      brand: "오감",
      price: "4,980",
      warnings: ["별도 주의 사항 없음"],
      uri: require("../../images/ingredients/오감양송이.png"),
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
      ingredients: [{ name: "두부", quantity: "1모" }, { name: "다시마 육수", quantity: "1/2컵" }, { name: "다진 마늘", quantity: "1/2스푼" }, { name: "맛술", quantity: "1스푼" }],
      seasoning: [{ name: "소금", quantity: "한꼬집" }, { name: "고춧가루", quantity: "1스푼" }, { name: "설탕", quantity: "1/2스푼" }, { name: "진간장", quantity: "3스푼" }],
      directions: [{ order: "두부 4등분 하고 나서 3등분 또 해서 썰고 소금 밑간 하기", uri: require("../../images/recipe/두부조림/1.jpeg") },
      { order: "고춧가루1, 다진마늘 0.5, 다진대파 넉넉히, 설탕 0.5, 진간장 3, 맛술1, 참기름으로 양념장 만들기", uri: require("../../images/recipe/두부조림/2.jpeg") },
      { order: "두부 부치고 양념장과 함께 조리기", uri: require("../../images/recipe/두부조림/3.jpeg") }],
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
      ingredients: [{ name: "두부", quantity: "1모" }, { name: "애호박", quantity: "1/2개" }, { name: "양파", quantity: "1개" }, { name: "느타리버섯", quantity: "한줌" }, { name: "대파", quantity: "1대" }, { name: "청양고추", quantity: "1개" }],
      seasoning: [{ name: "고추장", quantity: "1큰술" }, { name: "새우젓", quantity: "2큰술" }, { name: "고춧가루", quantity: "1큰술" }, { name: "물", quantity: "1큰술" }, { name: "다진마늘", quantity: "1큰술" }, { name: "멸치육수", quantity: "1팩" }],
      directions: [{ order: "간편하게 멸치 육수 팩 1개로 육수를 우려냅니다.", uri: require("../../images/recipe/두부찌개/1.jpeg") },
      { order: "고추장, 새우젓, 고춧가루, 물, 다진마늘을 준비한 만큼 넣고 찌개양념을 만듭니다.", uri: require("../../images/recipe/두부찌개/2.jpg") },
      { order: "두부를 잘라서 냄비에 깔아준뒤, 느타리버섯, 청양고추, 대파와 함께 뜨거운 육수를 부어주고 찌개양념을 넣어서 끓여줍니다. ", uri: require("../../images/recipe/두부찌개/3.jpg") }],
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
      ingredients: [{ name: "두부", quantity: "1모" }, { name: "돼지고기", quantity: "100g" }, { name: "배추김치", quantity: "1컵" }, { name: "양파", quantity: "1/2개" }, { name: "대파", quantity: "1대" }, { name: "풋고추", quantity: "3개" }, { name: "멸치 다시마 육수", quantity: "2컵" }, { name: "통깨", quantity: "1큰술" }],
      seasoning: [{ name: "고춧가루", quantity: "2큰술" }, { name: "고추장", quantity: "3큰술" }, { name: "간장", quantity: "1큰술" }, { name: "액젓", quantity: "1큰술" }, { name: "설탕", quantity: "1큰술" }, { name: "맛술", quantity: "2큰술" }, { name: "다진 마늘", quantity: "2큰술" }, { name: "식용유", quantity: "1큰술" }],
      directions: [{ order: "고춧가루, 고추장, 간장, 액젓, 설탕, 맛술, 다진 마늘을 넣어 양념을 만들어주세요.", uri: require("../../images/recipe/두부두루치기/1.jpeg") },
      { order: "두부는 먹기 좋은 크기로 썰어 약간의 소금을 뿌려 밑간해 주세요.", uri: require("../../images/recipe/두부두루치기/2.jpeg") },
      { order: "돼지고기를 잘게 썰어 식용유와 함께 볶아주다가 하얗게 익으면 배추김치를 넣고 볶아주세요.", uri: require("../../images/recipe/두부두루치기/3.jpg") },
      { order: "김치가 어느정도 익으면 육수를 붓고 끓이다가, 국물이 끓으면 불을 줄이고 10분정도 끓여주세요", uri: require("../../images/recipe/두부두루치기/4.jpeg") },
      { order: "뚜껑을 열어 두부를 넣고 양파, 대파, 풋고추도 넣어 뚜껑을 덮고 끓여주세요.", uri: require("../../images/recipe/두부두루치기/5.jpeg") },
      { order: "5분 정도 보글보글 끓여주고 통깨를 뿌려 레시피를 완성합니다.", uri: require("../../images/recipe/두부두루치기/6.jpeg") }],
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
  const [userAllergy, setUserAllergy] = React.useState()

  const [value, onChangeText] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    fetch('http://runanam.pythonanywhere.com/allergy/')
      .then((response) => response.json())
      .then((json) => json.filter(i => i.checked === true))
      .then(arr => arr.map(index => index.content))
      .then(allergies => setUserAllergy(allergies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);



  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setVisible(false);
    onChangeText(data);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const filterList = (list) => {
    return list.filter(listItem => listItem.name.toLowerCase().includes(value.toLowerCase()) ||
      listItem.barcodeNumber === (value));
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
            <Ionicons name="md-search" size={30} color="#dd2d2d" />
          </TouchableOpacity>
          <TouchableOpacity
            styles={styles.mdBarcodeContainer}
            onPress={() => {
              setVisible(true);
            }}>
            <Ionicons name="md-barcode" size={30} color="#dd2d2d" />
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
                  <Text style={{ paddingVertical: 5, borderBottomWidth: 1, fontSize: 15 }}>
                    {item.name}
                  </Text>}

              </TouchableOpacity>)

          }}
        />
      </View>
      {visible ? <Modal style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <Button title="go back" onPress={() => setVisible(false)} />

      </Modal> :
        <></>
      }

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
  modalMain: {
    backgroundColor: "white",
    marginTop: 200,
    margin: 50
  }
});
