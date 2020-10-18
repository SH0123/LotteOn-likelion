import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function RecRecipeScreen({ route, navigation }) {
    const { recipes } = route.params;
    console.log(route.params.results)
    if (route.params.results.length === undefined) {//결과 값이 하나인 경우
        var resultsArr = [route.params.results];
        var resultAvail = true;
        // const resultsArr = Array.isArray(route.params.results) ? route.params.results : [route.params.results];// 검색 결과가 하나인 경우 배열로 다시 만들어주는 함수
        var rec = recipes.filter(menu => menu.division === resultsArr[0].division); // 검색한 상품으로 만들 수 있는 레시피
        var recOut = rec.filter(menu => rec.indexOf(menu) < 2); // 화면에 뜰 레시피
    } else {
        if (route.params.results.length === 0) {//결과 값이 없는 경우
            var resultAvail = false;
        } else {//결과 값이 두개 이상
            var resultAvail = true;
            var resultsArr = route.params.results;
            var rec = recipes.filter(menu => menu.division === resultsArr[0].division); // 검색한 상품으로 만들 수 있는 레시피
            var recOut = rec.filter(menu => rec.indexOf(menu) < 2); // 화면에 뜰 레시피
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
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
                    <View style={styles.recipesContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.textSize}>오늘 이런 요리 어떠세요?</Text>
                            <TouchableOpacity
                                style={{ paddingLeft: 10 }}
                                onPress={() => { navigation.navigate }}
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
                                    {dish.ingredients.map(ingredient => <Text style={styles.ingInRecipe}>{ingredient.name}</Text>)}
                                </View>
                            </View>
                        ))}

                    </View>
                </>) :
                <View style={styles.nullContainer}>
                    <Text>검색 결과가 없습니다</Text>
                </View>}

        </SafeAreaView>
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
        fontSize: 25
    }
});
