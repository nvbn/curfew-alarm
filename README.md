# Curfew Alarm [![ci status](https://github.com/nvbn/curfew-alarm/workflows/ci/badge.svg)](https://github.com/nvbn/curfew-alarm/actions) [![codecov](https://codecov.io/gh/nvbn/curfew-alarm/branch/main/graph/badge.svg?token=uVTihYQVMo)](https://codecov.io/gh/nvbn/curfew-alarm)

![screenshot ios](https://raw.github.com/nvbn/curfew-alarm/master/screenshots/ios.png) ![screenshot android](https://raw.github.com/nvbn/curfew-alarm/master/screenshots/android_v2.jpg)

A small app that indicates when you need to go or stay at home.

## Development

Install dependencies with:

```bash
yarn global add expo-cli
yarn
```

Start dev version with:

```bash
yarn start
```

To lint the code run:

```bash
yarn lint
```

To run type checking run:

```bash
yarn type-check
```

To check the formatting run:

```bash
yarn formatting-check
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

## License MIT
