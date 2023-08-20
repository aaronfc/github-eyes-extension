/**
 * Reacts with 👀 after confirmation.
 */

const TIMEOUT = 10000;

// React
const react = () => {
  const eyes = document.querySelector('button[data-reaction-content="eyes"]');
  if (eyes) {
    if (eyes.ariaChecked !== 'true') {
      if (confirm("React with 👀 to this PR?")) {
        eyes.click();
      }
    }
  } else {
    console.log('Could not find the reaction button. Make sure your extension is updated!');
  }
};

// Trigger react after some time.
let timeoutId = setTimeout(react, TIMEOUT);

const isMainPrUrl = (url) => url.match(/https:\/\/github.com\/.*\/pull\/\d+$/);

// Handle user navigating out and in of the main PR page.
navigation.addEventListener("navigate", e => {
  console.log(e);
  // If user navigates outside of main PR page, stop the timeout.
  if (!isMainPrUrl(e.destination.url)) {
    clearTimeout(timeoutId);
  }
  // If user navigates back to main PR page, restart the timeout.
  if (isMainPrUrl(e.destination.url)) {
    clearTimeout(timeoutId); // Just in case it's already running.
    timeoutId = setTimeout(react, TIMEOUT);
  }
});
