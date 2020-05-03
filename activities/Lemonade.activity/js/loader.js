requirejs.config({
  baseUrl: "lib",
  shim: {
    easel: {
      exports: "createjs",
    },
  },
  paths: {
    easel: "../lib/easeljs",
    activity: "../js",
  },
  packages: [],
});
requirejs(["activity/activity"]);
