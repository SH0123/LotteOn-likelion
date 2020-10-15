import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function SearchScreen({ route, navigation }) {
  const { recipes } = route.params;

  const rec = recipes.filter(menu => menu.division === route.params.results[0].division); // 검색한 상품으로 만들 수 있는 레시피
  const recOut = rec.filter(menu => rec.indexOf(menu) < 2); // 화면에 뜰 레시피

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.ingResultContainer}>
        <Text style={styles.textSize}>검색결과</Text>
        <FlatList
          horizontal={true}
          data={route.params.results}
          renderItem={({ item }) => {

            return (
              <TouchableOpacity
                style={styles.ingredientContainer}
                onPress={() => navigation.navigate("IngResultScreen", { product: item, recipes: recipes })}
              >
                <Image style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'contain'
                }} source={{ uri: item.uri }} />
                <Text>{item.name}</Text>
                <Text>{item.price}원</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={({ item, index }) => {
            return `${index}`;
          }} />
      </View>
      <View style={styles.recipesContainer}>
        <View>
          <Text style={styles.textSize}>오늘 이런 요리 어떠세요?</Text>
        </View>

        {recOut.map(dish => (
          <View style={styles.recipeContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textSize}>{dish.name}</Text>
              <Text style={{ paddingLeft: 20 }}>레시피 보기...</Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              {dish.ingredients.map(ingredient => <Text style={styles.ingInRecipe}>{ingredient}</Text>)}
            </View>
          </View>
        ))}

      </View>
    </SafeAreaView>
  );
}

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Text>로고</Text>
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
    flex: 3
  },
  recipeContainer: {
    marginTop: 15
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
    fontSize: 25
  }
});
