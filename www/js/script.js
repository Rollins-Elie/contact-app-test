var db;

function init() 
{
	var addContactButton = document.getElementById("addcontact_button");
	addContactButton.addEventListener("touchstart", addContact, false);
	
	var listContactsButton = document.getElementById("listcontacts_button");
	listContactsButton.addEventListener("touchstart", showTodos, false);
	
	document.addEventListener("deviceready", onDeviceReady, false);
}
			
function onDeviceReady() {
  db = new PouchDB("contact_db");
  
}


function addContact() 
{
  alert ("In add contact!!");
  var full_name=document.getElementById("full_name").value;
  var phone_num=document.getElementById("phone_num").value;
  var business=document.getElementById("business").value;
  
  
  var contact = {
    _id: new Date().toISOString(),
    name: full_name,
	phone: phone_num,
    business_contact: business
  };
  
  db.put(contact, function callback(err, result) {
    if (!err) {
      console.log('Successfully saved a contact!');
	  alert ("Record added!!");
    }
  });
}

/*function getRecord()
{
	db.get('001', function(err, doc) {
   if (err) {
      return console.log(err);
   } else {
      console.log(doc);
   }
});
	
}*/


function showTodos() {
 
db.allDocs({include_docs: true}, function(err, docs) {
   if (err) {
      return console.log(err);
   } else {
      //console.log (docs.rows);
	  var num_records=docs.total_rows;
	  var display_records="";
	  for(var i = 0; i < num_records; i++){
			display_records=display_records + docs.rows[i].doc.name + "<br/>" + docs.rows[i].doc.phone + "<br/>" + docs.rows[i].doc.business_contact + "<hr/>";
	}
	  //alert (docs.rows[0].doc.business_contact);
	  //alert (docs.total_rows);
	  //do a loop here to write results as a list or table
	  document.getElementById("contact_list").innerHTML = display_records;
   }
});

}

/*function addContact(text) {
  var todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
    }
  });
}*/



function calculate() 
{
	
	var value1=document.getElementById("value1").value;
	
	var value2=document.getElementById("value2").value;
	var total=parseInt(value1) + parseInt(value2);
	document.getElementById("result").innerHTML = total;
}
