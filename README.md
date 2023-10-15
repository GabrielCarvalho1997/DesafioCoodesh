## This is a challenge by Coodesh

## Projeto

- Documentação
- Funcionalidades
- Requesitos Mínimos
- Tecnologias Utilizadas
- Como rodar o projeto localmente

## Documentação

- Documentação do [DropMail](https://dropmail.me/api/#)
- Documentação do CorsAnywhere está em [CorsAnywhere](https://github.com/Rob--W/cors-anywhere)

## Funcionalidades

Desenvolver uma aplicação que consome a API do DropMail para gerar um email temporário sem a necessidade do usuário expor seu email real a possíveis
fraudes e spans.

## Requisitos orbigatórios

- Obrigatório 1 - Você deverá atender aos seguintes casos de uso:

  - Como usuário, posso gerar um endereço de email temporário;
  - Como usuário, posso copiar o endereço de email gerado;
  - Como usuário, posso visualizar acaixa de entrada deste email;

- Obrigatório 2 - Para capturar a chegada de novos emails, você deve verificar a caixa de mensagens a cada 15 segundos.

- Obrigatório 3 - Adicione um novo botão chamado "Receber notificações". Este botão irá ativar a notificações na área de trabalho quando chegar um
  novo email, caso a tab não esteja em foco. Caso o usuário não aceite, o botão deve permitir que, se clicado, abra novamente a mensagem para liberar
  este recurso do navegador.

- Obrigatório 4 - Seguir a base do mockup (estilização ao seu critério)

- Obrigatório 5 - Salve os dados de acesso ao email no localstorage ou sessionstorage, para que a conta não seja perdida ao atualizar a página. Caso o
  email tenha expirado, é necessário remover esse registro do storage.

## Tecnologias

- React
- Typescript
- Git/Github
- VsCode
- Material UI
- Redux
- Redux Persist
- React Router DOM
- AXIOS

## Inicializando o projeto local

Passo a passo:

- Clone o projeto
- Instale as dependências com `npm install`
- Peça permissão ao [CorsAnywhere](https://cors-anywhere.herokuapp.com/)
- Rode o projeto com `npm run dev`

## Projeto na Netlify

[Netlify](https://desafiodropmail.netlify.app/)

## Projeto na Netlify

[Vídeo de apresentação](https://www.loom.com/share/7715cb19666448ff924ace94d97b4379)

<br>

<h3>
  <a href='#top'>Início</a>
</h3>

<br>
