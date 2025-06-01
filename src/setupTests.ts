// src/setupTests.ts
import '@testing-library/jest-dom/vitest'; // Note the /vitest suffix
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});