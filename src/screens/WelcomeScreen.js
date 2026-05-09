import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import styles, { COLORS } from '../styles/WelcomeStyles';

const WelcomeScreen = ({ logoImg, onGetStarted, onOpenMenu }) => {
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const isTablet = width >= 768;

  const logoSize = isTablet ? 200 : isSmallDevice ? 130 : 160;
  const titleSize = isTablet ? 42 : isSmallDevice ? 28 : 34;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  });

  const handlePressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onOpenMenu={onOpenMenu} logoImg={logoImg} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={[styles.welcomeWrapper, { minHeight: height * 0.85 }]}>
          
          {/* Animated Background Orbs */}
          <View style={styles.orbContainer}>
            <View style={[styles.orb, styles.orb1]} />
            <View style={[styles.orb, styles.orb2]} />
          </View>

          {/* Logo Section */}
          <Animated.View style={[styles.logoSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.glassCircle}>
              <Image
                source={logoImg}
                style={{ width: logoSize, height: logoSize, borderRadius: logoSize / 2 }}
                resizeMode="cover"
              />
            </View>
          </Animated.View>

          {/* Headline */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], width: '100%' }}>
            <Text style={[styles.title, { fontSize: titleSize }]}>
              Master Your{' '}
              <Text style={{ color: COLORS.primary }}>Utility Bills</Text>
            </Text>
            <Text style={styles.subtitle}>
              The smartest way to split expenses and track monthly usage with your roommates.
            </Text>
          </Animated.View>

          {/* Modern Feature Cards */}
          <View style={styles.featureGrid}>
            {[
              { emoji: '⚡', title: 'Auto-Split', desc: 'Equal shares' },
              { emoji: '📈', title: 'Analytics', desc: 'Usage trends' },
              { emoji: '🔔', title: 'Reminders', desc: 'No late fees' },
            ].map((item, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.cardEmoji}>{item.emoji}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>

          {/* CTA Buttons */}
          <Animated.View style={[styles.ctaWrapper, { transform: [{ scale: buttonScale }] }]}>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={onGetStarted}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={1}
            >
              <Text style={styles.mainButtonText}>Get Started</Text>
              <View style={styles.buttonCircle}>
                <View 
                  style={{ 
                    width: 8, 
                    height: 8, 
                    borderTopWidth: 2, 
                    borderRightWidth: 2, 
                    borderColor: COLORS.primary, 
                    transform: [{ rotate: '45deg' }],
                    marginLeft: -2
                  }} 
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;