$(document).ready(function(){

    var drug1;
    var drug2;
    var drug3;

   $("#add").click(function(){
        var drugname = document.getElementById("drugname").value;
        var drug = "<li><input type='hidden' value='" + drugname + "'>" + drugname + "</li>";
   $("#dlist").before(drug);
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
                document.getElementById("processing").innerHTML = "Finished Processing";
                document.getElementById("drugrx").innerHTML = rxc;
            };


            xhr.onerror = function() {
                document.getElementById("message").innerHTML = "failed";

            };

            /*xhr.setRequestHeader("Content-Type", "application/json");*/
            document.getElementById("processing").innerHTML = "Processing....";
            xhr.send();
            return false;

        }



    });




    $("#compare").click(function(){
        var xhr = new XMLHttpRequest();
        //var url = "http://localhost/interaction/list.json";
        var rxc = document.getElementsByTagName("input").value;
        for(var j = 0; j <)
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
                document.getElementById("processing").innerHTML = "Finished Processing";
                document.getElementById("drugrx").innerHTML = rxc;
            };


            xhr.onerror = function() {
                document.getElementById("message").innerHTML = "failed";

            };

            /*xhr.setRequestHeader("Content-Type", "application/json");*/
            document.getElementById("processing").innerHTML = "Processing....";
            xhr.send();
            return false;

        }



    });

});
