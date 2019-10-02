# TrekLite
Group Trekkers App <br/>


**Live app is here :** https://expo.io/@leksyib/treklite <br/>
**Video Demo :** https://www.youtube.com/watch?v=aVYqS45Lg4A

## Screenshots
<img src="https://user-images.githubusercontent.com/26174035/66041226-4d900680-e511-11e9-9e81-14214558a644.png" width="425"/> <img src="https://user-images.githubusercontent.com/26174035/66041321-816b2c00-e511-11e9-8298-6ba7b88144e3.png" width="425"/>  <br/>

<img src="https://user-images.githubusercontent.com/26174035/66041441-cd1dd580-e511-11e9-9fc0-608a2d5eff8a.png" width="425"/> <img src="https://user-images.githubusercontent.com/26174035/66041520-ede62b00-e511-11e9-9c27-2d535419ab7b.png" width="425"/>  


[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd into the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

**Step 4:** Get a Google Places API key and put it in the `src/screens/LocationSelect/index.tsx` file on line 45.

**Step 5:** Follow <a href="https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/sdk/google.md">These steps<a /> to setup your Google authentication client.

**Step 6:** Insert the neccessary client IDs in `/src/screens/Auth/index.tsx`, from line 54.

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `expo start --ios`
  * for Android
    * run `expo start --android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS prettier-standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).
