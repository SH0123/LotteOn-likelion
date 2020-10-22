import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function RecRecipeScreen({ route, navigation }) {
    const { userAllergy } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <View style={styles.ingResultContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.textSize}>이런 요리는 어떠세요?</Text>
                </View>
                <FlatList
                    data={route.params.recipes}
                    style={styles.flatContainer}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity
                                style={styles.ingredientContainer}
                                onPress={() => navigation.navigate("RecipeScreen", { recipe: item, userAllergy: userAllergy })}
                            >
                                <ImageBackground style={{
                                    width: 300,
                                    height: 200,
                                    resizeMode: 'contain'
                                }} source={item.uri} />
                                <Text style={{ textSize: 20, marginTop: 5 }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={({ item, index }) => `${index}`} />
            </View>
        </SafeAreaView>
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
        alignItems: "center"
    },
    headerContainer: {
        flex: 1,
        marginTop: 10,
        width: width - 30,
    },
    flatContainer: {
        marginTop: 20,

    },
    ingResultContainer: {
        alignItems: "center",
        width: width - 30,
        flex: 6
    },
    ingredientContainer: {

        marginRight: 30,
        marginTop: 20,
        alignItems: "center"
    },
    textSize: {
        fontSize: 22
    },
    titleContainer: {
        alignItems: "center"
    }
});
