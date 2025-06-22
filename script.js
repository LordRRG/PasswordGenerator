// The JS code for generating random passwords

function makePassword() {
    // Based on user preferences, create a pool of characters from which characters can be pulled.
}

function validate() {
    const useSymbols = document.getElementById("symbols").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useUppercase = document.getElementById("capital").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    if (!useSymbols && !useNumbers && !useUppercase && !useLowercase) {
        alert("Please select at least one character type (symbol, number, uppercase, or lowercase) to generate a password.");
        console.log(useSymbols, useNumbers, useUppercase, useLowercase);
        return false; // ❌ Exit the function early
    } else {
        makePassword();
    }
}