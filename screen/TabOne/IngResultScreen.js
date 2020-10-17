import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function IngResultScreen({ route, navigation }) {
    const { recipes } = route.params;

    const rec = recipes.filter(menu => menu.division === route.params.product.division);

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} name={route.params.product.name} />
            <View style={styles.productContainer}>
                <Image style={{
                    width: 300,
                    height: 200,
                    resizeMode: 'contain'
                }} source={{ uri: route.params.product.uri }} />
                <Text style={styles.foodTitle}>{route.params.product.name} ----- {route.params.product.price}원</Text>
            </View>
            <View style={styles.cautionContainer}>
                <Text style={styles.subtitleText}>주의 항목 : </Text>
                {route.params.product.warnings.map(cau => <Text style={styles.cautionText}>{cau}</Text>)}
            </View>
            <View style={styles.recomContainer}>
                <Text style={styles.subtitleText}>레시피 추천</Text>
                <View style={styles.recomBox}>
                    {rec.map(dish =>
                        <TouchableOpacity
                            style={styles.recomDetail}
                            onPress={() => { navigation.navigate("RecipeScreen", { recipe: dish }) }}
                        >
                            <Image style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain',

                            }} source={{ uri: dish.uri }} />
                            <Text>{dish.name}</Text>
                        </TouchableOpacity>)}
                </View>
            </View>
        </SafeAreaView >
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
        flex: 1,
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
    productContainer: {
        backgroundColor: "yellow",
        width: width - 30,
        alignItems: "center",
        flex: 4
    },
    cautionContainer: {
        backgroundColor: "pink",
        width: width - 30,
        flex: 2,
        paddingTop: 15
    },
    recomContainer: {
        width: width - 30,
        backgroundColor: "skyblue",
        flex: 2,
        paddingTop: 15
    },
    recomBox: {
        flexDirection: "row"
    },
    recomDetail: {
        marginRight: 30
    },
    foodTitle: {
        fontSize: 25,
        color: "red"
    },
    cautionText: {
        fontSize: 20,
        marginTop: 5
    },
    subtitleText: {
        fontSize: 22
    }
});
