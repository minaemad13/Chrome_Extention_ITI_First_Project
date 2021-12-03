
function addSkip  () {
  //Click the skip button before the video starts 
  const skipButton = document.getElementsByClassName("ytp-ad-skip-button-container")
  if (skipButton) skipButton.click();
  // Click the x button on the banner ad during video playback 
  const closeButton = document.getElementsByClassName("ytp-ad-overlay-close-container")
  if (closeButton) closeButton.click();
}

setInterval(addSkip(), 1000)