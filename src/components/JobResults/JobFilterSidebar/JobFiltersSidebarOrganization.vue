<template>
  <Collapsible-acrrordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in UNIQUE_ORGANIZATIONS"
            :key="organization"
            class="h-8 w-1/2"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              @change="selectedOrganization"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Collapsible-acrrordion>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

import CollapsibleAcrrordion from "@/components/Shared/CollapsibleAcrrordion.vue";

const selectedOrganizations = ref([]);

const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);

const userStore = useUserStore();
const router = useRouter();

const selectedOrganization = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({ name: "JobResults" });
};

// export default {
//   name: "JobFilterSidebarOrganization",
//   components: { CollapsibleAcrrordion },
//   data() {
//     return {
//       selectedOrganizations: [],
//     };
//   },
//   computed: {
//     ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
//   },
//   methods: {
//     ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
//     selectOrganization() {
//       this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
//       this.$router.push({ name: "JobResults" });
//     },
//   },
// };
</script>
