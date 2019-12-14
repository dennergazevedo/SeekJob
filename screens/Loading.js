import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { Block, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import seekTheme from "../constants/Theme";
import Images from "../constants/Images";

import * as firebase from 'firebase'

class Loading extends React.Component {

    componentDidMount(){
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? "App" : "Auth");
      });
    }

  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={35} >
                    
                  </Text>
                </Block>

                <Block center>
                  <Text color="white" size={15} >
                      Loading
                  </Text>
                  <ActivityIndicator style={{marginTop: 10}}size="large" color="#FFF"></ActivityIndicator>
                </Block>

              </Block>
            </Block>
              <Block center>
                <Text
                color={seekTheme.COLORS.SECONDARY}>
                  &copy;SeekJob
                </Text>
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
    marginTop: 5,
    marginLeft: 190,
  }
});

export default Loading;
