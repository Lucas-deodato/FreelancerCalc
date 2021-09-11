const Job = require('../model/Job')
const jobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {  // renderiza o job
        return res.render('job')
    },
    
    async save(req, res) {  // recebe os inputs do form e armazena-os 
        await Job.create({ // recebe os inputs do formulário(com req.body) e joga para o array "jobs"
            name: req.body.name,  // esse name referencia o campo value="name" no fórmulário da página jobs
            "daily-hours": req.body['daily-hours'],
            "total-hours": req.body['total-hours'],
            created_at: Date.now()  // atribuindo a data de hoje
        }) 
        // req.body = { name: 'Lucas', 'daily-hours': '4', 'total-hours': '60' }
    
        return res.redirect('/')  // redireciona para '/' após empurrar o body para o array 
    },

    async show(req, res) {
        const jobs = await Job.get()

        const jobID = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobID))

        if (!job) {
            return res.send('Job not found!')
        }

        const profile = await Profile.get()

        job.budget = jobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req, res) {
        const jobId = req.params.id  // pega os parâmetros da url

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    async delete(req, res) {
        const jobId = req.params.id

        await Job.delete(jobId)  // delete no SQL

        return res.redirect('/')
    },
}