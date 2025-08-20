#!/bin/bash

# Logician Design System Submodule Setup Script
# Run this script from your project root to add the design system as a submodule

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Logician Design System Setup${NC}"
echo "=================================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: This script must be run from the root of a git repository${NC}"
    exit 1
fi

# Default values
DEFAULT_PATH="src/design-system"
DEFAULT_REPO_URL="https://github.com/yourusername/logician-design-system.git"

# Get user input
echo -e "${YELLOW}📍 Where would you like to install the design system?${NC}"
read -p "Path (default: $DEFAULT_PATH): " INSTALL_PATH
INSTALL_PATH=${INSTALL_PATH:-$DEFAULT_PATH}

echo -e "${YELLOW}🔗 What's the repository URL?${NC}"
read -p "Repository URL (default: $DEFAULT_REPO_URL): " REPO_URL
REPO_URL=${REPO_URL:-$DEFAULT_REPO_URL}

# Check if submodule already exists
if [ -d "$INSTALL_PATH" ]; then
    echo -e "${RED}❌ Directory $INSTALL_PATH already exists${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Adding submodule...${NC}"
git submodule add "$REPO_URL" "$INSTALL_PATH"

echo -e "${BLUE}🔄 Initializing submodule...${NC}"
git submodule update --init --recursive

echo -e "${GREEN}✅ Design system successfully added as submodule!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Install peer dependencies in your project:"
echo "   yarn add react react-dom @chakra-ui/react @emotion/react @emotion/styled framer-motion"
echo ""
echo "2. Wrap your app with ChakraProvider:"
echo "   import { ChakraProvider } from '@chakra-ui/react';"
echo ""
echo "3. Import components:"
echo "   import { Button, Input } from './$INSTALL_PATH';"
echo ""
echo "4. Update your tsconfig.json paths (optional):"
echo "   \"@/design-system/*\": [\"./$INSTALL_PATH/*\"]"
echo ""
echo -e "${GREEN}🎉 Happy coding!${NC}"
