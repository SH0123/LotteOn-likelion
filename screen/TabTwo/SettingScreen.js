import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const [allergyCheck, setallergyCheck] = useState([
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
  ]);
  

  const setallergy  = (key)=>{
    const newAllergy = allergyCheck;
    newAllergy[key].check = !newAllergy[key].check;
    setallergyCheck(newAllergy);
    console.log(allergyCheck[key].check);
  }

  const [etcCheck, setetcCheck] = useState( [
    {
      content: "할랄",
      check: false,
    },
    {
      content: "비건",
      check: false,
    },
  ]);

  const setEtc  = (key)=>{
    const newEtc = etcCheck;
    newEtc[key].check = !etcCheck[key].check;
    console.log(etcCheck[key].check);
    return (setetcCheck(newEtc));
  }


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

        {allergyCheck.map((allergy, key) => (
          <View  style={styles.col}  key={key}>
             <TouchableOpacity  style={styles.row} onPressOut={() => setallergy(key)}>
              {allergy.check ?(
                <MaterialCommunityIcons size={22} name='checkbox-marked-circle-outline' />
              ):(
                <MaterialCommunityIcons size={22} name='checkbox-blank-circle-outline' />
              )}
              <Text style={styles.listContent}> {allergy.content}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.etc}>
        <Text style={{ fontSize: 20 }}>추가 옵션</Text>
        <View style={styles.line} />
        {etcCheck.map((etc, key) => (
          <View style={styles.col} key={key}>
             <TouchableOpacity style={styles.row} onPressOut={() => setEtc(key)}>
              {etc.check ?(
                <MaterialCommunityIcons size={22} name='checkbox-marked-circle-outline' />
                ):(
                  <MaterialCommunityIcons size={22} name='checkbox-blank-circle-outline' />
                )}
              <Text style={styles.listContent}> {etc.content}</Text>
            </TouchableOpacity>
          </View>
        ))}
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

  col:{
    flexDirection: "column" , 
    marginTop:5,
  },  
  row:{
    flexDirection: "row" , 
  }, 
   listContent:{
    color:"black",
    fontSize:15,
    marginTop:2
  },

  allergy: {
    flex: 1,
  },
  etc: {
    flex: 1,
  },
});
