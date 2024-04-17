<template>
  <div>
    <h1>Adcionar Marca</h1>
    <form @submit.prevent="addBrand">
      <label for="name">Nome:</label>
      <input id="name" v-model="name" type="text" required />
      <button type="submit">Adicionar</button>
    </form>
    <button @click="cancel">Cancelar</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const db = getFirestore();
    const router = useRouter();
    const name = ref('');

    const addBrand = async () => {
      const brandCollection = collection(db, 'brands');
      await addDoc(brandCollection, { name: name.value });
      router.push('/marcas');
    };

    const cancel = () => {
      router.push('/marcas');
    };

    return { name, addBrand, cancel };
  },
};
</script>
