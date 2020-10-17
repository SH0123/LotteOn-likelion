import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function RecipeScreen({ navigation, route }) {
    console.log(route.params.recipe)
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} name={route.params.recipe.name} />
            <ScrollView>
                <View>
                    <Image style={{
                        width: 300,
                        height: 200,
                        resizeMode: 'contain'
                    }} source={{ uri: route.params.recipe.uri }} />
                </View>
                <View style={styles.informationContainer}>
                    <View>
                        <MaterialIcons name="timer" size={40} />
                    </View>
                    <View>
                        <Ionicons name="md-people" size={40} />
                    </View>
                    <View>
                        <MaterialCommunityIcons name="alert" size={40} />
                    </View>
                </View>
                <View style={styles.ingredientsContainer}>
                    <View style={styles.ingredientsBox}>
                        <Text>재료</Text>
                        {route.params.recipe.ingredients.map(
                            ingredient => <Text>{ingredient.name} ------- {ingredient.quantity}</Text>)
                        }
                    </View>
                    <View style={styles.seasoningBox}>
                        <Text>양념</Text>
                        {route.params.recipe.seasoning.map(
                            ingredient => <Text>{ingredient.name} ------- {ingredient.quantity}</Text>)
                        }
                    </View>
                </View>
                <View style={styles.directionsContainer}>
                    <Text>조리 순서</Text>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Header = ({ navigation, name }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.headerLeft}
                onPress={() => { navigation.goBack() }}
            >
                <Ionicons name="md-arrow-back" size={25} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{name}</Text>
            </View>
            <TouchableOpacity style={styles.headerStar}>
                <Ionicons name="md-star-outline" size={25} />
            </TouchableOpacity>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10
    },
    headerLeft: {
        flex: 1,
        marginLeft: 15,

    },
    headerTitleContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,

    },
    headerTitle: {
        fontSize: 25,
    },
    headerStar: {
        flex: 1,
        marginRight: 15,
        alignItems: "flex-end"
    },
    informationContainer: {
        flexDirection: "row",
        marginHorizontal: 50,
        justifyContent: "space-between",
        backgroundColor: "yellow"
    },
    ingredientsContainer: {
        flexDirection: "row",
        width: width - 30,

    },
    ingredientsBox: {
        backgroundColor: "pink",
        width: width / 3,
        marginRight: 30
    },
    seasoningBox: {
        backgroundColor: "pink",
        width: width / 3,
    },
    directionsContainer: {
        backgroundColor: "skyblue"
    }
});
