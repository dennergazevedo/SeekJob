
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import * as firebase from 'firebase'

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Loading from "./screens/Loading";
import Screen from "./navigation/Screens";

var firebaseConfig = {
  apiKey: "AIzaSyDuGBWWPM1yx1sj9cF6tmyB6TnzN7RtdfQ",
  authDomain: "seekjob-1e7af.firebaseapp.com",
  databaseURL: "https://seekjob-1e7af.firebaseio.com",
  projectId: "seekjob-1e7af",
  storageBucket: "seekjob-1e7af.appspot.com",
  messagingSenderId: "671551140323",
  appId: "1:671551140323:web:9acbc5fe306205cc92b0d6",
  measurementId: "G-KZX7K9EY0L"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
	Home: Screen
});

const AuthStack = createStackNavigator({
	Login: Login,
	Register: Register
});

export default createAppContainer(
	createSwitchNavigator(
		{
			Loading: Loading,
			App: AppStack,
			Auth: AuthStack
		},
		{
			initialRouteName:"Loading"
		}
  )
);

import { Images, articles } from './constants';


const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

loadAssetsAsync = async () => {
  await Font.loadAsync({
    'Avenir': require('./assets/font/avenir.otf')
  })
  this.setState({ fontLoaded: true })
}

// cache product images
articles.map(article => assetImages.push(article.image));