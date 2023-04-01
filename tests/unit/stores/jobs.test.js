import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { vi } from "vitest";
import { useJobsStore } from "@/stores/jobs";

vi.mock("axios");
describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axios.get.mockResolvedValue({ data: ["JOB 1", "JOB 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["JOB 1", "JOB 2"]);
    });
  });
});
