document.addEventListener("init",function(event){
    var page = event.target;

    if (page.id ==="page1")
    {
        $("#push-button-1").on("click", function(e)
        {
            var msg = $("#msg").val();
            if(msg === "" || msg===undefined)
            {
                ons.notification.alert('You did not fill your name');
            }
            else{
                ons.notification.alert("Greetings: " + msg + "!");
            }
        });
    }
});

document.addEventListener("init",function(event){
    var page = event.target;

    if (page.id ==="page1")
    {
        $("#push-button-2").on("click", function(e)
        {
            var msg = $("#msg").val();
            if(msg === "" || msg===undefined)
            {
                ons.notification.alert('You did not fill your name');
            }
            else{
               showTemplateDialog(msg);
            }
        });
    }
});

var showTemplateDialog = function(msg) {
    var dialog = document.getElementById('my-dialog');

    if (dialog)
    {
        $("#pl").text('Greetings: ' + msg + " !");
        dialog.show();
    }
    else
    {
        ons.createElement('dialog.html', {append: true})
        .then(function(dialog)
        {
            $("#pl").text('Greetings: ' + msg + " !");
            dialog.show();
        });
    }
};

var hideDialog = function(id) {
    document
        .getElementById(id)
        .hide();
};