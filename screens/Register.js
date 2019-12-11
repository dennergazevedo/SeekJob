import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import * as firebase from 'firebase';

import { Button, Icon, Input } from "../components";
import { Images, seekTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
    state={
      name:"",
      password:"",
      email:"",
      errorMessage: null
    }

    handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
          return userCredentials.user.updateProfile({
            displayName: this.state.name
          });
        })
        .catch(error => this.setState({ errorMessage: error.message }));
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
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Cadastrar usando
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="facebook"
                        family="AntDesign"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>Facebook</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="google"
                        family="AntDesign"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>Google</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.1} middle>
                  <Text color="#8898AA" size={12}>
                  Ou inscreva-se da maneira clássica
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
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
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
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
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
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
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                      />
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={seekTheme.COLORS.MUTED}>
                          Força da senha:
                        </Text>
                        <Text bold size={12} color={seekTheme.COLORS.SUCCESS}>
                          {" "}
                          forte
                        </Text>
                      </Block>
                    </Block>


                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={seekTheme.COLORS.PRIMARY}
                        label="Eu concordo com os "
                      />
                      <Text bold size={14} color={seekTheme.COLORS.PRIMARY}>
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
    width: width * 0.9,
    height: height * 0.80,
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
  }
});

export default Register;
