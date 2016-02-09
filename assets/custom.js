$(document).ready(function(){


   $("#add").click(function(){
        var drugname = document.getElementById("drugname").value;
       /*start*/

       if(isNaN(drugname))
       {
           var xhr = new XMLHttpRequest();
           var url = "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" + drugname;
           xhr.open("GET", url, true);

           xhr.onload = function(){
               var data = JSON.parse(xhr.responseText);

               if(data.idGroup.rxnormId && data.idGroup.rxnormId.length >= 0)
               {
                var drugrxcui = data.idGroup.rxnormId[0];
                   var drug = "<li><input class='drugs' type='hidden' value='" + drugrxcui + "'>" + drugname + " " + drugrxcui + "</li>";
               }

               else
               {
                   document.getElementById("rxid").innerHTML = "Rxcui is not found";
               }
           };

           xhr.onerror = function()
           {
               document.getElementById("rxid").innerHTML = "Error. Try Again";
           };

           document.getElementById("rxid").innerHTML = "Searching for RXCUI...";
           xhr.send();
           return false;
       }

       else if(!isNaN(rxc))
       {
           document.getElementById("rxid").innerHTML = rxc;
       }

       else if(rxc === null)
       {
           document.getElementById("error").innerHTML = "Invalid RXCUI";
       }

       /*stop*/
      /*var drug = "<li><input class='drugs' type='hidden' value='" + drugname + "'>" + drugname + "</li>"; */
   $("#dlist").before(drug);
   return false;
    });



    $("#drugs").keyup(function(){
        document.getElementById("error").innerHTML = "";
        var rxc = document.getElementById("drugs").value;
        if(isNaN(rxc))
        {
           // document.getElementById("checker").disabled = true;
            var xhr = new XMLHttpRequest();
            var url = "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" + rxc;
            xhr.open("GET", url, true);

            xhr.onload = function(){
            var data = JSON.parse(xhr.responseText);

            if(data.idGroup.rxnormId && data.idGroup.rxnormId.length >= 0)
            {
                document.getElementById("rxid").innerHTML = data.idGroup.rxnormId[0];
              //  document.getElementById("checker").disabled = false;
            }

              else
                {
                    document.getElementById("rxid").innerHTML = "Rxcui is not found";
                }
            };

            xhr.onerror = function()
            {
                document.getElementById("rxid").innerHTML = "Error. Try Again";
            };

            document.getElementById("rxid").innerHTML = "Searching for RXCUI...";
            xhr.send();
            return false;
        }

        else if(!isNaN(rxc))
        {
            document.getElementById("rxid").innerHTML = rxc;
            //document.getElementById("checker").disabled = false;
        }

        else if(rxc === null)
        {
            document.getElementById("error").innerHTML = "Invalid RXCUI";
           // document.getElementById("checker").disabled = true;
        }
    });




    $("#checker").click(function(){
        var xhr = new XMLHttpRequest();
        //var url = "http://localhost/interaction/list.json";

        var rxc = document.getElementById("rxid").innerHTML;
        if(rxc === "" || isNaN(rxc))
        {
            document.getElementById("error").innerHTML = "Invalid RXCUI Number";
            return false;
        }

        else
        {
            $(".pulledData").remove();

            document.getElementById("error").innerHTML = "";
            var url = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=" + rxc;
            xhr.open("GET", url, true);
            xhr.onload = function () {

                var data = JSON.parse(xhr.responseText);

                if(data.interactionTypeGroup.length >= 0)
                {

                for(var k = 0; k < data.interactionTypeGroup[0].interactionType.length; k++)
                {

                    for(var i = 0; i <  data.interactionTypeGroup[0].interactionType[k].interactionPair.length; i++)
                    {

                        var drug = "<tr class='pulledData'><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[0].minConceptItem.name +
                            "</td><td>"  + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[1].minConceptItem.name +
                            "</td><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].description + "</td></tr>";
                        $("#nl").before(drug);

                    }
                }

                }

                else
                {
                    document.getElementById("processing").innerHTML = "Finished Processing. No interaction Found. Check that the RXCUI is correct";
                }

                document.getElementById("processing").innerHTML = "Finished Processing";
                document.getElementById("drugrx").innerHTML = rxc;
            };


            xhr.onerror = function() {
                document.getElementById("processing").innerHTML = "Error. Please Try Again";

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
        var drxc = document.getElementsByClassName("drugs");
        for(var j = 0; j < drxc.length; j++)
        {
            alert("the drugs are" + drxc[j].value)
        }

    });

});
