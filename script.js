// Import arrays from charset.js
import { LOWERCASE, UPPERCASE, NUMBERS, SYMBOLS, EXTENDED_SYMBOLS } from "./charset.js";

// The JS code for generating random passwords

let pool = [];

function makePassword() {
    // Based on user preferences, create a pool of characters from which characters can be pulled.

    const useLowercase = document.getElementById("lowercase").checked;
    if(useLowercase) {
        // Push each item from the lowercase array
        for (let i = 0; i < LOWERCASE.length; i++) {
            pool.push(LOWERCASE[i]);
        }
    }

    const useUppercase = document.getElementById("capital").checked;
    if(useUppercase) {
        // Push each item from the uppercase array
        for (let i = 0; i < UPPERCASE.length; i++) {
            pool.push(UPPERCASE[i]);
        }
    }

    const useNumbers = document.getElementById("numbers").checked;
    if(useNumbers) {
        // Push each item from the numbers array
        for (let i = 0; i < NUMBERS.length; i++) {
            pool.push(NUMBERS[i]);
        }
    }

    const useSymbols = document.getElementById("symbols").checked;
    if(useSymbols) {
        // Push each item from the lowercase array
        for (let i = 0; i < SYMBOLS.length; i++) {
            pool.push(SYMBOLS[i]);
        }
    }
    console.log(pool);
}

function validate() {
    const useSymbols = document.getElementById("symbols").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useUppercase = document.getElementById("capital").checked;
    const useLowercase = document.getElementById("lowercase").checked;

    console.log("User Selections =>", {
        useSymbols,
        useNumbers,
        useUppercase,
        useLowercase
    });

    if (!useSymbols && !useNumbers && !useUppercase && !useLowercase) {
        alert("Please select at least one character type.");
        return false;
    } else {
        makePassword();
        console.log("The user has entered valid values!");
    }
}

// ✅ Add event listener to the button
document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.querySelector("button");
    generateBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission/reload
        validate();
    });
});