import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

// Create src directory
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
  console.log('Created src directory');
}

// Create main.tsx
fs.writeFileSync(path.join(srcDir, 'main.tsx'), `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);
console.log('Created main.tsx');

// Create index.css
fs.writeFileSync(path.join(srcDir, 'index.css'), `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900;
  }

  h1 {
    @apply text-4xl font-bold;
  }

  h2 {
    @apply text-3xl font-bold;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors;
  }
}
`);
console.log('Created index.css');

// Create App.tsx
fs.writeFileSync(path.join(srcDir, 'App.tsx'), `import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Arctior</h1>
        <p className="text-xl text-gray-600 mb-8">A modern React + TypeScript + Tailwind CSS application</p>
        <div className="flex gap-4">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  )
}

export default App
`);
console.log('Created App.tsx');

// Create App.css
fs.writeFileSync(path.join(srcDir, 'App.css'), `/* Custom App styles */
`);
console.log('Created App.css');

console.log('\nAll files created successfully!');
