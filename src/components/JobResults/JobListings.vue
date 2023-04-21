<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import JobListing from "@/components/JobResults/JobListing.vue";
import { useJobsStore } from "@/stores/jobs";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const route = useRoute();
const currentPage = computed(() => Number.parseInt(route.query.page || "1"));
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

const displayedJobs = computed(() => {
  const pageString = currentPage.value;
  const pageNumber = Number.parseInt(pageString);
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

// export default {
//   name: "JobListings",
//   components: {
//     JobListing,
//   },

//   computed: {
//     currentPage() {
//       return Number.parseInt(this.$route.query.page || "1");
//     },
//     previousPage() {
//
//     },
//     ...mapState(useJobsStore, {
//       FILTERED_JOBS,
//       nextPage() {
//
//       },
//       displayedJobs() {
//         const pageString = this.currentPage;
//         const pageNumber = Number.parseInt(pageString);
//         const firstJobIndex = (pageNumber - 1) * 10;
//         const lastJobIndex = pageNumber * 10;
//         return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
//       },
//     }),
//   },
//   async mounted() {
//     this.FETCH_JOBS();
//   },
//   methods: {
//     ...mapActions(useJobsStore, [FETCH_JOBS]),
//   },
// };
</script>
