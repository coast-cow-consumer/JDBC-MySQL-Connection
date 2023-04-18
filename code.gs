var server = '192.136.164.4';
var port = 25060;
// var dbName = 'dummy';
var username = 'doadmin';
var password = 'AVNS_UXdKjBYJzYULsF8uJnC';
var url = 'jdbc:mysql://c3-database-do-user-914951-0.b.db.ondigitalocean.com:'+port+'/'+'C3_Database';


function readData() {

  var conn = Jdbc.getConnection(url, username, password);
  var stmt = conn.createStatement();
  var results = stmt.executeQuery('SELECT * FROM C3_Data_Master');
  var metaData = results.getMetaData();
  var numCols = metaData.getColumnCount();
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName('Sheet1');
  sheet.clearContents();

  var arr=[];
  for (var col = 0; col < numCols; col++) {
    arr.push(metaData.getColumnName(col + 1));
  }

  sheet.appendRow(arr);

  while (results.next()) {
  arr=[];
  for (var col = 0; col < numCols; col++) {
    arr.push(results.getString(col + 1));
  }
  sheet.appendRow(arr);

  }

  results.close();
  stmt.close();
  sheet.autoResizeColumns(1, numCols+1);
}
