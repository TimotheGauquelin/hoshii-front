export function setTabsHeight({commit}, height) {
    commit('setTabsHeight', height)
}

export function setNavbarHeight({commit}, height) {
    commit('setNavbarHeight', height)
}

export function setProfil({commit}, profil) {
    commit('setProfil', profil)
}


export function setModalToggle({commit}) {
    commit('setModalToggle')
}

export function setIsAccessTokenPresent({commit}, accessToken) {
    commit('setIsAccessTokenPresent', accessToken)
}

export function parseJWT({commit}, token) {
    commit('parseJWT', token)
}