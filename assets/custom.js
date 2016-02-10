$(document).ready(function(){


   $("#add").click(function(){
       // var drugname = document.getElementById("drugname").value;
       $("#error2").html("");
       var drugname = $("#drugname2").val();
       var drug = "<li>All</li>";

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
                   drug = "<li class='druglist'><input class='drugs' type='hidden' value='" + drugrxcui + "'>" + drugname + " " + drugrxcui + "</li>";
                   $("#rxid2").html("RXCUI Found and Added");
                   //document.getElementById("rxid2").innerHTML = "RXCUI Found and Added";
                   $("#dlist").before(drug);
                   return false;
               }

               else
               {
                   drug = "<li class='druglist'><input class='drugs' type='hidden' value='empty'>" + drugname  + " No Rxcui</li>";
                   $("#rxid2").html("No RXCUI Found");
                  // document.getElementById("rxid2").innerHTML = "No RXCUI Found";
                   $("#dlist").before(drug);
                   return false;
               }
           };

           xhr.onerror = function()
           {
               $("#rxid2").html("Error. Try Again");
               //document.getElementById("rxid2").innerHTML = "Error. Try Again";
           };


           $("#rxid2").html("Searching for RXCUI");
           //document.getElementById("rxid2").innerHTML = "Searching for RXCUI...";
           xhr.send();
           return false;
       }

       else if(!isNaN(drugname))
       {
            $("#error2").html("Enter a drugname");
          // document.getElementById("error").innerHTML = "Enter a drugname";
           return false;
       }

       else if(drugname === null)
       {
           $("#error2").html("Invalid RXCUI");
          // document.getElementById("error").innerHTML = "Invalid RXCUI";
           return false;
       }
       /*stop*/

      /*var drug = "<li><input class='drugs' type='hidden' value='" + drugname + "'>" + drugname + "</li>"; */

        /*$("#dlist").before(drug);
         return false;*/
    });



    $("#drugname").keyup(function(){

        $("#processing").html("Finished");
       // document.getElementById("processing").innerHTML = "Finished";
       // $("#error").html("s");
     //   document.getElementById("error").innerHTML = "";
        var rxc = $("#drugname").val();
      //  var rxc = document.getElementById("drugs").value;
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
                $("#rxid").html(data.idGroup.rxnormId[0]);
              //  document.getElementById("rxid").innerHTML = data.idGroup.rxnormId[0];
              //  document.getElementById("checker").disabled = false;
            }

              else
                {
                    $("#rxid").html("RXCUI is not found");
                 //   document.getElementById("rxid").innerHTML = "Rxcui is not found";
                }
            };

            xhr.onerror = function()
            {
                $("#rxid").html("Error. Try Again");
                //document.getElementById("rxid").innerHTML = "Error. Try Again";
            };

            $("#rxid").html("Searching for RXCUI");
           // document.getElementById("rxid").innerHTML = "Searching for RXCUI...";
            xhr.send();
            return false;
        }

        else if(!isNaN(rxc))
        {
            $("#rxid").html(rxc);
           // document.getElementById("rxid").innerHTML = rxc;
            //document.getElementById("checker").disabled = false;
        }

        else if(rxc === null)
        {
            $("#error").html("Invalid RXCUI");
           // document.getElementById("error").innerHTML = "Invalid RXCUI";
           // document.getElementById("checker").disabled = true;
        }
    });




    $("#checker").click(function(){
        var xhr = new XMLHttpRequest();

        var rxc = $("#rxid").html();
        //var rxc = document.getElementById("rxid").innerHTML;
        if(rxc === "" || isNaN(rxc))
        {
            $("#error").html("Invalid RXCUI Number");
           // document.getElementById("error").innerHTML = "Invalid RXCUI Number";
            return false;
        }

        else
        {
            $(".pulledData").remove();
            $("#error").html("");
          //  document.getElementById("error").innerHTML = "";
            var url = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=" + rxc;
            xhr.open("GET", url, true);
            xhr.onload = function () {

                var data = JSON.parse(xhr.responseText);

                if(data.interactionTypeGroup && data.interactionTypeGroup.length >= 0)
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
                    $("#processing").html("No interaction Found");
                   // document.getElementById("processing").innerHTML = "No Interaction Found";
                }

                $("#processing").html("Finished Processing");
                //document.getElementById("processing").innerHTML = "Finished Processing";
                $("#drugrx").html(rxc);
               // document.getElementById("drugrx").innerHTML = rxc;
            };


            xhr.onerror = function()
            {
                $("processing").html("Error. Please Try Again");
                //document.getElementById("processing").innerHTML = "Error. Please Try Again";

            };

            /*xhr.setRequestHeader("Content-Type", "application/json");*/
            $("#processing").html("Processing");
            document.getElementById("processing").innerHTML = "Processing....";
            xhr.send();
            return false;

        }



    });




    $("#compare").click(function(){
       // var xhr = new XMLHttpRequest();
        //var url = "http://localhost/interaction/list.json";
        var drugs=[];
        var url2 = "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=";

        var drxc = document.getElementsByClassName("drugs");

        if(drxc.length < 2 || drxc.length > 3)
        {
            $("#error2").html("Enter Atleast 2 Drugs and Atmost 3 drugs");

        }

        else
        {
          $("#error2").html("");

          for(var j = 0; j < drxc.length; j++)
              {
                  if(drxc[j].value !== "empty")
                  {
                      url2 = url2 + "+" + drxc[j].value;
                      //drugs[j] = drxc[j].value;
                  }
              }


    //    if((drugs[0] === "empty") || (drugs[1] === "empty") ||(drugs[2] === "empty"))
            var xhr = new XMLHttpRequest();
           // var url = "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=" + drugs[0] + "+" + drugs[1] + "+" + drugs[2];
            //alert(url);
            xhr.open("GET", url2, true);

            xhr.onload = function(){
                var data = JSON.parse(xhr.responseText);

              // document.getElementById("message").innerHTML = data;

                if(data.fullInteractionTypeGroup && data.fullInteractionTypeGroup.length > 0)
                {
                    for(var j = 0; j < data.fullInteractionTypeGroup[0].fullInteractionType.length; j++) {

                        for (var k = 0; k < data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair.length; k++)
                        {
                             var interaction = "<tr><td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair[k].interactionConcept[0].minConceptItem.name + "</td>" +
                                 "<td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair[k].interactionConcept[1].minConceptItem.name + "</td>" +
                                 "<td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].comment + "</td>" +
                                 "<td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair[k].description + "</td></tr>";
                        $("#nl2").before(interaction);
                          }
                    }
                    $("#message").html("completed");
               }
            };

            xhr.onerror = function(){
                $("#message").html("Error. Try Again");
            };

            $("#message").html("Checking...");
           // xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

       }

        return false;
    });


    $("#clear").click(function(){
        $(".druglist").remove();
        $("#rxid2").html("");
        $("#error").html("");
        return false;
    });

});
