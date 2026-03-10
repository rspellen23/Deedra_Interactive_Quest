const PORTFOLIO_URL = "https://new.express.adobe.com/webpage/x9sDwoekJyT6A";
const PORTFOLIO_ANCHORS = {
  digitalWelcome: "aa2465de-e013-4c4d-b4b3-fe350175dd21",
  immersive360: "9a4cf7b9-c683-4615-85b7-ab6cb7d30f76",
  immersiveVideo: "ba00af02-f6d5-49aa-b685-e598641c48a0",
  visualCampaign: "302ad0ad-c910-4e7f-bc64-7b5dc43bbf4d",
  personalBranding: "26f36e7f-1ae2-48f2-8432-0d665fa9312f"
};

const pillars = [
  {
    id: "brand-strategy",
    token: "Strategy Token",
    title: "Brand & Campaign Strategy",
    timeline: "PepsiCo | Arkema ArrMaz | True",
    summary:
      "Led and supported campaign strategy across internal marketing, role-transition environments, and manager-level planning.",
    roles: [
      "PepsiCo (2012-2019): collaborated on campaign concepting, trend research, and brand consistency support.",
      "Arkema ArrMaz (2019-2022): transitioned from marketing support into executive-level operational communications during COVID disruptions.",
      "True (2023-2024): owned execution priorities as Marketing Manager, balancing delivery speed with strategic alignment."
    ],
    impact: [
      "Built cross-functional campaign discipline and consistency across multiple organizational contexts.",
      "Demonstrated adaptability under pressure while maintaining communication quality.",
      "Translated strategy into execution plans tied to business outcomes and stakeholder needs."
    ],
    fit: [
      "Supports integrated campaign planning across print/digital-style channels and formats.",
      "Strong cross-team coordination for campaign execution with stakeholders under deadline pressure.",
      "Transferable execution discipline for proposal development, launch readiness, and follow-through."
    ],
    proof: {
      label: "Open Strategy Portfolio Proof",
      hint: "Suggested review focus: campaign planning, cross-functional execution, and delivery alignment.",
      url: `${PORTFOLIO_URL}#${PORTFOLIO_ANCHORS.visualCampaign}`
    },
    decision: {
      prompt: "If this campaign had a tight deadline, what should be prioritized first?",
      options: ["Execution speed with aligned messaging", "More channels before alignment"],
      recommendedIndex: 0,
      deedraApproach: "Execution speed with alignment.",
      outcome:
        "Deedra has repeatedly balanced speed and consistency, which reduces rework and strengthens stakeholder confidence."
    }
  },
  {
    id: "pr-communications",
    token: "Comms Token",
    title: "PR & Communications",
    timeline: "MIDFLORIDA Credit Union | Arkema ArrMaz",
    summary:
      "Built public-facing and internal communications that align brand narrative, organizational priorities, and audience engagement.",
    roles: [
      "MIDFLORIDA (2024-Present): develops media-ready messaging, PR strategy narratives, and audience-facing communication assets.",
      "Arkema ArrMaz (2019-2022): supported internal/external executive communication and coordination across leadership channels."
    ],
    impact: [
      "Improved message clarity between leadership goals and public-facing communication.",
      "Strengthened consistency in voice across presentations, outreach, and communications collateral.",
      "Supported trust-building communication through high-accountability operational periods."
    ],
    fit: [
      "Directly relevant to clear client/stakeholder communication and expectation management.",
      "Strengthens message consistency across external marketing touchpoints and internal teams.",
      "Supports retention-oriented communication through consistent, relationship-focused updates."
    ],
    proof: {
      label: "Open PR Portfolio Proof",
      hint: "Suggested review focus: messaging clarity, audience communication, and stakeholder narrative consistency.",
      url: `${PORTFOLIO_URL}#${PORTFOLIO_ANCHORS.digitalWelcome}`
    },
    decision: {
      prompt: "For relationship-driven media clients, which communication pattern works best?",
      options: ["Consistent updates with clear context", "Ad hoc updates only when asked"],
      recommendedIndex: 0,
      deedraApproach: "Consistent updates with clear context.",
      outcome:
        "Her communication style supports stronger alignment, fewer surprises, and better long-term stakeholder trust."
    }
  },
  {
    id: "content-storytelling",
    token: "Story Token",
    title: "Content & Storytelling",
    timeline: "A Gypsy Life Productions | GA Copywriting | 2015 Book",
    summary:
      "Developed storytelling capabilities across production, copywriting, and long-form publishing to drive audience connection.",
    roles: [
      "A Gypsy Life Productions (2006-2010): supported scripts, storyboards, and creative execution workflows.",
      "GA Copywriting (2010-2012): wrote campaign and promotional copy under deadline with brief alignment.",
      "Published Author (2015): completed and released a book, demonstrating sustained narrative discipline and content ownership."
    ],
    impact: [
      "Built a strong foundation in structured messaging for different audiences and contexts.",
      "Proved long-form communication endurance and editorial process management.",
      "Consistently translated ideas into clear, audience-relevant stories."
    ],
    fit: [
      "Supports audience-first messaging used in multi-platform campaign recommendations.",
      "Improves proposal and presentation quality through concise, persuasive narrative framing.",
      "Brings editorial rigor to campaign copy, content structure, and communication clarity."
    ],
    proof: {
      label: "Open Storytelling Portfolio Proof",
      hint: "Suggested review focus: narrative framing, copy clarity, and long-form communication range.",
      url: `${PORTFOLIO_URL}#${PORTFOLIO_ANCHORS.personalBranding}`
    },
    decision: {
      prompt: "When presenting campaign concepts, what increases decision-maker buy-in?",
      options: ["Clear narrative framing + business context", "Feature-heavy details with minimal framing"],
      recommendedIndex: 0,
      deedraApproach: "Clear narrative framing + business context.",
      outcome:
        "Her storytelling background makes campaign recommendations easier to understand, evaluate, and approve."
    }
  },
  {
    id: "innovation-experience",
    token: "Innovation Token",
    title: "Innovation & Experience Design",
    timeline: "MIDFLORIDA Credit Union | IFF Citrus Innovation Center",
    summary:
      "Connects innovation-heavy environments with accessible audience messaging through immersive and strategic campaign touchpoints.",
    roles: [
      "MIDFLORIDA (2024-Present): creates immersive experiences and marketing narratives, including Igloo-supported engagement assets.",
      "IFF Citrus Innovation Center (Marketing Lead): translates technical innovation and product context into market-facing stories."
    ],
    impact: [
      "Improved accessibility of complex concepts for non-technical audiences.",
      "Combined strategic communication and experience design to strengthen engagement quality.",
      "Positioned innovation storytelling as a practical growth and brand lever."
    ],
    fit: [
      "Useful for positioning complex advertising and marketing solutions in clear business language.",
      "Supports value-based consultative conversations with decision-makers and partners.",
      "Adds differentiated experience design thinking to campaign strategy and client-facing recommendations."
    ],
    proof: {
      label: "Open Innovation Portfolio Proof",
      hint: "Suggested review focus: immersive engagement, innovation translation, and audience value positioning.",
      url: `${PORTFOLIO_URL}#${PORTFOLIO_ANCHORS.immersive360}`
    },
    decision: {
      prompt: "For innovation-focused campaigns, what drives stronger audience response?",
      options: ["Translate complexity into practical value", "Lead with technical depth only"],
      recommendedIndex: 0,
      deedraApproach: "Translate complexity into practical value.",
      outcome:
        "Deedra's innovation storytelling helps audiences quickly understand relevance, utility, and business impact."
    }
  }
];

