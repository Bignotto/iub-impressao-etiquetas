# POC - Gerador de Etiquetas em NodeJS

Aplicação para gerar um arquivo ZPL com os dados de uma rota para as etiquetas de entrega da Bignotto a partir de um template.

Nesta versão somente o arquivo de texto contendo os dados das etiquetas com o template é gerado. Para que sejam impressas o usuário deve enviar o arquivo para a impressora Zebra manualmente.

### Uso

O número da rota deve ser informado no arquivo `teste.js`.

É preciso inserir as credenciais de acesso ao banco de dados no arquivo `database/credential.js`.

Executar com `node teste.js`.

