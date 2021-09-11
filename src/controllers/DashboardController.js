const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) { // e.g. (rota para index)
        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let statusCount = {  // objeto será passado para o dashboard
            progress: 0, 
            done: 0,
            total: jobs.length 
        }

        // total de horas por dia de cada job em progresso
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {  // a cada job que entrar, ele roda a função
            const remaining = JobUtils.remainingDays(job)  // passa o array jobs para que ele seja atualizado na função
            const status = remaining <= 0 ? 'done' : 'progress'  // if ternário
            
            // Somando a quantidade de status
            statusCount[status] += 1;

            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        
        // qtd de horas que quero trabalhar MENOS a quantidade de horas de cada job e progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })  
    }
}
