<template>
<div>
  <h1>Marcas</h1>
  <table>
    <tr>
      <th>ID</th>
      <th>Nome</th>
    </tr>
    <tr v-for="brand in brands" :key="brand.id">
      <td>{{ brand.id }}</td>
      <td>{{ brand.name }}</td>
      <td><button @click="editBrand(brand.id)">Editar</button></td>
      <td><button @click="deleteBrand(brand.id)">Excluir</button></td>
    </tr>
  </table>
  <button @click="addBrand">Adicionar Marca</button>
</div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
setup() {
  const db = getFirestore();
  const router = useRouter();
  const brands = ref([]);

  const getBrands = async () => {
    const brandCollection = collection(db, 'brands');
    const brandSnapshot = await getDocs(brandCollection);
    brands.value = brandSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  getBrands();

  const addBrand = () => {
    router.push('/marcas/add');
  };

  const editBrand = (id) => {
    router.push(`/marcas/edit/${id}`);
  };

  const deleteBrand = async (id) => {
    await deleteDoc(doc(db, 'brands', id));
    getBrands();
  };

  return { brands, addBrand, editBrand, deleteBrand };
}
};
</script>