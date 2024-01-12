function myFunction() {
    // Replace 'FORM_ID' with your form's actual ID
    var form = FormApp.openById('');
    // Change how many response you want to submit
    var loop = 3;
    
    for(i=0; i < loop; i++){
    var formResponse = form.createResponse();
    // For each item on the form...
    form.getItems().forEach(function(item) {
    
      if (item.getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
        var multipleChoiceItem = item.asMultipleChoiceItem();
        
        // Get the array of choices
        var choices = multipleChoiceItem.getChoices();
    
        // Select a random choice
        var randomChoice = choices[Math.floor(Math.random() * choices.length)];
        
        // Create a new item response with the random choice
        var itemResponse = multipleChoiceItem.createResponse(randomChoice.getValue());
        
        // Add the item response to the form response
        formResponse.withItemResponse(itemResponse);
      }
    
      if (item.getType() === FormApp.ItemType.TEXT ) {
        var textItem = item.asTextItem();

        if (textItem.getTitle() === "Age" || textItem.getTitle() === "2. Age") {
          var min = 19;
          var max = 25;
          var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
          var itemResponse = textItem.createResponse(randomValue.toString());
          formResponse.withItemResponse(itemResponse);
          return;
        }
        var itemResponse = textItem.createResponse("IS");
        formResponse.withItemResponse(itemResponse); 
      }
    
      if (item.getType() === FormApp.ItemType.GRID) {
        var gridItem = item.asGridItem();
        
        // Get the array of columns (choices)
        var choices = gridItem.getColumns();
        
        // Create an array to hold the responses
        var responses = [];
        
        // For each row in the grid...
        gridItem.getRows().forEach(function(row) {
          // Generate a random number between 0 and 1
          var randomNumber = Math.random();
          
          // If the random number is less than 0.8...
          if (randomNumber < 0.8) {
            // ...select a random choice from the fifth to seventh choices
            var choiceIndex = Math.floor(Math.random() * 3) + 4;
          } else {
            // ...otherwise, select a random choice from the second to fourth choices
            var choiceIndex = Math.floor(Math.random() * 3) + 1;
          }
          
          // Add the selected choice to the responses array
          responses.push(choices[choiceIndex]);
        });
        
        // Create a new item response with the responses array
        var itemResponse = gridItem.createResponse(responses);
        
        // Add the item response to the form response
        formResponse.withItemResponse(itemResponse);
      }
    });
    
    // Submit the form response
    formResponse.submit();
    Utilities.sleep(1000);
    
    }
    }
