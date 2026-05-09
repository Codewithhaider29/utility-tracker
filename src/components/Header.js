import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from '../styles/HeaderStyles';

const Header = ({ onOpenMenu, title, logoImg }) => (
  <View style={styles.headerContainer}>
    <View style={styles.leftWrapper}>
      {logoImg && (
        <View style={styles.logoFrame}>
          <Image source={logoImg} style={styles.headerLogo} resizeMode="cover" />
        </View>
      )}
      {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
    </View>

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
  </View>
);

export default Header;