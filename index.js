const Innertube = require('youtubei.js');
const fs = require('fs');
const youtubedl = require('youtube-dl-exec')

const youtube_link = "https://www.youtube.com/shorts/43q-P2QEiWU";

(async () => {



    let result = await youtubedl(youtube_link, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: [
            'referer:youtube.com',
            'user-agent:googlebot'
        ]
    });

    console.log(result);



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