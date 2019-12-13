import React from 'react';
import seekTheme from "../constants/Theme";
import Images from "../constants/Images";

import { Button, Block, theme } from 'galio-framework';
import { 
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';

import firebase from 'firebase'

const { height, width } = Dimensions.get("screen");

class LogOut extends React.Component {
  
  signOutUser = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <Block flex center>
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
              <Block center>
                <Text style={styles.text}>Deseja realmente sair?</Text>
                
                <Button
                      style={styles.button}
                      color={seekTheme.COLORS.SECONDARY}
                      onPress={this.signOutUser}
                      textStyle={{ color: seekTheme.COLORS.BLACK }}
                  >
                    Logout
                </Button>
                
                <Button
                      style={styles.button}
                      color={seekTheme.COLORS.BUTTON_COLOR}
                      onPress={() => this.props.navigation.goBack()}
                      textStyle={{ color: seekTheme.COLORS.SECONDARY }}
                  >
                    Voltar
                </Button>

              </Block>
              <Block center>
                <Text style={styles.text}>
                  &copy;SeekJob
                </Text>
              </Block>
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
    marginTop: 20,
    width: width - theme.SIZES.BASE * 12,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  text:{
    color: "#FFF",
    marginTop: 30,
    textAlign: "center",
  }

});

export default LogOut;
