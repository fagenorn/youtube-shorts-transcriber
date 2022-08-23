const Innertube = require("youtubei.js");
const fs = require("fs");
const youtubedl = require("youtube-dl-exec");
const { exec } = require("child_process");

const youtube_link = "https://www.youtube.com/shorts/43q-P2QEiWU";
const regexSeparator = /(.*)(\/shorts\/)(.*)/;
const videoCutted = youtube_link.match(regexSeparator);
const video_id = videoCutted[3];
console.log(video_id, "lien");

(async () => {
   const youtube = await new Innertube({ gl: "US" });

   let lang = "fr";
   let video = await youtube.getDetails(video_id);
   const video_name = video.title
      .split(" ")
      .join("_")
      .split("#")[0]
      .slice(0, -1)
      .replace(/[^a-z0-9]/gi, "_");
   console.log(video_name);

   let subprocess = youtubedl.exec(youtube_link, {
      writeSub: true,
      writeAutoSub: true,
      subLang: lang,
      output: video_name,
   });
   subprocess.stdout.pipe(fs.createWriteStream("stdout.txt"));
   await subprocess;

   exec(
      `ffmpeg -i ${video_name}.webm -i ${video_name}.${lang}.vtt \
           -map 0:v -map 0:a -map 1 \
           -metadata:s:s:0 language=[eng] \
           -c:v copy -c:a copy -c:s srt \
           ${video_name}.mkv`,
      (error, stdout, stderr) => {
         if (error) {
            console.log(`error: ${error.message}`);
            return;
         }
         if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
         }
         console.log(`stdout: ${stdout}`);
      }
   );

   // console.log(result);

   // const youtube = await new Innertube({ gl: 'US' });
   // const channel = await (await youtube.getChannel("UCF0pVplsI8R5kcAqgtoRqoA"));
   // const download_stream = youtube.download("ARWg160eaX4");

   // const vid_details = await youtube.getDetails("iO61RIY5Qug");

   // // youtube.

   // console.log(vid_details);

   // Download the video
   // var writeStream = fs.createWriteStream('./output.mp4');
   // download_stream.pipe(writeStream);
})();

//https://www.youtube.com/channel/UCF0pVplsI8R5kcAqgtoRqoA
//https://www.youtube.com/shorts/iO61RIY5Qug
//ARWg160eaX4
