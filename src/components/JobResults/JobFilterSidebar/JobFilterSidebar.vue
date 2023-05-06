<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <JobFiltersSidebarPrompt />

      <JobFiltersSidebarSkills />

      <Collapsible-acrrordion header="Degrees">
        <job-filters-sidebar-degrees />
      </Collapsible-acrrordion>

      <Collapsible-acrrordion header="Job Types">
        <job-filters-sidebar-job-types />
      </Collapsible-acrrordion>
      <Collapsible-acrrordion header="Organizations">
        <job-filters-sidebar-organization />
      </Collapsible-acrrordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import CollapsibleAcrrordion from "@/components/Shared/CollapsibleAcrrordion.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarDegrees from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarOrganization from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganization.vue";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarSkills from "./JobFiltersSidebarSkills.vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
