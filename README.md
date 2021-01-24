# Curfew Alarm [![ci status](https://github.com/nvbn/curfew-alarm/workflows/ci/badge.svg)](https://github.com/nvbn/curfew-alarm/actions) [![codecov](https://codecov.io/gh/nvbn/curfew-alarm/branch/main/graph/badge.svg?token=uVTihYQVMo)](https://codecov.io/gh/nvbn/curfew-alarm)

[![screenshot ios](https://raw.github.com/nvbn/curfew-alarm/master/screenshots/ios.png) ![screenshot android](https://raw.github.com/nvbn/curfew-alarm/master/screenshots/android_v2.jpg)](https://github.com/nvbn/curfew-alarm/tree/main/screenshots)

A small app that indicates when you need to go or stay at home.

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

## Release process

Every commit to master publishes the changes, the changes are delivered to
users automatically via OTA.

If you actually need to publish a new version to a marketplace, follow the
platform specific sections below.

### Android

To release a new version of app to the Google Play Store you need to:

1. Increase `expo -> android -> versionCode` in `app.json`.
2. Push the changes and wait for [the ci workflow](https://github.com/nvbn/curfew-alarm/actions?query=workflow%3Aci) to complete.
3. Manually trigger [the android workflow](https://github.com/nvbn/curfew-alarm/actions?query=workflow%3Aandroid).

### iOS

To release a new version of app to the App Store you need to:

1. Increase `expo -> ios -> buildNumber` in `app.json`.
2. Push the changes and wait for [the ci workflow](https://github.com/nvbn/curfew-alarm/actions?query=workflow%3Aci) to complete.
3. Manually trigger [the ios workflow](https://github.com/nvbn/curfew-alarm/actions?query=workflow%3Aios).
4. Download the latest build artifact from [expo](https://expo.io/accounts/nvbn/builds).
5. Submit the `*.ipa` in Transporter.app.

## [License MIT](https://github.com/nvbn/curfew-alarm/blob/main/LICENSE.md)
