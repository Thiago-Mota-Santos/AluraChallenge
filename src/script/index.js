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

  const messageCopy = document.querySelector(".with-text");
  const originalContent = messageCopy.innerHTML;

  messageCopy.innerHTML = `
   <div class="msg-copy fade-in">
   <h3> Copiado para a área de transferência </h3>
   <div>
  `;

  setTimeout(() => {
    messageCopy.innerHTML = originalContent;
  }, 1000);
}

function encrypt() {
  const inputElement = document.querySelector(".inputText");
  const resultElement = document.querySelector(".result");
  const errorMessage = document.querySelector(".errorMessage");
  const inputText = inputElement.value.trim();

  let result = "";
  let text = inputText.toLowerCase();

  if (inputText === "") {
    errorMessage.textContent = "Digite uma palavra para criptografar";

    return;
  }

  errorMessage.textContent = "";

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

  errorMessage.textContent = "";

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
  const nonText = document.querySelector(".non-text");
  const withText = document.querySelector(".with-text");

  nonText.style.display = "none";
  withText.style.display = "flex";
}
