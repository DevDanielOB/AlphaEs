APLHAES BACK-END
Este projeto é um backend para gerenciar produtos e suas operações. Siga os passos abaixo para configurar e executar o projeto localmente.

Pré-requisitos
SQLite Studio para gerenciar o banco de dados SQLite.
Node.js e npm instalados na sua máquina.
Passos para configuração
1. Baixar o SQLite Studio
Baixe e instale o SQLite Studio em sua máquina.

2. Criar a base de dados
Abra o SQLite Studio.
Crie um novo banco de dados chamado dev.
Importe ou crie as tabelas necessárias para o funcionamento do projeto (caso precise de scripts de criação de tabelas, consulte a pasta scripts/ ou solicite ao administrador do projeto).
3. Instalar as dependências
Após clonar o repositório, navegue até a pasta do projeto e rode o comando abaixo para instalar todas as dependências necessárias:


npm install
4. Iniciar o servidor
Para iniciar o serviço backend, utilize o seguinte comando:

npm start
O servidor será iniciado, e o backend estará disponível para receber requisições.

5. Testar as rotas
Dentro da pasta raiz do projeto, há um arquivo chamado products.http. Nele, você encontrará as rotas disponíveis e como utilizá-las.

Exemplo de rotas disponíveis:

GET /products: Retorna a lista de produtos.
POST /products: Cria um novo produto.
PATCH /products/:id: Atualiza a quantidade de um produto.