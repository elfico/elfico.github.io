$(document).ready(function(){

//Page1 javascript starts

//function to retrieve drug rxcui on keypress
    $("#find").click(function(){

        $("#processing").html("");//resets processing div
             var rxc = $("#drugname").val().toLowerCase();//gets the drugname
          if(isNaN(rxc))//check if its not a number
            {
             var xhr = createXHR();
            var url = "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" + rxc;
            xhr.open("GET", url, true);

            xhr.onload = function(){
            var data = JSON.parse(xhr.responseText);

            if(data.idGroup.rxnormId && data.idGroup.rxnormId.length >= 0)//check whether a result is returned
            {
                $("#rxid").html(data.idGroup.rxnormId[0]);//display the rxcui of the drug entered
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

        else if(!isNaN(rxc))//check if it is a number
        {
            $("#rxid").html(rxc);
            return false;
          }

        else if(rxc === null)
        {
            $("#error").html("Invalid RXCUI");
         }
    });



//function that checks the drug interaction on click
    $("#checker").click(function(){

        var xhr = createXHR();

        var rxc = $("#rxid").html();//gets the rxcui from the div that displays it.
        
        if(rxc === "" || isNaN(rxc))//check wether t is set or it is a number
        {
            $("#error").html("Invalid RXCUI Number");
             return false;
        }

        else
        {
            $(".pulledData").remove();//clears the content of the table if any
            $("#error").html("");//clears the error message
              var url = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=" + rxc;
            xhr.open("GET", url, true);
            xhr.onload = function () {

                var data = JSON.parse(xhr.responseText);

                if(data.interactionTypeGroup && data.interactionTypeGroup.length >= 0)//checks if data is returned
                {

                for(var k = 0; k < data.interactionTypeGroup[0].interactionType.length; k++)//iterates through the interactionType
                {

                    for(var i = 0; i <  data.interactionTypeGroup[0].interactionType[k].interactionPair.length; i++)//iterates through the interactionPair
                    {
                           //create a table data using drugname, interactive drugs and interaction
                        var drug = "<tr class='pulledData'><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[0].minConceptItem.name +
                            "</td><td>"  + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].interactionConcept[1].minConceptItem.name +
                            "</td><td>" + data.interactionTypeGroup[0].interactionType[k].interactionPair[i].description + "</td></tr>";
                        $("#nl").before(drug);//adds the data created to the table

                    }
                }

                }

                else
                {
                    $("#processing").html("No interaction Found");//shows error if interaction is not found
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

//Page1 Javascript stops here


//Page2 javascript starts

//function to select a drug
   $("#add").click(function(){
      
       $("#error2").html("");  //set error to blank
       var drugname = $("#drugname2").val().toLowerCase();//gets the drug name from the input
       var drug = "<li>All</li>";//dummy list tag. does nothing
       
       if(isNaN(drugname)) //check if drugname entered is not a number
       {
           var xhr = createXHR();
           var url = "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" + drugname;
           xhr.open("GET", url, true);

           xhr.onload = function(){
               var data = JSON.parse(xhr.responseText);

               if(data.idGroup.rxnormId && data.idGroup.rxnormId.length >= 0) //check if the drug has a rxcui number
               {
                var drugrxcui = data.idGroup.rxnormId[0];
                   drug = "<li class='druglist'><h4><input class='drugs' type='hidden' value='" + drugrxcui + "'>" + drugname + " " + drugrxcui + "</h4></li>"; //creates a table data with drugname and rxcui
                   $("#rxid2").html("RXCUI Found and Added");
                  
                   $("#dlist").before(drug); //add table data to table
                   return false;
               }

               else
               {
                   //drugs without rxcui
                   drug = "<li class='druglist'><h4><input class='drugs' type='hidden' value='empty'>" + drugname  + " No Rxcui</h4></li>"; //if the rxcui is not found, create table data with drugname and message
                   $("#rxid2").html("No RXCUI Found");
                  
                   $("#dlist").before(drug);//add table data to table
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

       else if(!isNaN(drugname))//checks if the drugname entered is a number. we want a drugname entered not a number
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


    //function to compare the drugs
    $("#compare").click(function(){
       
        var drugs=[]; //array to hold input drugs
        var url2 = "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=";

        var drxc = document.getElementsByClassName("drugs");//gets all drugs from hidden input within the list tag

        if(drxc.length < 2 || drxc.length > 3)//checks if drugs entered is not more than 3 or less than 2
        {
            $("#error2").html("Enter Atleast 2 Drugs and Atmost 3 drugs");

        }

        else
        {
          $("#error2").html("");

          for(var j = 0; j < drxc.length; j++)//iterates through array of drugs
              {
                  if(drxc[j].value !== "empty")
                  {
                      url2 = url2 + "+" + drxc[j].value;//adds the drugs to the url
                      
                  }
                  else
                  {
                      $("#error2").html("error"); //sets the error code to error if any of the drugs doesnt have rxcui. refer to line 154 (drugs without rxcui)
                  }
              }

            $(".pulledData2").remove();//clears table dat if any

               var xhr = createXHR();
               
                xhr.open("GET", url2, true);

            xhr.onload = function(){
                var data = JSON.parse(xhr.responseText);
                
                var errormsg = $("#error2").html();
                    
    
                if(data.fullInteractionTypeGroup && data.fullInteractionTypeGroup.length > 0 && errormsg !== "error")//checks if interaction exists and all drugs have rxcui
                {
                    for(var j = 0; j < data.fullInteractionTypeGroup[0].fullInteractionType.length; j++) {

                        for (var k = 0; k < data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair.length; k++)
                        {
                             var interaction = "<tr class='pulledData2'><td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair[k].interactionConcept[0].minConceptItem.name + "</td>" +
                                 "<td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair[k].interactionConcept[1].minConceptItem.name + "</td>" +
                                 "<td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].comment + "</td>" +
                                 "<td>" + data.fullInteractionTypeGroup[0].fullInteractionType[j].interactionPair[k].description + "</td></tr>";
                        $("#nl2").before(interaction);
                          }
                    }
                    $("#message").html("completed");
               }
               
               else if(errormsg === "error") //if any of the drug doesnt have rxcui
               {
                   $("#message").html("Not Completed. Some Drugs are Missing RXCUI. Make sure selected drugs have RXCUI");
                   $("#error2").html("");
               }

                else
                {
                    $("#message").html("No Interactions Found");
                    $("#error2").html("");
                }
            };

            xhr.onerror = function(){
                $("#message").html("Error. Try Again");
            };

            $("#message").html("Checking...");
    
            xhr.send();

       }

        return false;
    });
    
    
    //function to clear drugs selection
 $("#clear").click(function(){
        $(".druglist").remove();
        $("#rxid2").html("");
        $("#error").html("");
        return false;
    });


    //function to create ajax request
    function createXHR()
    {
        var xhr = new XMLHttpRequest();

        if(typeof XDomainRequest != "undefined")
        {
            xhr = new XDomainRequest();
        }

        return xhr;
    }

});
