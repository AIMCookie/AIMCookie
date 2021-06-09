<template>
  <div id="playCanvas" ref="playCanvas"></div>
  <button class="neon-button" @click="playBtn" v-if="!isStarted">Play</button>

  <div v-if="isLoaded" :style="musicSliderStyle">
    <span style="color:white">음악 속도</span>
    <el-slider
      v-model="musicTempo"
      :step="10"
      show-stops
      :min="120"
      :max="300"
      ref="musicSlider"
    >
    </el-slider>
  </div>

  <!-- 처음 캔버스 -->
  <canvas
    :class="{ initCanvasActive: isLoaded }"
    ref="initCanvas"
    @mouseover="onmouseoverCanvas"
    @mouseout="onmouseoutCanvas"
  ></canvas>

  <el-button
    v-if="btnShow"
    :style="resetInitBtnStyle"
    icon="el-icon-refresh-right"
    @click="clickResetInitBtn"
    circle
  ></el-button>
  <el-button
    v-if="btnShow"
    :style="playInitBtnStyle"
    @click="clickPlayInitBtn"
    icon="el-icon-video-play"
    circle
  ></el-button>

  <!-- 반복 작업 캔버스 -->
  <canvas
    :class="{ initCanvasActive: initPlay }"
    ref="musicCanvas1"
    @mouseover="onmouseoverCanvas"
    @mouseout="onmouseoutCanvas"
    @click="pickMusic"
  ></canvas>
  <canvas
    :class="{ initCanvasActive: initPlay }"
    ref="musicCanvas2"
    @mouseover="onmouseoverCanvas"
    @mouseout="onmouseoutCanvas"
    @click="pickMusic"
  ></canvas>
  <canvas
    :class="{ initCanvasActive: initPlay }"
    ref="musicCanvas3"
    @mouseover="onmouseoverCanvas"
    @mouseout="onmouseoutCanvas"
    @click="pickMusic"
  ></canvas>
  <canvas
    :class="{ initCanvasActive: initPlay }"
    ref="musicCanvas4"
    @mouseover="onmouseoverCanvas"
    @mouseout="onmouseoutCanvas"
    @click="pickMusic"
  ></canvas>

  <!-- 조합 완료 표시 캔버스 -->
  <canvas
    :class="{ initCanvasActive: initPlay }"
    ref="musicCombinationCanvas"
    @mouseover="onmouseovermusicCombinationCanvas"
    @mouseout="onmouseoutCanvas"
  ></canvas>
  <el-button
    v-if="initPlay"
    :style="completeBtnStyle"
    @click="clickCompleteBtn"
    icon="el-icon-check"
    circle
  ></el-button>
  <a href="#" v-show="false" ref="downloadElement"></a>
</template>
<script>
import p5 from "@/libraries/sketch_play.js";

