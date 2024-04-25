$(document).ready(function() {
    var ids = [
			
			//double quotes and then comma(do not end with a comma): "",""
        "90e4952d-e02b-4739-bcb9-cb5c89b59628", //housing
			"b6e4f87f-f5f5-48e0-8649-278eacc5b5ed", //golf
			"4c8b6732-a0c9-4f02-baa5-32360b189bae", //rocks
			"2faf525c-6ae0-48fb-9ce3-88bb3b3512cf", //clark
			"2fcd57d1-ef60-43e9-b9f3-650a87a4f907" //chapin
    ];

    ids.forEach(function(id) {
        var selector = 'input[data-event="' + id + '"]';
        $(selector).closest('.form_response').find('.form_related_date').hide();
    });
});
