var sqlite = require('../sqlite.js'); //requiring

// To use initialization vector
sqlite.iv = '13ewr3iJ';

//Connecting - (databaseFile, [password], [algorithm])
sqlite.connect('test/Database.rec','myPass','aes-256-ctr');

//Creating Table - you can run any command
sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");

//Inserting - this function can be sync to, look the wiki
sqlite.insert("COMPANYS",{NAME:"COMPANY"}, function(inserid){
	console.log(inserid);
});

//Updating - returns the number of rows modified - can be async too
var rows_modified = sqlite.update("COMPANYS",{NAME:"TESTING UPDATE"},{ID:1});

//Create your function
function concat(a,b){
	return a+b;
}

//Add your function to connection
sqlite.create_function(concat);

// Use your function in the SQL
console.log(sqlite.run("SELECT ID , concat(ID, NAME) as concat FROM COMPANYS;"));

//Decrypting database file
sqlite.decrypt("test/Database.rec","test/decrypted.db", 'myPass');

//Encrypting database file
sqlite.encrypt("test/decrypted.db","test/reencrypted.rec", 'myPass',"bf",{iv: "ads343ef"});

// Closing connection 
sqlite.close();