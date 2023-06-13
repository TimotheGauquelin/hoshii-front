<script setup>
    import PresentList from "../components/present-list/PresentList.component.vue"
    import UserCard from "../components/user/UserCard.component.vue"
    import Modal from "../components/modal/Modal.component.vue"
    import AddListForm from "../components/forms/AddListForm.component.vue"
    import AddPresentForm from "../components/forms/AddPresentForm.component.vue"
    import UpdateListForm from "../components/forms/UpdateListForm.component.vue"

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
    var whatFunctionForModal = "addListForm"

    const whatFunctionForModalToggle = (label) => {
        whatFunctionForModal = label
    }

    const addNewListForm = ref({
        label: ""
    })
    
    const addNewPresentForm = ref({
        label: "",
        desc: "",
        image: "",
        price: 0
    })
    
    const updateNewListForm = ref({
        label: clickedList.value.label
    })

    const modalDisplayer = () => {
        store.dispatch('setModalToggle')
    }

    const updateClickList = (list) => {
        clickedList.value = list
    }
    
    const getUser = (userId) => {
        axiosClient.get(`user/${userId}`)
            .then(({data}) => {
                dataFromPageUser.value = data
            })  
    }

    const addNewList = (userId) => {
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
                modalDisplayer()
                addNewPresentForm.value = {
                    label: "",
                    image: "",
                    price: 0,
                    desc: "",
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

    const updateList = (userId, listId) => {
        axiosClient.put(`user/${userId}/list/${listId}/updateList`, clickedList.value)
            .then((res) => {
                modalDisplayer()
                getUser(userId)
            })  
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
            <button v-if="thisProfilIsCurrentUserPage" class="btn bg-green-300 hover:bg-green-400 rounded p-1 text-white" @click="whatFunctionForModalToggle('addListForm'); modalDisplayer();">Ajouter une liste</button>
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
                @updateClickList=updateClickList
                @whatFunctionForModalToggle="whatFunctionForModalToggle"
            />  
           
        </div>    
        <Modal :modalToggle=modalToggle @modalDisplayer=modalDisplayer >
            <AddListForm 
                v-if="whatFunctionForModal === 'addListForm'"
                @addNewList="addNewList"
                :list=addNewListForm  
                :userId=profil._id 
            />
            <AddPresentForm 
                v-if="whatFunctionForModal === 'addPresentForm'"
                @addNewPresent="addNewPresent" 
                @whatFunctionForModalToggle="whatFunctionForModalToggle"
                :present=addNewPresentForm 
                :userId=profil._id 
                :clickedList=clickedList 
            />
            <UpdateListForm 
                v-if="whatFunctionForModal === 'updateListForm'"
                @updateList="updateList"
                :list=clickedList  
                :userId=profil._id 
            />
        </Modal>
    </div>

</template>
