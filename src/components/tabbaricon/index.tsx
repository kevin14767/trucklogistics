// src/components/TabBarIcon.tsx
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/context/ThemeContext';
import { getThemeStyles, moderateScale, verticalScale, horizontalScale } from '@/src/theme';

interface TabBarIconProps {
  focused: boolean;
  name: string;
  iconSource: any;
  size?: number;
}

export const TabBarIcon = ({
  focused,
  name,
  iconSource,
  size = moderateScale(26) // Increased base size
}: TabBarIconProps) => {
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  
  return (
    <View style={[
      styles.tabIconContainer,
      focused && styles.tabIconContainerActive
    ]}>
      <Image
        source={iconSource}
        style={[
          styles.tabIcon,
          { 
            width: size, 
            height: size,
            tintColor: focused ? 
              themeStyles.colors.primary : 
              themeStyles.colors.gray.medium,
            opacity: focused ? 1 : 0.8
          },
        ]}
      />
      <Text
        style={[
          styles.tabLabel, 
          { 
            color: focused ? 
              themeStyles.colors.primary : 
              themeStyles.colors.gray.light
          }
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
        maxFontSizeMultiplier={1} // Prevents text scaling from accessibility settings
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(12),
    gap: verticalScale(6),
    width: horizontalScale(50), // Narrower width
    height: verticalScale(45), // Control total height
  },
  tabIconContainerActive: {
    transform: [{ scale: 1.1 }],
  },
  tabIcon: {
    // Base styling - color and opacity now applied inline
  },
  tabLabel: {
    fontSize: moderateScale(9),
    marginTop: verticalScale(2),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScale(11), // Tight line height
    maxWidth: '100%',
    // Color applied inline
  },
});

export default TabBarIcon;