export default {
  name: "play",
  data() {
    return {
      music: {
        mm: null,
        musicVae: null,
        musicPlayer: null,
      },
      myP5: null,
      canvas: null,
      isStarted: false,
      isLoaded: false,

      focusCanvasViz: null,
      musicList: [],
      musicCombinationList: [],
      musicCombinationViz: null,
      completedMusic: null,
      initPlay: false,
      resetInitBtnStyle: {
        position: "absolute",
        left: 0,
        top: 0,
      },
      playInitBtnStyle: {
        position: "absolute",
        left: 0,
        top: 0,
        margin: "0px",
      },
      musicSliderStyle: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "300px",
      },
      completeBtnStyle: {
        position: "absolute",
        left: 0,
        top: 0,
      },
      musicTempo: 120,
      btnShow: false,
    };
  },
  mounted() {
    console.log("onMOunted");
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.myP5 == null) {
      console.log("init canvas");
      this.myP5 = this.myP5 || new p5();
      this.myP5.setLeftTop(
        this.$refs.playCanvas.getClientRects()[0].left,
        this.$refs.playCanvas.getClientRects()[0].top
      );
      this.canvas = this.myP5.createP5("playCanvas", width, height, "black");

      window.addEventListener("resize", () => {
        var left = this.$refs.playCanvas.getClientRects()[0].left;
        var top = this.$refs.playCanvas.getClientRects()[0].top;
        this.canvas.resizeCanvas(
          this.canvas.windowWidth - left,
          this.canvas.windowHeight
        );

        this.myP5.setLeftTop(left, top);
      });
    }
  },
  unmounted() {
    console.log("Unmounted!");
    if (this.myP5) {
      this.myP5.initVars();
    }
    if (this.musicPlayer) {
      this.musicPlayer.stop();
    }
  },
  methods: {
    playBtn() {
      this.isStarted = true;
      this.myP5.setPlay(true);
      this.myP5.setLoading(true);
      if (this.mm == null) {
        import("@magenta/music").then((module) => {
          this.mm = module;
          this.musicVae = new this.mm.MusicVAE(
            "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar"
          );

          this.musicPlayer = new this.mm.SoundFontPlayer(
            "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus",
            undefined,
            undefined,
            undefined,
            {
              run: (note) => {
                this.focusCanvasViz.redraw(note);
              },
              stop: () => {
                console.log("stop");
                this.focusCanvasViz.redraw({
                  pitch: 0,
                });
              },
            }
          );
          // this.musicPlayer.setTempo(this.musicTempo);
          this.musicVae.initialize().then(() => {
            this.musicVae
              .sample(1, undefined, undefined, undefined, this.musicTempo)
              .then((sample) => {
                // console.log(sample);
                // var newNote = this.mm.sequences.concatenate(sample);
                sample[0].tempos = [
                  {
                    time: 0,
                    qpm: this.musicTempo,
                  },
                ];

                var config = {
                  noteHeight: 12,
                  pixelsPerTimeStep: 40,
                  noteSpacing: 2,
                  noteRGB: "255,255,255",
                  minPitch: 31,
                  maxPitch: 74,
                  activeNoteRGB: "255, 0, 0",
                };
                var initViz = new this.mm.PianoRollCanvasVisualizer(
                  this.mm.sequences.unquantizeSequence(sample[0]),
                  this.$refs.initCanvas,
                  config
                );
                this.musicList.push({
                  canvas: this.$refs.initCanvas,
                  viz: initViz,
                  sample: sample[0],
                });

                this.focusCanvasViz = initViz;
                this.isLoaded = true;
                this.btnShow = true;
                this.myP5.setLoading(false);
                var width = 300,
                  height = 300;
                var left =
                  this.$refs.playCanvas.getClientRects()[0].width / 2 -
                  width / 2;
                var top =
                  this.$refs.playCanvas.getClientRects()[0].height / 2 -
                  height / 2;

                this.$refs["initCanvas"].style.left = left + "px";
                this.$refs["initCanvas"].style.top = top + "px";
                this.$refs["initCanvas"].style.width = width + "px";
                this.$refs["initCanvas"].style.height = height + "px";

                this.musicSliderStyle.left =
                  this.$refs.playCanvas.getClientRects()[0].width / 2 -
                  150 +
                  "px";
                this.musicSliderStyle.top =
                  this.$refs.playCanvas.getClientRects()[0].height / 2 -
                  350 +
                  "px";

                this.resetInitBtnStyle.left =
                  this.$refs.playCanvas.getClientRects()[0].width / 2 -
                  15 +
                  "px";
                this.resetInitBtnStyle.top =
                  this.$refs.playCanvas.getClientRects()[0].height / 2 +
                  170 +
                  "px";

                this.playInitBtnStyle.left =
                  this.$refs.playCanvas.getClientRects()[0].width / 2 -
                  15 +
                  "px";
                this.playInitBtnStyle.top =
                  this.$refs.playCanvas.getClientRects()[0].height / 2 +
                  170 +
                  50 +
                  "px";

                this.musicPlayer.start(sample[0]);
              });
          });
        });
      }
    },
    clickResetInitBtn() {
      if (this.musicPlayer.isPlaying()) {
        this.musicPlayer.stop();
      }
      this.myP5.setLoading(true);
      this.isLoaded = false;

      this.musicVae
        .sample(1, undefined, undefined, undefined, this.musicTempo)
        .then((sample) => {
          var config = {
            noteHeight: 12,
            pixelsPerTimeStep: 40,
            noteSpacing: 2,
            noteRGB: "255,255,255",
            minPitch: 31,
            maxPitch: 74,
            activeNoteRGB: "255, 0, 0",
          };

          sample[0].tempos = [
            {
              time: 0,
              qpm: this.musicTempo,
            },
          ];
          var initViz = new this.mm.PianoRollCanvasVisualizer(
            this.mm.sequences.unquantizeSequence(sample[0]),
            this.$refs.initCanvas,
            config
          );
          this.musicList[0].viz = initViz;
          this.musicList[0].sample = sample[0];

          this.focusCanvasViz = initViz;
          this.isLoaded = true;
          this.btnShow = true;
          this.myP5.setLoading(false);

          var width = 300,
            height = 300;
          var left =
            this.$refs.playCanvas.getClientRects()[0].width / 2 - width / 2;
          var top =
            this.$refs.playCanvas.getClientRects()[0].height / 2 - height / 2;

          this.$refs["initCanvas"].style.left = left + "px";
          this.$refs["initCanvas"].style.top = top + "px";
          this.$refs["initCanvas"].style.width = width + "px";
          this.$refs["initCanvas"].style.height = height + "px";

          this.musicPlayer.start(sample[0]);
        });
    },
    clickPlayInitBtn() {
      if (!this.initPlay) {
        this.musicVae
          .sample(4, undefined, undefined, undefined, this.musicTempo)
          .then((sample) => {
            sample[0].tempos = [
              {
                time: 0,
                qpm: this.musicTempo,
              },
            ];
            sample[1].tempos = [
              {
                time: 0,
                qpm: this.musicTempo,
              },
            ];
            sample[2].tempos = [
              {
                time: 0,
                qpm: this.musicTempo,
              },
            ];
            sample[3].tempos = [
              {
                time: 0,
                qpm: this.musicTempo,
              },
            ];

            var config = {
              noteHeight: 12,
              pixelsPerTimeStep: 40,
              noteSpacing: 2,
              noteRGB: "255,255,255",
              minPitch: 31,
              maxPitch: 74,
              activeNoteRGB: "255, 0, 0",
            };

            var musicCanvasViz1 = new this.mm.PianoRollCanvasVisualizer(
              this.mm.sequences.unquantizeSequence(sample[0]),
              this.$refs.musicCanvas1,
              config
            );
            this.musicList.push({
              canvas: this.$refs.musicCanvas1,
              viz: musicCanvasViz1,
              sample: sample[0],
            });

            var musicCanvasViz2 = new this.mm.PianoRollCanvasVisualizer(
              this.mm.sequences.unquantizeSequence(sample[1]),
              this.$refs.musicCanvas2,
              config
            );
            this.musicList.push({
              canvas: this.$refs.musicCanvas2,
              viz: musicCanvasViz2,
              sample: sample[1],
            });

            var musicCanvasViz3 = new this.mm.PianoRollCanvasVisualizer(
              this.mm.sequences.unquantizeSequence(sample[2]),
              this.$refs.musicCanvas3,
              config
            );
            this.musicList.push({
              canvas: this.$refs.musicCanvas3,
              viz: musicCanvasViz3,
              sample: sample[2],
            });

            var musicCanvasViz4 = new this.mm.PianoRollCanvasVisualizer(
              this.mm.sequences.unquantizeSequence(sample[3]),
              this.$refs.musicCanvas4,
              config
            );
            this.musicList.push({
              canvas: this.$refs.musicCanvas4,
              viz: musicCanvasViz4,
              sample: sample[3],
            });

            this.musicCombinationList.push(
              this.mm.sequences.unquantizeSequence(this.musicList[0].sample)
            );
            this.musicCombinationViz = new this.mm.PianoRollCanvasVisualizer(
              this.musicCombinationList[0],
              this.$refs.musicCombinationCanvas,
              config
            );

            var destX =
              -1 *
                parseInt(
                  (this.$refs.playCanvas.getClientRects()[0].width / 2) * 0.9
                ) +
              150;
            var destY =
              -1 *
                parseInt(
                  (this.$refs.playCanvas.getClientRects()[0].height / 2) *
                    0.9 *
                    0.5
                ) +
              150;

            this.$refs.initCanvas.style.transition = "transform 0.7s linear 0s";
            this.$refs.initCanvas.style.transform =
              "translate(" + destX + "px, " + destY + "px)";
            this.musicSliderStyle.transition = "transform 0.7s linear 0s";
            this.musicSliderStyle.transform =
              "translate(" + destX + "px, " + 0 + "px)";
            this.initPlay = true;
            this.btnShow = false;

            this.appearMusicCanvas();
          });
      }
    },
    onmouseoverCanvas(e) {
      if (this.initPlay) {
        this.musicList.some((item) => {
          if (item.canvas == e.target) {
            this.musicPlayer.stop();
            this.focusCanvasViz = item.viz;
            this.musicPlayer.start(item.sample);
            return true;
          }
        });
      }
    },
    onmouseoutCanvas() {
      if (this.initPlay) {
        this.musicPlayer.stop();
      }
    },
    onmouseovermusicCombinationCanvas() {
      if (this.initPlay) {
        this.focusCanvasViz = this.musicCombinationViz;
        this.musicPlayer.start(
          this.mm.sequences.concatenate(this.musicCombinationList)
        );
      }
    },
    pickMusic(e) {
      if (this.initPlay) {
        this.musicList.some((item) => {
          if (item.canvas == e.target) {
            if (this.musicPlayer.isPlaying()) {
              this.musicPlayer.stop();
            }
            this.myP5.setLoading(true);

            this.musicPlayer.setTempo(this.musicTempo);
            this.musicVae
              .sample(4, undefined, undefined, undefined, this.musicTempo)
              .then((sample) => {
                sample[0].tempos = [
                  {
                    time: 0,
                    qpm: this.musicTempo,
                  },
                ];
                sample[1].tempos = [
                  {
                    time: 0,
                    qpm: this.musicTempo,
                  },
                ];
                sample[2].tempos = [
                  {
                    time: 0,
                    qpm: this.musicTempo,
                  },
                ];
                sample[3].tempos = [
                  {
                    time: 0,
                    qpm: this.musicTempo,
                  },
                ];
                var config = {
                  noteHeight: 12,
                  pixelsPerTimeStep: 40,
                  noteSpacing: 2,
                  noteRGB: "255,255,255",
                  minPitch: 31,
                  maxPitch: 74,
                  activeNoteRGB: "255, 0, 0",
                };
                this.musicCombinationList.push(
                  this.mm.sequences.unquantizeSequence(item.sample)
                );
                this.musicCombinationViz = new this.mm.PianoRollCanvasVisualizer(
                  this.mm.sequences.concatenate(this.musicCombinationList),
                  this.$refs.musicCombinationCanvas,
                  config
                );

                var initViz = new this.mm.PianoRollCanvasVisualizer(
                  this.mm.sequences.unquantizeSequence(item.sample),
                  this.$refs.initCanvas,
                  config
                );
                this.musicList[0].viz = initViz;
                this.musicList[0].sample = item.sample;
                var musicCanvasViz1 = new this.mm.PianoRollCanvasVisualizer(
                  this.mm.sequences.unquantizeSequence(sample[0]),
                  this.$refs.musicCanvas1,
                  config
                );
                this.musicList[1].viz = musicCanvasViz1;
                this.musicList[1].sample = sample[0];

                var musicCanvasViz2 = new this.mm.PianoRollCanvasVisualizer(
                  this.mm.sequences.unquantizeSequence(sample[1]),
                  this.$refs.musicCanvas2,
                  config
                );
                this.musicList[2].viz = musicCanvasViz2;
                this.musicList[2].sample = sample[1];

                var musicCanvasViz3 = new this.mm.PianoRollCanvasVisualizer(
                  this.mm.sequences.unquantizeSequence(sample[2]),
                  this.$refs.musicCanvas3,
                  config
                );
                this.musicList[3].viz = musicCanvasViz3;
                this.musicList[3].sample = sample[2];

                var musicCanvasViz4 = new this.mm.PianoRollCanvasVisualizer(
                  this.mm.sequences.unquantizeSequence(sample[3]),
                  this.$refs.musicCanvas4,
                  config
                );
                this.musicList[4].viz = musicCanvasViz4;
                this.musicList[4].sample = sample[3];

                var width = 300,
                  height = 300;
                var left =
                  this.$refs.playCanvas.getClientRects()[0].width / 2 -
                  width / 2;
                var top =
                  this.$refs.playCanvas.getClientRects()[0].height / 2 -
                  height / 2;

                this.$refs["initCanvas"].style.left = left + "px";
                this.$refs["initCanvas"].style.top = top + "px";
                this.$refs["initCanvas"].style.width = width + "px";
                this.$refs["initCanvas"].style.height = height + "px";
                this.appearMusicCanvas();
                this.myP5.setLoading(false);
              });
            return true;
          }
        });
      }
    },
    appearMusicCanvas() {
      var width = 200,
        height = 120;
      var left =
        this.$refs.playCanvas.getClientRects()[0].width * 0.78 - width / 2;
      var top =
        this.$refs.playCanvas.getClientRects()[0].height * 0.9 * 0.15 -
        height / 2;
      this.$refs.musicCanvas1.style.left = left + "px";
      this.$refs.musicCanvas1.style.top = top + "px";
      this.$refs.musicCanvas1.style.width = width + "px";
      this.$refs.musicCanvas1.style.height = height + "px";
      left = this.$refs.playCanvas.getClientRects()[0].width * 0.78 - width / 2;
      top =
        this.$refs.playCanvas.getClientRects()[0].height * 0.9 * 0.35 -
        height / 2;
      this.$refs.musicCanvas2.style.left = left + "px";
      this.$refs.musicCanvas2.style.top = top + "px";
      this.$refs.musicCanvas2.style.width = width + "px";
      this.$refs.musicCanvas2.style.height = height + "px";
      left = this.$refs.playCanvas.getClientRects()[0].width * 0.78 - width / 2;
      top =
        this.$refs.playCanvas.getClientRects()[0].height * 0.9 * 0.55 -
        height / 2;
      this.$refs.musicCanvas3.style.left = left + "px";
      this.$refs.musicCanvas3.style.top = top + "px";
      this.$refs.musicCanvas3.style.width = width + "px";
      this.$refs.musicCanvas3.style.height = height + "px";
      left = this.$refs.playCanvas.getClientRects()[0].width * 0.78 - width / 2;
      top =
        this.$refs.playCanvas.getClientRects()[0].height * 0.9 * 0.75 -
        height / 2;
      this.$refs.musicCanvas4.style.left = left + "px";
      this.$refs.musicCanvas4.style.top = top + "px";
      this.$refs.musicCanvas4.style.width = width + "px";
      this.$refs.musicCanvas4.style.height = height + "px";

      var widthComb = this.$refs.playCanvas.getClientRects()[0].width - 30;
      var heightComb = 150;
      this.$refs.musicCombinationCanvas.style.left = 10 + "px";
      this.$refs.musicCombinationCanvas.style.top =
        this.$refs.playCanvas.getClientRects()[0].height * 0.8 + "px";
      this.$refs.musicCombinationCanvas.style.width = widthComb + "px";
      this.$refs.musicCombinationCanvas.style.height = heightComb + "px";

      this.completeBtnStyle.left = 10 + "px";
      this.completeBtnStyle.top =
        this.$refs.playCanvas.getClientRects()[0].height * 0.8 - 50 + "px";
    },
    clickCompleteBtn() {
      // Create midi out of magenteSequence
      var seq = this.mm.sequences.concatenate(this.musicCombinationList);
      console.log(seq);
      seq.notes.forEach(n => n.velocity = 120);
      const magentaMidi = this.mm.sequenceProtoToMidi(seq);

      // Convert byte array to file
      const magentaFile = new Blob([magentaMidi], { type: "audio/midi" });

      // Get url of the file
      const magentaURL = URL.createObjectURL(magentaFile);
      this.$refs.downloadElement.href = magentaURL;
      this.$refs.downloadElement.download = "MY_MIDI.midi";
      this.$refs.downloadElement.click();
    },
  },
};
</script>
<style scoped>
.neon-button {
  font-size: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  margin: auto;

  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  border: hsl(317 100% 54%) 0.125em solid;
  padding: 0.25em 1em;
  border-radius: 0.25em;

  background: hsl(323 21% 16%);
  color: hsl(317 100% 54%);
  text-shadow: 0 0 0.125em hsl(0 0% 0% / 0.3), 0 0 0.45em currentColor;

  box-shadow: inset 0 0 0.5em 0 hsl(317 100% 54%), 0 0 0.5em 0 hsl(317 100% 54%);
}

.neon-button::before {
  pointer-events: none;
  content: "";
  position: absolute;
  background: hsl(317 100% 54%);
  top: 120%;
  left: 0;
  width: 100%;
  height: 100%;

  transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
  filter: blur(1em);
  opacity: 0.7;
}

.neon-button::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 2em 0.5em hsl(317 100% 54%);
  opacity: 0;
  background-color: hsl(317 100% 54%);
  z-index: -1;
  transition: opacity 100ms linear;
}

.neon-button:hover,
.neon-button:focus {
  color: hsl(317 100% 54%);
  /* text-shadow: none; */

  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}

.neon-button:hover::before,
.neon-button:focus::before {
  opacity: 1;
}
.neon-button:hover::after,
.neon-button:focus::after {
  opacity: 1;
}
.initCanvasActive {
  position: absolute;
  box-shadow: 0 0 2em 0.5em hsl(317 100% 54%);
}
.resetInitBtn {
  position: absolute;
}
</style>