const pillarMap = document.getElementById("pillarMap");
const detailPanel = document.getElementById("detailPanel");
const mapStatus = document.getElementById("mapStatus");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const tokenTray = document.getElementById("tokenTray");
const unlockText = document.getElementById("unlockText");
const journeyRail = document.getElementById("journeyRail");
const finalCta = document.getElementById("finalCta");
const startGuided = document.getElementById("startGuided");
const stopGuided = document.getElementById("stopGuided");
const guidedStatus = document.getElementById("guidedStatus");
const toggleQuickMode = document.getElementById("toggleQuickMode");
const fitScoreText = document.getElementById("fitScoreText");
const fitBar = document.getElementById("fitBar");

const state = {
  activeIndex: 0,
  completed: new Set(),
  tokens: new Set(),
  decisions: {},
  guidedActive: false,
  guidedTimer: null,
  guidedStepper: null,
  guidedSecondsLeft: 0,
  quickMode: false,
  unlockedIndex: 0,
  displayedFitScore: 0
};

function isLocked(index) {
  return index > state.unlockedIndex && !state.completed.has(index);
}

function computeFitScore() {
  const completionScore = (state.completed.size / pillars.length) * 70;

  let decisionScore = 0;
  pillars.forEach((pillar, index) => {
    const choice = state.decisions[pillar.id];
    if (choice !== undefined) {
      decisionScore += 3;
      if (choice === pillar.decision.recommendedIndex && state.completed.has(index)) {
        decisionScore += 4.5;
      }
    }
  });

  return Math.round(Math.min(100, completionScore + decisionScore));
}

