
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Login from "./screens/Login";
import Register from "./screens/Register";
import Loading from "./screens/Loading";
import Screen from "./navigation/Screens";

const AppStack = createStackNavigator({
  Home: Screen
}, 
  {
  defaultNavigationOptions: {
    header: null
  }
});

const AuthStack = createStackNavigator({
	Login: Login,
  Register: Register,
},
  {
  defaultNavigationOptions: {
    header: null
  }
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