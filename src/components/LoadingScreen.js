import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import styles, { COLORS } from '../styles/LoadingStyles';

const LoadingScreen = ({ logoImg }) => (
  <View style={styles.loadingContainer}>
    <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
    
    <View style={styles.logoWrapper}>
      <Image source={logoImg} style={styles.loadingLogo} resizeMode="cover" />
      <View style={styles.shadowPulse} />
    </View>
  </View>
);

export default LoadingScreen;