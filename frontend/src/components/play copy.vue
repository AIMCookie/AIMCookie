<template>
  <div id="playPage">
    <v-stepper alt-labels value="2" style="margin: 0px 15%;">
      <v-stepper-header>
        <v-stepper-step step="1" complete>
          사운드 폰트
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">
          음악 제작
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>
<script>
import p5 from "@/libraries/sketch_play.js";

export default {
  name: "play",
  data() {
    return {};
  },
  mounted() {
    console.log("onMounted");
  },
  unmounted() {
    console.log("unMounted!");
  },
  methods: {},
};
</script>
<style scoped></style>
