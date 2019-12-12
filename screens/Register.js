import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from "react-native";
import { Block, Checkbox, Text } from "galio-framework";

import * as firebase from 'firebase';

import { Button, Icon, Input } from "../components";
import { Images, seekTheme } from "../constants";

import UserPermissions from "../utilities/UserPermissions";

import * as ImagePicker from 'expo-image-picker'

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
    state={
      user:{
        avatar:null,
        name: "",
        password:"",
        email:"",
        phone: ""
      },
      check: true,
      errorMessage: null
    }

    checkAlert = () => {
      this.state.check = !this.state.check
    };

    handlePickAvatar = async () => {
      UserPermissions.getCameraPermission()
    
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      })
    
      if(!result.cancelled){
      this.setState({user: {...this.state.user, avatar: result.uri} });
      }
    };

    handleSignUp = () => {
      if(this.state.check === true){
        if(this.state.user.name != "" && this.state.user.phone != ""){
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.user.email, this.state.user.password)
          .then(userCredentials => {
            return userCredentials.user.updateProfile({
              displayName: this.state.user.name
            });
          })
          .catch(error => this.setState({ errorMessage: error.message }));
        }else{
          alert('Preencha todos os dados!');
        }
      }else{
        alert('Você precisa concordar com os termos de uso!')
      }
    };

  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
            <Icon
                  name="caret-left"
                  family="AntDesign"
                  size={20}
                  color="#FFF"
            />
          </TouchableOpacity>
            <Block style={styles.registerContainer}> 
            <Text style={styles.greeting}>
                  {`Olá,\nCadastre-se para iniciar!`}
                </Text>   
            <Block style={{alignItems:"center", width: "100%" }}>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                      <Image source={{uri:this.state.user.avatar}} style={styles.avatar}/>
                        <Icon
                        name="camera"
                        family="AntDesign"
                        size={30}
                        color="#0001"
                        style={{ marginTop: 6, marginRight: 2 }}
                        />
                  </TouchableOpacity>
                  </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={320}
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        borderless
                        placeholder="Nome"
                        iconContent={
                          <Icon
                            size={16}
                            color={seekTheme.COLORS.ICON}
                            name="user"
                            family="AntDesign"
                            style={styles.inputIcons}
                          />
                        }
                        autoCapitalize="none"
                        onChangeText={name => this.setState({ user : { ...this.state.user, name} })}
                        value={this.state.user.name}
                      />
                    </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                        <Input
                          borderless
                          placeholder="Email"
                          iconContent={
                            <Icon
                              size={16}
                              color={seekTheme.COLORS.ICON}
                              name="inbox"
                              family="AntDesign"
                              style={styles.inputIcons}
                            />
                          }
                          autoCapitalize="none"
                          onChangeText={email => this.setState({ user : { ...this.state.user, email} })}
                          value={this.state.user.email}
                        />
                      </Block>

                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Senha"
                        iconContent={
                          <Icon
                            size={16}
                            color={seekTheme.COLORS.ICON}
                            name="lock"
                            family="AntDesign"
                            style={styles.inputIcons}
                          />
                        }
                        autoCapitalize="none"
                        onChangeText={password => this.setState({ user : { ...this.state.user, password} })}
                        value={this.state.user.password}
                      />
                    </Block>

                    <Block width={width * 0.8}>
                      <Input
                        type="phone-pad"
                        maxLength={11}
                        borderless
                        placeholder="Telefone"
                        iconContent={
                          <Icon
                            size={16}
                            color={seekTheme.COLORS.ICON}
                            name="phone"
                            family="AntDesign"
                            style={styles.inputIcons}
                          />
                        }
                        autoCapitalize="none"
                        onChangeText={phone => this.setState({ user : { ...this.state.user, phone} })}
                        value={this.state.user.phone}
                      />
                    </Block>

                    <Block center>
                      {
                      this.state.errorMessage && 
                            <Text bold size={12} color={seekTheme.COLORS.BUTTON_COLOR}>
                            {this.state.errorMessage}
                            </Text>
                      }
                      </Block>


                    <Block center row width={width * 0.75}>
                      <Checkbox
                        label=""
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        value={this.state.check}
                        onChange={() => this.checkAlert()}
                        color={seekTheme.COLORS.PRIMARY}
                      />
                      <Text 
                          style={{
                            marginLeft: 5
                          }}
                          size={14}
                          color={seekTheme.COLORS.DEFAULT}>
                            Eu concordo com os
                      </Text>
                      <Text style={{
                            marginLeft: 5
                          }}
                          bold
                          size={14}
                          color={seekTheme.COLORS.PRIMARY}>
                        Termos de Uso
                        </Text>
                    </Block>
                    <Block middle>
                      <Button color="primary"
                      style={styles.createButton}
                      onPress={this.handleSignUp}
                      >
                        <Text bold size={14} color={seekTheme.COLORS.WHITE}>
                          CRIAR CONTA
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    marginTop: 10,
    width: width * 0.9,
    height: height * 0.85,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: seekTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: seekTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: seekTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: seekTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 100
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF8",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
    
  },

  back:{
    right: 135,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF1",
    alignItems:"center",
    justifyContent:"center"	
  },

  greeting:{
    marginTop: 20,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color:seekTheme.COLORS.BUTTON_COLOR,
  },
  
  avatar:{
    position:"absolute",
    width: 100,
    height: 100,
    borderRadius: 50
  }

});

export default Register;
