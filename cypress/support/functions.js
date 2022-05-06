cy.chinamax = {
    formatDateTime: (originalDateTime) => {
        if ((originalDateTime != null) && (originalDateTime != "")) {
            const date = new Date(originalDateTime)
            const year = date.getFullYear()
            const month = (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1)
            const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()    
            const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
            const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
            const second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        } else {
            return originalDateTime
        }
         
    },

    calculateTax: (price, taxRate) => {
        return parseFloat((taxRate * price).toFixed(2))  
    },

    calculateTotalWithTax: (price, taxRate) => {
        return parseFloat(((taxRate + 1) * price).toFixed(2))
    },

    calculateSum: (price1, price2) => {
        return parseFloat((parseFloat(price1) + parseFloat(price2)).toFixed(2))
    },

    calculateProduct: (price, multiplier) => {
        return parseFloat((parseFloat(price) * multiplier).toFixed(2))
    },

    formatPhoneNumber: (originalPhoneNumber) => {
        if ((originalPhoneNumber != null) && (originalPhoneNumber != "")) {
            return originalPhoneNumber.replace(/\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*/, '$1-$2-$3')
        } else {
            return originalPhoneNumber
        }
        /*var match = originalPhoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        } else {
            return originalPhoneNumber
        }*/
    },
}