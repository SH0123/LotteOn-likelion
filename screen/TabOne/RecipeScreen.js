import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, ScrollView, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function RecipeScreen({ navigation, route }) {
    const { userAllergy } = route.params;
    const { allergies, feature } = route.params.recipe;

    const [visible, setVisible] = React.useState(false);

    const allergyCheck = (foodArr, userArr) => {
        let ret = [];
        for (let i = 0; i < foodArr.length; ++i) {
            if (userArr.indexOf(foodArr[i]) > -1) {
                ret.push(foodArr[i]);
            }
        }
        return ret;
    }

    const extraAllergy = (foodArr, userArr) => {
        let ret = [];
        for (let i = 0; i < foodArr.length; ++i) {
            if (userArr.indexOf(foodArr[i]) === -1) {
                ret.push(foodArr[i]);
            }
        }
        return ret;
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} name={route.params.recipe.name} />
            <ScrollView>
                <View style={{ borderBottomWidth: 1, borderBottomColor: "grey", }}>
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
                        {allergyCheck(allergies, userAllergy).length > 0 ?
                            <TouchableOpacity
                                style={styles.informationBox}
                                onPress={() => setVisible(true)}
                            >
                                <MaterialCommunityIcons name="alert" size={40} color="red" />
                                <Text>상세정보</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={styles.informationBox}
                                onPress={() => setVisible(true)}
                            >
                                <MaterialCommunityIcons name="adjust" size={40} color="green" />
                                <Text>상세정보</Text>
                            </TouchableOpacity>}

                    </View>
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
                                    resizeMode: 'contain',
                                    marginTop: 10
                                }} source={direction.uri} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <Modal visible={visible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalMain}>
                        {allergyCheck(allergies, userAllergy).length > 0 ?
                            <View>
                                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1 }}>
                                    <Text style={styles.modalTitle}>사용자가 조심해야 할 알러지 유발 항목</Text>
                                    {allergyCheck(allergies, userAllergy).map(allergy => <Text style={styles.modalContent}>{allergy}</Text>)}
                                </View>
                                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1 }}>
                                    <Text style={styles.modalTitle}>기타 알러지 유발 항목</Text>
                                    {extraAllergy(allergies, allergyCheck(allergies, userAllergy)).map(allergy => <Text style={styles.modalContent}>{allergy}</Text>)}
                                </View>
                                <Text style={styles.modalTitle}>기타 음식 특징</Text>
                                <Text style={styles.modalContent}>{feature}</Text>
                                <TouchableOpacity
                                    onPress={() => setVisible(false)}
                                    style={{ borderRadius: 25, backgroundColor: "#dd2d2d", padding: 10, borderColor: "black", alignItems: "center" }}
                                >

                                    <Text style={{ color: "white" }}>확인</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1 }}>
                                    <Text style={styles.modalTitle}>알러지 유발 항목</Text>
                                    {allergies.map(allergy => <Text style={styles.modalContent}>{allergy}</Text>)}
                                </View>
                                <Text style={styles.modalTitle}>기타 음식 특징</Text>
                                <Text style={styles.modalContent}>{feature}</Text>
                                <TouchableOpacity
                                    onPress={() => setVisible(false)}
                                    style={{ borderRadius: 25, backgroundColor: "#dd2d2d", padding: 10, borderColor: "black", alignItems: "center" }}
                                >

                                    <Text style={{ color: "white" }}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            </Modal>
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
        flex: 6,

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
        alignItems: "center",
        marginTop: 20
    },
    informationContainer: {
        flexDirection: "row",
        marginHorizontal: 50,
        justifyContent: "space-between",
        paddingVertical: 10,

    },
    informationBox: {

        alignItems: "center"
    }
    ,
    ingredientsContainer: {
        flexDirection: "row",
        width: width - 30,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    ingredientsBox: {
        width: 2 * width / 5,
        marginRight: 30
    },
    seasoningBox: {
        width: 2 * width / 5,
    },
    directionsContainer: {
        width: width - 30
    },
    directionBox: {
        marginTop: 8
    },
    boxTitle: {
        fontSize: 22,
        paddingVertical: 10
    },
    boxText: {
        fontSize: 15,
        paddingVertical: 5,
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#000000aa",
        alignItems: "center"
    },
    modalMain: {
        backgroundColor: "white",
        marginTop: 100,
        margin: 50,
        borderRadius: 25,
        padding: 10,
        width: width - 70
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5
    },
    modalContent: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10
    }
});
