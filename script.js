// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const letterWindow = document.querySelector(".letter-window");

// Message windows
const messageWindow1 = document.getElementById("message-window"); // Window 1
const extraMessageWindows = document.querySelectorAll(".message-window"); // Windows 2..N
const valentineWindow = document.getElementById("valentine-window");

// Next buttons
const nextBtn1 = document.getElementById("next-btn"); // the very first next button (has unique id)

// Valentine elements
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// -------------------------
// Window navigation logic
// -------------------------
let step = 0; 
// step 0 = messageWindow1
// step 1..extraMessageWindows.length = extraMessageWindows[step-1]
// step > extraMessageWindows.length = valentineWindow

function showStep() {
  // Hide all
  messageWindow1.style.display = "none";
  extraMessageWindows.forEach(w => (w.style.display = "none"));
  valentineWindow.style.display = "none";

  // Show correct one
  if (step === 0) {
    messageWindow1.style.display = "block";
  } else if (step >= 1 && step <= extraMessageWindows.length) {
    extraMessageWindows[step - 1].style.display = "block";
  } else {
    valentineWindow.style.display = "block";
  }
}

// Click Envelope -> open letter + start at first window
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  step = 0;
  showStep();

  setTimeout(() => {
    letterWindow.classList.add("open");
  }, 50);
});

// First NEXT -> go to next step
if (nextBtn1) {
  nextBtn1.addEventListener("click", () => {
    step++;
    showStep();
  });
}

// All OTHER NEXT buttons -> go to next step (event delegation)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("next-btn") && e.target !== nextBtn1) {
    step++;
    showStep();
  }
});

// -------------------------
// NO button dodging logic
// -------------------------
if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    const distance = 200; // fixed distance (you can change this)

    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// -------------------------
// YES grows when NO clicked
// -------------------------
let yesScale = 1;

if (yesBtn) {
  yesBtn.style.position = "relative";
  yesBtn.style.transformOrigin = "center center";
  yesBtn.style.transition = "transform 0.3s ease";
}

if (noBtn && yesBtn) {
  noBtn.addEventListener("click", () => {
    yesScale += 2;

    if (yesBtn.style.position !== "fixed") {
      yesBtn.style.position = "fixed";
      yesBtn.style.top = "50%";
      yesBtn.style.left = "50%";
    }

    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
  });
}

// -------------------------
// YES is clicked (final screen)
// -------------------------
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";

    letterWindow.classList.add("final");

    buttons.style.display = "none";
    finalText.style.display = "block";
  });
}
