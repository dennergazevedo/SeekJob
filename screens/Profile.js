import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import UserPermissions from "../utilities/UserPermissions";

import * as ImagePicker from 'expo-image-picker'

import { Button } from "../components";
import { Images, seekTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import Icon from 'react-native-vector-icons/MaterialIcons';

import Fire from "../Fire";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  state = {
    user: {}
  };

  unsubscribe = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  static navigationOptions = {
    header: null
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: "25%" }}
            >
              <Block flex style={styles.profileCard}>
                <Block style={{ alignItems: "center", width: "100%" }}>
                  <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                    <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                  </TouchableOpacity>
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: seekTheme.COLORS.SUCCESS }}
                    >
                      Contratar
                    </Button>
                    <Button
                      small
                      style={{ backgroundColor: seekTheme.COLORS.ACTIVE }}
                      onPress={this.onPressChat}
                    >
                      Mensagem
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={12}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        2K
                      </Text>
                      <Text size={12}>Seguidores</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={12}
                        style={{ marginBottom: 4 }}
                      >
                        89
                      </Text>
                      <Text size={12}>Serviços Realizados</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color={seekTheme.COLORS.BLACK}>
                      {this.state.user.name}, 23
                    </Text>
                    <Text
                      size={16}
                      color={seekTheme.COLORS.BLACK}
                      style={{ marginTop: 10 }}
                    >
                      {this.state.user.cidade}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>

                    <Block style={styles.blockProfile}>
                      <Icon name="account-circle"
                        size={20}
                        color="#FFF"
                        style={styles.iconProfile} />
                      <Text italic
                        style={styles.textProfile}>
                        {this.state.user.name}
                      </Text>
                    </Block>

                    <Block style={styles.blockProfile}>
                      <Icon name="email"
                        size={20}
                        color="#FFF"
                        style={styles.iconProfile} />
                      <Text italic
                        style={styles.textProfile}>
                        {this.state.user.email}
                      </Text>
                    </Block>

                    <Block style={styles.blockProfile}>
                      <Icon name="phone"
                        size={20}
                        color="#FFF"
                        style={styles.iconProfile} />
                      <Text italic
                        style={styles.textProfile}>
                        {this.state.user.phone}
                      </Text>
                    </Block>

                    <Block style={styles.blockProfileSchool}>
                      <Icon name="bookmark"
                        size={20}
                        color="#FFF"
                        style={styles.iconProfile} />
                      <Text italic
                        style={styles.textProfile}>
                        {this.state.user.school}
                      </Text>
                    </Block>


                  </Block>
                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color={seekTheme.COLORS.BLACK}>
                      Histórico
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                    <Button
                      small
                      color="WHITE"
                      textStyle={{ color: "#5E72E4", fontSize: 12 }}
                    >
                      Ver tudo
                    </Button>
                  </Block>
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))}
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },

  perfil: {
    backgroundColor: "#FFF",
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  text: {
    color: "#FFF",
    textAlign: "left",
  },
  icon: {
    alignItems: "center",
    textAlign: "left",
    flex: 1,
    justifyContent: "flex-start"
  },

  blockProfile: {
    marginTop: 10,
    backgroundColor: seekTheme.COLORS.BUTTON_COLOR,
    borderRadius: 100,
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: 30,
    alignItems: "center"
  },

  blockProfileSchool: {
    marginTop: 10,
    backgroundColor: seekTheme.COLORS.BUTTON_COLOR,
    borderRadius: 100,
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: "center"
  },

  iconProfile: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10
  },

  textProfile: {
    color: "#FFF",
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "center"
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF8",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },


});

export default Profile;
