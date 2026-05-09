# Utility Tracker 📊 ⚡

A premium, fully responsive React Native application built with Expo to track and split utility bills (Electricity, Gas, Water) among roommates or family members.

## ✨ Features

- **Month-wise Billing:** Track records for specific months (e.g., Oct 2023, Nov 2023).
- **Billing History:** Dedicated history page to view, switch, and manage past billing cycles.
- **Auto-Divide Logic:** Automatically split total bills equally among all members with one click.
- **Cross-Platform & Responsive:** Fully optimized for Mobile, Tablets (Android/iPad), and Landscape orientations.
- **Edge-to-Edge Experience:** Modern immersive UI that utilizes the full screen height.
- **In-App Update Notifications:** Alerts users when a new version is available with a direct download link.
- **Persistence:** Local data storage using AsyncStorage so your data is never lost.
- **Beautiful Animations:** Smooth transitions powered by `react-native-reanimated`.

## 🚀 Tech Stack

- **Framework:** [Expo](https://expo.dev/) / React Native
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Storage:** [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Layout:** [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- **Styling:** Vanilla StyleSheet with dynamic scaling utilities.

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd utility-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install required Expo packages:

   ```bash
   npx expo install expo-linear-gradient
   npx expo install @react-native-async-storage/async-storage
   npx expo install react-native-reanimated
   npx expo install react-native-safe-area-context
   ```

### Running Locally

To start the development server:

```bash
npx expo start
```

Or use the shorthand:

```bash
npm run dev
```

Scan the QR code with your Expo Go app or press `a` for Android / `i` for iOS.

## 🛠️ Building for Production

To build a standalone APK (Android) or AAB for testing:

1. Install EAS CLI:

   ```bash
   npm install -g eas-cli
   ```

2. Login to your Expo account:

   ```bash
   eas login
   ```

3. Configure build profile in `eas.json`:

   ```json
   {
     "cli": {
       "version": ">= 3.0.0"
     },
     "build": {
       "development": {
         "developmentClient": true,
         "distribution": "internal"
       },
       "preview": {
         "android": {
           "buildType": "apk"
         }
       },
       "production": {
         "android": {
           "buildType": "app-bundle"
         }
       }
     },
     "submit": {
       "production": {}
     }
   }
   ```

4. Run the build:

   ```bash
   # For APK (testing)
   eas build -p android --profile preview
   
   # For AAB (Play Store)
   eas build -p android --profile production
   
   # For iOS
   eas build -p ios --profile production
   ```

*Note: This requires [EAS CLI](https://docs.expo.dev/build/introduction/) and an Expo account.*

## 🔄 In-App Updates Setup

The app checks for updates via a remote JSON file. To configure this:

1. Host a file named `version.json` on your server (GitHub Pages, Firebase Hosting, or any static hosting).

2. Structure it like this:

   ```json
   {
     "latestVersion": "1.0.1",
     "downloadUrl": "https://your-domain.com/downloads/utility-tracker-v1.0.1.apk",
     "releaseNotes": "Bug fixes and performance improvements",
     "minimumVersion": "1.0.0"
   }
   ```

3. Update the `UPDATE_CHECK_URL` in `App.js` to point to your hosted file:

   ```javascript
   const UPDATE_CHECK_URL = 'https://your-domain.com/version.json';
   ```

4. The update check runs automatically on app launch and displays an alert if a new version is available.

## 📁 Project Structure

```text
utility-tracker/
├── App.js                    # Main application entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies and scripts
├── assets/
│   └── images/
│       └── logo.png          # App logo
├── src/
│   ├── components/
│   │   ├── Header.js         # Responsive header component
│   │   ├── LoadingScreen.js  # Animated loading screen
│   │   └── SideMenu.js       # Slide-out navigation menu
│   ├── screens/
│   │   ├── WelcomeScreen.js  # Landing/welcome screen
│   │   ├── TrackerScreen.js  # Main bill tracker dashboard
│   │   └── HistoryScreen.js  # Billing history management
│   ├── styles/
│   │   ├── HeaderStyles.js   # Header component styles
│   │   ├── LoadingStyles.js  # Loading screen styles
│   │   ├── SideMenuStyles.js # Side menu styles
│   │   ├── TrackerStyles.js  # Tracker screen styles
│   │   └── WelcomeStyles.js  # Welcome screen styles
│   └── utils/
│       ├── responsive.js     # Responsive scaling utilities
│       └── storage.js        # AsyncStorage helper functions
└── README.md
```

## 🎨 Responsive Design System

The app uses a custom scaling system that adapts to all screen sizes:

```javascript
// Responsive scaling functions
const scale = (size) => (SCREEN_WIDTH / 375) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;
const fontScale = (size) => Math.round(PixelRatio.roundToNearestPixel(size * (SCREEN_WIDTH / 375)));
```

### Device Support Matrix

| Device Type | Screen Width | Status |
| :--- | :--- | :--- |
| Small Phones | 320px - 374px | ✅ Optimized |
| Regular Phones | 375px - 414px | ✅ Optimized |
| Large Phones | 414px - 767px | ✅ Optimized |
| Tablets (Portrait) | 768px - 1023px | ✅ Optimized |
| Tablets (Landscape) | 1024px+ | ✅ Optimized |
| Large Tablets | 1024px+ | ✅ Enhanced |

## 🎯 Usage Guide

### 1. Home Screen

- View the welcome screen with feature highlights
- Tap "Get Started" to begin tracking bills
- Access the side menu for navigation

### 2. Bill Tracker

- Set the billing month (e.g., "01 October 2023")
- Enter total amounts for:
  - ⚡ Electricity Bill
  - 🔥 Gas Bill
  - 💧 Water Bill
- Click "Auto Divide Bills" to split equally among members
- Toggle member payment status (Paid/Unpaid)

### 3. Member Management

- Add members with their names
- Edit individual bill amounts manually
- Remove members as needed
- Track payment status for each member

### 4. History

- View all past billing cycles
- Switch between different months
- Delete old records if needed

### 5. Data Management

- All data is automatically saved locally
- Use "Save Report" to persist current session
- Use "Reset All" to clear current entries
- Clear app data from device settings for full reset

## 🔧 Configuration

### App Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Utility Tracker",
    "slug": "utility-tracker",
    "version": "1.0.0",
    "orientation": "default",
    "icon": "./assets/images/logo.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#f8faff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.utilitytracker"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/logo.png",
        "backgroundColor": "#f8faff"
      },
      "package": "com.yourcompany.utilitytracker"
    }
  }
}

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with EAS:**
   - Ensure `eas.json` is properly configured
   - Check Expo SDK version compatibility
   - Run `expo doctor` to diagnose issues

2. **AsyncStorage not persisting:**
   - Check storage permissions on device
   - Clear app cache and restart
   - Ensure proper error handling in storage functions

3. **Responsive layout issues:**
   - Verify `useWindowDimensions` is imported
   - Check scaling functions are applied correctly
   - Test on multiple device simulators

4. **Animation glitches:**
   - Ensure Reanimated Babel plugin is in `babel.config.js`
   - Reduce animation complexity on low-end devices
   - Check for conflicting animations

## 🤝 Contributing

This is a private project. For contributions or modifications:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on multiple devices
5. Submit a pull request with detailed description

## License

Private Project - Built for personal utility tracking. All rights reserved.

## 📧 Support

For issues, questions, or feature requests:

- Create an issue in the repository
- Contact the developer directly
- Check the troubleshooting section above

---

Built with ❤️ using React Native & Expo
