const express = require("express");
const {google} = require("googleapis");

const app = express();

app.get("/", async (req,res)=> {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    //Create client instance for auth 
    const client = await auth.getClient();

    //Instance of Google Sheets API 
    const googleSheets= google.sheets({version: "v4", auth:client});

    const spreadsheetId = "1oiTkaZvhOYqcSdt--vjShxmiEGFU16JBUma0OO4bF_8";

    //Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId, 
    });

    //Read rows from spreadsheet 
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:B",

    })
    //Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values:[
                [counter,usecase,quantity,numberofseparatecleanrooms, averagesalary, workersperapc]
            ]
        }
    })

    res.send(getRows.data);
});

app.listen(1337, (req,res)=> console.log("running on 1337")); 

