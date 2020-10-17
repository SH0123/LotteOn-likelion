import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

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
      uri: "../../images/ingredients/풀무원 두부.png",
      feature: ["비건"],
      crossReaction: [""],
      allergies: ["콩"],
      type: "ingredients"
    },
    {
      division: "두부",
      name: "미국산 콩두부",
      barcodeNumber: "110003",
      relatedRecipes: ["두부조림", "두부찌개"],
      brand: "풀무원",
      price: "5190",
      warnings: ["새우를 포함한 제품과 같은 제조 시설 사용", "돼지고기 포함"],
      uri: "../../images/ingredients/cj두부.png",
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
      directions: [{ order: "1번 순서", uri: "../../images/recipe/두부조림/1.jpeg" },
      { order: "2번 순서", uri: "../../images/recipe/두부조림/2.jpeg" },
      { order: "3번 순서", uri: "../../images/recipe/두부조림/3.jpeg" }],
      uri: "../../images/recipe/두부조림/두부조림.jpeg",
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
      directions: [{ order: "1번 순서", uri: "../../images/recipe/두부조림/1.jpeg" },
      { order: "2번 순서", uri: "../../images/recipe/두부조림/2.jpeg" },
      { order: "3번 순서", uri: "../../images/recipe/두부조림/3.jpeg" }],
      uri: "../../images/recipe/두부찌개/두부찌개.jpeg",
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
      directions: [{ order: "1번 순서", uri: "../../images/recipe/두부조림/1.jpeg" },
      { order: "2번 순서", uri: "../../images/recipe/두부조림/2.jpeg" },
      { order: "3번 순서", uri: "../../images/recipe/두부조림/3.jpeg" }],
      uri: "../../images/recipe/두부 두루치기/두부 두루치기.jpeg",
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
      directions: [{ order: "1번 순서", uri: "../../images/recipe/두부조림/1.jpeg" },
      { order: "2번 순서", uri: "../../images/recipe/두부조림/2.jpeg" },
      { order: "3번 순서", uri: "../../images/recipe/두부조림/3.jpeg" }],
      uri: "../../images/recipe/두부 두루치기/두부 두루치기.jpeg",
      time: "30분",
      serving: "2인분",
      allergies: ["두부"],
      feature: ["비건"],
      type: "recipe"
    },
  ]
  );

  const [value, onChangeText] = React.useState("");

  const filterList = (list) => {
    return list.filter(listItem => listItem.name.toLowerCase().includes(value.toLowerCase()));
  }

  const listCat = [...ingredients, ...recipe]
  return (
    <SafeAreaView style={styles.container}>
      <Text>Search Screen</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value} />
      <FlatList
        data={filterList(listCat)}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.type === "ingredients" ? "ResultsScreen" : "IngResultScreen", {
                results: typeof (item) === "object" ?
                  Object.values(item) :
                  item, recipes: recipe
              })}//여기 수정해야함
            >
              <Text>
                {item.name}
              </Text>
            </TouchableOpacity>)

        }}
      />
      <Button title="test" onPress={() => { navigation.navigate('ResultsScreen', { results: ingredients, recipes: recipe }) }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
