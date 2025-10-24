#!/usr/bin/env node

/**
 * Copy Logician UI documentation to consuming app's .claude directory
 *
 * Usage:
 *   npx @mindlogic-ai/logician-ui copy-docs
 *
 * This will copy all documentation files from the library's .claude/docs
 * directory to your app's .claude/logician-ui directory.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for better terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Read all files and directories in source
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectory(sourcePath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
      log(`  ✓ ${entry.name}`, 'green');
    }
  }
}

function main() {
  log('\n📚 Logician UI Documentation Installer\n', 'cyan');

  // Find the package installation directory
  let packageDir;
  try {
    // Try to resolve as an installed package
    packageDir = path.dirname(require.resolve('@mindlogic-ai/logician-ui/package.json'));
  } catch (e) {
    // If running from within the package itself, use parent directory
    packageDir = path.join(__dirname, '..');
  }

  const sourceDocsDir = path.join(packageDir, '.claude', 'docs');

  // Determine destination directory (current working directory)
  const destDir = process.cwd();
  const destDocsDir = path.join(destDir, '.claude', 'logician-ui');

  // Check if source docs exist
  if (!fs.existsSync(sourceDocsDir)) {
    log('❌ Error: Documentation source directory not found.', 'red');
    log('   This may be a packaging issue. Please report this at:', 'red');
    log('   https://github.com/mindlogic-ai/logician-ui/issues\n', 'red');
    process.exit(1);
  }

  // Check if destination already exists
  if (fs.existsSync(destDocsDir)) {
    log('⚠️  Documentation directory already exists at:', 'yellow');
    log(`   ${destDocsDir}`, 'yellow');
    log('\n   Files will be overwritten. Press Ctrl+C to cancel.\n', 'yellow');

    // Give user a moment to cancel
    setTimeout(() => {
      performCopy();
    }, 2000);
  } else {
    performCopy();
  }

  function performCopy() {
    log('📂 Copying documentation files...\n', 'blue');

    try {
      copyDirectory(sourceDocsDir, destDocsDir);

      log('\n✅ Documentation installed successfully!\n', 'green');
      log('📍 Location:', 'cyan');
      log(`   ${destDocsDir}\n`, 'cyan');
      log('📄 Available documentation:', 'cyan');
      log('   • getting-started.md - Installation and setup guide', 'blue');
      log('   • components.md - Complete component reference', 'blue');
      log('   • theming.md - Theme customization guide', 'blue');
      log('   • icons.md - Icon library reference', 'blue');
      log('   • accessibility.md - Accessibility best practices', 'blue');
      log('   • integration.md - Framework integration guides', 'blue');
      log('\n💡 Tip: Add these files to your .claude/claude.md to make them available to Claude Code:', 'yellow');
      log('\n   Include in your .claude/claude.md:', 'yellow');
      log('   ```markdown', 'yellow');
      log('   See also:', 'yellow');
      log('   - [Logician UI Components](./.claude/logician-ui/components.md)', 'yellow');
      log('   - [Theming Guide](./.claude/logician-ui/theming.md)', 'yellow');
      log('   - [Icons](./.claude/logician-ui/icons.md)', 'yellow');
      log('   ```\n', 'yellow');

    } catch (error) {
      log(`\n❌ Error copying documentation: ${error.message}`, 'red');
      process.exit(1);
    }
  }
}

main();
