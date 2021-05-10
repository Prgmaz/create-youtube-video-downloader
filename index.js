const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	return res.render("index");
});

app.get("/download", async(req, res) => {
	const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
    console.log(info.formats[4]);
    console.log(info.formats[1]);

	return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
	});
});


app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