function animateFitScore(target) {
  const start = state.displayedFitScore;
  const diff = target - start;
  const steps = 18;
  let tick = 0;

  const interval = setInterval(() => {
    tick += 1;
    const value = Math.round(start + (diff * tick) / steps);
    state.displayedFitScore = value;
    fitScoreText.textContent = `Role Fit Score: ${value} / 100`;
    fitBar.style.width = `${value}%`;
    fitBar.parentElement.setAttribute("aria-valuenow", String(value));

    if (tick >= steps) {
      clearInterval(interval);
      state.displayedFitScore = target;
      fitScoreText.textContent = `Role Fit Score: ${target} / 100`;
      fitBar.style.width = `${target}%`;
      fitBar.parentElement.setAttribute("aria-valuenow", String(target));
    }
  }, 16);
}

function renderJourneyRail() {
  journeyRail.innerHTML = pillars
    .map((pillar, index) => {
      const status = state.completed.has(index)
        ? "cleared"
        : isLocked(index)
          ? "locked"
          : index === state.activeIndex
            ? "active"
            : "available";
      const label = status === "cleared" ? "Cleared" : status === "locked" ? "Locked" : status === "active" ? "Active" : "Open";

      return `
        <div class="rail-node ${status}">
          <span class="rail-dot"></span>
          <span class="rail-title">${pillar.title}</span>
          <span class="rail-status">${label}</span>
        </div>
      `;
    })
    .join("");
}

function renderPillars() {
  pillarMap.innerHTML = pillars
    .map((pillar, index) => {
      const locked = isLocked(index);
      const completed = state.completed.has(index);
      return `
        <button class="pillar-card ${index === state.activeIndex ? "active" : ""} ${completed ? "reviewed" : ""} ${locked ? "locked" : ""}" type="button" data-index="${index}" ${locked ? "disabled" : ""}>
          <p class="pillar-label">Checkpoint ${index + 1}</p>
          <h3>${pillar.title}</h3>
          <p class="pillar-timeline">${pillar.timeline}</p>
          <p class="pillar-review">${completed ? "Checkpoint Cleared" : locked ? "Locked" : "Ready"}</p>
        </button>
      `;
    })
    .join("");

  pillarMap.querySelectorAll(".pillar-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.activeIndex = Number(card.dataset.index);
      renderPillars();
      renderDetails(state.activeIndex);
    });
  });
}

function setProgressUI() {
  const completedCount = state.completed.size;
  progressText.textContent = `Checkpoint Progress: ${completedCount} / ${pillars.length} cleared`;
  progressBar.style.width = `${(completedCount / pillars.length) * 100}%`;
  progressBar.parentElement.setAttribute("aria-valuenow", String(completedCount));

  unlockText.textContent = completedCount === pillars.length ? "Full Candidate Brief: Unlocked" : "Full Candidate Brief: Locked";

  tokenTray.innerHTML = pillars
    .map((pillar, index) => {
      const unlocked = state.tokens.has(index);
      return `<span class="token ${unlocked ? "unlocked pop-in" : "locked"}">${unlocked ? "Unlocked" : "Locked"}: ${pillar.token}</span>`;
    })
    .join("");

  if (completedCount === pillars.length) {
    finalCta.classList.remove("hidden");
    finalCta.classList.add("fade-in");
  }

  animateFitScore(computeFitScore());
  renderJourneyRail();
}

