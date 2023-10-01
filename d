[33mcommit 62299a5369bbdbf15796aca42b21a09d748da078[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: VAIBHAVCS50 <66798907+VAIBHAVCS50@users.noreply.github.com>
Date:   Sun Oct 1 19:38:09 2023 +0530

    sidebar.html
    
    this is to create the user interface

[1mdiff --git a/sidebar.html b/sidebar.html[m
[1mnew file mode 100644[m
[1mindex 0000000..826981d[m
[1m--- /dev/null[m
[1m+++ b/sidebar.html[m
[36m@@ -0,0 +1,59 @@[m
[32m+[m[32m<!DOCTYPE html>[m
[32m+[m[32m<html>[m
[32m+[m[32m<head>[m
[32m+[m[32m    <base target="_top">[m
[32m+[m[32m    <style>[m
[32m+[m[32m        /* Add your CSS styles here */[m
[32m+[m[32m    </style>[m
[32m+[m[32m</head>[m
[32m+[m[32m<body>[m
[32m+[m[32m    <h2>CSV Importer</h2>[m
[32m+[m
[32m+[m[32m    <!-- File Upload Input -->[m
[32m+[m[32m    <input type="file" id="fileInput" accept=".csv" />[m
[32m+[m
[32m+[m[32m    <!-- Column Selection -->[m
[32m+[m[32m    <h3>Select Columns:</h3>[m
[32m+[m[32m    <div id="columnSelection"></div>[m
[32m+[m
[32m+[m[32m    <!-- JavaScript to handle user interactions -->[m
[32m+[m[32m    <script>[m
[32m+[m[32m        // Function to display column headings based on received CSV data.[m
[32m+[m[32m        function displayColumnHeadings(csvData) {[m
[32m+[m[32m            var columnSelection = document.getElementById("columnSelection");[m
[32m+[m
[32m+[m[32m            // Parse the first row of CSV data to get column headings.[m
[32m+[m[32m            var columns = csvData.split('\n')[0].split(',');[m
[32m+[m
[32m+[m[32m            // Create checkboxes for each column heading.[m
[32m+[m[32m            columns.forEach(function (column) {[m
[32m+[m[32m                var label = document.createElement("label");[m
[32m+[m[32m                label.innerHTML = column;[m
[32m+[m
[32m+[m[32m                var checkbox = document.createElement("input");[m
[32m+[m[32m                checkbox.type = "checkbox";[m
[32m+[m[32m                checkbox.value = column;[m
[32m+[m
[32m+[m[32m                columnSelection.appendChild(checkbox);[m
[32m+[m[32m                columnSelection.appendChild(label);[m
[32m+[m[32m                columnSelection.appendChild(document.createElement("br"));[m
[32m+[m[32m            });[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        // Event listener for file input change.[m
[32m+[m[32m        document.getElementById("fileInput").addEventListener("change", function (event) {[m
[32m+[m[32m          console.log("Hello from JavaScript!"); // Example log message[m
[32m+[m[32m            var fileInput = event.target;[m
[32m+[m[32m            var selectedFile = fileInput.files[0];[m
[32m+[m
[32m+[m[32m            // Handle file selection and retrieve CSV data.[m
[32m+[m[32m            var reader = new FileReader();[m
[32m+[m[32m            reader.onload = function () {[m
[32m+[m[32m                var csvData = reader.result;[m
[32m+[m[32m                google.script.run.importCSVData(csvData);[m
[32m+[m[32m            };[m
[32m+[m[32m            reader.readAsText(selectedFile);[m
[32m+[m[32m        });[m
[32m+[m[32m    </script>[m
[32m+[m[32m</body>[m
[32m+[m[32m</html>[m
