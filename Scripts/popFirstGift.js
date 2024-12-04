$(document).ready(function() {
  // Bind a change event on the document body to handle dynamic content
  $(document.body).on('change', function() {
    
    var honoringOtherValue = $("div[data-export='honoring-other'] input[type='text']").val();
    var occasionValue = $("div[data-export='occasion-value'] input[type='text']").val();
    var notesValue = $("div[data-export='notes'] textarea").val(); // Adjust if it's a textarea

    //console.log("Honoring Other Value:", honoringOtherValue);
    //console.log("Occasion Value:", occasionValue);
    //console.log("Notes Value:", notesValue);

    // **Clear input fields within the first replicate block**
    if (honoringOtherValue !== undefined && honoringOtherValue !== null) {
      $("tbody.replicate_destination")
        .find("div[data-export='sys:gift:honoring'] input[type='text']")
        .val(honoringOtherValue);
    }

    if (occasionValue !== undefined && occasionValue !== null) {
      $("tbody.replicate_destination")
        .find("div[data-export='sys:gift:occasion'] input[type='text']")
        .val(occasionValue);
    }

    if (notesValue !== undefined && notesValue !== null) {
      $("tbody.replicate_destination")
        .find("div[data-export='sys:gift:notes'] textarea") // Adjust if it's a textarea
        .val(notesValue);
    }
    
    // Optionally, log after setting the values
    //console.log("Set Honoring Other, Occasion, and Notes values.");
  });
});
