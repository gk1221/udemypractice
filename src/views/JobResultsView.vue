<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filter-sidebar />
    <job-listings />
  </div>
</template>

<script lang="ts" setup>
import JobFilterSidebar from "@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
</script>
