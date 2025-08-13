// src/auth/useGroups.ts
// Import React hooks for managing state and running side effects
import { useEffect, useState } from 'react';
// Import Amplify Auth function to get the current user's session
import { fetchAuthSession } from 'aws-amplify/auth';

// This is a custom React hook that you can use inside any component
export function useGroups() {
  // State variable for the user's groups.
  // null means "we haven’t tried loading them yet".
  const [groups, setGroups] = useState<string[] | null>(null);

  // State variable for whether we’re still fetching the groups.
  const [loading, setLoading] = useState(true);

  // useEffect runs after the component is first rendered.
  // Here, we use it to fetch the user's group info from Amplify Auth.
  useEffect(() => {
    // This flag will help us avoid updating state after the component unmounts.
    let active = true;

    // We wrap our async code in an immediately-invoked function
    // because useEffect itself can’t be async.
    (async () => {
      try {
        // 1. Get the current auth session (tokens, user info, etc.)
        const session = await fetchAuthSession();

        // 2. Pull out the ID token (contains user claims/attributes)
        const idToken = session.tokens?.idToken;

        // 3. Read the "cognito:groups" claim from the ID token payload.
        //    This is where Cognito stores the groups a user belongs to.
        //    If it's missing, use an empty array [].
        const g = (idToken?.payload?.['cognito:groups'] as string[]) ?? [];

        // 4. Only update state if the component is still active
        if (active) setGroups(g);

      } catch {
        // If anything goes wrong (e.g., user not logged in),
        // set groups to an empty array instead of crashing.
        if (active) setGroups([]);
      } finally {
        // No matter what happens (success or error),
        // mark loading as false so the UI can stop showing a spinner.
        if (active) setLoading(false);
      }
    })();

    // Cleanup function — runs when the component using this hook unmounts.
    // It flips the `active` flag so we stop any state updates.
    return () => { active = false; };

    // Empty dependency array [] means this effect only runs once when the
    // component mounts, not every time it re-renders.
  }, []);

  // Return both the user's groups and the loading state so components
  // can use them however they need.
  return { groups, loading };
}
