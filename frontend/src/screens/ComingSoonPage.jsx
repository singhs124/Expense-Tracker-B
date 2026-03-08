import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '../constants/TWPalette';

const { width, height } = Dimensions.get('window');

const ComingSoonPage = () => {
  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideUp1 = useRef(new Animated.Value(50)).current;
  const slideUp2 = useRef(new Animated.Value(50)).current;
  const slideUp3 = useRef(new Animated.Value(50)).current;

  // Floating animation for icons
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  const bgColors = [Color.blue[200], Color.blue[300], Color.blue[100]];

  useEffect(() => {
    // Main entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation for main icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Staggered slide-up animations
    setTimeout(() => {
      Animated.stagger(200, [
        Animated.spring(slideUp1, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(slideUp2, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(slideUp3, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    // Floating animations for decorative elements
    const createFloatAnimation = (animValue, duration, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: -20,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createFloatAnimation(float1, 2000, 0);
    createFloatAnimation(float2, 2500, 500);
    createFloatAnimation(float3, 3000, 1000);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Gradient Background */}
      <LinearGradient
        colors={bgColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* <LinearGradient style={{flex:1}} colors={bgColors}/> */}

      {/* Animated Background Circles */}
      <Animated.View
        style={[
          styles.backgroundCircle,
          styles.circle1,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.backgroundCircle,
          styles.circle2,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />

      {/* Main Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Floating Decorative Icons */}
        <Animated.View
          style={[
            styles.floatingIcon,
            styles.icon1,
            {
              transform: [{ translateY: float1 }],
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✨</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.floatingIcon,
            styles.icon2,
            {
              transform: [{ translateY: float2 }],
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🚀</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.floatingIcon,
            styles.icon3,
            {
              transform: [{ translateY: float3 }],
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>⚡</Text>
          </View>
        </Animated.View>

        {/* Main Icon with Pulse Animation */}
        <Animated.View
          style={[
            styles.mainIconContainer,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <View style={styles.mainIcon}>
            <Text style={styles.mainIconText}>🎯</Text>
          </View>
        </Animated.View>

        {/* Coming Soon Text */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              transform: [{ translateY: slideUp1 }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View
          style={[
            styles.subtitleContainer,
            {
              transform: [{ translateY: slideUp2 }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.subtitle}>
            Something amazing is on its way
          </Text>
          <Text style={styles.subtitle}>
            We're crafting an experience you'll love
          </Text>
        </Animated.View>

        {/* Feature Icons */}
        {/* <Animated.View
          style={[
            styles.featuresContainer,
            {
              transform: [{ translateY: slideUp3 }],
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Text style={styles.featureIcon}>💎</Text>
            </View>
            <Text style={styles.featureText}>Premium</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Text style={styles.featureIcon}>🎨</Text>
            </View>
            <Text style={styles.featureText}>Creative</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Text style={styles.featureIcon}>⚙️</Text>
            </View>
            <Text style={styles.featureText}>Powerful</Text>
          </View>
        </Animated.View> */}

        {/* Progress Bar */}
        {/* <Animated.View
          style={[
            styles.progressContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '75%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>75% Complete</Text>
        </Animated.View> */}

        {/* Footer Text */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.footerText}>Stay tuned for updates</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backgroundCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    opacity: 0.1,
  },
  circle1: {
    backgroundColor: '#fff',
    top: -100,
    left: -100,
  },
  circle2: {
    backgroundColor: '#fff',
    bottom: -150,
    right: -150,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  floatingIcon: {
    position: 'absolute',
  },
  icon1: {
    top: 100,
    left: 30,
  },
  icon2: {
    top: 150,
    right: 40,
  },
  icon3: {
    bottom: 200,
    left: 50,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  iconText: {
    fontSize: 24,
  },
  mainIconContainer: {
    marginBottom: 40,
  },
  mainIcon: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mainIconText: {
    fontSize: 40,
  },
  textContainer: {
    marginBottom: 20,
  },
  comingSoonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Color.blue[900],
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitleContainer: {
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 15,
    color: Color.blue[900],
    textAlign: 'center',
    marginVertical: 4,
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 50,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  featureIcon: {
    fontSize: 32,
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: Color.blue[900],
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default ComingSoonPage;
