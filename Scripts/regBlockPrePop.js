// Script Description: This script is designed to prevent pre-population of form fields 
// when adding a new guest entry to a registration block. It targets specific input fields 
// within the replicated blocks and clears their values upon a designated action.

$(document).ready(function() {
  // Object to track which replicate IDs have been processed
  var hashTable = {};
  
  // Initialize with the maximum replication ID encountered so far
  let maxReplicationId = 2;

  // Bind a change event on the document body to handle dynamic content
  $(document.body).on('change', function() {
    
    // Selects the first replicate block and hides its delete button
    var replicateBlock = $("tbody.replicate_destination[data-replicate_id='1']");
    replicateBlock.find("tr.column a.replicate_delete").css('display', 'none');

    // Iterates over all tbody elements with a data-replicate_id attribute
    $("tbody[data-replicate_id]").each(function() {
      // If this replicate ID is not in the hashTable, add it
      if (!hashTable.hasOwnProperty($(this).data("replicate_id"))) {
        hashTable[$(this).data("replicate_id")] = true;
      }

      // If this is the maximum replication ID known and hasn't been processed yet
      if ($(this).data("replicate_id") == maxReplicationId && hashTable[$(this).data("replicate_id")]) {
        // **THIS BLOCK TARGETS SPECIFIC INPUT FIELDS FOR CLEARING. CUSTOM FIELDS AND FIELDS
        // THAT WILL BE CLEARED ON ADDING A NEW BLOCK CAN BE ADDED, REMOVED, OR UPDATED HERE**
        // Clear input fields within this block
        // First name, Last name, Email, Mobile, Preferred Class Year, Preferred Name, and Birthdate fields are targeted for clearing
        $(this).find("div[data-export='sys:first'], div[data-export='sys:last'], div[data-export='sys:email'], div[data-export='sys:mobile'], div[data-export='sys:field:preferred_class_year'], div[data-export='sys:preferred']").find("input[type='text'], input[type='email']").val("");
        $(this).find("div[data-export='sys:birthdate']").find("select[aria-label='Month'], select[aria-label='Day'], select[aria-label='Year']").val("");
        
        // Mark this replicate ID as processed
        hashTable[$(this).data("replicate_id")] = false;
      }
    });

    // After processing, update maxReplicationId with the highest replicate ID encountered
    $("tbody[data-replicate_id]").each(function() {
      let replicationId = parseInt($(this).data("replicate_id"));
      if (replicationId > maxReplicationId) {
        maxReplicationId = replicationId;
      }
    });
  });
});
