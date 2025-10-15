---
trigger: always_on
---

# Frontend Design Guideline

This document summarizes key frontend design principles and rules, showcasing
recommended patterns. Follow these guidelines when writing frontend code.

# Readability

Improving the clarity and ease of understanding code.

## Naming Magic Numbers

**Rule:** Replace magic numbers with named constants for clarity.

**Reasoning:**

- Improves clarity by giving semantic meaning to unexplained values.
- Enhances maintainability.

#### Recommended Pattern:

```typescript
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS); // Clearly indicates waiting for animation
  await refetchPostLike();
}
```

## Abstracting Implementation Details

**Rule:** Abstract complex logic/interactions into dedicated components/HOCs.

**Reasoning:**

- Reduces cognitive load by separating concerns.
- Improves readability, testability, and maintainability of components.

#### Recommended Pattern 1: Auth Guard

(Login check abstracted to a wrapper/guard component)

```tsx
// App structure
function App() {
  return (
    <AuthGuard>
      {" "}
      {/* Wrapper handles auth check */}
      <LoginStartPage />
    </AuthGuard>
  );
}

// AuthGuard component encapsulates the check/redirect logic
function AuthGuard({ children }) {
  const status = useCheckLoginStatus();
  useEffect(() => {
    if (status === "LOGGED_IN") {
      location.href = "/home";
    }
  }, [status]);

  // Render children only if not logged in, otherwise render null (or loading)
  return status !== "LOGGED_IN" ? children : null;
}

// LoginStartPage is now simpler, focused only on login UI/logic
function LoginStartPage() {
  // ... login related logic ONLY ...
  return <>{/* ... login related components ... */}</>;
}
```

#### Recommended Pattern 2: Dedicated Interaction Component

(Dialog logic abstracted into a dedicated `InviteButton` component)

```tsx
export function FriendInvitation() {
  const { data } = useQuery(/* ... */);

  return (
    <>
      {/* Use the dedicated button component */}
      <InviteButton name={data.name} />
      {/* ... other UI ... */}
    </>
  );
}

// InviteButton handles the confirmation flow internally
function InviteButton({ name }) {
  const handleClick = async () => {
    const canInvite = await overlay.openAsync(({ isOpen, close }) => (
      <ConfirmDialog
        title={`Share with ${name}`}
        // ... dialog setup ...
      />
    ));

    if (canInvite) {
      await sendPush();
    }
  };

  return <Button onClick={handleClick}>Invite</Button>;
}
```

## Separating Code Paths for Conditional Rendering

**Rule:** Separate significantly different conditional UI/logic into distinct
components.

**Reasoning:**

- Improves readability by avoiding complex conditionals within one component.
- Ensures each specialized component has a clear, single responsibility.

#### Recommended Pattern:

(Separate components for each role)

```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";

  // Delegate rendering to specialized components
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}

// Component specifically for the 'viewer' role
function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

// Component specifically for the 'admin' (or non-viewer) role
function AdminSubmitButton() {
  useEffect(() => {
    showAnimation(); // Animation logic isolated here
  }, []);

  return <Button type="submit">Submit</Button>;
}
```

## Simplifying Complex Ternary Operators

**Rule:** Replace complex/nested ternaries with `if`/`else` or IIFEs for
readability.

**Reasoning:**

- Makes conditional logic easier to follow quickly.
- Improves overall code maintainability.

#### Recommended Pattern:

(Using an IIFE with `if` statements)

```typescript
const status = (() => {
  if (ACondition && BCondition) return "BOTH";
  if (ACondition) return "A";
  if (BCondition) return "B";
  return "NONE";
})();
```

## Reducing Eye Movement (Colocating Simple Logic)

**Rule:** Colocate simple, localized logic or use inline definitions to reduce
context switching.

**Reasoning:**

- Allows top-to-bottom reading and faster comprehension.
- Reduces cognitive load from context switching (eye movement).

#### Recommended Pattern A: Inline `switch`

```tsx
function Page() {
  const user = useUser();

  // Logic is directly visible here
  switch (user.role) {
    case "admin":
      return (
        <div>
          <Button disabled={false}>Invite</Button>
          <Button disabled={false}>View</Button>
        </div>
      );
    case "viewer":
      return (
        <div>
          <Button disabled={true}>Invite</Button> {/* Example for viewer */}
          <Button disabled={false}>View</Button>
        </div>
      );
    default:
      return null;
  }
}
```

