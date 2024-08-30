const url = 'http://localhost:1080/'; 

async function GetUsers() {
        const res = await fetch(`${url}getfuncionarios`);
        if (!res.ok) {
            console.log('sem resposta')}
        const {funcionarios}  = await res.json();
        const tableBody = document.querySelector('#tabelafuncionario');
        tableBody.innerHTML = ''; 

        funcionarios.forEach(user => {
            tableBody.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>${user.telefone}</td>
                    <td>${user.endereco}</td>
                    <td>${user.dataNascimento}</td>
                    
                    <td>
                        <button class="icon-button edit" data-id="${user.id}">
                            <i class="fas fa-edit" aria-label="Editar"></i> Editar
                        </button>
                        <button class="icon-button delete" data-id="${user.id}">
                            <i class="fas fa-trash" aria-label="Excluir"></i> Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
        //delete
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async (event) => {
                const userId = event.target.closest('button').getAttribute('data-id');
                await deleteFuncionario(userId);
            });
        });
        //edit
        document.querySelectorAll('edit').forEach(button => {
            button.addEventListener('click', async (event) => {
                const userId = event.target.closest('button').getAttribute('data-id')
                editFuncionario(userId)
            })

        })


    }
GetUsers()









async function deleteFuncionario (id) {
   try{
    const res = await fetch(`${url}deletefuncionario/${id}`, 
        {
            method : 'DELETE'
        })
        if(!res.ok){
            console.log('eror')
        }
        console.log('usuario excluido')
        GetUsers()
   }catch(error){
    console.log(error)
   }
    
}

deleteFuncionario()

async function editFuncionario(id) {
    try{
        const res = await fetch(`${url}editarfuncionario/${id}`,
        {
            method: 'PUT'
        });
        if(!res.ok){
            console.log('error')
        }
        console.log('usuario editado')
        editFuncionario()

    }catch(erro){
        console.log(error)
    }
    
}
//loop infinito
