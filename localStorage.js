export const getLocalStore = ()=> JSON.parse(localStorage.getItem('reduxState')) || {};
export const setLocalStore = (state) => {    
    localStorage.setItem('reduxState',JSON.stringify(state));
}