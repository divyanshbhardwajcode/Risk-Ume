#!/bin/bash

# Update App.tsx
sed -i 's/bg-\[#0a0a0a\]/bg-gray-50/g' src/App.tsx
sed -i 's/text-pink-500/text-blue-600/g' src/App.tsx

# Update CareerPath.tsx
sed -i 's/pink-500/blue-600/g' src/components/career-path/CareerPath.tsx

# Update OnboardingFlow.tsx
F="src/components/onboarding/OnboardingFlow.tsx"

# First, fix buttons and specific hover states
sed -i 's/bg-white text-black hover:bg-gray-200/bg-blue-600 text-white hover:bg-blue-700/g' $F
sed -i 's/hover:text-white/hover:text-blue-600/g' $F
sed -i 's/hover:text-gray-200/hover:text-blue-700/g' $F
sed -i 's/text-white shadow-\[0_0_15px_rgba(236,72,153,0.1)\]/text-blue-900 shadow-sm/g' $F

# Colors mapping
sed -i 's/bg-\[#0a0a0a\]/bg-gray-50/g' $F
sed -i 's/bg-\[#111\]/bg-white/g' $F
sed -i 's/bg-\[#1a1a1a\]/bg-blue-50/g' $F

# Borders
sed -i 's/border-\[#333\]/border-gray-200/g' $F
sed -i 's/border-\[#222\]/border-gray-200/g' $F
sed -i 's/border-\[#555\]/border-gray-300/g' $F
sed -i 's/border-gray-800/border-gray-200/g' $F
sed -i 's/border-gray-600/border-blue-200/g' $F

# Gray background replacements
sed -i 's/bg-gray-900/bg-gray-100/g' $F
sed -i 's/bg-gray-800/bg-gray-100/g' $F

# Text colors
sed -i 's/text-white/text-gray-900/g' $F
sed -i 's/text-gray-50\b/text-gray-900/g' $F
# Wait, we changed buttons to text-white, let's fix that!
sed -i 's/text-gray-900 hover:bg-blue-700/text-white hover:bg-blue-700/g' $F

# Pinks to Blues
sed -i 's/text-pink-500/text-blue-600/g' $F
sed -i 's/text-pink-400/text-blue-500/g' $F
sed -i 's/text-pink-100/text-blue-900/g' $F
sed -i 's/bg-pink-500/bg-blue-600/g' $F
sed -i 's/border-pink-500\/50/border-blue-600\/50/g' $F
sed -i 's/ring-pink-500\/20/ring-blue-600\/20/g' $F
sed -i 's/ring-pink-500/ring-blue-600/g' $F

echo "Done"
