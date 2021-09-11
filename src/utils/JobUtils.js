module.exports = {
    remainingDays(job) {  // faz o calculo das horas
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays);
        const dueDate = createdDate.setDate(dueDay);
        const timeDiffInMs = dueDate - Date.now()
        // conversão de ms em dia
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor((timeDiffInMs / dayInMs))
        
        return dayDiff  // restam X dias
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}