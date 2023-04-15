import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { vi } from "vitest";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

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

describe("getter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique orgainizations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ];

      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Full-time" },
      ];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with the given organizations", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Microsoft" },
      ];

      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;
      expect(result).toEqual([
        { organization: "Google" },
        { organization: "Microsoft" },
      ]);
    });

    describe("when the user has not selected any or", () => {
      it("returns all jobs", () => {
        const jobsStore = useJobsStore();
        jobsStore.jobs = [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ];
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;
        expect(result).toEqual([
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Microsoft" },
        ]);
      });
    });
  });

  describe("FILTERED_JOBS_BY_JOB_TYPES", () => {
    it("identifies jobs that are associated with the given jbt", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Full-time" },
      ];

      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Temporary"];

      const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;
      expect(result).toEqual([
        { jobType: "Full-time" },
        { jobType: "Temporary" },
      ]);
    });

    describe("when the user has not selected any jbt", () => {
      it("returns all jobs", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const jobsStore = useJobsStore();
        jobsStore.jobs = [{ jobType: "Full-time" }, { jobType: "Temporary" }];

        const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;
        console.log(result);
        expect(result).toEqual([
          { jobType: "Full-time" },
          { jobType: "Temporary" },
        ]);
      });
    });
  });
});
