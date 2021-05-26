<template>
  <div id="playCanvas" ref="playCanvas"></div>
</template>
<script>
import { onMounted, ref } from "vue";
import P5 from "p5";

export default {
  name: "play",
  setup() {
    const p5State = ref({
      p5: {},
    });
    const playCanvas = ref(null);
    const backgroundColor = "black";

    onMounted(() => {
      const width = playCanvas.value.parentNode.clientWidth;
      const height = playCanvas.value.parentNode.clientHeight;

      const sketch = (p) => {
        p.setup = () => {
          p.noLoop();
          p.createCanvas(width, height);
        };

        p.draw = () => {
          p.background(backgroundColor);
        }

        window.addEventListener("resize", () => {
          p5State.value.p5.resizeCanvas(
            playCanvas.value.parentNode.clientWidth,
            playCanvas.value.parentNode.clientHeight
          );
          console.log(
            playCanvas.value.parentNode.clientWidth,
            playCanvas.value.parentNode.clientHeight
          );
        });
      };

      p5State.value.p5 = new P5(sketch, "playCanvas");
    });

    return {
      playCanvas,
      p5State,
    };
  },
  mounted() {
      
  },
  methods: {},
};
</script>
<style >
</style>