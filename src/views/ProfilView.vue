<script setup>
    import listPresent from "../mock/list.ts"
    import PresentList from "../components/present-list/PresentList.component.vue"
    import UserCard from "../components/user/UserCard.component.vue"
    import Modal from "../components/modal/Modal.component.vue"
    import AddListForm from "../components/forms/AddListForm.component.vue"
    import AddPresentForm from "../components/forms/AddPresentForm.component.vue"

    import { computed,ref, onMounted, watch, getCurrentInstance, onUpdated } from 'vue'
    import { useRoute } from 'vue-router';

    import store from '../store'

    import axiosClient from "../axiosClient.js"

    const route = useRoute();
    
    const paramsId = computed(() => route.params.id)
    const profil = computed(() => store.state.profil)

    const dataFromPageUser = ref({})
    const clickedList = ref({})
    const thisProfilIsCurrentUserPage = computed(() => String(paramsId.value) === String(profil.value._id))

    const modalToggle = computed(() => store.state.modalToggle)

    const addNewListForm = ref({
        label: ""
    })

    const addNewPresentForm = ref({
        label: ""
    })
  
    const modalDisplayer = () => {
        store.dispatch('setModalToggle')
    }

    const buttonInsider = (list) => {
        clickedList.value = list
    }
    
    const getUser = (userId) => {
        axiosClient.get(`user/${userId}`)
            .then(({data}) => {
                dataFromPageUser.value = data
            })  
    }

    const addNewList = (userId) => {
        console.log(userId)
        axiosClient.post(`user/${userId}/newList`, addNewListForm.value)
            .then((res) => {
                modalDisplayer()
                addNewListForm.value = {
                    label: ""
                }
                getUser(userId)
            })  
    }

    const addNewPresent = (userId, listId) => {
        axiosClient.post(`user/${userId}/list/${listId}/newPresent`, addNewPresentForm.value)
            .then((res) => {
                console.log(res)
                modalDisplayer()
                addNewPresentForm.value = {
                    label: ""
                }
                getUser(userId)
            })  
    }

    const deleteList = (userId, listId) => {
        axiosClient.delete(`user/${userId}/list/${listId}`)
            .then((res) => {
                getUser(paramsId.value)

            })  
    }

    const deletePresent = (userId, listId, presentId) => {
        axiosClient.delete(`user/${userId}/list/${listId}/present/${presentId}`)
            .then((res) => {
                getUser(paramsId.value)
        })

    }

    const updateList = () => {
        console.log("UPDATE LIST")
    }

    const updatePresent = (id) => {
        console.log("UPDATE PRESENT" + id)
    }

    onMounted(() => {
        getUser(paramsId.value)
    })

    watch(route, () => {
        getUser(paramsId.value)
    })

</script>

<template>
    <UserCard :name=dataFromPageUser.username birthday="5 Mai 1994"/>
    <div class="mt-2 p-2 bg-green-200 rounded ">
        <div class="flex justify-between mb-1">
            <p>Ma Liste :</p>
            <button v-if="thisProfilIsCurrentUserPage" class="btn bg-green-300 hover:bg-green-400 rounded p-1 text-white" @click="modalDisplayer">Ajouter une liste</button>
            <div v-if="thisProfilIsCurrentUserPage">JE SUIS MOI</div>
            <div v-else>CE N'EST PAS MOI</div>
        </div>
        <div :key=index v-for="(list, index) of dataFromPageUser.lists" class="mb-2 p-2 rounded bg-red-200">
            <PresentList 
                :userId=profil._id
                :list=list 
                :thisProfilIsCurrentUserPage="thisProfilIsCurrentUserPage" 
                @deleteList="deleteList"
                @deletePresent="deletePresent"
                @updateList="updateList"
                @updatePresent="updatePresent"
                @modalDisplayer="modalDisplayer"
                @buttonInsider=buttonInsider
            />  
           
        </div>    
        <Modal :modalToggle=modalToggle @modalDisplayer=modalDisplayer>
            <!-- <AddListForm @addNewList="addNewList" :list=addNewListForm  :userId=profil._id /> -->
            <AddPresentForm @addNewPresent="addNewPresent" :present=addNewPresentForm :userId=profil._id :clickedList=clickedList />
        </Modal>
    </div>

</template>
