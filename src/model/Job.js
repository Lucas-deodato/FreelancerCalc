const JobController = require("../controllers/JobController");
const Database = require("../db/config")

module.exports = {  // exemplo de envio para o banco de dados
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)  // all manda todos os elementos do db; no caso, todas os valores da table JOB

        await db.close()

        return jobs.map(job => {  // fazendo a normalização 
            return {
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
            }
        })
    },

    async update(updatedJob, jobId) {
        const db = await Database();
        // where vai dizer quais dados alterar
        await db.run(`UPDATE jobs SET 
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `) 

        await db.close()
    },
    
   async delete(id) {  // o SQL deleta da tabela job onde o campo id for igual ao id passado no parâmetro
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },

    async create(newJob) {
        const db = await Database();

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
    }

}