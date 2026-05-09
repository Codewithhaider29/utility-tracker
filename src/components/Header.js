import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import styles from '../styles/HeaderStyles';

const Header = ({ onOpenMenu, title, logoImg }) => (
  <View style={styles.headerContainer}>
    <View style={styles.leftWrapper}>
      {logoImg && (
        <Animated.View entering={FadeIn.delay(100).springify()} style={styles.logoFrame}>
          <Image source={logoImg} style={styles.headerLogo} resizeMode="cover" />
        </Animated.View>
      )}
      {title ? (
        <Animated.View entering={FadeInLeft.delay(200).duration(500)}>
          <Text style={styles.headerTitle}>{title}</Text>
        </Animated.View>
      ) : null}
    </View>

    <Animated.View entering={FadeInRight.delay(300).springify()}>
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={onOpenMenu}
        activeOpacity={0.7}
      >
        <View style={styles.menuIconWrapper}>
          <View style={styles.hamburgerLine} />
          <View style={[styles.hamburgerLine, { width: 12 }]} />
        </View>
        <Text style={styles.menuText}>Menu</Text>
      </TouchableOpacity>
    </Animated.View>
  </View>
);

export default Header;
