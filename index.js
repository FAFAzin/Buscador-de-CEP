const containerCep = document.getElementById('section-cep');
const cep = document.getElementById('cep-input');
const buttonConsulta = document.getElementById('button-consulta');
const info = document.getElementById('dados-cep');
const map = document.getElementById('mapa-cep');
const buttons = document.querySelectorAll('buttons');

buttonConsulta.addEventListener('click', function () {
  containerCep.style.display = 'none';
  const valueCep = cep.value;
  info.innerHTML = '';
  map.innerHTML = '';
  info.style.display = 'flex';

  //o cep é válido ou inválido
  if (!validCep(valueCep)) {
    showError(false);
    return;
  }

  //buscar informações
  getInfoCep(valueCep);
});

/**
 * @description Obtém informações de um CEP a partir da API de CEPs.
 * @param {string} cepUser - O CEP que deseja obter informações.
 * @returns {Promise<Object>} Um objeto contendo as informações do CEP, ou uma mensagem de erro em caso de falha na requisição.
 */
function getInfoCep(cepUser) {
  const url = `https://cep.awesomeapi.com.br/json/${cepUser}`;

  //objeto com alguns tratamento erros
  const objStatusRequest = {
    400: 'Cep inválidos!',
    404: 'Cep não encontrado.',
  };

  //fazer a requisição na api
  fetch(url)
    .then((res) => {
      //verificar qual é o status diferente de 200 que foi retornado, por enquanto tratar só 404 e 500, e lança um erro
      if (!res.ok) {
        showError(res.status);
        if (res.status === 400) {
          throw new Error(objStatusRequest['400']);
        } else if (res.status === 404) {
          throw new Error(objStatusRequest['404']);
        }
      }
      //se for ok vai retornar os dados
      return res.json();
    })
    .then((data) => {
      const objResponse = {
        address: data.address,
        district: data.district,
        city: data.city,
        state: data.state,
        lat: data.lat,
        lng: data.lng,
      };
      // Resolver a Promise com os dados
      showInfo(objResponse);
    })
    .catch((error) => {
      return error;
    });
}

/**
 * @description Verifica se um CEP é válido.
 * @param {string} cepUser - O CEP a ser validado.
 * @returns {boolean} true se o CEP for válido, caso contrário false.
 */
function validCep(cepUser) {
  const regex = /^\d{5}-?\d{3}$/;

  // Testa se o CEP corresponde ao padrão definido pela expressão regular
  const isValidCep = regex.test(cepUser) ? true : false;

  return isValidCep;
}

/**
 * @description Mostra o modal de erro na interface do usuário.
 */
function showError(status) {
  const containerModal = document.getElementById('background-modal-error');
  const titleModalError = document.getElementById('title-error');
  const textModalError = document.getElementById('text-error');
  const valueCep = cep.value;
  containerModal.style.display = 'flex';

  titleModalError.innerHTML = '';
  textModalError.innerText = '';

  if (status === 404) {
    titleModalError.innerHTML = 'CEP não encontrado!';
    textModalError.innerText = `O CEP "${valueCep}" não foi encontrado.`;
  } else if (!status) {
    titleModalError.innerHTML = 'CEP inválido!';
    textModalError.innerText = 'Digite um CEP válido.';
  }

  //Botão de fechar o modal de erro
  document
    .getElementById('button-modal-close')
    .addEventListener('click', function () {
      containerModal.style.display = 'none';
      containerCep.style.display = 'flex';
      map.style.display = 'none';
      info.style.display = 'none';
    });
}

function showInfo(data) {
  info.innerHTML = `
  <span><strong>Endereço: </strong>${data.address}</span>
  <span><strong>Bairro: </strong>${data.district}</span>
  <span><strong>Cidade: </strong>${data.city}</span>
  <span><strong>Estado: </strong>${data.state}</span>
  <span><strong>Latitude: </strong>${data.lat}</span>
  <span><strong>Longitude: </strong>${data.lng}</span>
  <div>
    <button id="button-exibir-mapa">Exibir mapa</button>
    <button  id="button-sair-mapa">Voltar</button>
  </div>

  

`;

  document
    .getElementById('button-exibir-mapa')
    .addEventListener('click', () => showMap(data));

  document
    .getElementById('button-sair-mapa')
    .addEventListener('click', closeInfoAndMap);
}
buttonConsulta;

function showMap(localization) {
  document.querySelector('body').style.cursor = 'wait';
  document.getElementById('button-exibir-mapa').disabled = true;
  document.getElementById('button-exibir-mapa').style.backgroundColor = 'grey';
  map.style.display = 'flex';
  const url = `https://maps.google.com/maps?q=${localization.lat},${localization.lng}&hl=pt&z=14&output=embed`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Ocorreu um erro ao abrir o mapa');
      }
      return res;
    })
    .then((jsonData) => {
      createMap(jsonData.url);
    })
    .catch((error) => {
      console.error('Erro ao abrir o mapa:', error);
    });
}

function closeInfoAndMap() {
  map.innerHTML = '';
  info.innerHTML = '';
  map.style.display = 'none';
  info.style.display = 'none';
  containerCep.style.display = 'flex';
}

function createMap(link) {
  map.style.display = 'block';
  map.innerHTML = `<iframe src='${link}' width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  const iframe = document.querySelector('iframe');

  //verifica se o iframe foi totalmente carregado
  iframe.addEventListener('load', function () {
    document.querySelector('body').style.cursor = 'default';
    document.getElementById('button-exibir-mapa').style.backgroundColor =
      'green';
    document.getElementById('button-exibir-mapa').disabled = false;
  });
}
