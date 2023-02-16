const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// Disable/enable button
// Toggles between true or false
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing  joke to voiceRSS API
const triggerTextToSpeech = (joke) => {
  VoiceRSS.speech({
    key: "05652e1295764cb3ae5be8959712fdac",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get jokes from API
const tellJokes = async () => {
  let jokes = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    // if the joke is a two-part joke
    if (data.setup) {
      jokes = `${data.setup} ...  ${data.delivery}`;
    } else {
      jokes = data.joke;
    }
    // send joke to text-to-speech
    triggerTextToSpeech(jokes);

    // disable button while the joke is being told
    toggleButton();
  } catch (error) {
    alert("Error: ", error);
  }
};

// Event listners
button.addEventListener("click", tellJokes);

// Enable the button when the joke has ended
audioElement.addEventListener("ended", toggleButton);
