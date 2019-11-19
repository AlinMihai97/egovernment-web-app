<template>
  <div id="app">
    <div class="form-page">
      <div class="description-header">
        <h3 id="form-title" class="title is-3">{{ formTitle }}</h3>
        <div class="content is-medium">
          <p>{{ formDescription }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6 center-text-global">
          <router-link to="/">
            <button class="button" :class="{'is-success': isFormSelected}" @click="pageChanged('form')">Formular de inscriere</button>
          </router-link>
        </div>
        <div class="column is-6 center-text-global">
           <router-link to="/report">
            <button class="button" :class="{'is-success': isReportSelected}" @click="pageChanged('report')">Statistici parcare</button>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import TextContent from './content-config'
export default {
  name: 'app',
  components: {
  },
  data: function() {
    return {
      formTitle : TextContent().formTitle,
      formDescription : TextContent().formDescription,
      isFormSelected: true,
      isReportSelected: false
    }
  },
  methods: {
    currentRoute: function() {
      if (this.$route.fullPath != "/") {
        return "reporting"
      } else {
        return "form"
      }
    },

    pageChanged: function(page) {
      let currentPage = page != undefined ? page : this.currentRoute()
      if (currentPage == "form") {
        this.isFormSelected = true
        this.isReportSelected = false
      } else {
        this.isFormSelected = false
        this.isReportSelected = true
      }
    }
  },
  mounted: function() {
    this.pageChanged()
  }
}
</script>

<style>
.form-page {
  width: 100%;
  padding: 0px 25vw;
}
.description-header {
  margin-top:16px;
  min-height: 15vh;
  margin-bottom: 16px;
}

#form-title {
  text-align: center;
}

.center-text-global {
  text-align: center;
}
</style>
