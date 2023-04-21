<template>
  <Collapsible-acrrordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              @change="selectedValue"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Collapsible-acrrordion>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import CollapsibleAcrrordion from "@/components/Shared/CollapsibleAcrrordion.vue";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqueValues: {
    type: Set,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref([]);
const router = useRouter();

const selectedValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
};

// export default {
//   name: "JobFiltersSidebarJobTypes",
//   components: { CollapsibleAcrrordion },
//   data() {
//     return {
//       selectedJobTypes: [],
//     };
//   },
//   computed: {
//     ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),
//   },
//   methods: {
//     ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
//     selectedjobTypes() {
//       this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
//       this.$router.push({ name: "JobResults" });
//     },
//   },
// };
</script>
