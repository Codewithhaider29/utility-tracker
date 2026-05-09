import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import Header from '../components/Header';
import styles, { COLORS } from '../styles/WelcomeStyles';

const WelcomeScreen = ({ logoImg, onGetStarted, onOpenMenu }) => {
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1024;
  const isLandscape = width > height;

  // Responsive sizes
  const logoSize = isLargeTablet ? 240 : isTablet ? 200 : isLandscape ? 100 : isSmallDevice ? 130 : 160;
  const titleSize = isLargeTablet ? 48 : isTablet ? 42 : isLandscape ? 30 : isSmallDevice ? 28 : 34;
  const subtitleSize = isLargeTablet ? 22 : isTablet ? 20 : isLandscape ? 14 : isSmallDevice ? 14 : 16;

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Header onOpenMenu={onOpenMenu} logoImg={logoImg} />
      
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContainer,
          isTablet && { paddingHorizontal: 40 }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={[
          styles.welcomeWrapper, 
          { 
            minHeight: height * 0.85,
            paddingHorizontal: isTablet ? 40 : 24
          }
        ]}>
          
          {/* Animated Background Orbs */}
          <View style={styles.orbContainer}>
            <Animated.View entering={FadeIn.duration(1000)}>
               <View style={[styles.orb, styles.orb1]} />
            </Animated.View>
            <Animated.View entering={FadeIn.delay(300).duration(1000)}>
               <View style={[styles.orb, styles.orb2]} />
            </Animated.View>
          </View>

          {/* Logo Section */}
          <Animated.View 
            entering={FadeInDown.delay(100).springify().damping(15)}
            style={[styles.logoSection, { marginTop: isTablet ? 40 : 20 }]}
          >
            <View style={styles.glassCircle}>
              <Image
                source={logoImg}
                style={{ width: logoSize, height: logoSize, borderRadius: logoSize / 2 }}
                resizeMode="cover"
              />
            </View>
          </Animated.View>

          {/* Headline */}
          <Animated.View 
            entering={FadeInUp.delay(300).duration(800)}
            style={{ width: '100%', maxWidth: isTablet ? 700 : '100%' }}
          >
            <Text style={[styles.title, { fontSize: titleSize }]}>
              Master Your{' '}
              <Text style={{ color: COLORS.primary }}>Utility Bills</Text>
            </Text>
            <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
              The smartest way to split expenses and track monthly usage with your roommates.
            </Text>
          </Animated.View>

          {/* Modern Feature Cards */}
          <View style={[
            styles.featureGrid,
            isTablet && { marginTop: 50, maxWidth: 800, gap: 20 }
          ]}>
            {[
              { emoji: '⚡', title: 'Auto-Split', desc: 'Equal shares' },
              { emoji: '📈', title: 'Analytics', desc: 'Usage trends' },
              { emoji: '🔔', title: 'Reminders', desc: 'No late fees' },
            ].map((item, index) => (
              <Animated.View 
                key={index}
                entering={ZoomIn.delay(500 + (index * 100)).springify()}
                style={styles.featureCard}
              >
                <Text style={styles.cardEmoji}>{item.emoji}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </Animated.View>
            ))}
          </View>

          {/* CTA Buttons */}
          <Animated.View 
            entering={FadeIn.delay(800).springify()}
            style={[styles.ctaWrapper, isTablet && { marginTop: 60 }]}
          >
            <TouchableOpacity
              style={styles.mainButton}
              onPress={onGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.mainButtonText}>Get Started</Text>
              <View style={styles.buttonCircle}>
                <View 
                  style={{ 
                    width: moderateScale(8), 
                    height: moderateScale(8), 
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

const moderateScale = (size, factor = 0.5) => {
  const { width } = Dimensions.get('window');
  const scale = (width / 375) * size;
  return size + (scale - size) * factor;
};

export default WelcomeScreen;