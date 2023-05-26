const encryptionMap = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

async function copyPaste() {
  const copyText = document.querySelector(".result").innerHTML;

  await navigator.clipboard.writeText(copyText);
}

function encrypt() {
  const inputElement = document.querySelector(".inputText");
  const resultElement = document.querySelector(".result");
  const errorMessage = document.querySelector(".errorMessage");
  const inputText = inputElement.value.trim();

  let result = "";
  let text = inputText.toLowerCase();

  if (inputText === "") {
    errorMessage.textContent = "Digite pelo menos uma letra";
    return;
  }
  hiddenDiv();

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (encryptionMap.hasOwnProperty(char)) {
      result += encryptionMap[char];
    } else {
      result += char;
    }
  }

  resultElement.textContent = result;
}

const decryptionMap = {};
for (let key in encryptionMap) {
  const encryptedWord = encryptionMap[key];
  decryptionMap[encryptedWord] = key;
}

function decrypt() {
  const inputElement = document.querySelector(".inputText");
  const resultElement = document.querySelector(".result");
  const errorMessage = document.querySelector(".errorMessage");
  const inputText = inputElement.value.trim();

  if (inputText === "") {
    errorMessage.textContent = "Digite uma palavra encriptada";
    return;
  }
  hiddenDiv();

  let result = "";
  let i = 0;
  while (i < inputText.length) {
    let foundWord = false;
    for (let j = inputText.length; j > i; j--) {
      const substring = inputText.substring(i, j);
      if (decryptionMap.hasOwnProperty(substring)) {
        result += decryptionMap[substring];
        i = j;
        foundWord = true;
        break;
      }
    }
    if (!foundWord) {
      result += inputText[i];
      i++;
    }
  }

  resultElement.textContent = result;
}

function hiddenDiv() {
  let elements = document.getElementsByClassName("non-text");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    element.style.display = "none";
  }
}
