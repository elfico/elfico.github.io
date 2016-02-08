$(document).ready(function(){
    $("#add").click(function(){
        var drug = "<tr><td>Drugname</td><td>Interaction</td></tr>";
        $("#nl").after(drug);
        return false;
    });


    $("checker").click(function(){
        var xhr = new XMLHttpRequest();
        var url = "http://localhost/interaction/list.json";
        xhr.open("GET", url, true);

        xhr.onload() = function()
        {
            var data = JSON.parse(xhr.responseText);

            /* for(var k = 0; k < 2; k++)
             {
             for(var i = 0; i <= 80; i++)
             {

             var drug = "<tr><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[0].minConceptItem.name +
             "</td><td>"  + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[1].minConceptItem.name +
             "</td><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].description + "</td></tr>";
             $("#nl").before(drug);
             }}*/

        };

        xhr.onerror = function() {
            document.getElementById("message").innerHTML = "failed";

        };

        xhr.send();
        return false;

    });
});
