# Welcome to News App

https://github.com/user-attachments/assets/9ef7cf54-3b8c-4d47-8466-fee196e869b0

#### This app is my pet-project. So I may add some changes to it later. It's based on design I've found on [Figma](https://www.figma.com/design/2umxJH1zowrL8EmVRCnOKX/News-App-UI-Kit-(Community)?node-id=89-229&node-type=frame&t=SAeKYj1VKn3ZKH2a-0) as open markup. And I'm greatful to author.

## Tech stack:
- React Native
- Expo
- React Navigation
- TypeScript
- Firebase's Firestore and Storage

## NOTE:

I've hid the Firebase configuration data in .env file and added it to git.ignore. So if you'd like to clone this project and start it on simulator or actual device, you gonna need such file of your own, that should look like this:
```
  FIREBASE_ApiKey = "your-api-Key"
  FIREBASE_AuthDomain = "your-autDomain"
  FIREBASE_ProjectId = "your-firebase-project-id"
  FIREBASE_StorageBucket = "yourapp-storage.appspot.co"
  FIREBASE_MessagingSenderId = "your-messaging-sender-id"
  FIREBASE_AppId = "yourAppID"

```
## What one can do on this app:

As you can see on the video above, the News App contains various news stories (all of them are made-up). Users can browse stories, open articles in the next window, and smoothly return to the previous one. Additionally, there is functionality for searching and browsing all news at will.

## To install project localy: 
- clone the project:
  ```
  git clone https://github.com/lesdyman/news-app-react-native.git
  ```
- install dependencies:
  ```
  npm install
  ```
- additionally, you'll need your own Firebase database with news stories and Firebase configuration file. Otherwise, you'll see just very basic markup and no fun functionality at all.
