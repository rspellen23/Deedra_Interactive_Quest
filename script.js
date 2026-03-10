const missions = [
  {
    year: "2006-2012",
    title: "Story Foundations",
    company: "A Gypsy Life Productions + GA Copywriting",
    role: "Marketing Coordinator + Copywriting",
    brief: "Early career foundation in storytelling, campaign writing, and turning creative briefs into audience-ready messaging.",
    approaches: [
      { label: "Narrative Precision", bonus: 12 },
      { label: "Audience Clarity", bonus: 10 }
    ],
    challengeType: "sequence",
    challengePrompt: "Replay the core communication sequence that powers campaign clarity.",
    sequenceLength: 3,
    badge: "Story Foundations"
  },
  {
    year: "2015",
    title: "Author Gate",
    company: "Published Book Milestone",
    role: "Published Author",
    brief: "Demonstrated long-form storytelling discipline and the ability to ship meaningful creative work.",
    approaches: [
      { label: "Voice & Depth", bonus: 14 },
      { label: "Audience Pull", bonus: 10 }
    ],
    challengeType: "storyAssembly",
    challengePrompt: "Assemble the publishing narrative in the correct storytelling arc.",
    storySequence: [
      "Audience insight identified",
      "Long-form narrative drafted",
      "Book launched to market"
    ],
    badge: "Author Gate"
  },
  {
    year: "2012-2024",
    title: "Campaign Scale",
    company: "PepsiCo + Arkema ArrMaz + True",
    role: "Internal Marketing, Role Pivot, Marketing Manager",
    brief: "Scaled from internal campaign support to leadership-level execution, adapting through role shifts and high-pressure business needs.",
    approaches: [
      { label: "Execution Under Pressure", bonus: 13 },
      { label: "Cross-Team Strategy", bonus: 11 }
    ],
    challengeType: "triage",
    challengePrompt: "Prioritize the top strategic levers that drive campaign outcomes.",
    targets: ["Brand Consistency", "Execution Speed", "Cross-Team Alignment"],
    pickCount: 2,
    timeLimit: 10,
    badge: "Campaign Scale"
  },
  {
    year: "2024+",
    title: "Innovation Impact",
    company: "MIDFLORIDA + IFF Citrus Innovation Center",
    role: "Marketing Specialist II + Marketing Lead",
    brief: "Current work blends PR strategy, immersive experiences, and innovation storytelling that translates complex ideas for real audiences.",
    approaches: [
      { label: "PR Signal", bonus: 13 },
      { label: "Experience Design", bonus: 12 }
    ],
    challengeType: "timing",
    challengePrompt: "Hit precision timing windows to convert complexity into clear market value.",
    targetHits: 2,
    maxMisses: 1,
    badge: "Innovation Impact"
  }
];

const state = {
  started: false,
  unlockedIndex: -1,
  activeMissionIndex: null,
  completed: new Set(),
  influence: 0,
  energy: 3,
  badges: []
};

const startBtn = document.getElementById("startQuest");
const resetBtn = document.getElementById("resetQuest");
const questMap = document.getElementById("questMap");
const missionPanel = document.getElementById("missionPanel");
const mapStatus = document.getElementById("mapStatus");
const energyStat = document.getElementById("energyStat");
const influenceStat = document.getElementById("influenceStat");
const badgeStat = document.getElementById("badgeStat");
const badgeTray = document.getElementById("badgeTray");
const badgeList = document.getElementById("badgeList");
const finalVault = document.getElementById("finalVault");

let activeCleanup = null;

function updateHud() {
  energyStat.textContent = String(state.energy);
  influenceStat.textContent = String(state.influence);
  badgeStat.textContent = `${state.badges.length} / ${missions.length}`;

  if (state.badges.length > 0) {
    badgeTray.classList.remove("hidden");
    badgeList.innerHTML = state.badges.map((badge) => `<span class="badge">${badge}</span>`).join("");
  } else {
    badgeTray.classList.add("hidden");
  }
}

