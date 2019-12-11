import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, theme, Button } from "galio-framework";

import Icon from 'react-native-vector-icons/FontAwesome';
import seekTheme from "../constants/Theme";

class DrawerItem extends React.Component {

  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="home"
            family="AntDesign"
            size={12}
            color={focused ? "white" : seekTheme.COLORS.PRIMARY}
          />
        );

      case "Logout":
        return (
          <Icon
            name="close"
            family="AntDesign"
            size={12}
            color={focused ? "white" : seekTheme.COLORS.PRIMARY}
          />
        );

      case "Elements":
        return (
          <Icon
            name="check"
            family="AntDesign"
            size={12}
            color={focused ? "white" : seekTheme.COLORS.ERROR}
          />
        );

      case "Profile":
        return (
          <Icon
            name="user"
            family="AntDesign"
            size={12}
            color={focused ? "white" : seekTheme.COLORS.WARNING}
          />
        );

      default:
        return null;
    }
  };

  render() {
    const { focused, title } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            size={15}
            bold={focused ? true : false}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          >
            {title}
          </Text>
        </Block>
        <Block>
        <Text
            size={9}
            bold={focused ? true : false}
            color={focused ? "white" : "rgba(216,216,216,1)"}
          >
            ➜
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14
  },
  activeStyle: {
    backgroundColor: seekTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
