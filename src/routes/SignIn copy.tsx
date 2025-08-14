// src/routes/SignIn.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';

function pickLandingPath(groups: string[] = []) {
  if (groups.includes('Admin'))  return '/admin/page1';
  if (groups.includes('Seller')) return '/seller/page1';
  if (groups.includes('Funder')) return '/funder/page1';
  if (groups.includes('Debtor')) return '/debtor/page1';
  return '/not-authorized';
}

export default function SignIn() {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((ctx) => [ctx.authStatus]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      (async () => {
        const session = await fetchAuthSession();
        const groups = (session.tokens?.idToken?.payload?.['cognito:groups'] as string[]) ?? [];
        navigate(pickLandingPath(groups), { replace: true });
      })();
    }
  }, [authStatus, navigate]);

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      {/* For invite-only, hide sign up; set `hideSignUp={true}` */}
      <Authenticator initialState="signIn" hideSignUp={true} />
    </div>
  );
}
