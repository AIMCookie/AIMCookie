<template>
  <el-container>
    <el-header style="height: 100px">
      <div
        class="logo"
        style="display: flex"
        @click="$router.push({ name: 'Home' })"
      >
        <el-image
          style="width: 50px; height: 50px"
          :src="require('@/assets/AIMC_LOGO.png')"
          fit="fill"
        ></el-image>
        <div class="companyName">
          <h5>AI Music Cookie</h5>
        </div>
      </div>
      <el-menu mode="horizontal">
        <el-menu-item index="1">
          <a href="./#productIntro" style="text-decoration: none">제품 소개</a>
        </el-menu-item>
        <el-menu-item index="2">
          <a href="./#playList" style="text-decoration: none">플레이 리스트</a>
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push({ name: 'community' })">
          <span>커뮤니티</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$router.push({ name: 'contact' })">
          <span>문의하기</span>
        </el-menu-item>
      </el-menu>

      <div class="nickname" @click="$router.push({ name: 'admin' })">
        <i class="el-icon-user"></i>
        <span>유저A</span>
      </div>
      <div class="login_btn">
        <el-button type="text" @click="centerDialogVisible = true"
          >Login</el-button
        >
        <el-dialog
          title="Login"
          v-model="centerDialogVisible"
          width="30%"
          center
        >
          <div class="input_idpw">
            <el-input placeholder="Please input ID" v-model="input"></el-input>
            <el-input
              placeholder="Please input Password"
              v-model="input"
              show-password
            ></el-input>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="centerDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="centerDialogVisible = false"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
      </div>
    </el-header>
    <el-main>
      <el-card>
        <div id="productIntro" class="productIntro">
          <div>
            <el-button
              type="primary"
              round
              @click="$router.push({ name: 'play' })"
              ><B>get started</B></el-button
            >
          </div>
        </div>
      </el-card>

      <el-card>
        <div id="playList" class="playList">
          <B>Play List <i class="el-icon-video-play"></i></B>

          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 90%"
          >
            <el-table-column
              property="rank"
              label="rank"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column property="name" label="name" align="center">
            </el-table-column>
            <el-table-column
              property="length"
              label="length"
              width="120"
              align="center"
            >
            </el-table-column>
          </el-table>

          <div class="albam">
            <el-image :src="require('@/assets/song1.png')"></el-image>
            <el-image :src="require('@/assets/song2.png')"></el-image>
            <el-image :src="require('@/assets/song1.png')"></el-image>
            <el-image :src="require('@/assets/song2.png')"></el-image>
          </div>
        </div>
      </el-card>

      <el-card>
        <div id="teamInfo" class="teamInfo">
          <div>
            <B>Developer <i class="el-icon-user"></i></B>
          </div>

          <div class="our_image">
            <div><img :src="require('@/assets/woman1.jpg')" /></div>
            <div class="our_name">염혜주</div>
          </div>
          <div class="our_image">
            <div><img :src="require('@/assets/man1.jpg')" /></div>
            <div class="our_name">이지원</div>
          </div>
          <div class="our_image">
            <div><img :src="require('@/assets/woman2.jpg')" /></div>
            <div class="our_name">이서희</div>
          </div>
          <div class="our_image">
            <div><img :src="require('@/assets/man2.jpg')" /></div>
            <div class="our_name">안재형</div>
          </div>
        </div>
      </el-card>
    </el-main>

    <el-footer style="height: 100%">
      <el-card>
        <div id="opensourceList" class="opensourceList">
          오픈소스 리스트
          <div class="opensourcelist_img">
            <el-image :src="require('@/assets/element.jpg')"></el-image>
            <el-image :src="require('@/assets/magenta.jpg')"></el-image>
            <el-image :src="require('@/assets/ndejs.jpg')"></el-image>
            <el-image :src="require('@/assets/Vue.jpg')"></el-image>
          </div>
        </div>
      </el-card>
    </el-footer>
  </el-container>
</template>

<script>
//import { defineComponent, ref } from 'vue'
export default {
  name: "Home",
  data() {
    return {
      centerDialogVisible: false,
      tableData: [
        {
          rank: "1",
          name: "New song1",
          length: "03:50",
        },
        {
          rank: "2",
          name: "New song2",
          length: "02:50",
        },
        {
          rank: "3",
          name: "New song3",
          length: "03:30",
        },
      ],
      currentRow: null,
    };
  },
  //   setup() {
  //   return {
  //     input: ref('')
  //   }
  // },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  padding: 20px 0px 0px 50px;
  display: flex;
  align-items: center;
  text-align: center;
}

.companyName {
  display: flex;
  margin-left: 10px;
}

a {
  display: block;
}

.nickname {
  margin-left: auto;
  margin-right: 50px;
}
.login_btn {
  margin-right: 100px;
}
.input_idpw {
  display: initial;
  justify-content: center;
  align-items: center;
}

.el-menu {
  margin-left: 20px;
}

.el-main {
  height: 100%;
  /* background-color: lightgray; */
  text-align: center;
}
.el-card {
  margin: 10px;
}
.productIntro {
  height: 580px;
  background-color: azure;
  text-align: center;
  background-image: url("../assets/cookie.png");
}
.productIntro .el-button {
  height: 80px;
  width: 200px;
  margin-top: 250px;
  font-size: 30px;
  font-family: initial;
}

.playList {
  height: 500px;
  /* background-color: blanchedalmond; */
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: monospace;
  font-size: 25px;
}
.albam .el-image {
  height: 150px;
  width: 155px;
  margin: 40px 20px;
}

.teamInfo {
  height: 200px;
  background-color: white;
  text-align: center;
  font-family: monospace;
  font-size: 20px;
}
.teamInfo .our_image {
  display: inline-block;
  height: 140px;
  margin: 20px 30px;
}
.teamInfo .our_name {
  display: inline-block;
}

.el-footer {
  background-color: white;
  text-align: center;
}

.opensourceList {
  height: 80px;
  background-color: white;
  text-align: center;
}

.el-table {
  text-align: center;
  margin: auto;
  margin-top: 50px;
}

.our_image .el-image {
  width: 100px;
  height: 100px;
  margin: 30px;
}
.opensourcelist_img .el-image {
  width: auto;
  height: 30%;
  margin: 10px;
}
</style>
