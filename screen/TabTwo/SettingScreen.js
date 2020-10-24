import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Feather} from "@expo/vector-icons";
import Checklist from "./Checklist";
import * as Font from 'expo-font';
import projects from '../../apis/projects';
import {FontAwesome} from "@expo/vector-icons";

const {width, height} = Dimensions.get('window');

Font.loadAsync({
  'ExtraBold': require('../../assets/fonts/GothicA1-ExtraBold.ttf'),
  'Bold': require('../../assets/fonts/GothicA1-Bold.ttf'),
  'Medium': require('../../assets/fonts/GothicA1-Medium.ttf'),
});

export default function SettingScreen({ route, navigation }) {
  const[visible, setVisible] = React.useState(false);
  const [allergyCheck, setallergyCheck] = useState([]);
  const [etcCheck, setetcCheck] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(()=>{
      fetch('http://runanam.pythonanywhere.com/allergy/')
        .then((response) => response.json())
        .then((json) => setallergyCheck(json))
        .catch((error) => console.error(error))

      fetch('http://runanam.pythonanywhere.com/etc/')
        .then((response) => response.json())
        .then((json) => setetcCheck(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      

  },[])

  
  const onToggle = (id) => e =>{
   setallergyCheck(
    allergyCheck.map(allergy =>
        allergy.id === id ? {...allergy, checked: !allergy.checked} : allergy,
      ),
    );

    fetch(`http://runanam.pythonanywhere.com/allergy/update/${id}/`,{
      method:'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        id:id,
        content:allergyCheck[id-1].content,
        checked: !allergyCheck[id-1].checked
      }),      
    })
    .then((res) => res.json())
    .then((response) => console.log("Success: ", JSON.stringify(response)))
   .catch((error) => {
    console.error(error)
   });   

  };  

  
  const onToggleEtc = (id) => e=>{
  setetcCheck(
    etcCheck.map(etc =>
        etc.id === id ? {...etc, checked: !etc.checked} : etc,
      ),
    );
    
    fetch(`http://runanam.pythonanywhere.com/etc/update/${id}/`,{
      method:'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        id:id,
        content:etcCheck[id-1].content,
        checked: !etcCheck[id-1].checked
      }),      
    })
    .then((res) => res.json())
    .then((response) => console.log("Success: ", JSON.stringify(response)))
   .catch((error) => {
    console.error(error)
   });   
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row"}}>
          <View style={{justifyContent: "center"}}>
            <Feather name="settings" size={28}/>
          </View>
          <Text style={styles.title}>개인설정</Text>
        </View>
        <TouchableOpacity 
        style={styles.questionContainer}
        onPress={()=>setVisible(true)}
        >
          <FontAwesome name="question-circle-o" size={30} color="#A9A9A9"/>
        </TouchableOpacity>
      </View>

                                        
      <View style={styles.allergy}>
        <Text style={styles.subtitle}>알레르기 </Text> 
        <View style={styles.subline}/>

        <View style={styles.line}/>
          {isLoading ? (<Text>loading </Text>):
          ( 
            <View style={styles.row}>
            <View style={styles.col}>
              {allergyCheck.map((allergy) => (
                <View  style={styles.col} key = {allergy.id}>
                  {allergy.id <10 &&(<Checklist id ={allergy.id} checklist = {allergy}  onToggle={onToggle}/>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.col}>
              {allergyCheck.map((allergy) => (
                <View  style={styles.col} key = {allergy.id}>
                  {allergy.id >10 &&(<Checklist id ={allergy.id} checklist = {allergy}  onToggle={onToggle}/>
                  )}
                </View>
              ))}

            </View>
           
          </View>
          )
          }
          

      </View>

      <View style={styles.etc}>
        <Text style={styles.subtitle}>추가 옵션</Text>
        <View style={styles.subline}/>
        <View style={styles.line}/>
        {etcCheck.map((etc) => (
          <View style={styles.col} key={etc.id}>
             <Checklist id ={etc.id} checklist = {etc} onToggle={onToggleEtc}/>
          </View>
        ))}
      </View>
      <Modal visible={visible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalMain}>
            <View style={styles.modalHeader}>
              <Text>알러지 유발 식품별 대체 식품</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>우유   ->   두유</Text>
              <Text style={styles.modalText}>콩   ->   김, 미역, 멸치</Text>
              <Text style={styles.modalText}>밀   ->   감자, 쌀</Text>
              <Text style={styles.modalText}>달걀   ->   두부, 콩나물</Text>
              <Text style={styles.modalText}>돼지고기   ->   쇠고기, 흰살생선</Text>
              <Text style={styles.modalText}>생선   ->   두부, 달걀, 쇠고기, 닭고기</Text>
            </View>
            <TouchableOpacity
            onPress={()=>setVisible(false)}
            style={styles.buttonContainer}
            >
              <Text style={{color: "white"}}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 2,
    marginBottom: 5,
    width:"30%",
    backgroundColor: "#CCCCCC",
  },
  subline: {
    height: 1.5,
    width:"30%",
    backgroundColor: "#CCCCCC",
  },

  top: {
    height: 50,
    flexDirection: "row",
    marginBottom:10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 30,
    fontFamily:'ExtraBold',
    marginLeft: 10
  },  

  subtitle: {
    fontSize: 23,
    fontFamily:'Bold',
    color:"black",
    borderRadius:5,
    padding:3,
    marginLeft:"2%"
  },

  col:{
    flexDirection: "column" , 
    width:"50%",
  },  
  row:{
    flexDirection: "row" , 
  }, 

  allergy: {
    flex: 1.5,
  },
  etc: {
    flex: 1,
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
    width : width - 55
  },
  modalHeader:{
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1
  },
  modalContent: {
    padding: 10
  },
  modalText: {
    margin: 5
  },
  questionContainer: {
    marginRight: 10
  },
  buttonContainer: {
    borderRadius: 25,
    backgroundColor: "#dd2d2d",
    padding: 10,
    borderColor: "black",
    alignItems: "center"
  }
});
