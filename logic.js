function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Import CSV data 👉️")
    .addItem("Import from URL", "importCSVFromUrl")
    .addItem("Import from Drive", "importCSVFromDrive")
    .addItem("Import from User Form", "showImportForm") // Add this line
    .addToUi();
}

// Displays an alert as a Toast message
function displayToastAlert(message) {
  SpreadsheetApp.getActive().toast(message, "⚠️ Alert"); 
}

// Placeholder function to import CSV files from a URL
function importCSVFromUrl() {
  var url = promptUserForInput("Please enter the URL of the CSV file:");
  console.log("i was here ");
  console.log(url);
 var contents = Utilities.parseCsv(UrlFetchApp.fetch(url)); // a string containing CSV data into a two-dimensional array.
  var sheetName = writeDataToSheet(contents);
  displayToastAlert("The CSV file was successfully imported into " + sheetName + ".");


}

// Placeholder function to import CSV files from Google Drive
function importCSVFromDrive() {
  var fileName = promptUserForInput("Please enter the name of the CSV file to import from Google Drive:");
  var files = findFilesInDrive(fileName);
  if(files.length === 0) {
    displayToastAlert("No files with name \"" + fileName + "\" were found in Google Drive.");
    return;
  } else if(files.length > 1) {
    displayToastAlert("Multiple files with name " + fileName +" were found. This program does not support picking the right file yet.");
    return;
  }
  var file = files[0];
 var contents = Utilities.parseCsv(file.getBlob().getDataAsString());
  var sheetName = writeDataToSheet(contents);
  displayToastAlert("The CSV file was successfully imported into " + sheetName + ".");


}
function findFilesInDrive(filename) {
  var files = DriveApp.getFilesByName(filename);
  var result = [];
  while(files.hasNext())
    result.push(files.next());
  return result;
}


// Function to show the user form for CSV import
function showImportForm() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('import')
    .setWidth(300)
    .setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "CSV Import Form");
}

function promptUserForInput(promptText) {
  var ui = SpreadsheetApp.getUi();
  var prompt = ui.prompt(promptText);
  var response = prompt.getResponseText();
  return response;
}

function saveFile(obj) {
  var blob = Utilities.newBlob(Utilities.base64Decode(obj.data), obj.mimeType, obj.fileName);
  return DriveApp.createFile(blob).getId();
}



function writeDataToSheet(data) {
  var ss = SpreadsheetApp.getActive();
  sheet = ss.insertSheet();
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  return sheet.getName();
}

