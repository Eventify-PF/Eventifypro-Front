const regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const regexDATE = /^\d{4}-\d{2}-\d{2}$/;

export default function validateForm(inputs) {
  let errors = {};
  if (!inputs.title) errors.title = "A title must be entered";
  if (!inputs.location) errors.location = "A location must be entered";
  if (!inputs.date) errors.date = "A date must be entered";
  else if (!regexDATE.test(inputs.date)) "Invalid Date";
  if (!inputs.description) errors.description = "A description must be entered";
  if (!inputs.image) errors.image = "An image must be entered";
  else if (!regexURL.test(inputs.image)) errors.image = "Invalid URL";
  if (!inputs.eventType) errors.eventType = "You must select an event type";
  return errors;
}
