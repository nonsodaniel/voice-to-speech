var message = document.querySelector("#note");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const synth = window.speechSynthesis;
var grammar = "#JSGF V1.0;";
var final = "";
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = true;
recognition.onresult = function (event) {
  const transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  message.value = transcript;
};

recognition.onerror = function (event) {
  message.textContent = "Error occurred in recognition: " + event.error;
};

recognition.addEventListener("soundstart", function () {
  console.log("Some sound is being received");
});
recognition.addEventListener("speechend", function () {
  recognition.start();
});
recognition.onend = function () {
  console.info("voice recognition ended, restarting...");
  recognition.start();
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
  message.value = "";
};

document.querySelector("#micStart").addEventListener("click", () => {
  recognition.start();
});
document.querySelector("#micStop").addEventListener("click", function () {
  recognition.stop();
});
document.querySelector("#copyTxt").addEventListener("click", function () {
  copyPaseText();
});
document.querySelector("#clearNote").addEventListener("click", function () {
  clearNote();
});
