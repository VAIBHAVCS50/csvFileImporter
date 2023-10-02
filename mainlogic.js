function onOpen() {
  
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Import CSV data 👉️")
      .addItem("Import from URL", "showImportUrl")
      .addItem("Import from Drive", "importCSVFromDrive")
      .addItem("Import CSV", "showImportForm") // Add this line
      .addToUi();
  }
  
  // Displays an alert as a Toast message
  function displayToastAlert(message) {
    SpreadsheetApp.getActive().toast(message, "⚠️ Alert"); 
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
    console.log("this os tje file");
  
   var contents = Utilities.parseCsv(file.getBlob().getDataAsString());
     console.log(file.getBlob());
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
  // Function to show the user form for CSV import
  function imp(e){
      SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile("import"), "sample");
  }
  
  
  
  // Function to import CSV data from a 2D array
  function importCSVFromUserForm(csvData) {
    try {
      Logger.log("Importing CSV data...");
      var contents = Utilities.parseCsv(csvData);
    var sheetName = writeDataToSheet(contents);
      displayToastAlert("The CSV file was successfully imported into " + sheetName + ".");
     
    } catch (error) {
      Logger.log("An error occurred:", error);
      
      // Handle the error as needed, such as logging it or sending an email notification.
    }
  }
  
  
  
  
  
  function promptUserForInput(promptText) {
    var ui = SpreadsheetApp.getUi();
    var prompt = ui.prompt(promptText);
    var response = prompt.getResponseText();
  return response;

  }
  
  
  
  
  
  function writeDataToSheet(data) {
    var ss = SpreadsheetApp.getActive();
    sheet = ss.insertSheet();
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    return sheet.getName();
  }
  
  
  
  //testing 
  // function uploadCsvFile(formData) {
  //   try {
  //     var folderId = "1KDdt6HtOt281xH6XL2Bd3n3lv7GLB2Pa"; // Replace with the folder ID where you want to save the 
  //     var folder = DriveApp.getFolderById(folderId);
  
  //     var fileBlob = formData.get("file");
  //     var fileName = fileBlob.getName();
  
  //     // Create a new file in Google Drive
  //     var uploadedFile = folder.createFile(fileBlob);
  
  //     // Optionally, you can set permissions for the uploaded file
  //     // For example, make it viewable by anyone with the link
  //     // var permission = uploadedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  //     // Return a success message with the file ID
  //     return "File uploaded successfully with ID: " + uploadedFile.getId();
  //   } catch (error) {
  //     // Handle any errors that occur during the upload
  //     return "Error uploading file: " + error.toString();
  //   }
  // }
  // function uploadCsvFile(fileData, fileName, fileType) {
  //   try {
  //     // Create a Blob from the file data
  //     const fileBlob = Utilities.base64Decode(fileData);
  
  //     // Create a new file in Google Drive
  //     const folder = DriveApp.getFolderById("1KDdt6HtOt281xH6XL2Bd3n3lv7GLB2Pa"); // Replace with your folder ID
  //     const file = folder.createFile(fileBlob);
      
  //     // Optionally, you can set permissions for the uploaded file
  //     // For example, make it viewable by anyone with the link
  //     // var permission = file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  //     // Return a success message with the file ID
  //     return "File uploaded successfully with ID: " + file.getId();
  //   } catch (error) {
  //     // Handle any errors that occur during the upload
  //     return "Error uploading file: " + error.toString();
  //   }
  // }
  
  
  
  // mega testing 
  
  // Create a menu in Google Sheets
  
  // Function to display the CSV import form
  function showImportForm() {
    var htmlOutput = HtmlService.createHtmlOutputFromFile("import").setWidth(400).setHeight(300);
    // SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile("import"), "sample");
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, "CSV Import");
  }
   function showImportUrl() {
    var htmlOutput = HtmlService.createHtmlOutputFromFile("imp").setWidth(400).setHeight(300);
    // SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile("import"), "sample");
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, "CSV Import from Url");
  }
  
  // Function to import CSV data from a 2D array
  // function importCSVFromUserForm(csvData) {
    
  //     var sheet = SpreadsheetApp.getActiveSheet();
  
  //     var contents = Utilities.parseCsv(csvData);
  //     var sheetName = writeDataToSheet(contents);
  //     displayToastAlert("The CSV file was successfully imported into " + sheetName + ".");
  // }
  
  
  function uploadFileToGoogleDrive(data, file, name, email) {
    try {
      var dropbox = "1KDdt6HtOt281xH6XL2Bd3n3lv7GLB2Pa";
      var folder,
        folders = DriveApp.getFolderById(dropbox);
  
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(dropbox);
      }
  
      var contentType = data.substring(5, data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7)),
        blob = Utilities.newBlob(bytes, contentType, file);
  
      folder.createFolder([name, email].join(' ')).createFile(blob);
  
      return 'OK';
    } catch (f) {
      return f.toString();
    }
  }
  
  