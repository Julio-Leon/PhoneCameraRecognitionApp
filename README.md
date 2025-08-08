# CameraRecognitionApp
# CameraRecognitionApp
# PhoneCameraRecognitionApp
# PhoneCameraRecognitionApp
# PhoneCameraRecognitionApp
# PhoneCameraRecognitionApp
# PhoneCameraRecognitionApp

Julio-Leon: I have access to a mackbook, I will run these tests on a phone, please help me set up the code

GitHub Copilot: Great! Here’s how to set up and run your React Native app with camera access on your iPhone using your MacBook:

---

### 1. Copy Your Project to the MacBook
- Use a USB drive, AirDrop, or a git repository to transfer your `PhoneCameraRecognitionApp` folder to your MacBook.

---

### 2. Install Node.js (if not already installed)
- Download and install Node.js 18.x LTS from [nodejs.org](https://nodejs.org/en).

---

### 3. Install Watchman (recommended)
Open Terminal and run:
```sh
brew install watchman
```

---

### 4. Install CocoaPods (for iOS dependencies)
```sh
sudo gem install cocoapods
```

---

### 5. Install Project Dependencies
In Terminal, navigate to your project’s Front-End directory:
```sh
cd ~/PhoneCameraRecognitionApp/Front-End
npm install
```

---

### 6. Install iOS Native Dependencies
```sh
cd ios
pod install
cd ..
```

---

### 7. Open the iOS Project in Xcode
```sh
open ios/PhoneCameraRecognitionApp.xcworkspace
```
- In Xcode, select your connected iPhone as the build target.

---

### 8. Build and Run on Your iPhone
- In Xcode, click the Run ▶️ button.
- The app will build and launch on your iPhone.
- Approve camera permissions when prompted.

---

### 9. Troubleshooting
- If you see signing errors, set your Apple Developer account in Xcode under "Signing & Capabilities".
- Make sure your iPhone is unlocked and trusted by the Mac.

---

Let me know if you need help with any step or run into errors!# PhoneCameraRecognitionApp
# PhoneCameraRecognitionApp