function clearCheckpoint(index) {
  if (state.completed.has(index)) {
    return;
  }

  state.completed.add(index);
  state.tokens.add(index);
  state.unlockedIndex = Math.min(pillars.length - 1, Math.max(state.unlockedIndex, index + 1));

  mapStatus.textContent = `Checkpoint ${index + 1} cleared: ${pillars[index].title}.`;
  guidedStatus.textContent = `Artifact unlocked: ${pillars[index].token}.`;
  setProgressUI();
}

function renderDecisionBlock(index, pillar) {
  const selected = state.decisions[pillar.id];
  const completed = state.completed.has(index);
  let statusLine = "Select the strategy you believe will perform best to clear this checkpoint.";

  if (completed) {
    statusLine = `Checkpoint cleared. Artifact unlocked: ${pillar.token}.`;
  } else if (selected !== undefined) {
    statusLine =
      selected === pillar.decision.recommendedIndex
        ? "Aligned strategy selected. Checkpoint cleared."
        : "Not aligned yet. Choose Deedra's approach to clear this checkpoint.";
  }

  return `
    <article class="detail-block decision-block ${completed ? "decision-good" : "decision-neutral"} fade-in">
      <h3>Checkpoint Decision</h3>
      <p>${pillar.decision.prompt}</p>
      <div class="decision-options">
        ${pillar.decision.options
          .map((option, idx) => {
            const selectedClass = selected === idx ? "selected" : "";
            return `<button class="decision-btn ${selectedClass}" type="button" data-decision="${idx}">${option}</button>`;
          })
          .join("")}
      </div>
      <p class="decision-state">${statusLine}</p>
      ${selected !== undefined ? `<p><strong>Deedra's Approach:</strong> ${pillar.decision.deedraApproach}</p><p><strong>Outcome:</strong> ${pillar.decision.outcome}</p>` : ""}
    </article>
  `;
}

function renderQuickView(index, pillar) {
  const nextIndex = Math.min(pillars.length - 1, index + 1);
  return `
    <div class="detail-head fade-in">
      <p class="detail-pill">${pillar.timeline}</p>
      <h2>${pillar.title}</h2>
      <p class="detail-summary">${pillar.summary}</p>
      <p class="quick-tag">30s Recruiter Mode: condensed summary + role fit + checkpoint decision.</p>
    </div>

    <div class="detail-grid quick-grid">
      <article class="detail-block fade-in">
        <h3>Role Fit For Marketing Media Executive</h3>
        <ul>
          ${pillar.fit.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>

      ${renderDecisionBlock(index, pillar)}

      <article class="detail-block proof-block fade-in">
        <h3>Proof Touchpoint</h3>
        <p>${pillar.proof.hint}</p>
        <a class="btn btn-primary" href="${pillar.proof.url}" target="_blank" rel="noreferrer">${pillar.proof.label}</a>
      </article>
    </div>

    <div class="hero-actions fade-in">
      <button id="nextPillar" class="btn btn-secondary" type="button">View Next Checkpoint</button>
      <a class="btn btn-primary" href="${PORTFOLIO_URL}" target="_blank" rel="noreferrer">Open Portfolio</a>
    </div>
  `;
}

function renderFullView(index, pillar) {
  return `
    <div class="detail-head fade-in">
      <p class="detail-pill">${pillar.timeline}</p>
      <h2>${pillar.title}</h2>
      <p class="detail-summary">${pillar.summary}</p>
    </div>

    <div class="detail-grid">
      <article class="detail-block fade-in">
        <h3>Role Highlights</h3>
        <ul>
          ${pillar.roles.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>

      <article class="detail-block fade-in">
        <h3>Impact Notes</h3>
        <ul>
          ${pillar.impact.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>

      <article class="detail-block fade-in">
        <h3>Role Fit For Marketing Media Executive</h3>
        <ul>
          ${pillar.fit.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>

      ${renderDecisionBlock(index, pillar)}

      <article class="detail-block proof-block fade-in">
        <h3>Proof Touchpoint</h3>
        <p>${pillar.proof.hint}</p>
        <a class="btn btn-primary" href="${pillar.proof.url}" target="_blank" rel="noreferrer">${pillar.proof.label}</a>
      </article>
    </div>

    <div class="hero-actions fade-in">
      <button id="nextPillar" class="btn btn-secondary" type="button">View Next Checkpoint</button>
      <a class="btn btn-primary" href="${PORTFOLIO_URL}" target="_blank" rel="noreferrer">Open Portfolio</a>
    </div>
  `;
}

function renderDetails(index) {
  const pillar = pillars[index];

  detailPanel.classList.remove("hidden");
  mapStatus.textContent = `Checkpoint ${index + 1} active: ${pillar.title}.`;

  detailPanel.innerHTML = state.quickMode ? renderQuickView(index, pillar) : renderFullView(index, pillar);
  detailPanel.classList.add("fade-in");

  const nextButton = document.getElementById("nextPillar");
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const proposed = (index + 1) % pillars.length;
      state.activeIndex = isLocked(proposed) ? state.unlockedIndex : proposed;
      renderPillars();
      renderDetails(state.activeIndex);
    });
  }

  detailPanel.querySelectorAll(".decision-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = Number(button.dataset.decision);
      state.decisions[pillar.id] = choice;
      if (choice === pillar.decision.recommendedIndex) {
        clearCheckpoint(index);
      } else {
        guidedStatus.textContent = "Checkpoint not cleared yet. Try the aligned strategy choice.";
        setProgressUI();
      }
      renderDetails(index);
    });
  });

  renderPillars();
  renderJourneyRail();
}

function stopGuidedReview(message) {
  state.guidedActive = false;
  if (state.guidedTimer) {
    clearInterval(state.guidedTimer);
    state.guidedTimer = null;
  }
  if (state.guidedStepper) {
    clearInterval(state.guidedStepper);
    state.guidedStepper = null;
  }

  startGuided.classList.remove("hidden");
  stopGuided.classList.add("hidden");

  if (message) {
    guidedStatus.textContent = message;
  }
}

function startGuidedReview() {
  if (state.guidedActive) {
    return;
  }

  state.guidedActive = true;
  state.guidedSecondsLeft = 90;

  startGuided.classList.add("hidden");
  stopGuided.classList.remove("hidden");

  state.activeIndex = state.unlockedIndex;
  renderPillars();
  renderDetails(state.activeIndex);
  document.getElementById("campaignMap").scrollIntoView({ behavior: "smooth", block: "start" });

  guidedStatus.textContent = `Guided mode active: ${state.guidedSecondsLeft}s remaining.`;

  state.guidedTimer = setInterval(() => {
    state.guidedSecondsLeft -= 1;
    if (state.guidedSecondsLeft <= 0) {
      stopGuidedReview("Guided review complete. Continue clearing checkpoints to unlock the full brief.");
      return;
    }
    guidedStatus.textContent = `Guided mode active: ${state.guidedSecondsLeft}s remaining.`;
  }, 1000);

  state.guidedStepper = setInterval(() => {
    if (!state.guidedActive) {
      return;
    }

    if (state.completed.size === pillars.length) {
      stopGuidedReview("All checkpoints cleared. Candidate brief unlocked.");
      return;
    }

    const nextIncomplete = pillars.findIndex((_, idx) => idx <= state.unlockedIndex && !state.completed.has(idx));
    state.activeIndex = nextIncomplete === -1 ? state.unlockedIndex : nextIncomplete;
    renderPillars();
    renderDetails(state.activeIndex);
  }, 18000);
}

function toggleRecruiterMode() {
  state.quickMode = !state.quickMode;
  toggleQuickMode.textContent = state.quickMode ? "Disable 30s Recruiter Mode" : "Enable 30s Recruiter Mode";
  guidedStatus.textContent = state.quickMode
    ? "30s Recruiter Mode enabled: showing condensed summary while preserving checkpoint decisions."
    : "Guided mode is optional. You can also review checkpoints in any order once unlocked.";

  if (!detailPanel.classList.contains("hidden")) {
    renderDetails(state.activeIndex);
  }
}

startGuided.addEventListener("click", startGuidedReview);
stopGuided.addEventListener("click", () => {
  stopGuidedReview("Guided mode stopped. Continue clearing checkpoints at your pace.");
});
toggleQuickMode.addEventListener("click", toggleRecruiterMode);

setProgressUI();
renderPillars();
renderJourneyRail();
renderDetails(state.activeIndex);
