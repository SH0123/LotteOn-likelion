import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const [allergyCheck, setallergyCheck] = useState(false);
  const allergyList = [
    {
      content: "우유",
      check: false,
    },
    {
      content: "콩",
      check: false,
    },
    {
      content: "밀",
      check: false,
    },
    {
      content: "달걀",
      check: false,
    },
    {
      content: "돼지고기",
      check: false,
    },
    {
      content: "견과류",
      check: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>개인설정</Text>

        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.3}
          style={styles.button}
        >
          <Text>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.allergy}>
        <Text style={{ fontSize: 20 }}>알레르기 </Text>
        <View style={styles.line} />

        {allergyList.map((allergy, key) => (
          <View style={{ flexDirection: "column" }} key={key}>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                key={key}
                value={allergy.check}
                onValueChange={setallergyCheck}
                onAnimationType="stroke"
              />
              <Text style={{ marginTop: 5 }}> {allergy.content}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.etc}>
        <Text style={{ fontSize: 20 }}>추가 옵션</Text>
        <View style={styles.line} />
        <View></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  line: {
    height: 2,
    width: 100,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#CCCCCC",
  },

  top: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 100,
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "powderblue",
    alignItems: "flex-end",
  },

  allergy: {
    flex: 1,
  },
  etc: {
    flex: 1,
  },
});
