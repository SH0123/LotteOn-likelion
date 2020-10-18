import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import Checklist from "./Todo";

export default function SettingScreen() {
  const [allergyCheck, setallergyCheck] = useState([
    {
      id: 0,
      content: "우유",
      checked: false,
    },
    {
      id: 1,
      content: "땅콩",
      checked: false,
    },
    {
      id: 2,
      content: "밀",
      checked: false,
    },
    {
      id: 3,
      content: "난류",
      checked: false,
    },
    {
      id: 4,
      content: "돼지고기",
      checked: false,
    },
    {
      id: 5,
      content: "새우",
      checked: false,
    },
    {
      id: 6,
      content: "메밀",
      checked: false,
    },
    {
      id: 7,
      content: "토마토",
      checked: false,
    },
    {
      id: 8,
      content: "대두",
      checked: false,
    },
    {
      id: 9,
      content: "복숭아",
      checked: false,
    },
    {
      id: 10,
      content: "고등어",
      checked: false,
    },
    {
      id: 11,
      content: "게",
      checked: false,
    },
    {
      id: 12,
      content: "아황산류",
      checked: false,
    },
    {
      id: 13,
      content: "호두",
      checked: false,
    },
    {
      id: 14,
      content: "닭고기",
      checked: false,
    },
    {
      id: 15,
      content: "쇠고기",
      checked: false,
    },
    {
      id: 16,
      content: "오징어",
      checked: false,
    },
    {
      id: 17,
      content: "조개류",
      checked: false,
    },
  ]);
  

  const onToggle = (id) => e=>{
   setallergyCheck(
    allergyCheck.map(allergy =>
        allergy.id === id ? {...allergy, checked: !allergy.checked} : allergy,
      ),
    );
  };  
  
  const onToggleEtc = (id) => e=>{
    setetcCheck(
      etcCheck.map(etc =>
         etc.id === id ? {...etc, checked: !etc.checked} : etc,
       ),
     );
   };

  const [etcCheck, setetcCheck] = useState( [
    {
      id:0,
      content: "할랄",
      checked: false,
    },
    {
      id:1,
      content: "비건",
      checked: false,
    },
  ]);

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

          <View style={styles.row}>
            <View style={styles.col}>
              {allergyCheck.map((allergy) => (
                <View  style={styles.col} key = {allergy.id}>
                  {allergy.id <8 &&(<Checklist id ={allergy.id} checklist = {allergy}  onToggle={onToggle}/>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.col}>
              {allergyCheck.map((allergy) => (
                <View  style={styles.col} key = {allergy.id}>
                  {allergy.id >8 &&(<Checklist id ={allergy.id} checklist = {allergy}  onToggle={onToggle}/>
                  )}
                </View>
              ))}
            </View>
          </View>

      </View>

      <View style={styles.etc}>
        <Text style={{ fontSize: 20 }}>추가 옵션</Text>
        <View style={styles.line} />
        {etcCheck.map((etc) => (
          <View style={styles.col} key={etc.id}>
             <Checklist id ={etc.id} checklist = {etc} onToggle={onToggleEtc}/>
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
    width:"50%"
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
    flex: 1.5,
  },
  etc: {
    flex: 1,
  },
});
