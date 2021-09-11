// cria as tabelas(contas no banco e.g.)

const Database = require('./config')

const initDb = {  // a estrutura do database precisa estar dentro de uma function
    async init() {  // o await precisa estar dentro do async

        const db = await Database()  // abre a conexão com o db;

        // criando a tabela profile; o exec avisa ao driver do sqlite para executar o comando dentro do db
        // run serve para jogar informações na tabela com o comando INSERT INTO do SQL
        // o init será rodado apenas uma vez, e esses modelos estáticos poderão ser substituidos com novos dados
        // os campos no INSERT INTO devem ser necessariamente iguais aos do CREATE TABLE(na mesma ordem).
await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    avatar TEXT, 
    monthly_budget INT, 
    days_per_week INT, 
    hours_per_day INT, 
    vacation_per_year INT, 
    value_hour INT
)`);

await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`)

await db.run(`INSERT INTO profile (
    name,
    avatar, 
    monthly_budget, 
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES (
    "Lucas",
    "https://avatars.githubusercontent.com/u/79292072?v=4",
    3000,
    5,
    5,
    4,
    70     
);`)

await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1617514376018
);`)

await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTWO projects",
    3,
    47,
    1617514376018
);`)

await db.close()  // fecha a conexão o db

    }
}

initDb.init()