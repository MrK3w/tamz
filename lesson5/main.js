var key = ""

function prepareURL()
{
var temp = $("#url").val();
var test = $("#login").val();
var url = temp+"?login="+test;
getMetod(url);
}

function getMetod(url)
{
    var button = document.getElementById('send-key');
    button.disabled = false;
    var f_r;
    fetch(url)
    .then(result => { f_r = result; return result.text()}) //.json(), ...
    .then(data => {
     if (f_r.status >= 400) { // Server or client error from HTTP
     alert("request error (" + f_r.statusText + "): " + data);
     } else {
     console.log("C-T: " + f_r.headers.get("Content-Type"));
        key = data
        document.getElementById("final-paragraph").innerHTML = "Your key is:" + key;
     }
    })
    .catch(function(error) 
    {
     alert("error:" + error);
    })
}

function prepareToken()
{
    var login = $("#login").val();
    s1 = login+":"+key;
    var s2 = btoa(s1);
    postMethod(s2,login);
}

function postMethod(s2,login)
{
     $.ajax({
        url: $("#url").val(),
        type: "POST", // Also: "GET", …
        headers: { 'API-Token': s2 },
        success: function(data) 
        {
        document.getElementById("final-paragraph").innerHTML = data;
        var button = document.getElementById('send-key');
        button.disabled = true;
        }
       })
       .fail(function(err) {
        alert( "Something went wrong: " + err.responseText );
       }); 
}