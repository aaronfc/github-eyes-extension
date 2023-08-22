/**
 * Reacts with 👀 after confirmation.
 */

const TIMEOUT = 10000;

let timeoutId = null;

// React
const promptForReaction = () => {
  const eyesButton = document.querySelector('button[data-reaction-content="eyes"]');
  if (eyesButton) {
    if (eyesButton.ariaChecked !== 'true') {
      if (confirm("React with 👀 to this PR?")) {
        eyesButton.click();
      }
    }
  } else {
    console.log('Could not find the reaction button. Make sure your extension is updated!');
  }
};

const isMainPrUrl = (url) => url.match(/https:\/\/github.com\/.*\/pull\/\d+[^/]*$/);

// Start reaction countdown process.
const start = () => {
  const user_login = document.querySelector('meta[name="user-login"]')?.content;
  const author_login = document.querySelector('meta[property="og:author:username"]')?.content;

  if (user_login === author_login) {
    // Don't react to your own PRs.
    return;
  }

  clearTimeout(timeoutId); // Just in case it's already running.
  timeoutId = setTimeout(promptForReaction, TIMEOUT);
}

// Stop reaction countdown process.
const stop = () => {
  clearTimeout(timeoutId);
}

// Handle user navigating out and in of the main PR page.
navigation.addEventListener("navigate", e => {
  // If user navigates back to main PR page, restart the timeout.
  if (isMainPrUrl(e.destination.url)) {
    start();
  }
  // If user navigates outside of main PR page, stop the timeout.
  if (!isMainPrUrl(e.destination.url)) {
    stop();
  }
});

// Start process if already on main PR page.
if (isMainPrUrl(window.location.href)) {
  start();
}
