/*var newdrug = document.createElement("tr")
 var drugName = document.createElement("td");
 var drugInteract = document.createElement("td");*/

$(document).ready(function(){

    $("#add").click(function(){
        var drug = "<tr><td>Drugname</td><td>Interaction</td></tr>";
        $("#nl").after(drug);
        return false;
    });

    $("#checker").click(function(){
        var xhr = new XMLHttpRequest();
        //var url = "http://localhost/interaction/list.json";
        var rxc = document.getElementById("drugs").value;
        if(rxc === "" || isNaN(rxc))
        {
            document.getElementById("error").innerHTML = "Invalid RXCUI Number";
            return false;
        }

        else
        {
            document.getElementById("error").innerHTML = "";
            var url = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=" + rxc;
            xhr.open("GET", url, true);
            xhr.onload = function () {

                var data = JSON.parse(xhr.responseText);
                //document.getElementById("message").innerHTML = data.nlmDisclaimer;

                //var drug = "<tr><td>" + data.interactionTypeGroup[0].interactionType[0].minConceptItem.name + "</td><td></td><td>good</td></tr>";
                /* for(var k = 0; k < 2; k++)
                 {
                 for(var i = 0; i <= 80; i++)
                 {

                 var drug = "<tr><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[0].minConceptItem.name +
                 "</td><td>"  + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[1].minConceptItem.name +
                 "</td><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].description + "</td></tr>";
                 $("#nl").before(drug);
                 }}*/

                for(var k = 0; k < data.interactionTypeGroup[0].interactionType.length; k++)
                {

                    for(var i = 0; i <  data.interactionTypeGroup[0].interactionType[k].interactionPair.length; i++)
                    {

                        var drug = "<tr><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[0].minConceptItem.name +
                            "</td><td>"  + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[1].minConceptItem.name +
                            "</td><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].description + "</td></tr>";
                        $("#nl").before(drug);

                    }
                }
                document.getElementById("processing").innerHTML = "Finished";
            };


            xhr.onerror = function() {
                document.getElementById("message").innerHTML = "failed";

            };

            /*xhr.setRequestHeader("Content-Type", "application/json");*/
            document.getElementById("processing").innerHTML = "processing....";
            xhr.send();
            return false;

        }



    });
});
