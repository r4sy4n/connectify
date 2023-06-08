export const utils = {
    titleCase: (string) => {
        let newString = string.toLowerCase().split('-');
        for (var i = 0; i < newString.length; i++) {
            newString[i] = newString[i].charAt(0).toUpperCase() + newString[i].slice(1); 
        }
        return newString.join(' ');
    },

    hideModal: closeFunction => event => {
        let modalContainer = document.querySelector('.modal-container');
        let modalClose = document.querySelector('.modal-close');
        
        if (modalContainer !== undefined) {
            if (!modalContainer.contains(event.target) || modalClose.contains(event.target)){
                closeFunction();
            }
        }
    }
}