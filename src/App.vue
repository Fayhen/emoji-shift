<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/preview">Preview</router-link> |
    <!-- <router-link to="/view">Done!</router-link> | -->
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
@import "./assets/css/global.css";

html,
body {
  height: 100%;
  background-color: rgb(230, 215, 255);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 100vh; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
