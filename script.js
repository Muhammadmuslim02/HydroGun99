const scenes = document.querySelectorAll('.scene');
const texts = [
  "Hidrojen ateşle buluşunca ne olur?",
  "Güç yakıtı hazır.",
  "Kıvılcım karışımı ateşledi!",
  "Patlama!",
  "Su buharı yükseliyor. İki H iki artı O iki su ve enerji oluşturur.",
  "İşte hidrojen patlamasının bilimi."
];

let index = 0;

function showScene(i) {
  scenes.forEach(s => s.classList.remove('show'));
  if (scenes[i]) scenes[i].classList.add('show');
  speakText(texts[i]);
}

async function speakText(text) {
  if ('speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'tr-TR';
    utter.pitch = 1;
    utter.rate = 0.95;
    utter.volume = 1;
    if (voices.length > 0) {
      utter.voice = voices.find(v => v.lang === 'tr-TR') || voices[0];
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function nextScene() {
  showScene(index);
  index++;
  if (index < scenes.length) {
    setTimeout(nextScene, 7000);
  }
}

window.addEventListener('load', () => {
  document.getElementById('bg-music').play().catch(e =>
    console.log("Ses otomatik oynatılamadı: ", e)
  );
  setTimeout(nextScene, 2000);
});