function renderMap() {
  questMap.innerHTML = missions
    .map((mission, index) => {
      const locked = !state.started || index > state.unlockedIndex;
      const done = state.completed.has(index);
      const active = state.activeMissionIndex === index;
      return `
        <button
          class="node ${locked ? "locked" : ""} ${done ? "done" : ""} ${active ? "active" : ""}"
          type="button"
          data-index="${index}"
          ${locked ? "disabled" : ""}
        >
          <p class="node-year">${mission.year}</p>
          <p class="node-title">${mission.title}</p>
          <p class="node-company">${mission.company}</p>
        </button>
      `;
    })
    .join("");

  questMap.querySelectorAll(".node").forEach((node) => {
    node.addEventListener("click", () => {
      const index = Number(node.dataset.index);
      if (index > state.unlockedIndex) {
        return;
      }
      openMission(index);
    });
  });
}

function openMission(index) {
  if (activeCleanup) {
    activeCleanup();
  }

  state.activeMissionIndex = index;
  const mission = missions[index];
  let selectedApproach = null;
  let resolved = false;
  const disposers = [];

  missionPanel.classList.remove("hidden");
  missionPanel.innerHTML = `
    <h3>${mission.title}</h3>
    <p class="mission-meta">${mission.year} | ${mission.role} | ${mission.company}</p>
    <p class="mission-brief">${mission.brief}</p>
    <div class="hero-actions">
      <a class="btn btn-ghost" href="https://new.express.adobe.com/webpage/x9sDwoekJyT6A" target="_blank" rel="noreferrer">View Proof in Portfolio</a>
    </div>

    <div class="approach-grid" id="approachGrid">
      ${mission.approaches
        .map(
          (approach, approachIndex) =>
            `<button class="approach-btn" data-approach="${approachIndex}" type="button">${approach.label}</button>`
        )
        .join("")}
    </div>

    <div class="challenge-zone">
      <p class="challenge-note">${mission.challengePrompt || "Choose your strategy approach, then run the mission challenge."}</p>
      <button class="btn btn-primary" id="startChallenge" type="button" disabled>Start Challenge</button>
      <div id="challengeMount" class="challenge-mount"></div>
      <p class="challenge-status" id="challengeStatus"></p>
      <p class="result" id="resultText"></p>
      <div class="hero-actions">
        <button class="btn btn-dark hidden" id="retryBtn" type="button">Retry Mission</button>
        <button class="btn btn-primary hidden" id="continueBtn" type="button">Continue Journey</button>
        <button class="btn btn-dark hidden" id="rechargeBtn" type="button">Recharge Energy</button>
      </div>
    </div>
  `;

  renderMap();

  const approachGrid = document.getElementById("approachGrid");
  const startChallenge = document.getElementById("startChallenge");
  const challengeMount = document.getElementById("challengeMount");
  const challengeStatus = document.getElementById("challengeStatus");
  const resultText = document.getElementById("resultText");
  const retryBtn = document.getElementById("retryBtn");
  const continueBtn = document.getElementById("continueBtn");
  const rechargeBtn = document.getElementById("rechargeBtn");

  function registerDisposer(fn) {
    disposers.push(fn);
  }

  function cleanupMission() {
    while (disposers.length > 0) {
      const fn = disposers.pop();
      try {
        fn();
      } catch (_e) {
        // ignore cleanup errors
      }
    }
  }

  activeCleanup = cleanupMission;

  function finishMission(success, detailText) {
    if (resolved) {
      return;
    }
    resolved = true;
    cleanupMission();
    startChallenge.disabled = true;

    if (success) {
      const approachBonus = mission.approaches[selectedApproach].bonus;
      const influenceGain = 30 + approachBonus;
      state.influence += influenceGain;

      if (!state.completed.has(index)) {
        state.completed.add(index);
        state.badges.push(mission.badge);
      }

      if (index === state.unlockedIndex && index < missions.length - 1) {
        state.unlockedIndex += 1;
      }

      challengeStatus.className = "challenge-status status-success";
      challengeStatus.textContent = `Mission clear. +${influenceGain} influence.`;
      resultText.textContent = detailText || `Badge earned: ${mission.badge}`;
      continueBtn.classList.remove("hidden");
      mapStatus.textContent = `Checkpoint complete: ${mission.title}`;
    } else {
      state.energy -= 1;
      challengeStatus.className = "challenge-status status-warn";
      challengeStatus.textContent = "Mission failed.";
      resultText.textContent = detailText || (state.energy > 0 ? "Retry to secure this checkpoint." : "Energy depleted. Recharge to continue.");

      if (state.energy > 0) {
        retryBtn.classList.remove("hidden");
      } else {
        rechargeBtn.classList.remove("hidden");
      }

      mapStatus.textContent = "Mission failed. Adjust strategy and try again.";
    }

    updateHud();
    renderMap();

    if (state.completed.size === missions.length) {
      finalVault.classList.remove("hidden");
      mapStatus.textContent = "All checkpoints completed. Portfolio vault unlocked.";
    }
  }

  function setupTimingChallenge() {
    const targetHits = mission.targetHits || 3;
    const maxMisses = mission.maxMisses || 2;

    challengeMount.innerHTML = `
      <div class="timing-wrap">
        <div class="timing-track">
          <div class="timing-zone"></div>
          <div class="timing-marker" id="timingMarker"></div>
        </div>
        <p class="mini-stat" id="timingReadout">Precision locks: 0 / ${targetHits} | Misses: 0 / ${maxMisses}</p>
        <button class="btn btn-dark" id="timingLockBtn" type="button" disabled>Lock Signal</button>
      </div>
    `;

    const timingMarker = document.getElementById("timingMarker");
    const timingReadout = document.getElementById("timingReadout");
    const timingLockBtn = document.getElementById("timingLockBtn");

    let markerX = 0;
    let velocity = 2.8;
    let hits = 0;
    let misses = 0;
    let intervalId = null;

    function updateReadout() {
      timingReadout.textContent = `Precision locks: ${hits} / ${targetHits} | Misses: ${misses} / ${maxMisses}`;
    }

    function startSweep() {
      intervalId = setInterval(() => {
        markerX += velocity;
        if (markerX >= 100) {
          markerX = 100;
          velocity = -velocity;
        } else if (markerX <= 0) {
          markerX = 0;
          velocity = -velocity;
        }
        timingMarker.style.left = `${markerX}%`;
      }, 26);
      registerDisposer(() => clearInterval(intervalId));
    }

    timingLockBtn.addEventListener("click", () => {
      if (resolved) {
        return;
      }
      const inZone = markerX >= 40 && markerX <= 62;
      if (inZone) {
        hits += 1;
      } else {
        misses += 1;
      }
      updateReadout();

      if (hits >= targetHits) {
        finishMission(true, `Badge earned: ${mission.badge} | Challenge: Signal lock complete.`);
      } else if (misses > maxMisses) {
        finishMission(false, "Signal integrity dropped before lock sequence completed.");
      }
    });

    startChallenge.addEventListener("click", () => {
      if (selectedApproach === null || state.energy <= 0 || resolved) {
        return;
      }
      startChallenge.disabled = true;
      timingLockBtn.disabled = false;
      challengeStatus.className = "challenge-status";
      challengeStatus.textContent = "Challenge live: lock the moving signal inside the neon zone.";
      startSweep();
    });
  }

  function setupSequenceChallenge() {
    const sequenceLength = mission.sequenceLength || 4;

    challengeMount.innerHTML = `
      <div class="sequence-wrap">
        <p class="mini-stat" id="sequenceInfo">Pattern length: ${sequenceLength}</p>
        <p class="sequence-display" id="sequenceDisplay">Awaiting uplink...</p>
        <div class="sequence-grid" id="sequenceGrid"></div>
      </div>
    `;

    const sequenceDisplay = document.getElementById("sequenceDisplay");
    const sequenceGrid = document.getElementById("sequenceGrid");

    const symbols = ["PR", "SEO", "CRM", "ADS", "UX"];
    const sequence = Array.from({ length: sequenceLength }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    let cursor = 0;
    let readyForInput = false;

    function renderPad() {
      sequenceGrid.innerHTML = symbols
        .map((symbol) => `<button class="symbol-btn" type="button" data-symbol="${symbol}">${symbol}</button>`)
        .join("");

      sequenceGrid.querySelectorAll(".symbol-btn").forEach((button) => {
        button.addEventListener("click", () => {
          if (!readyForInput || resolved) {
            return;
          }
          const selected = button.dataset.symbol;
          if (selected !== sequence[cursor]) {
            finishMission(false, "Sequence mismatch. Narrative protocol lost sync.");
            return;
          }
          cursor += 1;
          sequenceDisplay.textContent = `Correct chain: ${cursor} / ${sequence.length}`;
          if (cursor >= sequence.length) {
            finishMission(true, `Badge earned: ${mission.badge} | Challenge: pattern decoded.`);
          }
        });
      });
    }

    function showSequence() {
      readyForInput = false;
      sequenceGrid.innerHTML = "";
      sequenceDisplay.textContent = "Memorize sequence...";

      sequence.forEach((symbol, idx) => {
        const timeoutId = setTimeout(() => {
          sequenceDisplay.textContent = symbol;
        }, 700 * (idx + 1));
        registerDisposer(() => clearTimeout(timeoutId));
      });

      const endId = setTimeout(() => {
        sequenceDisplay.textContent = "Repeat the sequence";
        readyForInput = true;
        renderPad();
      }, 700 * (sequence.length + 1));
      registerDisposer(() => clearTimeout(endId));
    }

    startChallenge.addEventListener("click", () => {
      if (selectedApproach === null || state.energy <= 0 || resolved) {
        return;
      }
      startChallenge.disabled = true;
      challengeStatus.className = "challenge-status";
      challengeStatus.textContent = "Challenge live: memorize and replay the strategy sequence.";
      showSequence();
    });
  }

  function setupTriageChallenge() {
    const targets = mission.targets || ["Audience Signal", "Brand Lift", "Lead Quality"];
    const decoys = ["Vanity Metrics", "Random Outreach", "Channel Drift", "Unclear CTA"];
    const options = [...targets, ...decoys].sort(() => Math.random() - 0.5);
    const pickCount = mission.pickCount || 3;
    const timeLimit = mission.timeLimit || 12;

    challengeMount.innerHTML = `
      <div class="triage-wrap">
        <p class="mini-stat" id="triageInfo">Select exactly ${pickCount} high-impact priorities before timer ends.</p>
        <p class="mini-stat" id="triageTimer">Time: ${timeLimit}s</p>
        <div class="triage-grid" id="triageGrid">
          ${options
            .map((option) => `<button class="triage-card" type="button" data-option="${option}">${option}</button>`)
            .join("")}
        </div>
        <button class="btn btn-dark" id="triageSubmit" type="button" disabled>Submit Priorities</button>
      </div>
    `;

    const triageGrid = document.getElementById("triageGrid");
    const triageSubmit = document.getElementById("triageSubmit");
    const triageTimer = document.getElementById("triageTimer");

    const picked = new Set();
    let remaining = timeLimit;
    let intervalId = null;

    function updateSubmitState() {
      triageSubmit.disabled = picked.size !== pickCount;
    }

    function evaluate() {
      const selected = Array.from(picked);
      const success =
        selected.length === pickCount &&
        selected.every((item) => targets.includes(item)) &&
        targets.filter((target) => selected.includes(target)).length >= pickCount;

      if (success) {
        finishMission(true, `Badge earned: ${mission.badge} | Challenge: priority triage cleared.`);
      } else {
        finishMission(false, "Priority mix was off target for this campaign window.");
      }
    }

    function startTimer() {
      intervalId = setInterval(() => {
        remaining -= 1;
        triageTimer.textContent = `Time: ${remaining}s`;
        if (remaining <= 0) {
          finishMission(false, "Triage window expired before priorities were validated.");
        }
      }, 1000);
      registerDisposer(() => clearInterval(intervalId));
    }

    triageGrid.querySelectorAll(".triage-card").forEach((button) => {
      button.addEventListener("click", () => {
        if (resolved) {
          return;
        }
        const option = button.dataset.option;
        if (picked.has(option)) {
          picked.delete(option);
          button.classList.remove("selected");
        } else if (picked.size < pickCount) {
          picked.add(option);
          button.classList.add("selected");
        }
        updateSubmitState();
      });
    });

    triageSubmit.addEventListener("click", evaluate);

    startChallenge.addEventListener("click", () => {
      if (selectedApproach === null || state.energy <= 0 || resolved) {
        return;
      }
      startChallenge.disabled = true;
      triageGrid.classList.add("active");
      challengeStatus.className = "challenge-status";
      challengeStatus.textContent = "Challenge live: lock the 3 highest-impact priorities.";
      startTimer();
    });
  }

  function setupStoryAssemblyChallenge() {
    const sequence = mission.storySequence || [
      "Audience insight identified",
      "Message architecture drafted",
      "Creative development completed",
      "Campaign launched"
    ];
    const shuffled = sequence
      .map((text, order) => ({ text, order }))
      .sort(() => Math.random() - 0.5);

    challengeMount.innerHTML = `
      <div class="story-wrap">
        <p class="mini-stat" id="storyInfo">Build the narrative in order. Mistakes allowed: 1</p>
        <div class="story-bank" id="storyBank">
          ${shuffled
            .map(
              (item) =>
                `<button class="story-card" type="button" data-order="${item.order}" data-text="${item.text}">${item.text}</button>`
            )
            .join("")}
        </div>
        <p class="mini-stat">Narrative Assembly</p>
        <div class="story-board" id="storyBoard"></div>
      </div>
    `;

    const storyBank = document.getElementById("storyBank");
    const storyBoard = document.getElementById("storyBoard");
    const storyInfo = document.getElementById("storyInfo");

    let expected = 0;
    let mistakes = 0;
    let live = false;

    storyBank.querySelectorAll(".story-card").forEach((button) => {
      button.addEventListener("click", () => {
        if (!live || resolved) {
          return;
        }
        const order = Number(button.dataset.order);
        if (order === expected) {
          button.disabled = true;
          button.classList.add("locked");
          const chip = document.createElement("div");
          chip.className = "story-chip";
          chip.textContent = `${expected + 1}. ${button.dataset.text}`;
          storyBoard.appendChild(chip);
          expected += 1;
          if (expected >= sequence.length) {
            finishMission(true, `Badge earned: ${mission.badge} | Challenge: narrative assembly complete.`);
          } else {
            storyInfo.textContent = `Correct. Next step: ${expected + 1} of ${sequence.length}`;
          }
        } else {
          mistakes += 1;
          button.classList.add("error");
          const clearId = setTimeout(() => button.classList.remove("error"), 250);
          registerDisposer(() => clearTimeout(clearId));
          if (mistakes > 1) {
            finishMission(false, "Narrative sequence broke. Story structure did not hold.");
          } else {
            storyInfo.textContent = "One mismatch logged. One mistake remaining.";
          }
        }
      });
    });

    startChallenge.addEventListener("click", () => {
      if (selectedApproach === null || state.energy <= 0 || resolved) {
        return;
      }
      startChallenge.disabled = true;
      live = true;
      storyBank.classList.add("active");
      challengeStatus.className = "challenge-status";
      challengeStatus.textContent = "Challenge live: assemble the publishing story in the correct arc.";
    });
  }

  const challengeSetups = {
    timing: setupTimingChallenge,
    sequence: setupSequenceChallenge,
    triage: setupTriageChallenge,
    storyAssembly: setupStoryAssemblyChallenge
  };

  const setupChallenge = challengeSetups[mission.challengeType] || setupTimingChallenge;
  setupChallenge();

  approachGrid.querySelectorAll(".approach-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (resolved) {
        return;
      }
      selectedApproach = Number(button.dataset.approach);
      approachGrid.querySelectorAll(".approach-btn").forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      startChallenge.disabled = false;
      challengeStatus.className = "challenge-status";
      challengeStatus.textContent = `Approach selected: ${missions[index].approaches[selectedApproach].label}`;
    });
  });

  retryBtn.addEventListener("click", () => {
    openMission(index);
  });

  rechargeBtn.addEventListener("click", () => {
    state.energy = 3;
    updateHud();
    openMission(index);
  });

  continueBtn.addEventListener("click", () => {
    missionPanel.classList.add("hidden");
    state.activeMissionIndex = null;
    renderMap();
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }
  });
}

function startQuest() {
  state.started = true;
  state.unlockedIndex = 0;
  state.activeMissionIndex = 0;
  mapStatus.textContent = "Quest live. Select the first unlocked checkpoint.";
  finalVault.classList.add("hidden");
  renderMap();
  openMission(0);
}

function resetQuest() {
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  state.started = false;
  state.unlockedIndex = -1;
  state.activeMissionIndex = null;
  state.completed = new Set();
  state.influence = 0;
  state.energy = 3;
  state.badges = [];

  missionPanel.classList.add("hidden");
  finalVault.classList.add("hidden");
  mapStatus.textContent = "Press Launch Quest to begin.";
  updateHud();
  renderMap();
}

startBtn.addEventListener("click", startQuest);
resetBtn.addEventListener("click", resetQuest);

updateHud();
renderMap();
