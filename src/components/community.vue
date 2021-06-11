<template>
  <div id="community">
    <el-button plain style="margin-left:10px;">최신 음악</el-button>
    <el-button plain>인기 음악</el-button>
    <el-dialog v-model="dialogVisible" width="50%">
      <el-row
        class="community_list"
        type="flex"
        justify="center"
        style="text-align:center;"
      >
        <el-col :span="12"
          ><img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <p>Sample Music</p>
          <p>Author</p>
          <el-button icon="el-icon-video-play" circle></el-button>
          <el-button icon="el-icon-video-pause" circle></el-button>
          <input
            class="range"
            type="range"
            :value="duration"
            min="0"
            max="100"
            @input="onChangeSlider"
          />
        </el-col>
        <el-col :span="12">
          <div id="contentSection" style="text-align:left">
            <h3>자세한 설명</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <el-input
              placeholder="댓글 입력..."
              v-model="dialogForm.replyText"
            >
              <template #append>
                <el-button icon="el-icon-check"></el-button>
              </template>
            </el-input>
          </div>
          <div id="commentSection" style="height:150px;">
            <hr />
            <el-scrollbar
              ><ul>
                <li v-for="(i, idx) in count" :key="idx">
                  사용자{{ i }} : Sample Text{{ i }}
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">닫기</el-button>
        </span>
      </template>
    </el-dialog>
    <el-row class="community_list" type="flex" justify="center">
      <el-col :span="6" class="colHover">
        <el-card
          @click="dialogVisible = true"
          shadow="hover"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 1</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author A</p></el-link
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 2</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author B</p></el-link
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 3</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author C</p></el-link
            >
          </div>
        </el-card>
      </el-col> </el-row
    ><el-row class="community_list" type="flex" justify="center">
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 1</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author A</p></el-link
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 2</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author B</p></el-link
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 3</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author C</p></el-link
            >
          </div>
        </el-card>
      </el-col> </el-row
    ><el-row class="community_list" type="flex" justify="center">
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 1</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author A</p></el-link
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 2</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author B</p></el-link
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="colHover">
        <el-card
          shadow="hover"
          @click="dialogVisible = true"
          :body-style="{ padding: '0px', textAlign: 'center' }"
        >
          <img
            style="width:100%;height:250px; padding-left:3px;"
            :src="require('@/assets/album.png')"
            class="image"
          />
          <div style="padding: 14px;">
            <el-link :underline="false" style="display:block" href="#"
              ><p>Sample Music 3</p></el-link
            >
            <el-link :underline="false" style="display:block" href="#"
              ><p>Author C</p></el-link
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "community",
  data() {
    return {
      dialogVisible: false,
      dialogForm: {
        replyText: "",
      },
      count: 20,
      duration: 20,
    };
  },
  methods: {
    load() {
      console.log("scrolling");
      this.count += 2;
    },
    onChangeSlider(e) {
      this.duration = e.target.value;
    },
  },
};
</script>
<style scoped>
.el-card {
  border-radius: 20px;
  width: 100%;
  text-align: center;
  padding: 10px;
}
.el-card:hover,
.el-card:focus {
  /* color: hsl(317 100% 54%); */
  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}
#community {
  padding-top: 50px;
}
.community_list {
  margin-top: 50px;
}
.el-col {
  margin: 0px 50px 50px 50px;
  max-width: 260px;
}

.colHover:hover {
  transition: all ease 0.5s;
  transform: rotateY(-10deg) rotateX(10deg);
}
.colHover:not(:hover) {
  transition: all ease 0.5s;
  transform: rotate(0deg);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 200px;
}
li {
  color: #7dbcfc;
  background: #e8f3fe;
  text-align: left;
  margin: 0 0 5px 0;
}
.range {
  width: 100%;
  height: 15px;
  -webkit-appearance: none;
  background: #111;
  outline: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 1);
  margin-top: 20px;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #00fd0a;
  cursor: pointer;
  border: 4px solid #333;
  box-shadow: -407px 0 0 400px #00fd0a;
}
</style>
