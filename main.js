// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const button = document.querySelector('#meapertouaqui');
const textInput = document.querySelector('#text-input');
const body = document.querySelector('body');

// Init voices array
let voices = [];

const lang = 'pt-BR'
const voiceIndex = 1

const getVoices = () => {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices()
    if (voices.length) {
      resolve(voices)
      return
    }
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices)
    }
  })
}

const chooseVoice = async () => {
  const voices = (await getVoices()).filter((voice) => voice.lang == lang)

  return new Promise((resolve) => {
    resolve(voices[voiceIndex])
  })
}

const speak = async () => {
  if (!speechSynthesis) { return }
  const speakText = new SpeechSynthesisUtterance(textInput.textContent)
  speakText.voice = await chooseVoice()
  speakText.rate = 0.9
  speakText.pitch = 1
  synth.speak(speakText)
}


// EVENT LISTENERS

// Text form submit
button.addEventListener('click', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});


