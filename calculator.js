// Function to add a character to the input value
function addChar(input, character) {
    // If the input is null or "0", replace it with the new character
    if (input.value == null || input.value == "0") {
        input.value = character;
    } 
    // Otherwise, append the character to the existing input value
    else {
        input.value += character;
    }
}

// Function to calculate the cosine of the input value
function cos(form) {
    form.display.value = Math.cos(form.display.value);
}

// Function to calculate the sine of the input value
function sin(form) {
    form.display.value = Math.sin(form.display.value);
}

// Function to calculate the tangent of the input value
function tan(form) {
    form.display.value = Math.tan(form.display.value);
}

// Function to calculate the square root of the input value
function sqrt(form) {
    form.display.value = Math.sqrt(form.display.value);
}

// Function to calculate the natural logarithm (ln) of the input value
function ln(form) {
    form.display.value = Math.log(form.display.value);
}

// Function to calculate the exponential (e^x) of the input value
function exp(form) {
    form.display.value = Math.exp(form.display.value);
}

// Function to delete the last character in the input value
function deleteChar(input) {
    input.value = input.value.substring(0, input.value.length - 1);
}

// Variable to store the value for percentage calculations
var val = 0.0;

// Function to append a percentage symbol to the input value
function percent(input) {
    val = input.value; // Store the current value
    input.value = input.value + "%"; // Add a "%" symbol
}

// Function to change the sign of the input value
function changeSign(input) {
    // If the first character is a "-", remove it
    if (input.value.substring(0, 1) == "-") {
        input.value = input.value.substring(1, input.value.length);
    } 
    // Otherwise, prepend a "-" to the value
    else {
        input.value = "-" + input.value;
    }
}

// Function to evaluate the mathematical expression in the input value
function compute(form) {
    form.display.value = eval(form.display.value); // Use eval to compute the result
}

// Function to calculate the square of the input value
function square(form) {
    form.display.value = eval(form.display.value) * eval(form.display.value);
}

// Function to validate if the input string is a valid mathematical expression
function checkNum(str) {
    for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i); // Get each character
        // Check if the character is not a valid number or operator
        if (ch < "0" || ch > "9") {
            if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "."
                && ch != "(" && ch != ")" && ch != "%") {
                alert("Invalid entry!"); // Alert the user if an invalid character is found
                return false; // Return false for invalid input
            }
        }
    }
    return true; // Return true if all characters are valid
}