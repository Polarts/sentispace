# Feel Tracker App [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Polarts/feel-tracker)

A diary app to track your daily activities, and how you feel about them.
Feel Tracker will provide you with a day, week, and month view of the activities you want to track, as well as tranding and statistics.

## Origin Story

Due to the worsening of my chronic medical conditions, I had to start tracking my daily activity. 

After thoroughly searching the Google Play Store, none of the available apps were good enough (or private enough) to suit my very specific needs.

I decided to make my own app to track my daily activities, with the ability to trace back weeks or even months and see useful trends.

Talking to some friends, I realized there's more demand for such app than I had imagined, so I decided to make it a public open-source project.

## Runnning Locally

To run locally simply do `npm i` and then `npm start`.

To debug with VSCode and Chrome, with my neat "F5 to start debugging" setup:

- First, do `npm i -g pm2`
- Then, add to your local .env file the following: `BROWSER=none`
- Done! Press F5 in VSCode to start debugging with Chrome!

## Active Testing:

The app's `dev/main` branch is live on Vercel! 

Feel free to test it [here](https://feel-tracker.vercel.app) and open an issue on anything you find funny and doesn't exist on the [Roadmap](https://github.com/Polarts/feel-tracker/projects/1) 😁

## The Tech Stack

The app is built using React, TS and Mobx.

### Styles:
I'm using SCSS and following [Elad Shechter](https://eladsc.com/)'s [Storytelling Architecture](https://eladsc.com/2019/11/29/css-story-architecture-talk/) (at least for the folder hierarchy part) to keep my files neatly organized. 

### Business Logic:
I chose the [MVVM design pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel), as I'm mostly comfortable with it and it aligns perfectly with TS and Mobx.

### Back-End (currently suspended):
Please refer to the [back-end repo](https://github.com/skamensky/feel-tracker-backend) for more info.

### PWA and Local Storage:
To maximize privacy on this app, all of the user's data will be stored in local storage via [Dexie](https://dexie.org) (an IndexedDB wrapper). No server needed! Just "install" it locally and you're good to go.

## Contributing

Until I launch the first stable version, there's no public plan for contributors.

HOWEVER, feel free to open issues and create PRs wherever you see fit. I'm always looking for ways to improve the app's code and design, and I'll gladly review your requests.

## Credits

- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Utilizing the [Mobx](https://mobx.js.org/README.html) state management library. 
- Using [React Transition Group](http://reactcommunity.org/react-transition-group/css-transition) to make page transitions easy to implement.
- SCSS compiled using the [VSCode Live Sass Compiler extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass).

## Special Thanks To:

- [skamensky](https://github.com/skamensky) for volunteering to take care of the back-end part!
- [Haifa:Dev Developers Community](https://haifadev.netlify.app/) for supporting this project!
