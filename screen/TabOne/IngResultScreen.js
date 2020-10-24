import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList, Modal, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function IngResultScreen({ route, navigation }) {
    const { recipes, allergyChecking, userAllergy } = route.params;
    const { allergies, feature } = route.params.product;
    const [visible, setVisible] = React.useState(false);
    const rec = recipes.filter(menu => menu.division === route.params.product.division);

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
            <Header navigation={navigation} name={route.params.product.name} />
            <View style={styles.productContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Image style={{
                        width: 300,
                        height: 200,
                        resizeMode: 'contain'
                    }} source={route.params.product.uri} />
                    {allergyChecking.length > 0 ? <TouchableOpacity
                        style={{ position: "absolute" }}
                        onPress={() => { setVisible(true) }}
                    >
                        <MaterialCommunityIcons name="alert" size={40} color="#dd2d2d" />
                    </TouchableOpacity> : <TouchableOpacity
                        style={{ position: "absolute" }}
                        onPress={() => { setVisible(true) }}
                    >
                            <MaterialCommunityIcons name="adjust" size={40} color="green" />
                        </TouchableOpacity>}

                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{route.params.product.brand} </Text>
                    <Text style={{ fontSize: 18 }}>{route.params.product.name}</Text>
                </View>
                <Text style={styles.foodTitle}>{route.params.product.price}원</Text>
            </View>
            <View style={styles.cautionContainer}>
                <Text style={styles.subtitleText}>주의 항목 : </Text>
                {route.params.product.warnings.map(cau => <Text style={styles.cautionText}>{cau}</Text>)}
            </View>
            <View style={styles.recomContainer}>
                {rec.length > 0 ?
                    <>
                        <Text style={styles.subtitleText}>레시피 추천</Text>
                        <FlatList
                            style={styles.recomBox}
                            horizontal={true}
                            data={rec}
                            renderItem={({ item }) => {

                                return (
                                    <TouchableOpacity
                                        style={styles.recomDetail}
                                        onPress={() => { navigation.navigate("RecipeScreen", { recipe: item, userAllergy: userAllergy }) }}
                                    >
                                        <Image style={{
                                            width: 80,
                                            height: 80,
                                            resizeMode: 'contain',

                                        }} source={item.uri} />
                                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={({ item, index }) => `${index}`} />
                    </> :
                    <></>}


            </View>
            <Modal visible={visible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalMain}>
                        {allergyChecking.length > 0 ?
                            <View>
                                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginTop: 5 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <MaterialCommunityIcons name="alert" size={18} color="#dd2d2d" />
                                        </View>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={styles.modalTitle}>사용자가 조심해야 할 알러지 유발 항목</Text>
                                        </View>
                                    </View>

                                    {allergyChecking.map(allergy => <Text style={styles.modalContent}>{allergy}</Text>)}
                                </View>
                                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginTop: 5 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <MaterialCommunityIcons name="alert" size={18} color="#fdab17" />
                                        </View>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={styles.modalTitle}>기타 알러지 유발 항목</Text>
                                        </View>
                                    </View>
                                    {extraAllergy(allergies, allergyChecking).map(allergy => <Text style={styles.modalContent}>{allergy}</Text>)}
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <MaterialCommunityIcons name="alert" size={18} color="grey" />
                                        </View>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={styles.modalTitle}>기타 음식 특징</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.modalContent}>{feature}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setVisible(false)}
                                    style={{ borderRadius: 25, backgroundColor: "#dd2d2d", padding: 10, borderColor: "black", alignItems: "center" }}
                                >

                                    <Text style={{ color: "white" }}>확인</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, marginTop: 5 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <MaterialCommunityIcons name="alert" size={18} color="#fdab17" />
                                        </View>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={styles.modalTitle}>알러지 유발 항목</Text>
                                        </View>
                                    </View>
                                    {extraAllergy(allergies, allergyChecking).map(allergy => <Text style={styles.modalContent}>{allergy}</Text>)}
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <MaterialCommunityIcons name="alert" size={18} color="grey" />
                                        </View>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={styles.modalTitle}>기타 음식 특징</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.modalContent}>{feature}</Text>
                                </View>
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
            <View style={styles.headerStar}></View>
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
        marginTop: 10
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
    productContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: width - 30,
        alignItems: "center",
        flex: 4
    },
    cautionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: width - 30,
        flex: 2,
        paddingTop: 15,

    },
    recomContainer: {
        width: width - 30,

        flex: 2,
        paddingTop: 15
    },
    recomBox: {
        flexDirection: "row"
    },
    recomDetail: {
        marginRight: 30,
        alignItems: "center"
    },
    foodTitle: {
        fontSize: 21,
        color: "red",
        marginTop: 5
    },
    cautionText: {
        fontSize: 19,
        marginTop: 5
    },
    subtitleText: {
        fontSize: 22
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
        marginLeft: 10
    },
    modalContent: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 27
    }
});
