$(document).ready(function() {
    $('.form_question[data-required="1"]').each(function() {
        // Check if the asterisk has already been added
        if (!$(this).find('.form_label').hasClass('asterisk-added')) {
            $(this).find('.form_label').append('<span style="color:red">*</span>').addClass('asterisk-added');
        }
    });
});
