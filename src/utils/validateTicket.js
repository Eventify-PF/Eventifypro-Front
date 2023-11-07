const regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const validateTicket = (input) => {
let errors = {};
if(!input.name) errors.name = "You must name the ticket";
if(!input.price) errors.price = "You must enter a price";
if(isNaN(input.price) || input.price < 0) errors.price = "You must enter a valid price";
if(!input.stock) errors.stock = "You must define a stock";
if(isNaN(input.stock) || input.stock < 0) errors.stock = "You must enter a valid stock";
input.image && !regexURL.test(input.image) && (errors.image = "Invalid URL");
if(!input.state) errors.state = "You must define a status";
if(!input.event) errors.event = "You must select an event";

return errors;
}

export default validateTicket;