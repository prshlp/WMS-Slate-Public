
$(document).ready(function() {
    /**
     * Initializes the observation of DOM changes to prevent pre-population of certain fields in dynamically added guest forms.
     */
    function preventPrepopOnAddGuest() {
        // Configuration for the MutationObserver to watch for added nodes
        const observerConfig = { childList: true, subtree: true };

        // Target node to observe for mutations (changes)
        const targetNode = document.getElementById("replicate_table_form_page_2");

        // Instantiates the MutationObserver to handle specific DOM changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((addedNode) => {
                        // Ensure the added node is a 'tbody' with the class 'replicate_destination'
                        if (addedNode.nodeType === 1 && addedNode.nodeName === "TBODY" && addedNode.classList.contains("replicate_destination")) {
                            const replicateId = parseInt(addedNode.getAttribute("data-replicate_id"), 10);

                            // When replicate_id is greater than 1, clear input fields to prevent pre-population
                            if (replicateId > 1) {
                                clearInputFields(addedNode);
                            } else {
                                // If replicate_id is 1, hide the delete button
                                $(addedNode).find("tr.column a.replicate_delete").css("display", "none");
                            }
                        }
                    });
                }
            });
        });

        // Start observing the target node for configured mutations
        if (targetNode) {
            observer.observe(targetNode, observerConfig);
        }
    }

    /**
     * Clears input fields within a given node to prevent pre-population when adding a new guest.
     * @param {Node} node - The DOM node containing fields to be cleared.
     */
    function clearInputFields(node) {
        const selectors = [
            "div[data-export='sys:first']",
            "div[data-export='sys:last']",
            "div[data-export='sys:email']",
            "div[data-export='sys:mobile']",
            "div[data-export='sys:field:preferred_class_year']",
            "div[data-export='sys:preferred']",
            "div[data-export='sys:birthdate']"
        ];

        // Clears text, email, and telephone input fields
        selectors.slice(0, 4).forEach(selector => {
            $(node).find(`${selector} input[type='text'], ${selector} input[type='email'], ${selector} input[type='tel']`).val("");
        });

        // Specifically clears selection dropdowns for birthdate
        $(node).find(`${selectors[6]} select[aria-label='Month'], ${selectors[6]} select[aria-label='Day'], ${selectors[6]} select[aria-label='Year']`).val("");
    }

    // Initialize the prevention of pre-population on guest addition
    preventPrepopOnAddGuest();
});
