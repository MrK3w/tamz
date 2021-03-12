function removeAll()
{
    localStorage.clear();
    location.reload();
}

function CurrentDays()
{
  document.getElementById('dateInput').value = new Date().toISOString().slice(0, 10);
}

function addDialog(dialog)
{
    document.getElementById(dialog).show();
}

function closeDialog(dialog)
{
    document.getElementById(dialog).hide();
}