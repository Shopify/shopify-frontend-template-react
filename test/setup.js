import "@testing-library/jest-dom";
import "vi-fetch/setup";
import { mockFetch, prepareFetch } from "vi-fetch";

beforeEach(() => {
  mockFetch.clearAll();
});
