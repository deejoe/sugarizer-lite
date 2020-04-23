define(["sugar-web/activity/activity"], function (activity) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!', "activity/settingspalette"], function (doc, settingspalette) {

		// Link presence palette
		var palette = new settingspalette.SettingsPalette(document.getElementById("settings-button"), undefined);

		// Initialize the activity.
		activity.setup();

	});

});
