import React from 'react';
import { Switch, Platform } from 'react-native';

import seekTheme from '../constants/Theme';

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor = Platform.OS === 'ios' ? null :
      Platform.OS === 'android' && value ? seekTheme.COLORS.SWITCH_ON : seekTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={seekTheme.COLORS.SWITCH_OFF}
        trackColor={{ false: seekTheme.COLORS.SWITCH_ON, true: seekTheme.COLORS.SWITCH_ON }}
        {...props}
      />
    );
  }
}

export default MkSwitch;