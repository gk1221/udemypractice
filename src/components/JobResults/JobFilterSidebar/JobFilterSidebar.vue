<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="item-center flex text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>
      <Collapsible-acrrordion header="Degree" />

      <Collapsible-acrrordion header="Job types">
        <p>Placeholde place here</p></Collapsible-acrrordion
      >
      <JobFiltersSidebarOrganization />
    </section>
  </div>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAcrrordion from "@/components/Shared/CollapsibleAcrrordion.vue";
import JobFiltersSidebarOrganization from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganization.vue";

export default {
  name: "JobFilterSidebar",
  components: {
    ActionButton,
    CollapsibleAcrrordion,
    JobFiltersSidebarOrganization,
  },
};
</script>
