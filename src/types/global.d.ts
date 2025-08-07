// Global type definitions
declare global {
  // Generic record type for objects with any properties - use Recordable instead of any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Recordable<T = any> = Record<string, T>;

  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
}

// Make this file a module to enable global type declarations
export {};
