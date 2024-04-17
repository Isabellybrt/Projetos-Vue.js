<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/clientes" class="nav-link">Clientes</router-link>
      <router-link to="/marcas" class="nav-link">Marcas</router-link>
      <router-link to="/modelos" class="nav-link">Modelos</router-link>
      <router-link to="/carros" class="nav-link">Carros</router-link>
      <router-link to="/locacoes" class="nav-link">Locações</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;
}

.navbar {
  background-color: #333;
  padding: 10px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.nav-link:hover {
  text-decoration: none;
  color: #d7dbdd;
}

.router-view {
  margin-top: 20px;
}

table {
  border-collapse: collapse;
  margin: auto;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #5d6d7e;
  color: white;
}
tr {
  background-color: #f2f2f2;
}

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center; /* Centraliza os itens no meio do contêiner */
  margin-left: 10%;
  margin-right: 10%;
}

label {
  margin-bottom: 8px;
}

input,
select {
  flex-basis: calc(15% - 10px);
  max-width: calc(15% - 10px);
  padding: 10px;
  margin: 10px;
  margin-bottom: 16px;
  margin-top: 8px;
}

select {
  width: 13%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Centraliza o botão no meio */
button {
  align-self: center;
}
</style>
