<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html,body{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: rgba(244,245,245,1);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img{
  display: block;
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
