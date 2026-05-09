import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Header from './Header';
import { COLORS } from '../styles/TrackerStyles';
import { fontScale, moderateScale, verticalScale } from '../../utils/responsive';

const ComingSoonScreen = ({ title, onOpenMenu, onBack, logoImg }) => {
  return (
    <View style={styles.container}>
      <Header onOpenMenu={onOpenMenu} title={title} logoImg={logoImg} />
      
      <View style={styles.content}>
        <Animated.View 
          entering={FadeInDown.duration(800)}
          style={styles.card}
        >
          <Text style={styles.emoji}>⛽</Text>
          <Text style={styles.title}>{title} Tracking</Text>
          <Text style={styles.subtitle}>
            We are working hard to bring this feature to you. Stay tuned!
          </Text>
          
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backBtnText}>Go Back to Dashboard</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  card: {
    backgroundColor: '#ffffff',
    padding: moderateScale(40),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  emoji: {
    fontSize: fontScale(60),
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: fontScale(24),
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: fontScale(14),
    color: '#64748b',
    textAlign: 'center',
    lineHeight: fontScale(22),
    marginBottom: verticalScale(30),
  },
  backBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(25),
    borderRadius: moderateScale(15),
  },
  backBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: fontScale(14),
  },
});

export default ComingSoonScreen;
