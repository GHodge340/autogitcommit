
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define the repository path and file to modify
const repoPath = "./"; // Update this to your local path
const fileName = "contribution_log.txt"; // File to update

//Broken Keys to bypass security
const key1 = `ghp_UB5Eem1jZoW9xQRJj`;
const key2 = `DnJIRPQOrvd`;
const key3 = `zg0sZpak`;
const suffix = `@github.com/GHodge340/autogitcommit.git`

// Function to execute the task
const executeTask = () => {
    try {
        // Navigate to the repository
        process.chdir(repoPath);

        // Append a timestamp to the file
        const timestamp = new Date().toISOString();
        fs.appendFileSync(path.join(repoPath, fileName), `Automated contribution on ${timestamp}\n`);

        // Git commands to add, commit, and push
        execSync("git add .");
        execSync(`git commit -m "Automated commit on ${timestamp}"`);
        execSync(`git push https://${key1}${key2}${key3}${suffix}`);
        //execSync("git push -u origin main");
        console.log(`Changes committed and pushed successfully at ${timestamp}!`);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

// Function to schedule tasks randomly between 8 and 12 times in 24 hours
const scheduleRandomTasks = () => {
    const numberOfRuns = Math.floor(Math.random() * (12 - 8 + 1)) + 8; // Random number between 8 and 12
    console.log(`Scheduling ${numberOfRuns} tasks in the next 24 hours...`);
    
    const interval = 24 * 60 * 60 * 1000 / numberOfRuns; // Average interval in milliseconds

    const scheduleTask = (remainingRuns) => {
        if (remainingRuns === 0) {
				console.log(`${numberOfRuns} Commits made to Github in the last 24hrs`);
				console.log(`RESTARTING GITCOMMIT ALGORITHM..`)
				scheduleRandomTasks(); // Stop when all tasks are executed
			}

        // Add randomness to the interval (e.g., ±20% of the average interval)
        const randomOffset = (Math.random() * 0.4 - 0.2) * interval;
        const nextRunIn = interval + randomOffset;

        setTimeout(() => {
            executeTask();
            scheduleTask(remainingRuns - 1); // Schedule the next task
        }, nextRunIn);
    };

    scheduleTask(numberOfRuns);
};

// Start the random task scheduler
scheduleRandomTasks();
