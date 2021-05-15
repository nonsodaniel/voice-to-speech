var message = document.querySelector("#note");
var micStart = document.querySelector("#micStart");
var copy__Text = document.querySelector("#copyTxt");
var clear__Note = document.querySelector("#clearNote");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = "#JSGF V1.0;";
var recognition = new SpeechRecognition();
var speechGrammarList = new SpeechGrammarList();

speechGrammarList.addFromString(grammar, 1);
recognition.grammars = speechGrammarList;
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = true;


recognition.onresult = function (event) {
  var transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  message.textContent = transcript;
};
recognition.onerror = function (event) {
  message.textContent = "Error occurred in recognition: " + event.error;
  recognizing = false;
};

const copyPaseText = () => {
  var copyText = document.querySelector("#note").value;
  navigator.clipboard.writeText(copyText).then(
    function () {
      alert(" Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
};
const clearNote = () => {
  window.location.reload();
};

micStart.addEventListener("click", () => {
  recognition.start();
});
copy__Text.addEventListener("click", function () {
  copyPaseText();
});
clear__Note.addEventListener("click", function () {
  clearNote();
});
