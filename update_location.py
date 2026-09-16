import re

with open("src/components/onboarding/OnboardingFlow.tsx", "r") as f:
    content = f.read()

# Replace states in LocationStep
old_states = r"const \[loc, setLoc\] = useState\(data.current_location \|\| ''\);"
new_states = r"""const [loc, setLoc] = useState<LocationResult | null>(data.current_location_obj || (data.current_location ? { id: 'legacy', city: data.current_location, country: '', formattedAddress: data.current_location } : null));"""

content = re.sub(old_states, new_states, content)

# Replace the Input component
old_input = r"""<Input \s*value=\{loc\} onChange=\{e => setLoc\(e.target.value\)\}\s*placeholder="Start typing a city or country"\s*className="bg-white border-gray-200 h-12 rounded-xl text-gray-900 font-sans focus-visible:ring-blue-600"\s*/>"""

new_input = r"""<LocationAutocomplete value={loc} onSelect={setLoc} placeholder="Start typing a city or country" />"""

content = re.sub(old_input, new_input, content, flags=re.MULTILINE)

# Replace the save call
old_save = r"""onClick=\{\(\) => save\(\{ work_preference: pref, current_location: loc, open_to_relocation: open \}\)\}"""
new_save = r"""onClick={() => save({ work_preference: pref, current_location: loc?.formattedAddress || '', current_location_obj: loc, open_to_relocation: open })}"""

content = re.sub(old_save, new_save, content)

with open("src/components/onboarding/OnboardingFlow.tsx", "w") as f:
    f.write(content)
