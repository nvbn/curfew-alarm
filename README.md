# Curfew Alarm [![ci status](https://github.com/nvbn/curfew-alarm/workflows/ci/badge.svg)](https://github.com/nvbn/curfew-alarm/actions) [![codecov](https://codecov.io/gh/nvbn/curfew-alarm/branch/main/graph/badge.svg?token=uVTihYQVMo)](https://codecov.io/gh/nvbn/curfew-alarm)

[![screenshot ios](https://raw.github.com/nvbn/curfew-alarm/master/images/screenshots/ios.png) ![screenshot android](https://raw.github.com/nvbn/curfew-alarm/master/images/screenshots/android_v2.jpg)](https://github.com/nvbn/curfew-alarm/tree/main/images/screenshots)

A small app that indicates when you need to go or stay at home.

[![App Store](https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png)](https://apps.apple.com/us/app/curfew-alarm/id1550522848)
[![Google Play](https://lh3.googleusercontent.com/cjsqrWQKJQp9RFO7-hJ9AfpKzbUb_Y84vXfjlP0iRHBvladwAfXih984olktDhPnFqyZ0nu9A5jvFwOEQPXzv7hr3ce3QVsLN8kQ2Ao=s0)](https://play.google.com/store/apps/details?id=com.nvbn.curfewalarm)

## Development

### Dependencies

To be able to build the project you need to install dependencies:

```bash
yarn global add expo-cli
yarn
```

To be able to run the app you need to:

- [Install the Expo client on your phone](https://expo.io/tools)
- Or/and [setup Android Studio with the Expo client](https://docs.expo.io/workflow/android-studio-emulator/)
- Or/and [setup iOS Simulator with the Expo client](https://docs.expo.io/workflow/ios-simulator/)

### Running development version

To build(watch) development version run:

```bash
yarn start
```

To run the dev version of the app on your phone/in an emulator you need to scan
the QR code from the previous command or manually copy the link into the Expo client.

### Tests and linters

To run the test run:

```bash
yarn test
```

To lint the code run:

```bash
yarn lint
yarn type-check
yarn formatting-check
```

The linter and formatter will try to fix everything in a pre-commit hook, in order to do that manually run:

```bash
yarn pretty-quick
yarn lint --fix
```

### Storybook

To run storybook you need to start the build server in a special mode with:

```bash
yarn start-storybook
```

Then open the dev version of the app on a phone or in an emulator.

When creating a new story you need to import it in
`./src/Storybook.ts` to make it available in the app.

## Release process

Every commit to master publishes the changes, the changes are delivered to
users automatically via OTA.

If you actually need to publish a new version to a marketplace, run:

```bash
yarn release
```

After that wait for the CI job to complete, and the release artifacts to appear,
then follow platform specific sections below.

### Android

To release a new version of the app to the Google Play Store you need to:

1. Go to Internal Testing in Google Play Console.
2. Promote the latest release to production.

### iOS

To release a new version of the app to the App Store you need to:

1. Download the `*.ipa` file from the release artifacts.
2. Upload it with Transporter.app.
3. Enable the build in TestFlight in the App Store Connect.
4. Enable the build in the App Store section of the App Store Connect.

## [License MIT](https://github.com/nvbn/curfew-alarm/blob/main/LICENSE.md)

## [Privacy Policy](https://github.com/nvbn/curfew-alarm/blob/main/PRIVACY.md)
