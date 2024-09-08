const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running")
})

app.post("/", function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const Email = req.body.email;


    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data)

    const url = "https://us10.api.mailchimp.com/3.0/lists/822012c858"

    const options = {
        method: "POST",
        auth: "uzi:0b6f5d3749b9a82aab4f0028eec96b7f-us10"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            
        }else {
            res.sendFile(__dirname + "/failure.html");
            }
        response.on("data", function (data) {
            console.log(JSON.parse(data))

        })

    })
    request.write(jsonData);
    request.end();





})

//API KEY
// 0b6f5d3749b9a82aab4f0028eec96b7f-us10
// " cee3690213ebddc6aff76dacac512847-us10"


// List id
// 822012c858