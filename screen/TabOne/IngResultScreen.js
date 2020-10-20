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
                        style={{ marginLeft: 5, alignItems: "center" }}
                        onPress={() => { setVisible(true) }}
                    >
                        <MaterialCommunityIcons name="alert" size={40} color="red" />
                        <Text>상세정보</Text>
                    </TouchableOpacity> : <TouchableOpacity
                        style={{ marginLeft: 5, alignItems: "center" }}
                        onPress={() => { setVisible(true) }}
                    >
                            <MaterialCommunityIcons name="adjust" size={40} color="green" />
                            <Text>상세정보</Text>
                        </TouchableOpacity>}

                </View>
                <Text>{route.params.product.brand}</Text>
                <Text>{route.params.product.name}</Text>
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
                                        <Text>{item.name}</Text>
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
                                <Text>사용자가 조심해야 할 알러지 유발 항목</Text>
                                {allergyChecking.map(allergy => <Text>{allergy}</Text>)}
                                <Text>기타 알러지 유발 항목</Text>
                                {extraAllergy(allergies, allergyChecking).map(allergy => <Text>{allergy}</Text>)}
                                <Text>기타 음식 특징</Text>
                                <Text>{feature}</Text>
                                <Button onPress={() => setVisible(false)} title="확인" />
                            </View>
                            :
                            <View>
                                <Text>알러지 유발 항목</Text>
                                {allergies.map(allergy => <Text>{allergy}</Text>)}
                                <Text>기타 음식 특징</Text>
                                <Text>{feature}</Text>
                                <Button onPress={() => setVisible(false)} title="확인" />
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
        fontSize: 20,
        color: "red"
    },
    cautionText: {
        fontSize: 20,
        marginTop: 5
    },
    subtitleText: {
        fontSize: 22
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#000000aa"
    },
    modalMain: {
        backgroundColor: "white",
        marginTop: 100,
        margin: 50
    }
});
