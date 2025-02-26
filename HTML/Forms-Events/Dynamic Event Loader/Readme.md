# Event Form Loader

This HTML page dynamically loads an event registration form based on the user's selection.

## Features
- Provides a dropdown menu to select an event.
- Dynamically loads an event registration form when an event is selected.
- Prevents multiple script injections by removing the previously loaded script.
- Displays a loading message while fetching the form.

## Liquid Markup for Event Selection

The dropdown list of events is generated using **Liquid markup**, which pulls data from a **query in the portal**. This query is based on the `Forms` dataset and applies the following filters:

1. **Folder Status**: Only forms with a status of `"Confirmed"` are included.
2. **End Date**: The form must have an end date **greater than or equal to today**.
3. **Additional Filters**: You may refine or broaden the results by applying more filters.

### Example Liquid Markup:

```liquid
<select id="eventSelector">
  <option value="">Select an Event</option>
  {% for event in events %}
    <option value="{{ event.form_guid }}">{{ event.form_title }}</option>
  {% endfor %}
</select>
