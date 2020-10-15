import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([
    {
      division: "두부",
      name: "국산 콩두부",
      barcodeNumber: "110003",
      availableFood: ["두부조림", "두부찌개"],
      company: "풀무원",
      price: "5190",
      caution: ["새우를 포함한 제품과 같은 제조 시설 사용", "돼지고기 포함"],
      uri: "../../images/ingredients/풀무원 두부.png",
    },
    {
      division: "두부",
      name: "미국산 콩두부",
      barcodeNumber: "110003",
      availableFood: ["두부조림", "두부찌개"],
      company: "CJ",
      price: "5190",
      caution: ["새우를 포함한 제품과 같은 제조 시설 사용", "돼지고기 포함"],
      uri: "../../images/ingredients/cj두부.png",
    },
  ]
  );
  const [recipe, setRecipe] = useState([
    {
      division: "두부",
      name: "두부조림",
      ingredients: ["재료1", "재료 2", "재료 3"],
      seasoning: ["양념 1", "양념 2"],
      order: ["1번 순서", "2번순서", "3번순서", "4번순서"],
      uri: "../../images/recipe/두부조림.jpeg",
    },
    {
      division: "두부",
      name: "두부찌개",
      ingredients: ["재료 1", "재료 2", "재료 3", "재료 4"],
      seasoning: ["양념 1", "양념 2"],
      order: ["1번 순서", "2번순서", "3번순서"],
      uri: "../../images/recipe/두부찌개.jpeg",
    },
    {
      division: "두부",
      name: "두부 두루치기",
      ingredients: ["재료 1", "재료 2", "재료 3", "재료 4"],
      seasoning: ["양념 1", "양념 2"],
      order: ["1번 순서", "2번순서", "3번순서"],
      uri: "../../images/recipe/두부 두루치기.jpeg",
    },
    {
      division: "김치",
      name: "두부 두루치기",
      ingredients: ["재료 1", "재료 2", "재료 3", "재료 4"],
      seasoning: ["양념 1", "양념 2"],
      order: ["1번 순서", "2번순서", "3번순서"],
      uri: "../../images/recipe/두부 두루치기.jpeg",
    },
  ]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Search Screen</Text>
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
