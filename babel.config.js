module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "transform-inline-environment-variables",
      [
        "search-and-replace",
        {
          rules: process.env.STORYBOOK
            ? [
                {
                  search: "./src/CurfewAlarm",
                  replace: "./src/Storybook",
                },
              ]
            : [],
        },
      ],
    ],
  };
};
