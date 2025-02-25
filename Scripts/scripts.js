// Fetch data from the web service asynchronously
async function getWebServiceResults() {
  const url = "your-web-service-url"; // Replace with your actual web service URL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetching web service data failed:", error);
  }
}

// Check if the form's GUID exists in the retrieved data and execute relevant scripts
async function checkIfGuidExistsAndRunScripts() {
  const webServiceData = await getWebServiceResults();
  if (!webServiceData) return;

  // Get the form's GUID from the input field
  const inputElement = document.getElementsByName("id")[0];
  if (!inputElement) return;

  const guidValue = inputElement.value;

  // The key name in the JSON response may vary 
  //(e.g., "form-guid" instead of "Fguid")
  const matchingRow = webServiceData.row.find((row) => row.Fguid === guidValue);

  if (matchingRow) {
    for (const [key, value] of Object.entries(matchingRow)) {
      // Special case: If the value is a URL, apply it as a background image
      if (key === "addBgImage" && value.startsWith("https")) {
        CustomFormScripts.addBgImage(value);
      } 
      // If the value is "Yes" and a corresponding function exists, execute it
      else if (value === "Yes" && typeof CustomFormScripts[key] === "function") {
        CustomFormScripts[key]();
      }
    }
  }
}

// Object containing custom scripts to apply based on user selections
const CustomFormScripts = {
  /**
   * Removes the map and location fields from the form.
   */
  hideMapAndLocation() {
    $("#register_map, #map, #register_location").remove();
  },

  /**
   * Adds a red asterisk to required fields.
   */
  addRedAsteriskToEnd() {
    $(document).ready(() => {
      $('.form_question[data-required="1"]').each(function () {
        if (!$(this).find(".form_label").hasClass("asterisk-added")) {
          $(this)
            .find(".form_label")
            .append('<span style="color:red">*</span>')
            .addClass("asterisk-added");
        }
      });
    });
  },

  /**
   * Loads external styles only if the user has selected this option.
   */
  loadExternalStyles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "/forms/styles.css"; // Path to the external styles.css file
    document.head.appendChild(link);
  },

  /**
   * Replaces the default form response banner redirect URL with a new one.
   * @param {string} newUrl - The new redirect URL.
   */
  replaceRedirect(newUrl) {
    $("#form_response_banner a").attr("href", newUrl);
  },

  /**
   * Sets the background image of the page.
   * @param {string} url - The URL of the background image.
   */
  addBgImage(url) {
    document.body.style.background = `url('${url}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
  },

  /**
   * Prevents prepopulation of fields when adding a new guest.
   */
  preventPrepopOnAddGuest() {
    $(document).ready(() => {
      /**
       * Clears prepopulated fields in newly replicated blocks.
       * @param {jQuery} $block - The newly added replicate block.
       */
      const clearFieldsInNewBlock = ($block) => {
        const replicateId = $block.data("replicate_id");
        if (!replicateId || replicateId <= 1) return;

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

        $block
          .find("div[data-export='sys:birthdate']")
          .find(
            "select[aria-label='Month'], select[aria-label='Day'], select[aria-label='Year']"
          )
          .val("");
      };

      // Observer to detect newly added replicate blocks
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList" && mutation.addedNodes.length) {
            $(mutation.addedNodes).each(function () {
              // Hide the delete link for the first replicate block
              $("tbody.replicate_destination[data-replicate_id='1']")
                .find("tr.column a.replicate_delete")
                .css("display", "none");

              if ($(this).is("tbody.replicate_destination[data-replicate_id]")) {
                clearFieldsInNewBlock($(this));
              }
            });
          }
        }
      });

      // Start observing the document for changes
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    });
  },
};

// Run the script once the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  checkIfGuidExistsAndRunScripts();
});
