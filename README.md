This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## 🚀 Features :
 1. Create Timers with name, duration, and category.

 2. Group Timers by category with collapsible sections.

 3. ▶️ Start, ⏸ Pause, 🔁 Reset individual or all timers in a category.

 4. Progress Bar visualizes the remaining time.

 5. Halfway Alert and Completion Modal for each timer.

 6. History Screen to view completed timers.

 7. Dark Mode toggle with persistent theming.

 8. Persistent Storage using AsyncStorage.


## 🛠 Tech Stack 

1. React Native

2. React Navigation

3. React Context API (for global state)

4. AsyncStorage

5. React Native Picker

## ScreenShots :

## Timer Creation Light Theme:
![TimerApp lightTheme](https://github.com/user-attachments/assets/1a44761b-b55b-4d4b-91c4-35a9c3e80dff)

## Timer Creation Dark Theme:
![TimerApp DarkTheme](https://github.com/user-attachments/assets/a60af10f-b12a-43b1-9098-9a6da453df7f)

## TimerCard:
![TimersList](https://github.com/user-attachments/assets/c7250d00-3ffe-4809-9d6a-6b34c34728c3)

## Progress Bar:
![TimerApp Progress bar](https://github.com/user-attachments/assets/29671554-4824-4c99-95bc-1cdf8a3a3988)

## Alerts when halfway :
![TimerApp half way alert](https://github.com/user-attachments/assets/bbba490e-0ce2-459a-ae91-05d5d094ef95)

## Bulk actions: start, pause, reset all timers in a category:
![Timer App Bulk Actions](https://github.com/user-attachments/assets/0fd26519-9614-4823-9635-4978e0cefd66)

## Filter By Catagories :
![TimerApp Filter By Catagory](https://github.com/user-attachments/assets/a561c93a-2cce-4eab-83a8-a30df3030c28)

## Alerts on Completion :
![TimerApp Completion Alert](https://github.com/user-attachments/assets/e93919af-9afb-48d9-84a7-009312a199ce)

## HistoryScreen:
![Timer History](https://github.com/user-attachments/assets/f863486c-e963-49a5-bdaf-6648ff5a2643)






## Folder Structure

.
├── src/
│   ├── components/            
│   │   ├── CategorySection.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── ThemeSwitcher.jsx
│   │   ├── TimerCard.jsx
│   │
│   ├── context/                 
│   │   ├── ThemeContext.jsx      
│   │   ├── TimerContext.jsx      
│   │
│   ├── screens/            
│   │   └── HistoryScreen.jsx                        
│   │   ├── HomeScreen.jsx      
│   │   └── TimerListScreen.jsx
├── App.js                    
├── package.json
└── README.md


## 📦 Installation & Setup

1.Clone the repository:

git clone https://github.com/Naveen05-lang/TimerApp.git

2.Install dependencies:

npm install

3.Install AsyncStorage & Picker:

npx expo install @react-native-async-storage/async-storage
npm install @react-native-picker/picker

4.Navigation:

npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs

5.Run the app:

npx react-native run-android



### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
