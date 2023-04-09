<template>
  <Collapsible-acrrordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="VueTube" type="checkbox" class="mr-3" />
            <label for="VueTube">VueTube</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Between Vue and me" type="checkbox" class="mr-3" />
            <label for="Between Vue and me">Between Vue</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Et Vue Brute" type="checkbox" class="mr-3" />
            <label for="Et Vue Brute">Et Vue Brute</label>
          </li>

          <li class="h-8 w-1/2">
            <input id="Vue and a Half Men" type="checkbox" class="mr-3" />
            <label for="Vue and a Half Men">Vue and a Half Men</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Collapsible-acrrordion>
</template>

<script>
import CollapsibleAcrrordion from "@/components/Shared/CollapsibleAcrrordion.vue";

export default {
  name: "JobFilterSidebarOrganization",
  components: { CollapsibleAcrrordion },
};
</script>
