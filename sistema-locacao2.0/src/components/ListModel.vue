<template>
<div>
  <h1>Modelos</h1>
  <table>
    <tr>
      <th>ID</th>
      <th>Nome</th>
    </tr>
    <tr v-for="model in models" :key="model.id">
      <td>{{ model.id }}</td>
      <td>{{ model.name }}</td>
      <td><button @click="editModel(model.id)">Editar</button></td>
      <td><button @click="deleteModel(model.id)">Exckuir</button></td>
    </tr>
  </table>
  <button @click="addModel">Adicionar Modelo</button>
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
  const models = ref([]);

  const getModels = async () => {
    const modelCollection = collection(db, 'models');
    const modelSnapshot = await getDocs(modelCollection);
    models.value = modelSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  getModels();

  const addModel = () => {
    router.push('/modelos/add');
  };

  const editModel = (id) => {
    router.push(`/modelos/edit/${id}`);
  };

  const deleteModel = async (id) => {
    await deleteDoc(doc(db, 'models', id));
    getModels();
  };

  return { models, addModel, editModel, deleteModel };
}
};
</script>