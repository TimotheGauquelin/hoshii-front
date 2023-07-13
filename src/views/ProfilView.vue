<script setup>
    import PresentList from "../components/present-list/PresentList.component.vue"
    import UserCard from "../components/user/UserCard.component.vue"
    import Modal from "../components/modal/Modal.component.vue"
    import AddListForm from "../components/forms/AddListForm.component.vue"
    import AddPresentForm from "../components/forms/AddPresentForm.component.vue"
    import UpdateListForm from "../components/forms/UpdateListForm.component.vue"
    import UpdatePresentForm from "../components/forms/UpdatePresentForm.component.vue"

    import { computed,ref, onMounted, watch, getCurrentInstance, onUpdated } from 'vue'
    import { useRoute } from 'vue-router';

    import store from '../store'

    import axiosClient from "../axiosClient.js"

    const route = useRoute();
    
    const paramsId = computed(() => route.params.id)
    const profil = computed(() => store.state.profil)

    const dataFromPageUser = ref({})
    const clickedList = ref({})
    const clickedPresentIndex = ref()
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
        axiosClient().get(`user/${userId}`)
            .then(({data}) => {
                dataFromPageUser.value = data
            })  
    }

    const addNewList = (userId) => {
        axiosClient(localStorage.getItem("access_token"))
            .post(`user/myProfil/newList`, addNewListForm.value)
            .then((res) => {
                modalDisplayer()
                addNewListForm.value = {
                    label: ""
                }
                getUser(userId)
            })  
    }

    const addNewPresent = (userId, listId) => {
        axiosClient(localStorage.getItem("access_token"))
            .post(`user/myProfil/list/${listId}/newPresent`, addNewPresentForm.value)
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
        axiosClient(localStorage.getItem("access_token"))
            .delete(`user/myProfil/list/${listId}/deletedList`)
            .then((res) => {
                getUser(paramsId.value)
            })  
    }

    const deletePresent = (userId, listId, presentId) => {
        axiosClient(localStorage.getItem("access_token"))
            .delete(`user/myProfil/list/${listId}/present/${presentId}/deletedPresent`)
            .then((res) => {
                getUser(paramsId.value)
        })
    }

    const updateList = (userId, listId) => {
        axiosClient(localStorage.getItem("access_token"))
            .put(`user/myProfil/list/${listId}/updatedList`, clickedList.value)
            .then((res) => {
                modalDisplayer()
                getUser(userId)
            })  
    }

    const updatePresent = (userId, listId, presentId) => {
        axiosClient(localStorage.getItem("access_token"))
            .put(`user/myProfil/list/${listId}/present/${presentId}/updatedPresent`, clickedList.value)
            .then((res) => {
                modalDisplayer()
                getUser(userId)
            })  
    }

    const displayAddListModal = () => {
        whatFunctionForModalToggle('addListForm'); 
        modalDisplayer();
    }

    const displayAddPresentModal = (list) => {
        whatFunctionForModalToggle('addPresentForm') 
        updateClickList(list)
        modalDisplayer()
    }

    const displayUpdateListModal = (list) => {
        whatFunctionForModalToggle('updateListForm') 
        updateClickList(list)
        modalDisplayer()
    }

    const displayUpdatePresentModal = (list, presentIndex) => {
        whatFunctionForModalToggle('updatePresentForm') 
        updateClickList(list)
        clickedPresentIndex.value = presentIndex
        modalDisplayer()
    }

    const takeThisPresent = (userId, listId, presentId) => {
        axiosClient(localStorage.getItem("access_token"))
            .put(`user/${userId}/list/${listId}/present/${presentId}/takeAPresent`)
            .then((res) => {
                getUser(userId)
            })  
    }

    const putAPresentBackInTheList = (userId, listId, presentId) => {
        axiosClient(localStorage.getItem("access_token"))
            .put(`user/${userId}/list/${listId}/present/${presentId}/putAPresentBackInTheList`)
            .then((res) => {
                getUser(userId)
            })  
    }

    onMounted(() => {
        getUser(paramsId.value)
    })

    watch(route, () => {
        getUser(paramsId.value)
    })

</script>

<template>
    <div class="overflow-none">
    <UserCard :user=dataFromPageUser birthday="5 Mai 1994"/>
    <div 
        class="mt-2 p-2 bg-green-200 rounded" 
        :style="{height: `calc(100% - 72px`}"
    >
        <div class="flex justify-between mb-1 p-1">
            <p data-cy="my-list-p">Ma Liste :</p>
            <button 
                v-if="thisProfilIsCurrentUserPage" 
                data-cy="add-list-btn" 
                class="btn bg-green-300 hover:bg-green-400 rounded p-1 text-white" 
                @click="displayAddListModal()"
            >
                Ajouter une liste
            </button>
            <div v-if="thisProfilIsCurrentUserPage">JE SUIS MOI</div>
            <div v-else>CE N'EST PAS MOI</div>
        </div>
        <div class="bg-blue-400 overflow-y-auto" :style="{height: `calc(100% - 40px`}">
            <div :key=index v-for="(list, index) of dataFromPageUser.lists" class="mb-2 p-2 rounded bg-red-200" data-cy="present-list-component">
                <PresentList 
                    :userId=profil._id
                    :list=list 
                    :dataFromPageUser=dataFromPageUser
                    :thisProfilIsCurrentUserPage="thisProfilIsCurrentUserPage" 
                    @deleteList="deleteList"
                    @deletePresent="deletePresent"
                    @displayAddListModal="displayAddListModal"
                    @displayAddPresentModal="displayAddPresentModal"
                    @displayUpdateListModal="displayUpdateListModal"
                    @displayUpdatePresentModal="displayUpdatePresentModal"
                    @takeThisPresent="takeThisPresent"
                    @putAPresentBackInTheList="putAPresentBackInTheList"
                />  
            </div>  
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
            <UpdatePresentForm 
                v-if="whatFunctionForModal === 'updatePresentForm'"
                @updatePresent="updatePresent"
                :list=clickedList  
                :userId=profil._id 
                :clickedPresentIndex=clickedPresentIndex
            />
        </Modal>
    </div>
</div>
</template>
