// src/routes/NotAuthorized.tsx
// This component is a simple page shown to users who do not have
// permission to view a certain route or feature.
//This is basically the "access denied" sign for your app.
// If RequireAuth or RequireGroup determines that a user shouldn’t see something, 
// they redirect the user here so they understand why they can’t proceed.
export default function NotAuthorized() {
  // We return some basic JSX (HTML-like syntax in React)
  // to display a friendly message to the user.
  return (
    <div>
      Sorry, you are not authorized to view this page.
    </div>
  );
}