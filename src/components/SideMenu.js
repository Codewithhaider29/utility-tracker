import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut, FadeInLeft, SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import styles, { COLORS } from '../styles/SideMenuStyles';

const SideMenu = ({ setVisible, setCurrentScreen, currentScreen, logoImg }) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View 
        entering={FadeIn.duration(300)} 
        exiting={FadeOut.duration(300)}
        style={StyleSheet.absoluteFill}
      >
        <TouchableOpacity 
          style={styles.menuBackdrop} 
          activeOpacity={1} 
          onPress={() => setVisible(false)} 
        />
      </Animated.View>

      <Animated.View 
        entering={SlideInLeft.duration(400)}
        exiting={SlideOutLeft.duration(400)}
        style={styles.menuContent}
      >
        <Animated.View entering={FadeIn.delay(200)} style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.closeCircle} 
            onPress={() => setVisible(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInLeft.delay(100).duration(500)}
          style={styles.menuProfileSection}
        >
          <View style={styles.logoRing}>
            <Image source={logoImg} style={styles.menuLogo} resizeMode="cover" />
          </View>
          <Text style={styles.menuBrandName}>
            Utility <Text style={{color: COLORS.primary}}>Tracker</Text>
          </Text>
          <Text style={styles.menuTagline}>Bill Management System</Text>
        </Animated.View>
        
        <View style={styles.itemsWrapper}>
          <Animated.View entering={FadeInLeft.delay(300).springify()}>
            <TouchableOpacity 
              style={[
                styles.menuItem, 
                currentScreen === 'welcome' && styles.activeMenuItem
              ]} 
              onPress={() => { setCurrentScreen('welcome'); setVisible(false); }}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.menuItemIcon,
                currentScreen === 'welcome' && { color: COLORS.white }
              ]}>🏠</Text>
              <Text style={[
                styles.menuItemText,
                currentScreen === 'welcome' && styles.activeMenuText
              ]}>Home</Text>
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View entering={FadeInLeft.delay(400).duration(400)}>
            <TouchableOpacity 
              style={[
                styles.menuItem, 
                currentScreen === 'tracker' && styles.activeMenuItem
              ]} 
              onPress={() => { setCurrentScreen('tracker'); setVisible(false); }}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.menuItemIcon,
                currentScreen === 'tracker' && { color: COLORS.white }
              ]}>📊</Text>
              <Text style={[
                styles.menuItemText,
                currentScreen === 'tracker' && styles.activeMenuText
              ]}>Bill Tracker</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInLeft.delay(500).duration(400)}>
            <TouchableOpacity 
              style={[
                styles.menuItem, 
                currentScreen === 'petrol' && styles.activeMenuItem
              ]} 
              onPress={() => { setCurrentScreen('petrol'); setVisible(false); }}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.menuItemIcon,
                currentScreen === 'petrol' && { color: COLORS.white }
              ]}>⛽</Text>
              <Text style={[
                styles.menuItemText,
                currentScreen === 'petrol' && styles.activeMenuText
              ]}>Petrol Tracker</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInLeft.delay(600).duration(400)}>
            <TouchableOpacity 
              style={[
                styles.menuItem, 
                currentScreen === 'history' && styles.activeMenuItem
              ]} 
              onPress={() => { setCurrentScreen('history'); setVisible(false); }}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.menuItemIcon,
                currentScreen === 'history' && { color: COLORS.white }
              ]}>📂</Text>
              <Text style={[
                styles.menuItemText,
                currentScreen === 'history' && styles.activeMenuText
              ]}>Billing History</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

export default SideMenu;