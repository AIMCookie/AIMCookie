<template>
  <v-app>
    <v-navigation-drawer
    dark
    app
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list>
        <h1 style="text-align:center; padding:100px 0px; " @click="$router.push({ name: 'Home' }).catch(()=>{});">AI Music Cookie</h1>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="$router.push({ name: 'admin_memberManagement' }).catch(()=>{});">회원관리</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="$router.push({ name: 'admin_community' }).catch(()=>{});">커뮤니티</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon >mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click="$router.push({ name: 'admin_qna' }).catch(()=>{});">문의사항</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
  })
};
</script>

<style scoped></style>
