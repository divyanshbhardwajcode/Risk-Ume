import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add import
if (!content.includes('ProfileTab')) {
  content = content.replace("import { CareerPath } from '@/components/career-path/CareerPath';", "import { CareerPath } from '@/components/career-path/CareerPath';\nimport { ProfileTab } from '@/components/profile/ProfileTab';");
}

// Add state to activeTab
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'risk' | 'ats' | 'builder' | 'history' | 'pricing' | 'settings' | 'career-path'>('career-path');",
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'risk' | 'ats' | 'builder' | 'history' | 'pricing' | 'settings' | 'career-path' | 'profile'>('career-path');"
);

// Add button to header nav
const profileBtn = `              <button 
                onClick={() => setActiveTab('profile')}
                className={\`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 \${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}\`}
              >
                <User className="w-4 h-4" />
                Profile
              </button>`;

if (!content.includes("setActiveTab('profile')")) {
  content = content.replace("              <button \n                onClick={() => setActiveTab('career-path')}", profileBtn + "\n              <button \n                onClick={() => setActiveTab('career-path')}");
}

if (!content.includes("User } from 'lucide-react'")) {
  content = content.replace("import { ", "import { User, ");
}

// Render tab
if (!content.includes("activeTab === 'profile' && <ProfileTab />")) {
  content = content.replace("{activeTab === 'career-path' && <CareerPath onNavigate={setActiveTab as any} />}", "{activeTab === 'career-path' && <CareerPath onNavigate={setActiveTab as any} />}\n        {activeTab === 'profile' && <ProfileTab />}");
}

fs.writeFileSync('src/App.tsx', content);
