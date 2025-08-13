// amplify/auth/resource.ts

import { defineAuth } from '@aws-amplify/backend';
import { ROLES } from '../../shared/roles.config';


// Define authentication configuration
export const auth = defineAuth({
  // Allow users to sign in with their email address
  loginWith: {
    email: true,
    // Optionally enable username sign-in
    // username: true,
  },

  // Define Cognito User Pool groups
  // These groups will be created automatically during deployment
  groups: [...ROLES], // creates Seller, Debtor, Funder, Admin,

  // Optional: Configure MFA or password policies
  // multifactor: { mode: 'ON', types: ['TOTP'] }
});
