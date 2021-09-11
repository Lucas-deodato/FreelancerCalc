// model é responsável por fornecer dados no modelo MVC

const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const data = await db.get(`SELECT * FROM profile`)  // get pega apenas 1 dado(table)
        // * significa todos os campos da tabela | o SQL já espera que apóso FROM venha o nome de uma table

        await db.close()

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        };
    },

    async update(newData) {
        const db = await Database() 
        // campos TEXT devem estar envoltos por aspas (name e avatar, por exemplo)
        db.run(`UPDATE profile SET 
        name = "${newData.name}",  
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["value-hour"]}
        `)

        await db.close()
    }
}
