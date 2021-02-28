var request = require('request')
var cheerio = require('cheerio'); // Basically jQuery for node.js
var twilio = require('twilio');
var { SID, Token } = require("./secrets.js")

var client = new twilio(SID, Token);

// COMMENT: Make your own secrets.js file, you know what I am saying. 


request('https://campusrec.wm.edu/Program/GetProducts?classification=45d1dcb3-af42-4fff-badf-cff024672990', function (error, response, body) {
    var indexOfTextToFind = body.indexOf("<div class=\"row\" data-toggle")
    smallerPileToParse = body.substring(indexOfTextToFind, indexOfTextToFind + 300)
    urlUnparsedAmpersand = smallerPileToParse.substring(smallerPileToParse.indexOf("39;") + 3, smallerPileToParse.lastIndexOf("39;") - 2)
    parsedUrl = urlUnparsedAmpersand.replace("amp;", "")

    newTargetURL = "https://campusrec.wm.edu" + parsedUrl
    dummyURL = "https://campusrec.wm.edu/Program/GetProgramDetails?courseId=d823afbe-45ad-41d3-9a70-291ba04a610b&semesterId=edc1e8ca-4249-47e6-ad66-2b987d89b6b6"
    request(newTargetURL, function (err, res, body) {
        var pos = 0
        var indices = []
        var startFrom = 0
        while (pos != -1) {
            pos = body.indexOf("spot(s)", startFrom + 1)
            indices.push(pos)
            startFrom = pos;

        }
        indices.pop()
        finalMessage = ""

        for (index in indices) {

            smallerTarget = body.substring(indices[index] - 100, indices[index])  //.replace( /^\D+/g, '')  

            timeSlot = smallerTarget.substring(smallerTarget.indexOf(":") - 3, smallerTarget.lastIndexOf(":") + 10).replace('\t', "").replace("\t", "")
            spotsAvailable = smallerTarget.substring(smallerTarget.length - 4, smallerTarget.length).replace(/^\D+/g, '')

            spotsInCurrentTimeSlotMsg = "there are " + spotsAvailable + "spots during " + timeSlot
            finalMessage += spotsInCurrentTimeSlotMsg + "\n"





        }

        finalMessage = finalMessage === '' ? 'looks like there are no more sessiosn left?!' : finalMessage

        client.messages.create({
            to: '+15714050830',
            from: '+14243369362',
            body: finalMessage
        });
        client.messages.create({
            to: '+15719922318',
            from: '+14243369362',
            body: finalMessage
        });


    })

});