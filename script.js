// Import arrays from charset.js
import { LOWERCASE, UPPERCASE, NUMBERS, SYMBOLS, EXTENDED_SYMBOLS } from "./charset.js";

let textData = [];

// The JS code for generating random passwords

function clearPasswords() {
    const passwordList = document.querySelector(".passwords");
    const clearBtn = document.getElementById("clearBtn");
    passwordList.innerHTML = "";
    const msg = document.createElement("li");
    msg.textContent = "No passwords saved yet.";
    msg.classList.add("no-passwords");
    passwordList.appendChild(msg);
    localStorage.removeItem("savedPasswords");
    if (localStorage.getItem("savedPasswords") === null) {
        clearBtn.disabled = true;
    }
}

function makePassword() {
    clearPasswords();
    let pool = [];
    let password = [];
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

    // Take random characters from the pool.
    const passwordLength = Number(document.getElementById("length").value);
    console.log(passwordLength);
    for(let i = 0; i < passwordLength; i++) {
        // Append random values from the pool array for each character to be added to the user's generated password.
        password[i] = pool[Math.floor(Math.random() * pool.length)];
    }

    const clearBtn = document.getElementById("clearBtn");
    if(clearBtn.disabled) {
        clearBtn.disabled = false;
    }
    console.log(password);
    return password;
}

function displayPassword(passwordArray) {
    const passwordList = document.querySelector(".passwords");
    const emptyMsg = document.querySelector(".no-passwords");
    if (emptyMsg) {
        emptyMsg.remove();
    }
    const finalPassword = passwordArray.join("");
    const li = document.createElement("li");
    li.textContent = finalPassword;
    passwordList.appendChild(li);

    // Save the password to the local storage:
    let stored = JSON.parse(localStorage.getItem("savedPasswords")) || [];
    stored.push(finalPassword);
    localStorage.setItem("savedPasswords", JSON.stringify(stored));
}

// The validate function determines whether the user's input is valid for computing to generate a password

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

    const length = Number(document.getElementById("length").value);
    if (length < 8 || length > 16) {
        alert("Please enter a password length between 8 and 16.");
        return false;
    }

    if (!useSymbols && !useNumbers && !useUppercase && !useLowercase) {
        alert("Please select at least one character type.");
        return false;
    } else {
        const PasswordCount = Number(document.getElementById("numPasswords").value);

        for(let i = 0; i < PasswordCount; i++) {
            loader.style.display = "block";

            const password = makePassword(); // Get the password from the return value
            textData[i] = password;

            setTimeout(() => {
                loader.style.display = "none";
                displayPassword(password); // Pass it as an argument
            }, 1500);
        }
    }
}

function downloadText() {
    // Take the values from the multiple passwords created and save them as data
    /* Test: */ console.log(textData);
    let textFile = "Passwords\n";
    for(let i = 0; i < textData.length; i++) {
        // Add each password saved in the text data array
        textFile += textData[i] + "\n";
    }
    const blob = new Blob([textFile], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Trigger a click with a temporary <a> element
    const a = document.createElement("a");
    a.href = url;
    a.download = "passwords.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// Add event listener to the button
document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    generateBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission/reload
        validate();
    });

    const stored = JSON.parse(localStorage.getItem("savedPasswords")) || [];
    const passwordList = document.querySelector(".passwords");

    if (stored.length === 0) {
        const msg = document.createElement("li");
        msg.textContent = "No passwords saved yet.";
        msg.classList.add("no-passwords");
        passwordList.appendChild(msg);
    } else {
        stored.forEach(pwd => {
            const li = document.createElement("li");
            li.textContent = pwd;
            passwordList.appendChild(li);
        });
    }

    const clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        clearPasswords();
    });

    const exportBtn = document.getElementById("export");
    exportBtn.addEventListener("click", (e) => {
        e.preventDefault();
        downloadText();
    })
});
