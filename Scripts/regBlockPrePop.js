$(document).ready(() => {


  /**
   * Clears relevant fields in newly replicated blocks
   * @param {jQuery} $block - The jQuery-wrapped replicate block
   */
  const clearFieldsInNewBlock = ($block) => {
    const replicateId = $block.data("replicate_id");

    // Skip clearing if it's the first block or invalid
    if (!replicateId || replicateId <= 1) return;

    // Clear text and email inputs in specified sections
    $block
      .find(
        "div[data-export='sys:first'], " +
			  "div[data-export='sys:middle'], " +
          "div[data-export='sys:last'], " +
          "div[data-export='sys:email'], " +
          "div[data-export='sys:mobile'], " +
          "div[data-export='sys:field:preferred_class_year'], " +
          "div[data-export='sys:preferred']"
      )
      .find("input[type='text'], input[type='email']")
      .val("");

    // Clear birthdate selects
    $block
      .find("div[data-export='sys:birthdate']")
      .find("select[aria-label='Month'], select[aria-label='Day'], select[aria-label='Year']")
      .val("");
  };

  // Create a MutationObserver to detect newly added replicate blocks
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        $(mutation.addedNodes).each(function () {
					  // Initially hide the delete link for the first replicate block
  $("tbody.replicate_destination[data-replicate_id='1']")
    .find("tr.column a.replicate_delete")
    .css('display', 'none');
          if ($(this).is("tbody.replicate_destination[data-replicate_id]")) {
            clearFieldsInNewBlock($(this));
          }
        });
      }
    }
  });

  // Start observing the entire document for changes
  // (Consider observing a narrower container if possible for performance)
  observer.observe(document.documentElement, {
    childList: true,  // Watch for added/removed child elements
    subtree: true,    // Also watch for changes inside child elements
  });
});
