var EATING_SOUND = new buzz.sound([
  "./sounds/eating.mp3"
]);

function isAvailableSound() {
  return true;
}

function playEatingSound() {
  if (isAvailableSound()) {
    EATING_SOUND.setSpeed(2);
    EATING_SOUND.play();
  }
}
