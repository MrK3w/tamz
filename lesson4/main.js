var idNumber, remainingDays;
//TODO 1 - zlepšit vzhled aplikace (list, barva a velikost pisma)  √
//+ místo klasických tlačítek použít "floating action button" (ons-fab) 
//TODO 2 - k názvu úkolu a datu přidat alespoň 4 další prvky, např. (poznámky, barvu, prioritu, atd.) 
//+ využít předchozího cvičení a vypočítat počet dnů do daného úkolu a tuto informaci take zobrazit √
//TODO 3 - vytvořit třídu reprezentující úkol a do úložište 
//ukládat a načítat data pomocí JSON, https://www.w3schools.com/js/js_classes.asp √

//TODO 4 - po zvolení daného úkolu zobrazit v dialogu s názvem i poznámky 
//+ možnost ukázat a upravit (SHOW/EDIT) daný úkol √
//TODO 5 - po zvolení možnosti SHOW/EDIT všechny prvky daného úkolu zobrazit √
//TODO 6 - skutečně záznam editovat a následné změny uložit i do localStorage √
//TODO 7 BONUS - hodnota favorites je jediná vlastnost, která se jen ukládá do localStorage, ale reálně v té aplikaci není použita. Pokud by někdo opravdu chtěl i tuto vlastnost použít a vytvoří si další např. nějakou záložku/menu/stránku/list ve, kterém tyto favorites záznamy budou uloženy, tak může získat lepší hodnocení.       


document.addEventListener('init', function(event)
{
    showTodo();    
});

function getColor()
{
  var ele = document.getElementsByName('color'); 
  for(i = 0; i < ele.length; i++) { 
    if(ele[i].checked) return ele[i].value;
  }              
}

function getKey()
{
  if (idNumber == undefined)
  {
    var myDate = new Date();
    //vytvori klic pro ukladani zaznamu do local storage
    //klic muzete vytvorit i vlastni/jiny
    return myDate.getTime();
  }
  else 
  {
     return idNumber;
  }
}

function addTask()
{
    myKey = getKey();
    //zaznam, ktery bude ulozen pod klicem
    var todoText = $("#taskName").val();
    var note = $("#Notes").val();
    var importance = $("#task-important-range").val();
    //var favorites = $("#favorites").val();
    var favorites = document.getElementById('favorites').checked;
    var dateInText = setDays();
    var color = getColor();
    let myTask = new Task(todoText,dateInText,importance,note,color,favorites,remainingDays);
    var myJSON = JSON.stringify(myTask);

    if(todoText.length)
    {
        localStorage.setItem(myKey,myJSON);       
    }
    
    showTodo();
}

function setDays()
{
    var inputDate = document.getElementById('dateInput');
    var myDate = new Date(inputDate.value);   
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1; //January is 0
    var day = myDate.getDate(); 
    var actualDate = new Date();
    var Difference_In_Time = myDate.getTime() - actualDate.getTime(); 
    remainingDays = (Difference_In_Time / (1000 * 3600 * 24)).toFixed(0); 
    remainingDays++;
    if (day.toString().length == 1) {
      day = "0"+day;
    }
    if (month.toString().length == 1) {
      month = "0"+month;
    }
    return year+"-"+month+"-"+day;
}

function itemClick(id)
{
    idNumber = id;
    var myObjR = JSON.parse(localStorage.getItem(idNumber));
    document.getElementById("currentTask").innerHTML = myObjR.text + " "+myObjR.notes;
    addDialog('dialog-3');
}

function showTodo()
{
    $("#todoList").empty();
    showFavorites =  document.getElementById('showFavorites').checked;
    for (var i = 0; i < localStorage.length; i++)
    {
        var onsItem= document.createElement('ons-list-item');
        
        //ziskam klic pro pristup k zaznamu
        var myKey = localStorage.key(i);
        onsItem.setAttribute('onclick', "itemClick("+myKey+")"); 
        var myObjR = JSON.parse(localStorage.getItem(myKey));
        onsItem.innerHTML = myObjR.text + " " + myObjR.date + " "+ myObjR.days+" days until task"; 
        onsItem.setAttribute('modifier','tappable longdivider');
        onsItem.setAttribute("style","color: " +myObjR.colors+";font-family:monospace;font-size:150%;");
        if (showFavorites == true &&myObjR.favorite == true ) {
          document.getElementById('todoList').appendChild(onsItem);               
        } 
        if (showFavorites == false && myObjR.favorite == false) {
          document.getElementById('todoList').appendChild(onsItem);               
        } 
      
    }
}
function taskDelete()
{
    localStorage.removeItem(idNumber);  
    closeDialog('dialog-3');
    reload();
}

function reload()
{
  location.reload();
}

function EditTask()
{
  var myObjR = JSON.parse(localStorage.getItem(idNumber));
  document.getElementById('taskName').value = myObjR.text;
  document.getElementById('Notes').value = myObjR.notes;
  document.getElementById('favorites').checked = myObjR.favorite;
  document.getElementById('task-important-range').value = myObjR.important;
  document.getElementById('dateInput').value = myObjR.date;
  document.getElementById('radio-'+myObjR.colors).checked = true;

}
