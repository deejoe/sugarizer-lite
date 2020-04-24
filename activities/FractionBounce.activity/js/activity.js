define(["sugar-web/activity/activity"], function (activity) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!', "activity/settingspalette"], function (doc, settingspalette) {

		// Link presence palette
		var palette = new settingspalette.SettingsPalette(document.getElementById("settings-button"), undefined);

		// This will have to be moved
		var canvas = document.getElementById("actualcanvas");
		canvas.height = canvas.parentElement.clientHeight;
		canvas.width = canvas.parentElement.clientWidth;
		var rampHeight = 50;
		var rampColor = "#050505";
		var gridColor = "#D0D0D0";
		var lineWidth = 2;

		function displayRamp(n) {
			var ctx = canvas.getContext("2d");
			var width = canvas.clientWidth;
			var height = canvas.clientHeight;
			
			// Temporary (for better contrast)
			ctx.fillStyle = "#6FCA1E"
			ctx.fillRect(0, 0, width - 1, height - 1);
			
			// Display triangle
			ctx.fillStyle = rampColor;
			ctx.beginPath();
			ctx.moveTo(0, height -1 );
			ctx.lineTo(width - 1, height - 1);
			ctx.lineTo(width - 1, height - 1 - rampHeight);
			ctx.closePath();
			ctx.fill();

			// Display grid
			ctx.strokeStyle = gridColor;
			ctx.lineWidth = lineWidth;
			for(var i = 0; i < n; i++) {
				ctx.beginPath();
				ctx.moveTo(i * (width / n), height - 1);
				ctx.lineTo((i + 1)*(width / n), height - 1);
				ctx.lineTo((i + 1)*(width / n), height - 1 - (i + 1) * rampHeight / n);
				if(i > 0) {
					ctx.lineTo(i * (width / n), height - 1 - i * rampHeight / n);
				}
				ctx.closePath();
				ctx.stroke();
			}
		}
		displayRamp(10);

		// Initialize the activity.
		activity.setup();

	});

});
