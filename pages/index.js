
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons.js'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


//sidebar do perfil
//inicio
function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <a className="box" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <AlurakutProfileSidebarMenuDefault />
    </Box>)
}
//fim

//Box dos seguidores puxando dados da API do Github
//inicio
function GithubFollowers(props) {
  return (<ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{props.title} ({props.items.length})</h2>

    <ul>
      {props.items.slice(0, 6).map((itemAtual) => {
        return (
          <li key={itemAtual.id}><a href={`https://github.com/${itemAtual.login}`} >
            <img src={itemAtual.avatar_url} />
            <span>{itemAtual.login}</span>
          </a></li>
        )
      })}
    </ul>

  </ProfileRelationsBoxWrapper>)
}
//fim



export default function Home() {
  const [comunidades, setComunidades] = useState([]);
  const githubUser = 'tetzdesen'
  const pessoasFavoritas = ["RhaynerRS", "juunegreiros", "omariosouto", "tetzdesen", "esin", "nathyts", "RhaynerRS", "juunegreiros", "omariosouto"]

  //pego os dados dos seguidores por meio da API do Github
  //inicio
  const [segidores, setSegidores] = useState([])

    // API GraphQL
    //inicio
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '6686f9aada7e6525140114c9ffc9b6',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageurl
          creatorslug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })
  //fim

  //useState que busca os seguidores na api do githib e os exibe
  //inicio
  useEffect(function () {

    fetch(`https://api.github.com/users/${githubUser}/followers`).then
      (function (respostaServidor) {
        if (respostaServidor.ok) { return respostaServidor.json() }
        throw new Error(`Aconteceu algo errado ( ${respostaServidor.status} )`)
      })
      .then(function (respostaConvertida) { setSegidores(respostaConvertida); });
  }, [])
  //fim
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box><h1 className="title">Bem-Vindo</h1>
            <OrkutNostalgicIconSet sexy="2" confiavel="3" legal="1"/>
          </Box>
          <Box><h2 className="subTitle">O que você deseja fazer</h2>
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageurl: dadosDoForm.get('image'),
                  creatorslug: githubUser,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
            }}
            //fim
            >
              <div>
                <input type="text" placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
                <input type="text" placeholder="Coloque a URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque a URL para usarmos de capa" />
              </div>
              <button>
                Criar comunidade
              </button>
              <button>
                Escrever depoimento
              </button>
              <button>
                Deixar um scrap
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <GithubFollowers items={segidores} title="Seguidores" />
          <ProfileRelationsBoxWrapper><h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}><a href={`/comunidades/${itemAtual.id}`} >
                    <img src={itemAtual.imageurl} />
                    <span>{itemAtual.title}</span>
                  </a></li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper><h2 className="smallTitle">Pessoas Favoritas ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual} ><a /*href={`/${itemAtual}`}*/ >
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a></li>
                );
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid></>)
}
