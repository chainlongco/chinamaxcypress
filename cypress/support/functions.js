cy.chinamax = {
    formatDateTime: (originalDateTime) => {
        const date = new Date(originalDateTime)
        const year = date.getFullYear()
        const month = (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1)
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()    
        const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        const second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second 
    },

    /*calculateTax: (price) => {
        var taxRate = 0
        const sqlRestaurants = 'select tax_rate from restaurants'
        cy.task('queryDb', sqlRestaurants)
            .then((resultRestaurants) => {
                taxRate = resultRestaurants[0].tax_rate
            })
        return parseFloat((taxRate * price).toFixed(2))  
    },

    calculateTotalWithTax: (price) => {
        var taxRate = 0
        const sqlRestaurants = 'select tax_rate from restaurants'
        cy.task('queryDb', sqlRestaurants)
            .then((resultRestaurants) => {
                taxRate = resultRestaurants[0].tax_rate
            })
        return parseFloat(((taxRate + 1) * price).toFixed(2))
    },*/

}