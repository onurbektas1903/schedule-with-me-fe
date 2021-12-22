<script>
import { layoutComputed } from "@/state/helpers";
import Vertical from "./vertical";
import Horizontal from "./horizontal";

/**
 * Main component
 */
export default {
  components: { Vertical, Horizontal },
  data() {
    return {};
  },
  computed: {
    ...layoutComputed
  },
  mounted() {
    document.body.setAttribute("data-layout-mode", "dark");
    document.body.setAttribute("data-topbar", "dark");
  },
  created() {
  },
  methods: {}
};
</script>

<template>
  <div>
    <Vertical v-if="layoutType === 'vertical'" :layout="layoutType">
      <slot />
    </Vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>
