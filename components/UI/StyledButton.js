import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StyledButton = ({
  label,
  icon,
  type,
  fullWidth,
  iconSize,
  iconColor,
  onPress,
  styles,
}) => {
  let containerStyles = {};
  let labelStyle = {};
  let defaultIconColor = '#000';

  switch (type) {
    case 'primary': {
      containerStyles = {
        ...containerStyles,

        paddingHorizontal: 16,
        paddingVertical: 12,

        backgroundColor: '#006FFD',

        borderColor: '#006FFD',
        borderWidth: 2,
        borderStyle: 'solid',
      };
      labelStyle = {
        ...labelStyle,
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
      };
      defaultIconColor = '#FFF';
      break;
    }
    case 'secondary': {
      containerStyles = {
        ...containerStyles,

        paddingHorizontal: 16,
        paddingVertical: 12,

        borderColor: '#006FFD',
        borderWidth: 2,
        borderStyle: 'solid',
      };
      labelStyle = {
        ...labelStyle,
        color: '#006FFD',
        fontSize: 12,
        fontWeight: 'bold',
      };
      defaultIconColor = '#006FFD';
      break;
    }
    case 'warning': {
      containerStyles = {
        ...containerStyles,

        paddingHorizontal: 16,
        paddingVertical: 12,

        borderColor: '#E86339',
        borderWidth: 2,
        borderStyle: 'solid',
      };
      labelStyle = {
        ...labelStyle,
        color: '#E86339',
        fontSize: 12,
        fontWeight: 'bold',
      };
      defaultIconColor = '#E86339';
      break;
    }
    case 'link': {
      labelStyle = {
        ...labelStyle,
        color: '#006FFD',
        fontSize: 12,
        fontWeight: 'bold',
      };
      defaultIconColor = '#006FFD';
      break;
    }
    case 'icon': {
      labelStyle = {
        color: '#000',
      };
      break;
    }

    default:
      break;
  }

  if (icon && label) {
    containerStyles = {
      ...containerStyles,

      flexDirection: 'row',
      justifyContent: 'center',

      gap: 12,
    };
  }

  if (fullWidth) {
    containerStyles = {
      ...containerStyles,
      width: '100%',
    };
  }

  const buttonLabel = label && <Text style={labelStyle}>{label}</Text>;

  const buttonIcon = icon && (
    <Ionicons
      name={icon}
      size={iconSize || 18}
      color={iconColor || defaultIconColor}
    />
  );

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        localStyles.container,
        containerStyles,
        styles,
        pressed && localStyles.pressed,
      ]}>
      {buttonIcon}
      {buttonLabel}
    </Pressable>
  );
};

export default StyledButton;

const localStyles = StyleSheet.create({
  container: {
    alignItems: 'center',

    borderRadius: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});
