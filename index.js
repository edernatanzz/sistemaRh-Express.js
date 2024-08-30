//const url = 'https://jsonplaceholder.typicode.com/todos/1'
const url = 'http://localhost:1080/'
const elementContainer = document.querySelector('#container')

//get all users 
//async function gellAllPosts(){
  //  const res = await fetch(url);
   // console.log(res)
//}
//gellAllPosts()

async function postUser(user) {
    try {
        const res = await fetch(`${url}createfuncionario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!res.ok) { // Verifica se a resposta foi bem-sucedida
            console.log('formulario enviado');
            return;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Erro:', error);
    }
}

// Ação do formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#funcionarioForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // comportamento do formulário
        const formulario = new FormData(form);
        const user = {
            nome: formulario.get('nome'),
            email: formulario.get('email'),
            telefone: formulario.get('telefone'),
            endereco: formulario.get('endereco'),
            dataNascimento: formulario.get('dataNascimento')
        };
        console.log('Dados do formulário:', user);
        try {
            const data = await postUser(user);
            alert('ops, usuario com endereço de email já encontrado')
        } catch (error) {
            const responseMessage = document.querySelector('#responseMessage');
            alert (responseMessage)
        }
    });
});



