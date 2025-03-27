
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define the repository path and file to modify
const repoPath = "./"; // Update this to your local path
const fileName = "contribution_log.txt"; // File to update

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
        execSync("git push -u origin main");
        console.log(`Changes committed and pushed successfully at ${timestamp}!`);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

executeTask();