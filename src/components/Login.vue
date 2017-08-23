<template>
  <v-container fluid>
    <v-layout row wrap>
      <div id="content-login">
        <v-card>
          <v-toolbar class="pink" dark>
            <v-toolbar-title>{{ logged ? 'Complete your information' : 'Login' }}</v-toolbar-title>

          </v-toolbar>
          <v-card-text>

            <v-alert error value="true" v-if="errors.status">
              {{ errors.getCodeError }}
            </v-alert>

            <div class="form-login" v-if="!logged">
              <v-text-field label="Email" name="email" v-model="email" required></v-text-field>
              <v-text-field v-if="getCodeSuccess" label="Code" name="code" v-model="code" required></v-text-field>
              <v-btn primary dark large class="btn-next purple" @click="getCodeSuccess ? login() :getLoginCode() ">{{ getCodeSuccess ? 'Login' : 'Next' }}
                <v-progress-circular v-if="loading" indeterminate class="green--text"></v-progress-circular>
              </v-btn>
            </div>
            <div v-if="logged">
              <div class="avatar">
                <img :src="imageUrl" alt="avatar" @click="onUpload" />
                <v-progress-circular indeterminate v-if="loadingImg" class="purple--text image-loading"></v-progress-circular>
                <form id="form-private-chat">
                  <input id="upload-image" ref="upload-image" name="files" type="file" @change="uploadImage($event.target.name, $event.target.files)" accept="image/*">
                </form>
              </div>
              <v-text-field label="FirstName" name="firstName" v-model="firstName" required></v-text-field>
              <v-text-field label="LastName" name="lastName" v-model="lastName" required></v-text-field>
              <v-btn primary dark large class="btn-next purple" @click="setProfile">Done
                <v-progress-circular v-if="loading" indeterminate class="green--text"></v-progress-circular>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import * as API from '../api'

export default {
  name: 'login',
  data () {
    return {
      token: '',
      email: '',
      code: '',
      firstName: '',
      lastName: '',
      imageUrl: 'static/image/img_avatar.png',
      loading: false,
      loadingImg: false,
      getCodeSuccess: false,
      logged: false,
      errors: {
        status: false,
        getCodeError: ''
      }
    }
  },
  methods: {
    async login () {
      if (!this.email && !this.code) {
        return
      }
      try {
        this.loading = true
        const response = await API.login(this.email, this.code)
        this.loading = false
        this.logged = true
        this.token = response.data.token
      } catch (e) {
        console.error(e)
        if (e.response) {
          this.errors.status = true
          this.errors.getCodeError = e.response.data.message
        }
        this.errors.status = false
        this.loading = false
      }
    },
    async getLoginCode () {
      if (!this.email) {
        return
      }
      try {
        this.loading = true
        await API.getLoginCode(this.email)
        this.getCodeSuccess = true
        this.loading = false
      } catch (e) {
        console.error(e)
        if (e.response) {
          this.errors.status = true
        }
        this.errors.status = false
        this.loading = false
      }
    },
    async setProfile () {
      if (!this.firstName && !this.lastName && !this.imageUrl) {
        return
      }
      try {
        this.loading = true
        const response = await API.setProfile(this.firstName, this.lastName, this.imageUrl, this.token)
        this.getCodeSuccess = true
        this.loading = false

        const userData = {
          firstName: response.firstName,
          lastName: response.lastName,
          imageUrl: response.imageUrl,
          sid: response.sid,
          email: response.email,
          token: this.token
        }

        window.localStorage.setItem('profile', JSON.stringify(userData))
        window.localStorage.setItem('token', JSON.stringify(this.token))

        this.$router.push({ name: 'Welcome' })
      } catch (error) {
        this.loading = false
      }
    },
    async onUpload () {
      this.$refs['upload-image'].click()
    },
    async uploadImage (name, files) {
      this.loadingImg = true
      const form = new FormData()
      Array
        .from(Array(files.length).keys())
        .map(x => {
          form.append('file', files[x], files[x].name)
        })
      try {
        this.loadingImg = false
        const response = await API.uploadImg(form)
        this.imageUrl = response.url
      } catch (e) {
        this.loadingImg = false
        console.log(e.response)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-login {
  margin: 0 auto;
  width: 450px;
}

.btn {
  margin: 0;
}

.loading {
  float: right;
  position: absolute;
  right: 15px;
  font-size: 13px;
  text-transform: none;
}

.avatar {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto;
}

.avatar img {
  width: 90px;
  height: 90px;
  cursor: pointer;
}

.progress-circular {
  height: 20px !important;
  width: 20px !important;
  position: absolute;
  right: 10px;
}

.btn-next {
  width: 100%;
}

.alert {
  margin-bottom: 15px;
  padding: 10px;
}

.image-loading {
  right: 0;
  left: 0;
  margin: 0 auto;
}

#upload-image {
  display: none;
}
</style>
