<template>
  <q-layout view="lHr LpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold"> 
          <span class="gt-sm">{{ $route.name}}</span>
          <q-icon 
              class="q-pa-md lt-md header-icon"
              size="sm"
              color="primary"
              name="fas fa-dove" />
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    <!-- left drawer starts here -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="280" bordered>
      <q-icon 
      class="q-pa-md"
      size="lg"
      color="primary"
      name="fas fa-dove" />
    
    <q-list >
      <q-item clickable v-ripple exact to="/">
        <q-item-section avatar>
          <q-icon  name="home" size="md"  />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
      </q-item>

      <q-item clickable v-ripple exact to="/about">
        <q-item-section avatar>
          <q-icon  name="help" size="md"  />
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
    <!-- left drawer end here -->

    <!-- right drawer starts here -->
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input placeholder="Search Twitter" outlined rounded class="q-ma-md">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list  padding seperator>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">I finally made it</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">I finally made it</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold">I finally made it</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <!-- right drawer ends here -->

    <q-page-container>
      
        <router-view v-slot="{ Component}">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
      </router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>