// The actual mock isn't used, but without it it will be impossible to import the package
jest.mock("@react-native-async-storage/async-storage", () => ({}));
