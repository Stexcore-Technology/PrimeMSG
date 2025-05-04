import { spawn } from 'child_process';

// Function to execute commands concurrently
const runCommand = (command: string, args: string[]) => {
    const process = spawn(command, args, { stdio: 'inherit', shell: true });

    process.on('close', (code) => {
        console.log(`Process "${command} ${args.join(' ')}" exited with code ${code}`);
    });
};

// Run all three commands simultaneously
runCommand('npx', ['vite', 'build', '-c', 'adapters/express/vite.config.ts', '--watch']);
runCommand('npx', ['vite', 'build', '--watch']);
runCommand('nodemon', ['server/entry.express']);
