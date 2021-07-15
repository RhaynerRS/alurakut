const { SiteClient } = require('datocms-client')
const client = new SiteClient('98ed52190da0354328bc8ed17cc8a8')
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
  const githubUser = 'RhaynerRS'
  const pessoasFavoritas = ["RhaynerRS", "juunegreiros", "omariosouto", "tetzdesen", "esin", "nathyts", "RhaynerRS", "juunegreiros", "omariosouto"]

  //pego os dados dos seguidores por meio da API do Github
  //inicio
  const [segidores, setSegidores] = useState([])

  useEffect(async () => {
    try {
      const comunity = await client.items.all({ filter: { type: "community" } })
      setComunidades(comunity)
      console.log(comunity)
    } catch (error) {
      console.log(error)
    }
  }, [])
  //fim

  //useState que busca os seguidores na api do githib e os exibe
  //inicio
  useEffect(function () {

    fetch(`https://api.github.com/users/tetzdesen/followers`).then
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
            <form onSubmit={
              //função assincrona que grava dados no DATO
              //inicio
              async function createRecord(e) {
                try {
                  e.preventDefault();
                  const dadosDoForm = new FormData(e.target)
                  const record = await client.items.create({
                    itemType: '967610',
                    title: dadosDoForm.get('title'),
                    imageurl: dadosDoForm.get('image')
                  });
                  const updatedCumunity = [...comunidades, record]
                  setComunidades(updatedCumunity)
                  e.target.reset()
                } catch (error) {
                  console.log(error)
                }
              }
            }
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
                  <li key={itemAtual.id}><a href={`/${itemAtual.title}`} >
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
                  <li key={itemAtual}><a href={`https://github.com/${itemAtual}`} >
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
