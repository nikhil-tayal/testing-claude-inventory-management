# Jeans Inventory Manager

A React Native mobile application for managing jeans inventory across 7 catalogues and multiple sizes (24-40).

## Features

- **Firebase Authentication**: Secure login and signup functionality
- **7 Jeans Catalogues**: Classic Fit, Slim Fit, Skinny Fit, Relaxed Fit, Bootcut, Straight Leg, Tapered
- **Size Management**: Sizes from 24 to 40 (even numbers)
- **Bundle Tracking**: Easy input for number of bundles per catalogue and size
- **Real-time Totals**: Automatic calculation of total bundles

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Firebase** for authentication
- **React Navigation** for navigation
- **Expo Dev Client** for development builds
- **EAS** for deployment

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- An Expo account (https://expo.dev)
- A Firebase project

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Email/Password** authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" and click "Add app" (Web)
   - Copy the config object
5. Update `src/config/firebase.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Configure EAS (for deployment)

1. Login to Expo:
```bash
eas login
```

2. Configure the project:
```bash
eas build:configure
```

3. Update the `projectId` in `app.json` with your Expo project ID

### 4. Run the Application

**Development (Expo Go):**
```bash
npm start
```

**Development Build (with expo-dev-client):**
```bash
# Build development version
npm run build:dev:android  # For Android
npm run build:dev:ios      # For iOS

# Run with dev client
npm run start:dev-client
```

## Building for Production

### Android APK (Preview)
```bash
npm run build:preview:android
```

### Android App Bundle (Production)
```bash
npm run build:production:android
```

### iOS (Production)
```bash
npm run build:production:ios
```

## Project Structure

```
src/
├── config/
│   └── firebase.ts       # Firebase configuration
├── context/
│   └── AuthContext.tsx   # Authentication context provider
├── navigation/
│   └── AppNavigator.tsx  # Navigation setup
├── screens/
│   ├── LoginScreen.tsx   # Firebase authentication screen
│   └── InventoryScreen.tsx # Main inventory management
└── types/
    └── index.ts          # TypeScript type definitions
```

## Catalogues

The app includes 7 jeans catalogues:

1. **Classic Fit** - Traditional straight leg jeans
2. **Slim Fit** - Modern slim cut jeans
3. **Skinny Fit** - Tight fitting jeans
4. **Relaxed Fit** - Comfortable loose fit jeans
5. **Bootcut** - Flared bottom jeans
6. **Straight Leg** - Standard straight jeans
7. **Tapered** - Narrowing leg jeans

## Sizes

Available sizes: 24, 26, 28, 30, 32, 34, 36, 38, 40

## Usage

1. **Login/Signup**: Create an account or sign in with existing credentials
2. **Select Catalogue**: Tap on a catalogue tab to view its inventory
3. **Update Bundles**: Use +/- buttons or type directly to update bundle counts
4. **Save Inventory**: Tap "Save Inventory" to save your changes

## License

MIT
