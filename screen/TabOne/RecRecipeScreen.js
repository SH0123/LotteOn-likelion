import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function RecRecipeScreen({ route, navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <View style={styles.ingResultContainer}>
                <Text style={styles.textSize}>검색결과</Text>
                <FlatList
                    data={route.params.recipes}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity
                                style={styles.ingredientContainer}
                                onPress={() => navigation.navigate("RecipeScreen", { recipe: item })}
                            >
                                <ImageBackground style={{
                                    width: 300,
                                    height: 200,
                                    resizeMode: 'contain'
                                }} source={item.uri} />
                                <Text>{item.name}</Text>
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
        flex: 6
    },
    ingredientContainer: {
        backgroundColor: "pink",
        marginRight: 30,
        marginTop: 20,
        alignItems: "center"
    },

});