#### Recommended Pattern B: Colocated simple policy object

```tsx
function Page() {
  const user = useUser();
  // Simple policy defined right here, easy to see
  const policy = {
    admin: { canInvite: true, canView: true },
    viewer: { canInvite: false, canView: true },
  }[user.role];

  // Ensure policy exists before accessing properties if role might not match
  if (!policy) return null;

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}
```

## Naming Complex Conditions

**Rule:** Assign complex boolean conditions to named variables.

**Reasoning:**

- Makes the _meaning_ of the condition explicit.
- Improves readability and self-documentation by reducing cognitive load.

#### Recommended Pattern:

(Conditions assigned to named variables)

```typescript
const matchedProducts = products.filter((product) => {
  // Check if product belongs to the target category
  const isSameCategory = product.categories.some((category) => category.id === targetCategory.id);

  // Check if any product price falls within the desired range
  const isPriceInRange = product.prices.some((price) => price >= minPrice && price <= maxPrice);

  // The overall condition is now much clearer
  return isSameCategory && isPriceInRange;
});
```

**Guidance:** Name conditions when the logic is complex, reused, or needs unit
testing. Avoid naming very simple, single-use conditions.

# Predictability

Ensuring code behaves as expected based on its name, parameters, and context.

## Standardizing Return Types

**Rule:** Use consistent return types for similar functions/hooks.

**Reasoning:**

- Improves code predictability; developers can anticipate return value shapes.
- Reduces confusion and potential errors from inconsistent types.

#### Recommended Pattern 1: API Hooks (React Query)

```typescript
// Always return the Query object
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// Assuming fetchUser returns Promise<UserType>
function useUser(): UseQueryResult<UserType, Error> {
  const query = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  return query;
}

// Assuming fetchServerTime returns Promise<Date>
function useServerTime(): UseQueryResult<Date, Error> {
  const query = useQuery({
    queryKey: ["serverTime"],
    queryFn: fetchServerTime,
  });
  return query;
}
```

#### Recommended Pattern 2: Validation Functions

(Using a consistent type, ideally a Discriminated Union)

```typescript
type ValidationResult = { ok: true } | { ok: false; reason: string };

function checkIsNameValid(name: string): ValidationResult {
  if (name.length === 0) return { ok: false, reason: "Name cannot be empty." };
  if (name.length >= 20) return { ok: false, reason: "Name cannot be longer than 20 characters." };
  return { ok: true };
}

function checkIsAgeValid(age: number): ValidationResult {
  if (!Number.isInteger(age)) return { ok: false, reason: "Age must be an integer." };
  if (age < 18) return { ok: false, reason: "Age must be 18 or older." };
  if (age > 99) return { ok: false, reason: "Age must be 99 or younger." };
  return { ok: true };
}

// Usage allows safe access to 'reason' only when ok is false
const nameValidation = checkIsNameValid(name);
if (!nameValidation.ok) {
  console.error(nameValidation.reason);
}
```

## Revealing Hidden Logic (Single Responsibility)

**Rule:** Avoid hidden side effects; functions should only perform actions
implied by their signature (SRP).

**Reasoning:**

- Leads to predictable behavior without unintended side effects.
- Creates more robust, testable code through separation of concerns (SRP).

#### Recommended Pattern:

```typescript
// Function *only* fetches balance
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");
  return balance;
}

// Caller explicitly performs logging where needed
async function handleUpdateClick() {
  const balance = await fetchBalance(); // Fetch
  logging.log("balance_fetched"); // Log (explicit action)
  await syncBalance(balance); // Another action
}
```

## Using Unique and Descriptive Names (Avoiding Ambiguity)

**Rule:** Use unique, descriptive names for custom wrappers/functions to avoid
ambiguity.

**Reasoning:**

- Avoids ambiguity and enhances predictability.
- Allows developers to understand specific actions (e.g., adding auth) directly
  from the name.

#### Recommended Pattern:

```typescript
// In httpService.ts - Clearer module name
import { http as httpLibrary } from "@some-library/http";

export const httpService = {
  // Unique module name
  async getWithAuth(url: string) {
    // Descriptive function name
    const token = await fetchToken();
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// In fetchUser.ts - Usage clearly indicates auth
import { httpService } from "./httpService";
export async function fetchUser() {
  // Name 'getWithAuth' makes the behavior explicit
  return await httpService.getWithAuth("...");
}
```
