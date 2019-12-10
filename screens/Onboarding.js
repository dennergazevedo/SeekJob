import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme, Icon } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import seekTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

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
                  <Button
                    style={styles.button}
                    color={seekTheme.COLORS.SECONDARY}
                    onPress={() => navigation.navigate("Login")}
                    textStyle={{ color: seekTheme.COLORS.BLACK }}
                  >
                    Login
                  </Button>
                </Block>
                  <Block center>
                    <Button
                      style={styles.button}
                      color={seekTheme.COLORS.LABEL}
                      onPress={() => navigation.navigate("Account")}
                      textStyle={{ color: seekTheme.COLORS.WHITE }}
                    >
                      Cadastre-se
                    </Button>
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

export default Onboarding;
