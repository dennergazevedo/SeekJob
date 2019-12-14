import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { Block, Checkbox, Text } from "galio-framework";

import Fire from "../Fire";

import { Button, Input } from "../components";

import Icon from 'react-native-vector-icons/AntDesign';

import { Images, seekTheme } from "../constants";

import UserPermissions from "../utilities/UserPermissions";

import * as ImagePicker from 'expo-image-picker'

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  state = {
    user: {
      avatar: null,
      name: "",
      password: "",
      email: "",
      phone: "",
      cidade: "",
      school: "",
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

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  handleSignUp = () => {
    if (this.state.check === true) {
      if (this.state.user.name != "" && this.state.user.phone != "") {
        if (this.state.user.avatar != null) {
          Fire.shared.createUser(this.state.user);
        } else {
          Alert.alert("Atenção!", "Você precisa adicionar uma foto!")
        }
      } else {
        Alert.alert("Atenção!", 'Preencha todos os dados!')
      }
    } else {
      Alert.alert("Atenção!", "Você precisa concordar com os termos de uso!")
    }
  };

  render() {
    return (
      <Block middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.Onboarding}
          style={{ width, height, zIndex: 1 }}
        >
          <Block style={styles.blockcenter}>
            <Block style={styles.registerContainer}>
              <Text bold italic style={styles.greeting}>
                {`Olá,\nCadastre-se para iniciar!`}
              </Text>
              <Block style={{ alignItems: "center", width: "100%" }}>
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                  <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                  <Icon
                    name="camera"
                    family="AntDesign"
                    size={30}
                    color="#0006"
                    style={{ marginTop: 6, marginRight: 2 }}
                  />
                </TouchableOpacity>
              </Block>
              <Block flex>
                <Block flex center style={styles.blockcenter}>
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
                        onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                        value={this.state.user.name}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={14}
                            color={seekTheme.COLORS.ICON}
                            name="mail"
                            family="AntDesign"
                            style={styles.inputIcons}
                          />
                        }
                        autoCapitalize="none"
                        onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
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
                        onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                        value={this.state.user.password}
                      />
                    </Block>

                    <Block width={width * 0.8}>
                      <Input
                        maxLength={11}
                        borderless
                        keyboardType={'phone-pad'}
                        placeholder='Telefone'
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
                        onChangeText={phone => this.setState({ user: { ...this.state.user, phone } })}
                        value={this.state.user.phone}
                      />
                    </Block>

                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder='Cidade atual'
                        iconContent={
                          <Icon
                            size={16}
                            color={seekTheme.COLORS.ICON}
                            name="enviromento"
                            family="AntDesign"
                            style={styles.inputIcons}
                          />
                        }
                        autoCapitalize="none"
                        onChangeText={cidade => this.setState({ user: { ...this.state.user, cidade } })}
                        value={this.state.user.cidade}
                      />
                    </Block>

                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder='Escolaridade'
                        iconContent={
                          <Icon
                            size={16}
                            color={seekTheme.COLORS.ICON}
                            name="staro"
                            family="AntDesign"
                            style={styles.inputIcons}
                          />
                        }
                        autoCapitalize="none"
                        onChangeText={school => this.setState({ user: { ...this.state.user, school } })}
                        value={this.state.user.school}
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


                    <Block center row width={width * 0.75} style={styles.termos}>
                      <Checkbox
                        label=""
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        value={this.state.check}
                        onChange={() => this.checkAlert()}
                        color={seekTheme.COLORS.BUTTON_COLOR}
                      />
                      <Text
                        style={{
                          marginLeft: 5
                        }}
                        size={14}
                        color={seekTheme.COLORS.BLACK}>
                        Eu concordo com os
                      </Text>
                      <Text style={{
                        marginLeft: 5
                      }}
                        bold
                        size={14}
                        color={seekTheme.COLORS.BUTTON_COLOR}>
                        Termos de Uso
                        </Text>
                    </Block>
                    <Block middle>
                      <Button
                        color="button_color"
                        style={styles.createButton}
                        onPress={this.handleSignUp}
                      >
                        <Text bold size={14} color={seekTheme.COLORS.WHITE}>
                          CRIAR CONTA
                        </Text>
                      </Button>
                      <Text
                        bold
                        size={16}
                        color={seekTheme.COLORS.BUTTON_COLOR}
                        onPress={() => this.props.navigation.goBack()}>
                        Voltar
                        </Text>
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

  inputIcons: {
    marginRight: 12
  },

  createButton: {
    width: width * 0.5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 100
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF8",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  blockcenter: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 25
  },

  greeting: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: seekTheme.COLORS.BLACK,
  },

  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50
  },

  termos:{
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 10
  }

});

export default Register;
