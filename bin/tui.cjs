#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const BUILDER_PATH = path.dirname(path.dirname(__filename));
const PORT = '5173';
const URL = `http://localhost:${PORT}`;

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showHelp() {
  console.log(`
TUI Builder - Terminal UI Builder Application

Usage: tui [COMMAND]

Commands:
  start       Start the server (default if no command)
  stop        Stop the server
  restart     Restart the server
  status      Check server status
  logs        Show server logs
  open        Open in browser
  build       Build for production
  help        Show this help message

Examples:
  tui              # Start server
  tui status       # Check if running
  tui logs         # View logs
  tui open         # Open browser
  tui restart      # Restart server

Default: ${URL}
  `);
}

function execSync(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd: BUILDER_PATH,
      stdio: 'inherit'
    });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed: ${cmd}`));
    });
  });
}

async function main() {
  const command = process.argv[2] || 'start';

  switch(command) {
    case 'start':
      log('blue', '🚀 Starting TUI Builder...');
      try {
        await execSync('pm2', ['start', 'serve.cjs', '--name', 'tui-builder']);
        await new Promise(r => setTimeout(r, 2000));
        log('green', `✅ TUI Builder started!`);
        log('green', `📍 Access at: ${URL}`);
        log('green', `🔧 Diagnostic: ${URL}/diagnostic`);
      } catch (e) {
        log('red', `❌ Error: ${e.message}`);
        process.exit(1);
      }
      break;

    case 'stop':
      log('yellow', '⏹️  Stopping TUI Builder...');
      await execSync('pm2', ['stop', 'tui-builder']);
      log('green', '✅ Stopped!');
      break;

    case 'restart':
      log('yellow', '🔄 Restarting TUI Builder...');
      await execSync('pm2', ['restart', 'tui-builder']);
      await new Promise(r => setTimeout(r, 2000));
      log('green', '✅ Restarted!');
      log('green', `📍 Access at: ${URL}`);
      break;

    case 'status':
      log('blue', '📊 TUI Builder Status:');
      await execSync('pm2', ['describe', 'tui-builder']);
      break;

    case 'logs':
      log('blue', '📋 TUI Builder Logs:');
      await execSync('pm2', ['logs', 'tui-builder', '--lines', '30', '--nostream']);
      break;

    case 'build':
      log('blue', '🔨 Building...');
      await execSync('npm', ['run', 'build']);
      log('green', '✅ Build complete!');
      break;

    case 'help':
    case '-h':
    case '--help':
      showHelp();
      break;

    default:
      log('yellow', `⚠️  Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main().catch(e => {
  log('red', `Error: ${e.message}`);
  process.exit(1);
});
