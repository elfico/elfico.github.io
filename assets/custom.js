$(document).ready(function(){


   $("#add").click(function(){
      
       $("#error2").html("");
       var drugname = $("#drugname2").val();
       var drug = "<li>All</li>";
       
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
                  
                   $("#dlist").before(drug);
                   return false;
               }

               else
               {
                   drug = "<li class='druglist'><input class='drugs' type='hidden' value='empty'>" + drugname  + " No Rxcui</li>";
                   $("#rxid2").html("No RXCUI Found");
                  
                   $("#dlist").before(drug);
                   return false;
               }
           };

           xhr.onerror = function()
           {
               $("#rxid2").html("Error. Try Again");
               
           };


           $("#rxid2").html("Searching for RXCUI");
           
           xhr.send();
           return false;
       }

       else if(!isNaN(drugname))
       {
            $("#error2").html("Enter a drugname");
          
           return false;
       }

       else if(drugname === null)
       {
           $("#error2").html("Invalid RXCUI");
          
           return false;
       }
      
    });



    $("#drugname").keyup(function(){

        $("#processing").html("Finished");
             var rxc = $("#drugname").val();
          if(isNaN(rxc))
        {
             var xhr = new XMLHttpRequest();
            var url = "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" + rxc;
            xhr.open("GET", url, true);

            xhr.onload = function(){
            var data = JSON.parse(xhr.responseText);

            if(data.idGroup.rxnormId && data.idGroup.rxnormId.length >= 0)
            {
                $("#rxid").html(data.idGroup.rxnormId[0]);
                   }

              else
                {
                    $("#rxid").html("RXCUI is not found");
                   }
            };

            xhr.onerror = function()
            {
                $("#rxid").html("Error. Try Again");
            };

            $("#rxid").html("Searching for RXCUI");
                  xhr.send();
            return false;
        }

        else if(!isNaN(rxc))
        {
            $("#rxid").html(rxc);
          }

        else if(rxc === null)
        {
            $("#error").html("Invalid RXCUI");
         }
    });




    $("#checker").click(function(){
        var xhr = new XMLHttpRequest();

        var rxc = $("#rxid").html();
           if(rxc === "" || isNaN(rxc))
        {
            $("#error").html("Invalid RXCUI Number");
             return false;
        }

        else
        {
            $(".pulledData").remove();
            $("#error").html("");
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
                   }

                $("#processing").html("Finished Processing");
                 $("#drugrx").html(rxc);
             };


            xhr.onerror = function()
            {
                $("processing").html("Error. Please Try Again");
     
            };

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
                  else
                  {
                      $("#error2").html("error"); 
                  }
              }


    //    if((drugs[0] === "empty") || (drugs[1] === "empty") ||(drugs[2] === "empty"))
            var xhr = new XMLHttpRequest();
           // var url = "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=" + drugs[0] + "+" + drugs[1] + "+" + drugs[2];
            //alert(url);
            xhr.open("GET", url2, true);

            xhr.onload = function(){
                var data = JSON.parse(xhr.responseText);
                
                var errormsg = $("#error").html;
                    
              // document.getElementById("message").innerHTML = data;

                if(data.fullInteractionTypeGroup && data.fullInteractionTypeGroup.length > 0 && errormsg !== "error")
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
               
               else if(errormsg === "error")
               {
                   $("#message").html("Not Completed. Some Drugs are Missing RXCUI");
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
