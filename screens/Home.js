import React from 'react';
import { Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, theme } from 'galio-framework';

import * as firebase from 'firebase';

import { Card } from '../components';
import articles from '../constants/articles';
import seekTheme from "../constants/Theme";
const { width } = Dimensions.get('screen');

class Home extends React.Component {

  state = {
    email:"",
    displayName:"",
  };
  
  componentDidMount(){
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }
  
  signOutUser = () => {
    firebase.auth().signOut();
  }

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal  />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView> //ITENS DA PAGE HOME
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        <Text>hi {this.state.displayName}</Text>
        <Button
                    style={styles.button}
                    color={seekTheme.COLORS.SECONDARY}
                    onPress={this.signOutUser}
                    textStyle={{ color: seekTheme.COLORS.BLACK }}
                  >
                    Logout
                  </Button>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  button: {
    marginTop: 10,
    width: width - theme.SIZES.BASE * 15,
    height: theme.SIZES.BASE * 2,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 100
  },
});

export default Home;
