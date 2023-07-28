import { useEffect } from "react";
import {
  ClerkProvider,
  SignedOut,
  RedirectToSignIn,
  SignedIn,
} from "@clerk/clerk-react";
import Home from "./pages/Home";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Home />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
