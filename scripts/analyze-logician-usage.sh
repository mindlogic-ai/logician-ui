#!/bin/bash

# logician-ui 컴포넌트 사용 분석 스크립트
# 사용법: ./analyze-logician-usage.sh [프로젝트 경로]

PROJECT_PATH="${1:-.}"

echo "=========================================="
echo "logician-ui 컴포넌트 사용 분석"
echo "프로젝트: $PROJECT_PATH"
echo "=========================================="
echo ""

# 1. 사용 중인 컴포넌트 목록
echo "📦 사용 중인 컴포넌트:"
echo "------------------------------------------"
grep -rh "from '@mindlogic-ai/logician-ui'" "$PROJECT_PATH" --include="*.tsx" --include="*.ts" 2>/dev/null | \
  grep -oE "import \{[^}]+\}" | \
  sed 's/import {//g; s/}//g' | \
  tr ',' '\n' | \
  sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | \
  grep -v "^$" | \
  sort -u

echo ""
echo "📊 컴포넌트별 사용 횟수:"
echo "------------------------------------------"
grep -rh "from '@mindlogic-ai/logician-ui'" "$PROJECT_PATH" --include="*.tsx" --include="*.ts" 2>/dev/null | \
  grep -oE "import \{[^}]+\}" | \
  sed 's/import {//g; s/}//g' | \
  tr ',' '\n' | \
  sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | \
  grep -v "^$" | \
  sort | uniq -c | sort -rn

echo ""
echo "⚠️  v2 Props 사용 현황 (마이그레이션 필요):"
echo "------------------------------------------"

# isLoading 사용
echo ""
echo "isLoading 사용:"
grep -rn "isLoading" "$PROJECT_PATH" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | head -20

# isDisabled 사용
echo ""
echo "isDisabled 사용:"
grep -rn "isDisabled" "$PROJECT_PATH" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | head -20

# isOpen 사용
echo ""
echo "isOpen 사용:"
grep -rn "isOpen" "$PROJECT_PATH" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | head -20

# isChecked 사용
echo ""
echo "isChecked 사용:"
grep -rn "isChecked" "$PROJECT_PATH" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | head -20

# colorScheme 사용
echo ""
echo "colorScheme 사용:"
grep -rn "colorScheme" "$PROJECT_PATH" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | head -20

# position (toast) 사용
echo ""
echo "useToast position 사용:"
grep -rn "position:" "$PROJECT_PATH" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | grep -i toast | head -20

# leftIcon/rightIcon 사용
echo ""
echo "leftIcon/rightIcon 사용:"
grep -rn "leftIcon\|rightIcon" "$PROJECT_PATH" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | head -20

echo ""
echo "=========================================="
echo "분석 완료"
echo "=========================================="
