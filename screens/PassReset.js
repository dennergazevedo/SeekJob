import React from "react";
import Input from '../components/Input';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Block, Button, Text, theme, Icon } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import firebase from 'firebase';

import seekTheme from "../constants/Theme";
import Images from "../constants/Images";

class PassReset extends React.Component {

  state = {
    email:"",
  };

  resetPass = () => {
    const { email } = this.state;

    if(this.state.email == ""){
      Alert.alert("Atenção!", "Digite o e-mail");
    }
    firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      alert('Reset de senha foi enviado para seu e-mail');
    })
    .catch(function (error) {
      var errorCode = error.code;

        if(errorCode == 'auth/invalid-email'){
          Alert.alert('Atenção!','E-mail inválido!');
        }else if (errorCode == 'auth/user-not-found'){
          Alert.alert('Atenção!', 'E-mail não encontrado!');
        }else{
          console.log(error);
    }
  });
}

  render() {

    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <KeyboardAvoidingView
              style={styles.containerStyle}
              behavior="padding"
              enabled
              keyboardVerticalOffset={320}
            >
              <Block center>
                <Image source={Images.LogoOnboarding} style={styles.logo} />
              </Block>
              <Input
                placeholder=" E-mail"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                iconContent={
                  <Icon
                    size={14}
                    color={seekTheme.COLORS.ICON}
                    name="user"
                    family="AntDesign"
                  />
                }
              />

              <Block center>
                <Button
                  style={styles.button}
                  color={seekTheme.COLORS.SECONDARY}
                  textStyle={{ color: seekTheme.COLORS.BLACK }}
                  onPress={this.resetPass}>
                  <Text bold size={14} color={seekTheme.COLORS.BUTTON_COLOR}>
                    RESETAR PASSWORD
                    </Text>
                </Button>
              </Block>

              <Block center>
                <Text
                  style={styles.buttonBack}
                  bold
                  size={16}
                  color={seekTheme.COLORS.WHITE}
                  onPress={() => navigation.navigate("Login")}>
                  Voltar
                </Text>
              </Block>
            </KeyboardAvoidingView>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    marginTop: 25,
    width: width - theme.SIZES.BASE * 13,
    height: theme.SIZES.BASE * 2.7,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 100
  },
  logo: {
    marginBottom: 50,
    width: 113,
    height: 202,
    zIndex: 2,
    position: 'relative',
    marginTop: '-60%'
  },

  title: {
    marginTop: '-5%'
  },
  buttonBack: {
    marginTop: 15,
  },
});

export default PassReset;
