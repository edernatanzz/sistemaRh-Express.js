import { prisma } from '../database.js';

export default {
    async createFuncionario(request, response) {
        try {
            console.log("Request Body:", request.body);
            const { nome, email, telefone, endereco, dataNascimento } = request.body;
            if (!email) {
                return response.status(400).json({ message: 'email obrigatório' });
            }
            // Verificar se o funcionário já existe
            const funcionarioExist = await prisma.funcionario.findUnique({
                where: { email }
            });
            if (funcionarioExist) {
                return response.status(409).json({ message: 'Email já existente' });
            }
            // Criar um novo funcionário
            const funcionario = await prisma.funcionario.create({
                data: { nome, email, telefone, endereco, dataNascimento }
            });
            console.log('Funcionário criado:', funcionario);
            return response.status(201).json({ message: 'Funcionário criado', funcionario });
        } catch (error) {
            console.error("Erro:", error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    async GetFuncionarios(request,response){
        try{
            const funcionarios = await prisma.funcionario.findMany()
            console.log('funcionarios encontrados', funcionarios)
            return response.status(200).json({ funcionarios });

        }catch(error){
            return('error')
        }
    },
    async updateFuncionario(request, response) {
        try {
            const { id } = request.params; // ID do funcionário a ser atualizado
            const { nome, email, telefone, endereco, dataNascimento } = request.body;

            if (!email) {
                return response.status(400).json({ message: 'Email obrigatório' });
            }

            // Verificar se o funcionário existe
            const funcionario = await prisma.funcionario.findUnique({
                where: { id: parseInt(id) } // Convertendo ID para inteiro, assumindo que é um número
            });

            if (!funcionario) {
                return response.status(404).json({ message: 'Funcionário não encontrado' });
            }

            // Atualizar o funcionário
            const updatedFuncionario = await prisma.funcionario.update({
                where: { id: parseInt(id) },
                data: { nome, email, telefone, endereco, dataNascimento }
            });

            console.log('Funcionário atualizado:', updatedFuncionario);
            return response.status(200).json({ message: 'Funcionário atualizado', funcionario: updatedFuncionario });
        } catch (error) {
            console.error("Erro:", error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    async deleteFuncionario(req, res) {
        try {
            const { id } = req.params;
    
            // Encontra o funcionário pelo ID
            const funcionario = await prisma.funcionario.findUnique({
                where: { id: parseInt(id) }
            });
    
            // Verifica se o funcionário existe
            if (!funcionario) {
                return res.status(404).send('Funcionário não encontrado');
            }
    
            // Deleta o funcionário
            await prisma.funcionario.delete({
                where: { id: parseInt(id) }
            });
    
            // Responde com sucesso
            console.log('Funcionário excluído', funcionario);
            return res.status(200).send('Funcionário excluído com sucesso');
            
        } catch (error) {
            // Trata o erro e responde com status 500
            console.error('Erro ao excluir funcionário:', error);
            return res.status(500).send('Erro ao excluir funcionário');
        }
    }
    
};



