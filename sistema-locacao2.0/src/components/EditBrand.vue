<template>
  <div>
    <h1>Editar Marca</h1>
    <form @submit.prevent="updateBrand">
      <label for="name">Nome:</label>
      <input id="name" v-model="brand.name" type="text" required />
      <button type="submit">Salvar</button>
    </form>
    <button @click="cancel">Cancelar</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const db = getFirestore();
    const router = useRouter();
    const route = useRoute();
    const brandId = route.params.id;
    const brand = ref(null);

    const getBrand = async () => {
      const brandRef = doc(db, 'brands', brandId);
      const brandSnapshot = await getDoc(brandRef);
      brand.value = brandSnapshot.data();
    };

    getBrand();

    const updateBrand = async () => {
      const brandRef = doc(db, 'brands', brandId);
      await updateDoc(brandRef, brand.value);
      router.push('/marcas');
    };

    const cancel = () => {
      router.push('/marcas');
    };

    return { brand, updateBrand, cancel };
  },
};
</script>
