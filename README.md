# Consulta de CEP e Localidade

Este projeto consiste em uma página web para consulta de CEP e localidade, utilizando as tecnologias HTML, CSS e Javascript vanilla. A aplicação permite ao usuário inserir um CEP válido em um campo específico e, em seguida, consultar as informações relacionadas a este CEP, tais como endereço, bairro, cidade, estado, latitude e longitude, além de possibilita uma visualização no mapa de sua localização.

## Funcionalidades

- Campo para inserção do CEP desejado.
- Botão "Consultar" para fazer a requisição à API de CEP, desde que o valor informado seja válido.
- Exibição das informações do CEP consultado na página.
- Botão "Exibir mapa" para visualizar o local no mapa, utilizando os dados de latitude e longitude obtidos na consulta.

## Requisitos e Comportamentos

- **Validação de CEP**: A aplicação valida se o CEP inserido é válido antes de fazer a requisição à API.
- **Feedback ao Usuário**: Caso o CEP seja inválido, uma mensagem de erro é exibida ao usuário, informando que o CEP inserido é inválido.
- **Sinalização de Consulta**: Durante o processo de consulta, o cursor muda para indicar que uma operação está em andamento, impedindo que o usuário realize outras ações.
- **Tratamento de Erros**: Em caso de erro na consulta do CEP, os resultados não são exibidos, uma mensagem de erro específica é mostrada e o botão "Exibir mapa" e o iframe são ocultados.

## Como Executar

Para executar o projeto localmente, basta clonar este repositório e abrir o arquivo `index.html` em um navegador web compatível com HTML5.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript (Vanilla)

## Observações

Para a realização das requisições à API de CEP e à API do Google Maps, foi utilizado o método `fetch` disponível no JavaScript. O mapa é exibido em um iframe na mesma página após a consulta.

Sinta-se à vontade para contribuir com melhorias e sugestões!

---

Espero que este readme seja útil para o seu projeto! Se precisar de mais alguma coisa, estou aqui para ajudar.
