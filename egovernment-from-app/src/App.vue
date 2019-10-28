<template>
  <div id="app">
    <div class="form-page">
      <div class="description-header">
        <h3 id="form-title" class="title is-3">{{ formTitle }}</h3>
        <div class="content is-medium">
          <p>{{ formDescription }}</p>
        </div>
      </div>
      <Form/>
    </div>
  </div>
</template>

<script>
import Form from './components/Form.vue'
import TextContent from './content-config'

export default {
  name: 'app',
  components: {
    Form
  },
  data: function() {
    return {
      formTitle : TextContent().formTitle,
      formDescription : TextContent().formDescription
    }
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
</style>
