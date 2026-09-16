F="src/components/career-path/CareerPath.tsx"
sed -i 's/text-pink-500/text-blue-600/g' $F
sed -i 's/bg-pink-500/bg-blue-600/g' $F
sed -i 's/ring-pink-500\/20/ring-blue-600\/20/g' $F
sed -i 's/hover:text-pink-500/hover:text-blue-600/g' $F

A="src/App.tsx"
sed -i 's/bg-\[#0a0a0a\]/bg-gray-50/g' $A
sed -i 's/text-pink-500/text-blue-600/g' $A

echo "Done"
