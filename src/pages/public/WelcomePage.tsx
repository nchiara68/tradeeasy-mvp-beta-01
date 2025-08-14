// src/pages/public/WelcomePage.tsx
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div style={{ maxWidth: 640, margin: '72px auto', textAlign: 'center' }}>
      <h1>Welcome</h1>
      <p>This is a public landing page.</p>
      <Link to="/signin">
        <button>Sign in</button>
      </Link>
    </div>
  );
}
