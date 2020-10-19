import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

export default function SearchScreen({ route, navigation }) {
  const { recipes } = route.params;

  if (route.params.results.length === undefined) {//결과 값이 하나인 경우
    var resultsArr = [route.params.results];
    var resultAvail = true;

    var rec = recipes.filter(menu => menu.division === resultsArr[0].division); // 검색한 상품으로 만들 수 있는 레시피
    var recOut = rec.filter(menu => rec.indexOf(menu) < 2); // 화면에 뜰 레시피
    var recAvail = "true";
    if (rec.length === 0) {
      recAvail = "false"
    }
    console.log(recAvail)
  } else {
    if (route.params.results.length === 0) {//결과 값이 없는 경우
      var resultAvail = false;
    } else {//결과 값이 두개 이상
      var resultAvail = true;
      var resultsArr = route.params.results;
      var rec = recipes.filter(menu => menu.division === resultsArr[0].division); // 검색한 상품으로 만들 수 있는 레시피
      var recOut = rec.filter(menu => rec.indexOf(menu) < 2); // 화면에 뜰 레시피 ->array.slice로 대체 가능
      var recAvail = "true";
      if (rec.length === 0) {
        recAvail = "false"
      }
      if (!recAvail) { console.log("hello") }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} ingredients={route.params.ingredients} recipe={recipes} />
      {resultAvail ?
        (<>
          <View style={styles.ingResultContainer}>
            <Text style={styles.textSize}>검색결과</Text>
            <FlatList
              horizontal={true}
              data={resultsArr}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.ingredientContainer}
                    onPress={() => navigation.navigate("IngResultScreen", { product: item, recipes: recipes })}
                  >
                    <ImageBackground style={{
                      width: 150,
                      height: 150,
                      resizeMode: 'contain'
                    }} source={item.uri} />
                    <Text>{item.name}</Text>
                    <Text>{item.price}원</Text>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={({ item, index }) => `${index}`} />
          </View>
          {recAvail ?
            <View style={styles.recipesContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.textSize}>오늘 이런 요리 어떠세요?</Text>
                <TouchableOpacity
                  style={{ paddingLeft: 15 }}
                  onPress={() => { navigation.navigate("RecRecipeScreen", { recipes: rec }) }}
                >
                  <Text >레시피 더 보기</Text>
                </TouchableOpacity>

              </View>

              {recOut.map(dish => (
                <View style={styles.recipeContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSize}>{dish.name}</Text>
                    <TouchableOpacity
                      onPress={() => { navigation.navigate("RecipeScreen", { recipe: dish }) }}
                    >
                      <Text style={{ paddingLeft: 20 }}>레시피 보기...</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row", paddingTop: 10 }}>
                    {dish.ingredients.slice(0, 3).map((ingredient) => <Text style={styles.ingInRecipe}>{ingredient.name}</Text>)}
                  </View>
                </View>
              ))}

            </View> : <View></View>}

        </>) :
        <View style={styles.nullContainer}>
          <Text>검색 결과가 없습니다</Text>
        </View>}

    </SafeAreaView>
  );
}

const Header = ({ navigation, ingredients, recipe }) => {

  const [value, onChangeText] = React.useState("");

  const filterList = (list) => {
    return list.filter(listItem => listItem.name.toLowerCase().includes(value.toLowerCase()));
  }

  const submitEvent = (list) => {
    if (value === "") {
      alert("검색어를 입력하세요");
    } else {
      const searchResult = Array.from(new Set(filterList(list)));
      navigation.navigate("ResultsScreen", { results: searchResult, recipes: recipe, ingredients: ingredients });
    }

  }

  return (
    <View style={styles.headerContainer}>
      <Image source={require("../../images/로고.png")} style={{ height: 90, width: 90 }} />
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
        >
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
                results: item, recipes: recipe, ingredients: ingredients
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
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  headerContainer: {
    flex: 1,
    marginTop: 20,
    width: width - 30,
    flexDirection: "row",
    alignItems: "center"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: width - 160,
    marginLeft: 20
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
  ingResultContainer: {
    backgroundColor: "yellow",
    width: width - 30,
    flex: 3
  },
  ingredientContainer: {
    backgroundColor: "pink",
    marginRight: 30,
    marginTop: 10
  },
  recipesContainer: {
    backgroundColor: "skyblue",
    width: width - 30,
    flex: 3,
    paddingTop: 20
  },
  recipeContainer: {
    marginTop: 15
  },
  nullContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  ingInRecipe: {
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: "#7FFFD4"
  },
  textSize: {
    fontSize: 22
  }
});
