#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getComponentDirectories() {
  const componentsDir = path.join(process.cwd(), 'src', 'components');
  return fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function getExportsFromComponentIndex(componentName) {
  const possiblePaths = [
    path.join(process.cwd(), 'src', 'components', componentName, 'index.ts'),
    path.join(process.cwd(), 'src', 'components', componentName, 'index.tsx')
  ];

  for (const indexPath of possiblePaths) {
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      return parseExports(content);
    }
  }

  return [];
}

function parseExports(content) {
  const exports = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // export { ComponentName } from './file'
    const namedExportMatch = line.match(/export\s*\{\s*([^}]+)\s*\}/);
    if (namedExportMatch) {
      const names = namedExportMatch[1]
        .split(',')
        .map(name => name.trim())
        .filter(name => !name.startsWith('type ') && !name.includes('type '))
        .map(name => name.replace(/\s+as\s+\w+/, '').trim());
      exports.push(...names);
    }

    // export * from './file'
    const starExportMatch = line.match(/export \* from/);
    if (starExportMatch && !line.includes('type *')) {
      // For * exports, we'll need to check the actual file
      exports.push('*');
    }
  }

  return exports.filter(exp => exp.length > 0);
}

function getExportsFromMainIndex() {
  const indexPath = path.join(process.cwd(), 'src', 'index.ts');
  const content = fs.readFileSync(indexPath, 'utf8');

  const componentExports = {};

  // Find export * from './components/ComponentName'
  const starExportRegex = /export \* from ['"]\.\/components\/([^'"]+)['"];?/g;
  let match;
  while ((match = starExportRegex.exec(content)) !== null) {
    componentExports[match[1]] = ['*']; // All exports
  }

  // Find specific exports like Typography
  const multilineExportPattern = /export\s*\{([\s\S]*?)\}\s*from\s*['"]\.\/components\/([^'"]+)['"];?/g;
  while ((match = multilineExportPattern.exec(content)) !== null) {
    const componentName = match[2];
    const exportedItems = match[1]
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    componentExports[componentName] = exportedItems;
  }

  return componentExports;
}

function checkComponentExports() {
  const componentDirs = getComponentDirectories();
  const mainExports = getExportsFromMainIndex();

  const missing = [];
  const missingComponents = [];

  for (const componentName of componentDirs) {
    const componentExports = getExportsFromComponentIndex(componentName);
    const mainComponentExports = mainExports[componentName] || [];

    // Skip if component has no exports
    if (componentExports.length === 0) {
      continue;
    }

    // Check if component is exported at all from main index
    if (!mainExports[componentName]) {
      missingComponents.push(componentName);
      continue;
    }

    // If main index uses export *, then all exports are included
    if (mainComponentExports.includes('*')) {
      continue;
    }

    // Check individual exports
    for (const exportName of componentExports) {
      if (exportName !== '*' && !mainComponentExports.includes(exportName)) {
        missing.push({
          component: componentName,
          export: exportName,
          availableInComponent: componentExports,
          exportedInMain: mainComponentExports
        });
      }
    }
  }

  return { missing, missingComponents };
}

function main() {
  console.log('🔍 Checking individual component exports...\n');

  const { missing, missingComponents } = checkComponentExports();

  if (missing.length === 0 && missingComponents.length === 0) {
    console.log('✅ All component exports are properly included in src/index.ts!');
    process.exit(0);
  }

  let hasErrors = false;

  if (missingComponents.length > 0) {
    console.log('❌ Components not exported at all in src/index.ts:');
    missingComponents.forEach(component => {
      console.log(`   - ${component}`);
    });
    console.log('');
    hasErrors = true;
  }

  if (missing.length > 0) {
    console.log('❌ Individual exports missing in src/index.ts:');
    missing.forEach(({ component, export: exportName, availableInComponent, exportedInMain }) => {
      console.log(`   - ${component}.${exportName}`);
      console.log(`     Available in component: [${availableInComponent.join(', ')}]`);
      console.log(`     Exported in main: [${exportedInMain.join(', ')}]`);
    });
    console.log('');
    hasErrors = true;
  }

  if (hasErrors) {
    console.log('💡 Fix by updating the exports in src/index.ts');
    process.exit(1);
  }

  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { checkComponentExports };