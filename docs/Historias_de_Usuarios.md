Módulo: Mapa Interativo e Rotas (Responsável: Jatanael)

US01 - Visualização do Mapa e Pins

História: Como Usuário, eu quero visualizar um mapa interativo da cidade de Fortaleza com marcadores para que eu possa descobrir a localização dos eventos geeks e estabelecimentos.

Critérios de Aceite: O mapa deve renderizar centrado na cidade de Fortaleza. Os marcadores devem ser carregados dinamicamente a partir dos dados do back-end. Devem existir ícones diferentes para eventos e estabelecimentos fixos.

US02 - Detalhes do Evento

História: Como Usuário, eu quero clicar em um marcador no mapa para que eu possa ver as informações básicas do evento (nome, data, horário e empresa responsável).

Critérios de Aceite: Ao clicar no marcador, um card deve se abrir sobre o mapa. O card deve conter um botão de "Ver rota". Se o usuário clicar fora do card, ele deve fechar automaticamente.

US03 - Traçado de Rota e Tempo

História: Como Usuário, eu quero gerar uma rota da minha localização atual até o evento para que eu saiba a distância e o tempo estimado de chegada dependendo do meu transporte.

Critérios de Aceite: O sistema deve solicitar a permissão de geolocalização do navegador do usuário. O mapa deve desenhar uma linha visível ligando a posição do usuário ao evento. O sistema deve exibir o tempo estimado baseando-se na API de mapas.

Módulo: Autenticação e Perfil do Usuário (Responsável: Kleyver)

US04 - Cadastro de Usuário

História: Como Usuário, eu quero criar uma conta na plataforma para que eu possa salvar meus interesses e acessar o mapa.

Critérios de Aceite: O formulário deve exigir nome, e-mail e senha. O sistema deve validar se o e-mail já existe no banco de dados. Senhas devem ser armazenadas de forma segura com criptografia.

US05 - Autenticação e Login

História: Como Usuário ou Empresa, eu quero fazer login com e-mail e senha para que eu possa acessar meu painel exclusivo.

Critérios de Aceite: Retornar mensagem de erro para credenciais inválidas. Redirecionar o usuário para a tela do mapa e a empresa para o painel de controle após o sucesso da autenticação.

US06 - Favoritar Eventos no Calendário

História: Como Usuário, eu quero favoritar um evento para que ele fique salvo na minha lista de interesses e no meu calendário pessoal.

Critérios de Aceite: O card do evento no mapa deve ter um botão de "Salvar". O perfil do usuário deve listar todos os eventos salvos em ordem cronológica.

Módulo: Comercial e Eventos (Responsável: Kahyk)

US07 - Cadastro de Empresa

História: Como Representante de Empresa, eu quero cadastrar meu estabelecimento para que eu possa publicar eventos na plataforma.

Critérios de Aceite: O formulário deve exigir Nome da Empresa, CNPJ, dados do responsável e senha. O CNPJ deve ser validado no front-end e no back-end para evitar formatos incorretos.

US08 - Publicação de Eventos Geek

História: Como Empresa, eu quero cadastrar um novo evento com data, hora e endereço para que ele apareça no mapa interativo dos usuários.

Critérios de Aceite: A API deve receber o endereço e processar as coordenadas corretas de latitude e longitude. O evento deve ficar visível imediatamente no mapa após o cadastro.

US09 - Edição e Exclusão de Eventos

História: Como Empresa, eu quero editar ou excluir meus próprios eventos para que eu possa corrigir informações ou cancelar encontros.

Critérios de Aceite: A empresa só pode alterar ou apagar os eventos criados por ela mesma. A exclusão deve remover o marcador do mapa em tempo real.