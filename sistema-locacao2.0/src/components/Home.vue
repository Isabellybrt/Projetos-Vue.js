<template>
  <div>
    <h1>Locação de Veículos</h1>
    <div class="buttons-container">
      <div class="top-buttons">
        <button>
          <router-link to="/clientes" class="nav-link-custom"
            >Listar Clientes</router-link
          >
        </button>
        <button>
          <router-link to="/marcas" class="nav-link-custom"
            >Listar Marcas</router-link
          >
        </button>
        <button>
          <router-link to="/modelos" class="nav-link-custom"
            >Listar Modelos</router-link
          >
        </button>
      </div>
      <div class="bottom-buttons">
        <button>
          <router-link to="/carros" class="nav-link-custom"
            >Listar Carros</router-link
          >
        </button>
        <button>
          <router-link to="/locacoes" class="nav-link-custom"
            >Listar Locações</router-link
          >
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style>
h1 {
  font-size: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Adiciona sombra ao texto */
  padding: 10px; /* Adiciona um pouco de espaçamento interno */
  border-radius: 5px; /* Borda arredondada */
  color: #333; /* Cor do texto */
}

/* Estilo para centralizar os botões na tela */
.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 100% da altura da tela */
}

/* Estilo para os botões na parte superior */
.top-buttons {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px; /* Ajuste a margem entre os grupos de botões */
}

/* Estilo para os botões na parte inferior */
.bottom-buttons {
  display: flex;
  flex-direction: row;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff; /* Cor de fundo do botão */
  color: #fff; /* Cor do texto do botão */
  border: none; /* Remove a borda padrão do botão */
  border-radius: 5px; /* Borda arredondada */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Efeito de transição suave na cor de fundo e na sombra */
  box-shadow: 0 4px 6px rgba(0, 0, 0.3, 0.4); /* Adiciona sombra ao botão */
}
/* Estilo para o hover do botão */
button:hover {
  background-color: #0056b3; /* Cor de fundo alterada no hover */
}

/* Estilo personalizado para a classe nav-link-custom */
.nav-link-custom {
  color: white;
  text-decoration: none;
}
</style>
