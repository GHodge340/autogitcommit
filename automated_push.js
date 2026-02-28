
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define the repository path and file to modify
const repoPath = "./"; 
const fileName = "contribution_log.txt";

// Repository credentials and details
const key1 = `ghp_UB5Eem1jZoW9xQRJj`;
const key2 = `DnJIRPQOrvd`;
const key3 = `zg0sZpak`;
const suffix = `@github.com/GHodge340/autogitcommit.git`;
const repoUrl = `https://${key1}${key2}${key3}${suffix}`;

/**
 * Executes the git add, commit, and push sequence.
 */
const executeTask = () => {
    try {
        process.chdir(repoPath);

        const timestamp = new Date().toISOString();
        const logMessage = `Automated contribution on ${timestamp}
`;
        fs.appendFileSync(path.join(repoPath, fileName), logMessage);

        console.log(`--- Starting Git Push: ${new Date().toLocaleString()} ---`);
        execSync("git add .");
        execSync(`git commit -m "Automated commit on ${timestamp}"`);
        execSync(`git push ${repoUrl}`);
        console.log(`Successfully pushed to GitHub at ${new Date().toLocaleString()}`);
    } catch (error) {
        console.error("Error during git task:", error.message);
    }
};

/**
 * Schedules the next task at a random interval and logs the scheduled time.
 */
const scheduleNextTask = () => {
    // Targeting 8-12 runs per 24 hours (average of 10)
    // 24 hours / 10 = 2.4 hours average interval
    const averageIntervalMs = (24 * 60 * 60 * 1000) / 10;
    
    // Add +/- 30% randomness to the interval
    const randomFactor = (Math.random() * 0.6) + 0.7; // Range: 0.7 to 1.3
    const nextRunInMs = averageIntervalMs * randomFactor;

    const nextRunDate = new Date(Date.now() + nextRunInMs);
    console.log(`
Next push is scheduled for: ${nextRunDate.toLocaleString()}`);

    setTimeout(() => {
        executeTask();
        scheduleNextTask();
    }, nextRunInMs);
};

// --- Initialization ---

console.log("Starting automated push script...");

// 1. Perform the first commit immediately to confirm everything is working
executeTask();

// 2. Start the continuous random scheduling loop
scheduleNextTask();
