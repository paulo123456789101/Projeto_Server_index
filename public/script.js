document.addEventListener('DOMContentLoaded', () => {
  // Lida com o envio do formulário de adicionar dados
  document.getElementById('add-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);

    fetch('/add', {
      method: 'POST',
      body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(result => {
      document.getElementById('feedback').innerText = 'Dados adicionados com sucesso!';
      document.getElementById('add-form').reset(); 
    })
    .catch(error => {
      document.getElementById('feedback').innerText = 'Erro ao adicionar dados!';
      console.error('Erro:', error);
    });
  });

  // Lida com o envio do formulário de exclusão de dados
  document.getElementById('delete-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);

    fetch('/delete', {
      method: 'POST',
      body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(result => {
      document.getElementById('feedback').innerText = 'Dados excluídos com sucesso!';
      document.getElementById('delete-form').reset(); 
    })
    .catch(error => {
      document.getElementById('feedback').innerText = 'Erro ao excluir dados!';
      console.error('Erro:', error);
    });
  });

  // Lida com o clique no botão de listar clientes
  document.getElementById('list-button').addEventListener('click', function() {
    fetch('/clientes')
      .then(response => response.json())
      .then(data => {
        let tabela = "<h3>Clientes Cadastrados</h3>";
        tabela += "<table border='1'><tr><th>Código</th><th>Nome</th><th>Email</th></tr>";
        data.forEach(cliente => {
          tabela += `<tr><td>${cliente.codigo}</td><td>${cliente.nome}</td><td>${cliente.email}</td></tr>`;
        });
        tabela += "</table>";
        document.getElementById("feedback").innerHTML = tabela;
      })
      .catch(error => console.error('Erro ao listar clientes:', error));
  });
});
