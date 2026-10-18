
const express = require('express'); // importa o Express para criar a API
const app = express(); // cria a aplicação do servidor

app.use(express.json()); // receber dados em formato JSON

// lista de alunos
let alunos = [
    { id: 1, nome: 'Vinicius', curso: 'Computação' },
    { id: 2, nome: 'Deoxyss', curso: 'Sistema de Informação' }
];

let id = 3; // proximo ID para cadastro

// retorna todos os alunos
app.get('/alunos', (req, res) => {
    res.status(200).json(alunos); // envia a lista com sucesso
});

// retorna um aluno específico pelo ID
app.get('/alunos/:id', (req, res) => {
    let aluno = alunos.find(a => a.id == req.params.id); // procura o aluno pelo ID

    if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado' }); // retorna erro se não encontrar
    }

    res.status(200).json(aluno); // retorna os dados do aluno encontrado
});

// cadastra um novo aluno
app.post('/alunos', (req, res) => {
    let { nome, curso } = req.body; // recebe nome e curso

    if (!nome || !curso) {
        return res.status(400).json({ mensagem: 'Informe nome e curso' }); // não pode deixar em branco
    }

    let aluno = { id: id++, nome, curso }; // cria o aluno novo com id, nome e curso
    alunos.push(aluno); // adiciona o aluno no fim da lista

    res.status(201).json(aluno); // retorna o aluno cadastrado
});

// atualiza um aluno existente
app.put('/alunos/:id', (req, res) => {
    let aluno = alunos.find(a => a.id == req.params.id); // procura o aluno pelo ID

    if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado' }); // retorna erro se não encontrar
    }

    let { nome, curso } = req.body; // recebe os novos dados do aluno

    if (!nome || !curso) {
        return res.status(400).json({ mensagem: 'Informe nome e curso' }); // pede para informar os campos
    }

    aluno.nome = nome; // atualiza o nome do aluno
    aluno.curso = curso; // atualiza o curso do aluno

    res.status(200).json(aluno); // retorna o aluno atualizado
});

// excluir aluno pelo ID
app.delete('/alunos/:id', (req, res) => {
    let indice = alunos.findIndex(a => a.id == req.params.id); // descobre a posição do aluno na lista

    if (indice == -1) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado' }); // Retorna erro se não encontrar
    }

    alunos.splice(indice, 1); // remove um aluno da posição encontrada

    res.status(204).end(); // confirma a exclusão
});

// inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});