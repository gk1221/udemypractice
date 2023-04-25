<template>
  <div>Job page for {{ currentJobId }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentJobId = computed(() => route.params.id);
</script>
