import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function RecipeScreen({ navigation, route }) {
    const { userAllergy } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} name={route.params.recipe.name} />
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image style={{
                        width: 300,
                        height: 200,
                        resizeMode: 'contain'
                    }} source={route.params.recipe.uri} />
                </View>
                <View style={styles.informationContainer}>
                    <View style={styles.informationBox}>
                        <MaterialIcons name="timer" size={40} />
                        <Text>{route.params.recipe.time}</Text>
                    </View>
                    <View style={styles.informationBox}>
                        <Ionicons name="md-people" size={40} />
                        <Text>{route.params.recipe.serving}</Text>
                    </View>
                    {userAllergy.length > 0 ?
                        <TouchableOpacity style={styles.informationBox}>
                            <MaterialCommunityIcons name="alert" size={40} color="red" />
                            <Text>{route.params.recipe.allergies}</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.informationBox}>
                            <MaterialCommunityIcons name="adjust" size={40} color="green" />
                            <Text>{route.params.recipe.allergies}</Text>
                        </TouchableOpacity>}

                </View>
                <View style={styles.ingredientsContainer}>
                    <View style={styles.ingredientsBox}>
                        <Text style={styles.boxTitle}>재료</Text>
                        {route.params.recipe.ingredients.map(
                            ingredient => <Text style={styles.boxText}>{ingredient.name} ------- {ingredient.quantity}</Text>)
                        }
                    </View>
                    <View style={styles.seasoningBox}>
                        <Text style={styles.boxTitle}>양념</Text>
                        {route.params.recipe.seasoning.map(
                            ingredient => <Text style={styles.boxText}>{ingredient.name} ------- {ingredient.quantity}</Text>)
                        }
                    </View>
                </View>
                <View style={styles.directionsContainer}>
                    <Text style={styles.boxTitle}>조리 순서</Text>
                    {route.params.recipe.directions.map((direction, index) => {
                        return (
                            <View style={styles.directionBox}>
                                <Text style={styles.boxText}>{index + 1}. {direction.order}</Text>
                                <Image style={{
                                    width: 300,
                                    height: 200,
                                    resizeMode: 'contain'
                                }} source={direction.uri} />
                            </View>
                        )
                    })}
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
        paddingBottom: 10,
        paddingTop: 20

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
    imageContainer: {
        alignItems: "center"
    },
    informationContainer: {
        flexDirection: "row",
        marginHorizontal: 50,
        justifyContent: "space-between",
        backgroundColor: "yellow",
        paddingVertical: 10
    },
    informationBox: {

        alignItems: "center"
    }
    ,
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
        backgroundColor: "skyblue",
        width: width - 30
    },
    directionBox: {
        marginTop: 8
    },
    boxTitle: {
        fontSize: 20,
        paddingVertical: 10
    },
    boxText: {
        paddingVertical: 2
    }
});
