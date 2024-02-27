# Origin Mobile Take Home Assignment

## Introduction

This app was built to demonstrate my skills related with the mobile take home assignment.

## Technologies utilized

- Expo
- TypeScript
- Axios
- Firebase
- Tamagui
- Google fonts
- FlashList
- Expo image picker
- Expo location
- React Hook Form + Yup
- Zustand

## Final images

Login options screen
![Login options screen](https://github.com/ildaneta/ildaneta/assets/21963291/687e06c0-9751-44f0-9bc3-dadcdf9b88dc)

Sign up screen
![Sign up screen](https://github.com/ildaneta/ildaneta/assets/21963291/5a4b90ac-3c80-4961-b29b-56ef8cef7cfa)

Sign in screen
![Sign in screen](https://github.com/ildaneta/ildaneta/assets/21963291/64e7d70e-54da-49a3-af03-56a47c154913)

Home screen
![Home screen](https://github.com/ildaneta/ildaneta/assets/21963291/b8e03354-2ebb-47f1-85b0-a7b421938555)

Filter screen
![Filter screen](https://github.com/ildaneta/ildaneta/assets/21963291/f0794115-5b1a-46bd-9202-4593788f18a8)

Transaction details screen
![Transaction details screen](https://github.com/ildaneta/ildaneta/assets/21963291/cc01be2c-c866-40bb-89fe-77e34f534540)

## Setup

1. Install NVM or Node.js LTS release - v18
2. Git
3. Yarn
4. Watchman
5. Expo CLI
6. Android Studio - recommended version Giraffe
7. Graddle version
   ![Graddle version](https://github.com/ildaneta/ildaneta/assets/21963291/7ab81c2e-837b-4c0e-969a-b3c0d767cbe1)
8. XCode - recommended version 15.1

## Recommended tools

[Visual Studio Editor](https://code.visualstudio.com/download)

## Developing

If you are new to React Native, this is a helpful introduction: https://reactnative.dev/docs/getting-started

## Run project

1. Create a `.env` file with the property `EXPO_PUBLIC_GOOGLE_API_KEY=` and the respective value of Google API Key
2. Clone the project and access the project folder
3. Install the dependencies by running:

   ```bash
    yarn

    cd ios && npx pod-install && cd ..
   ```

4. Set the environment variable value within android and ios files by running:

   ```bash
    npx expo prebuild
   ```

5. Install the build within each device emulator
   ```
   yarn android
   yarn ios
   ```

## Project aspects

#### Folder architecture

```

├── assets              # Assets folder for app icon and splashscreen
├── src
│   ├── @types          # Types declarations to images .png.d.ts or .svg.d.ts
│   ├── assets          # Assets folder for icons, illustrations
│   ├── components      # Components reutilized
│   ├── firebase        # Has subfolders regarding with functionality like, auth, firestore and storage
│   ├── helpers         # Methods to help specific screens
│   ├── routes          # Navigation configuration
│   ├── screens         # Screens (can have or not a folder with specific components)
│   ├── services        # API methods
│   ├── stores          # Zustand stores
│   ├── theme           # Files to configure Tamagui tokens and fonts
│   ├── utils           # Utils methods
│
│   tamagui.config.ts   # Set up of tamagui
```

### Figma

[Origin home assignment figma project.](https://www.figma.com/file/3o4Hx4TA7tbrj1ZBPlQfNp/Origin?type=design&node-id=53-793&mode=design&t=T02APmAahzYQrqYC-0)

### Whimsical

[Ideas, workflows and basic logic about the application.](https://whimsical.com/origin-EAu6NGfs2PhK4aQMh5eC5Y)

### Github project

[Kanban project with tasks and subtasks.](https://github.com/users/ildaneta/projects/2/views/3)
