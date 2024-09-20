let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning Human");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon human");
    } else {
        speak("Good evening human");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    console.log("Speech result:", event);  // Debug log
    takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);  // Debug log
    speak("Sorry, I couldn't understand that. Please try again.");
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hello sifra") || message.includes("hi") || message.includes("hi shipra")) {
        speak("Hello human, what can I help you with?");
    } else if (message.includes("who are you") || message.includes("what are you")) {
        speak("Hi, I am Shifra, your virtual assistant, created by Namya Sharma. How may I assist you?");
    } else if (message.includes("what can you do for me") || message.includes("what work you can do for me") || message.includes("what do you do")) {
        speak("I can assist you with your queries, opening applications like calculator, WhatsApp, and various websites like Google, YouTube, Facebook.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator");
   window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://web.whatsapp.com/");
    } else if (message.includes("what is time")) {
        let time = new Date().toLocaleString(undefined, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
        speak(`The time is ${time}`);
    } else {
        // Handle search when no exact command is found
        let query = message.replace("sifra", "").replace("shipra", "").trim();
        speak(`This is what I found on the internet regarding ${query}`);
        window.open(`https://www.google.com/search?q=${query}`);
    }
}
