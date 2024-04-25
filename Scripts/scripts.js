async function getWebServiceResults() {
    const url = "https://connect.williams.edu/manage/query/run?id=bd96ac3b-6a6c-4417-b045-cb0462542f9d&cmd=service&output=json&h=201c0fb5-d93b-445f-ad0d-ae112ffc296e";
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json()
    } catch (error) {
        console.error("Fetching web service data failed:", error)
    }
}
async function checkIfGuidExistsAndRunScripts() {
    const webServiceData = await getWebServiceResults();
    if (!webServiceData) {
        console.log("No web service data available.");
        return
    }
    const inputElement = document.getElementsByName("id")[0];
    if (!inputElement) {
        console.log('No input element named "id" found.');
        return
    }
    const guidValue = inputElement.value
      , matchingRow = webServiceData.row.find(row=>row.Fguid === guidValue);
    if (matchingRow) {
        console.log("exists:", guidValue);
        for (const [key,value] of Object.entries(matchingRow))
            key === "addBgImage" && value.startsWith("http") ? CustomFormScripts.addBgImage(value) : value === "Yes" && typeof CustomFormScripts[key] == "function" && CustomFormScripts[key]()
    } else
        console.log("does not exist:", guidValue)
}
const CustomFormScripts = {
    hideMapAndLocation() {
        $("#register_map").remove();
        $("#map").remove();
        $("#register_location").remove()
    },



    addRedAsteriskToEnd() {
       

        $(document).ready(function() {
            $('.form_question[data-required="1"]').each(function() {
                // Check if the asterisk has already been added
                if (!$(this).find('.form_label').hasClass('asterisk-added')) {
                    $(this).find('.form_label').append('<span style="color:red">*</span>').addClass('asterisk-added');
                }
            });
        });

    },




    addRedAsteriskToEndu() {
        $(".form_question[data-required='1']").each(function() {
            $(this).find(".form_label").append('<span style="color:red">*<\/span>')
        })
    },
    loadExternalStyles() {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "/forms/styles.css";
        document.head.appendChild(link)
    },
    replaceRedirect(newUrl) {
        $("#form_response_banner a").attr("href", newUrl)
    },


    preventPrepopOnAddGuest(){


    $(document).ready(function() {
        var hashTable = {}; // Object to track which replicate IDs have been processed
        let maxReplicationId = 2; // Initialize with the maximum replication ID encountered so far

        // Immediately hide the delete button for the first replicate block
        $("tbody.replicate_destination[data-replicate_id='1']")
            .find("tr.column a.replicate_delete").css('display', 'none');

        // Bind a change event on the document body to handle dynamic content
        $(document.body).on('change', function() {
            // Iterate over all tbody elements with a data-replicate_id attribute
            $("tbody[data-replicate_id]").each(function() {
                const replicateId = parseInt($(this).data("replicate_id"), 10);

                // If this replicate ID is not in the hashTable, add it
                if (!hashTable.hasOwnProperty(replicateId)) {
                    hashTable[replicateId] = true;
                }

                // Process only if this is the maximum replication ID known and hasn't been processed yet
                if (replicateId == maxReplicationId && hashTable[replicateId]) {
                    // Clear input fields within this block
                    $(this).find("div[data-export='sys:first'], div[data-export='sys:last'], div[data-export='sys:email'], div[data-export='sys:mobile'], div[data-export='sys:field:preferred_class_year'], div[data-export='sys:preferred']")
                        .find("input[type='text'], input[type='email']").val("");
                    $(this).find("div[data-export='sys:birthdate']")
                        .find("select[aria-label='Month'], select[aria-label='Day'], select[aria-label='Year']").val("");

                    // Mark this replicate ID as processed
                    hashTable[replicateId] = false;
                }
            });

            // Update maxReplicationId with the highest replicate ID encountered
            $("tbody[data-replicate_id]").each(function() {
                let replicationId = parseInt($(this).data("replicate_id"));
                if (replicationId > maxReplicationId) {
                    maxReplicationId = replicationId;
                }
            });
        });
    });
},



    preventPrepopOnAddGuestu() {
        const observer = new MutationObserver(mutations=>{
            for (const mutation of mutations)
                if (mutation.type === "childList")
                    for (const addedNode of mutation.addedNodes)
                        if (addedNode.nodeType === 1 && addedNode.nodeName === "TBODY" && addedNode.classList.contains("replicate_destination")) {
                            const replicateId = parseInt(addedNode.getAttribute("data-replicate_id"), 10);
                            replicateId > 1 ? ($(addedNode).find("div[data-export='sys:first']").find("input[type='text'],input[type='email']").val(""),
                            $(addedNode).find("div[data-export='sys:last']").find("input[type='text'],input[type='email']").val(""),
                            $(addedNode).find("div[data-export='sys:email']").find("input[type='text'],input[type='email']").val(""),
                            $(addedNode).find("div[data-export='sys:mobile']").find("input[type='tel']").val(""),
                            $(addedNode).find("div[data-export='sys:field:preferred_class_year']").find("input[type='text'],input[type='email']").val(""),
                            $(addedNode).find("div[data-export='sys:preferred']").find("input[type='text'],input[type='email']").val(""),
                            $(addedNode).find("div[data-export='sys:birthdate']").find("select[aria-label='Month'],select[aria-label='Day'],select[aria-label='Year']").val("")) : $(addedNode).find("tr.column a.replicate_delete").css("display", "none")
                        }
        }
        )
          , targetNode = document.getElementById("replicate_table_form_page_2");
        targetNode && observer.observe(targetNode, {
            childList: !0,
            subtree: !0
        })
    },
    addBgImage: function(url) {
        const pageElement = document.getElementById("c_page");
        pageElement.style.backgroundImage = `url('${url}')`;
        pageElement.style.backgroundSize = "cover";
        pageElement.style.backgroundPosition = "center";
        pageElement.style.backgroundRepeat = "no-repeat";
        console.log("Background image added to #c_page")
    }
};


document.addEventListener("DOMContentLoaded", function() {
    checkIfGuidExistsAndRunScripts()
});
