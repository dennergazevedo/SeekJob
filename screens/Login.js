import React from "react";
import Input from '../components/Input';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme, Icon } from "galio-framework";

import {KeyboardAvoidingView} from 'react-native';
import { Platform } from 'react-native';

const { height, width } = Dimensions.get("screen");

import seekTheme from "../constants/Theme";
import Images from "../constants/Images";

import * as firebase from 'firebase';

class Login extends React.Component {
  state = {
    email:"",
    password:"",
    errorMessage: null
  }

  handleLogin = () => {
    const {email, password} = this.state;
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error=> this.setState({ errorMessage: error.message }));
  };
  
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
                <Block style={styles.subTitle}>
                  <Text color="white" size={12} onPress={() => navigation.navigate("Home")}>
                    Esqueceu sua senha?
                  </Text>
                </Block>
                  <Input 
                    placeholder=" E-mail"
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value = {this.state.email}
                    iconContent={
                      <Icon
                        size={14}
                        color={seekTheme.COLORS.ICON}
                        name="user"
                        family="AntDesign"
                      />
                    }
                  />
                <Block>
                  <Input 
                    placeholder=" Senha"
                    iconContent={
                      <Icon
                        size={14}
                        color={seekTheme.COLORS.ICON}
                        name="lock"
                        family="AntDesign"
                      />
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                  />
                </Block>

                <Block>
                {
                this.state.errorMessage && 
                  <Text
                    color="white"
                    size={14}
                    >
                      {this.state.errorMessage}
                  </Text>
  }
                </Block>

                  <Block center>
                    <Button
                      style={styles.button}
                      color={seekTheme.COLORS.SECONDARY}
                      onPress={this.handleLogin}
                      textStyle={{ color: seekTheme.COLORS.BLACK }}
                    >
                      Entrar
                    </Button>
                  </Block>
                  
                  <Block center>
                    <Button
                      style={styles.button}
                      color={seekTheme.COLORS.LABEL}
                      onPress={() => navigation.navigate("Register")}
                      textStyle={{ color: seekTheme.COLORS.WHITE }}
                    >
                      Cadastre-se
                    </Button>
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
    marginTop: 10,
    width: width - theme.SIZES.BASE * 12,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 100
  },
  logo: {
    width: 113,
    height: 202,
    zIndex: 2,
    position: 'relative',
    marginTop: '-60%'
  },

  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 35,
    marginLeft: 170,
  },
});

export default Login;
