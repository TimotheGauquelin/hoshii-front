export function setTabsHeight(state, height) {
    state.tabsHeight = height;
}

export function setNavbarHeight(state, height) {
    state.navbarHeight = height;
}

export function setProfil(state, profil) {
    for(var k in profil) state.profil[k] = profil[k];
}

export function setIsAccessTokenPresent(state, accessToken) {
    if(accessToken) {
        state.profil.accessToken = true
    } else {
        localStorage.clear()
        state.profil.accessToken = false
    }
}

export function setModalToggle(state) {
    state.modalToggle = !state.modalToggle;
}

export function parseJWT(token) {

    const accessToken = token.profil.accessToken
    var base64Url = accessToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);

}