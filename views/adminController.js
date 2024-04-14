const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    setTimeout(() => {
        toastBootstrap.show();
    }, 500);
};


function deleteUser(userId) {
    // Envia uma solicitação POST para a rota de exclusão com o ID do usuário
    fetch('/admin/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId })
    })
        .then(response => {
            if (response.ok) {
                window.location.reload(); // ou outra ação que você deseja fazer após a exclusão
            } else {
                
                Swal.fire({
                    title: 'Não pode excluir',
                    text: 'Este Colaborador tem registro no livro de pontos',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }
        })
        .catch(error => {
            console.error('Erro ao excluir usuário:', error);
        });
}