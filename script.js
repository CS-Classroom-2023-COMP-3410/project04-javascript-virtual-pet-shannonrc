// basic set up
// mood
let mood = localStorage.getItem("mood") || "happy"; 
// health
let health = localStorage.getItem("health") || "good";


// get elements
// pet div
const pet = document.getElementById("pet"); 
 // status p
const statusText = document.getElementById("status");
// feed button
const feedBtn = document.getElementById("feed-btn"); 
// play button
const playBtn = document.getElementById("play-btn"); 
// sleep button
const sleepBtn = document.getElementById("sleep-btn"); 

// save
function saveState() {
    // save mood
  localStorage.setItem("mood", mood); 
   // save health
  localStorage.setItem("health", health);
} // end save

// clear all pet classes
function clearPetClasses() {
     // reset classes
  pet.className = "";
} // end clear

// update everything on screen
function updateDisplay() {
    // show status
  statusText.textContent = "mood: " + mood + " | health: " + health; 
    // clear styles first
  clearPetClasses(); 
    // happy wording
  if (mood === "happy") { 
    // happy face so cutie ^_^
    pet.textContent = "^_^"; 
     // happy color
    pet.classList.add("happy");
  } // end happy
  // hungry look
  if (mood === "hungry") { 
    // hungry face lol
    pet.textContent = "._."; 
    // hungry color
    pet.classList.add("hungry"); 
  } // end hungry
// sleepy look
  if (mood === "sleepy") { 
    // sleepy face (me lol)
    pet.textContent = "-_-"; 
    // sleepy color
    pet.classList.add("sleepy"); 
  } // end sleepy
  // save after display update
  saveState(); 
} // end update

// show a quick reaction then go back to normal
function doQuickReaction(tempFace, tempClass) {
    // clear old class
  clearPetClasses(); 
   // set temporary face
  pet.textContent = tempFace;
   // set temporary color
  pet.classList.add(tempClass);

  setTimeout(function() {
    // return to normal mood look
    updateDisplay();
    // time for the face display 
  }, 600); 
} // end quick reaction

// feed action
function feedPet() {
    // set mood
  mood = "happy"; 
  // improve health
  health = "good"; 
  // save now
  saveState(); 
  // feed reaction look so cutie
  doQuickReaction(":3", "fed"); 
} // end feed

// play action
function playPet() {
    // set mood
  mood = "happy"; 
  // save now
  saveState(); 
  // play reaction look
  doQuickReaction(">_<", "played"); 
} // end play

// sleep action
function sleepPet() {
    // set mood
  mood = "sleepy"; 
  // save 
  saveState(); 
  // show sleepy immediately
  updateDisplay(); 
} // end sleep

// the clicks yay pls work
// connect feed click
feedBtn.onclick = feedPet; 
// connect play click
playBtn.onclick = playPet; 
 // connect sleep click
sleepBtn.onclick = sleepPet;

// time decay (gets worse over time if not given attention)
setInterval(function() {
    // becomes hungry
  mood = "hungry"; 
  // health drops
  health = "bad"; 
  // update screen
  updateDisplay(); 
  // every 15 seconds
}, 15000); 

updateDisplay(); 
