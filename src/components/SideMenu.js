import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles, { COLORS } from '../styles/SideMenuStyles';

const SideMenu = ({ visible, setVisible, setCurrentScreen, currentScreen, logoImg }) => {
  if (!visible) return null;

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity 
        style={styles.menuBackdrop} 
        activeOpacity={1} 
        onPress={() => setVisible(false)} 
      />

      <View style={styles.menuContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            style={styles.closeCircle} 
            onPress={() => setVisible(false)}
          >
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuProfileSection}>
          <View style={styles.logoRing}>
            <Image source={logoImg} style={styles.menuLogo} resizeMode="cover" />
          </View>
          <Text style={styles.menuBrandName}>Utility <Text style={{color: COLORS.primary}}>Tracker</Text></Text>
          <Text style={styles.menuTagline}>Bill Management System</Text>
        </View>
        
        <View style={styles.itemsWrapper}>
          <TouchableOpacity 
            style={[
              styles.menuItem, 
              currentScreen === 'welcome' && styles.activeMenuItem
            ]} 
            onPress={() => { setCurrentScreen('welcome'); setVisible(false); }}
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
          
          <TouchableOpacity 
            style={[
              styles.menuItem, 
              currentScreen === 'tracker' && styles.activeMenuItem
            ]} 
            onPress={() => { setCurrentScreen('tracker'); setVisible(false); }}
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
        </View>      
      </View>
    </View>
  );
};

export default SideMenu;