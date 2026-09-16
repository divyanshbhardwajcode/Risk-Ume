#!/bin/bash
F="src/components/onboarding/OnboardingFlow.tsx"
# Reset to a known state by running the original script carefully
git checkout -- $F
# Or if not in git, let's just do targeted replaces

# Primary background
sed -i 's/bg-\[#0a0a0a\]/bg-gray-50/g' $F
sed -i 's/text-gray-50 /text-gray-900 /g' $F
sed -i 's/bg-gray-900/bg-gray-200/g' $F
sed -i 's/bg-pink-500/bg-blue-600/g' $F
sed -i 's/text-pink-500/text-blue-600/g' $F
sed -i 's/text-white/text-gray-900/g' $F
sed -i 's/text-gray-400/text-gray-600/g' $F
sed -i 's/bg-\[#1a1a1a\]/bg-blue-50/g' $F
sed -i 's/border-pink-500\/50/border-blue-600\/50/g' $F
sed -i 's/shadow-\[0_0_15px_rgba(236,72,153,0.1)\]/shadow-sm/g' $F
sed -i 's/bg-\[#111\]/bg-white/g' $F
sed -i 's/border-\[#222\]/border-gray-200/g' $F
sed -i 's/border-\[#333\]/border-gray-200/g' $F
sed -i 's/hover:bg-\[#1a1a1a\]/hover:bg-gray-50/g' $F
sed -i 's/hover:border-\[#333\]/hover:border-gray-300/g' $F
sed -i 's/hover:text-gray-200/hover:text-gray-900/g' $F

# Buttons
sed -i 's/bg-white text-black hover:bg-gray-200/bg-blue-600 text-white hover:bg-blue-700/g' $F
# Because we replaced text-white with text-gray-900 globally:
sed -i 's/bg-blue-600 text-gray-900 hover:bg-blue-700/bg-blue-600 text-white hover:bg-blue-700/g' $F

# Ring
sed -i 's/focus-visible:ring-pink-500/focus-visible:ring-blue-600/g' $F
sed -i 's/ring-pink-500\/20/ring-blue-600\/20/g' $F
sed -i 's/text-pink-100/text-blue-900/g' $F
sed -i 's/bg-pink-500\/10/bg-blue-100/g' $F

echo "Done"
