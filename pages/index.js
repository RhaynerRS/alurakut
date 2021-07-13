import React from 'react'
import {useState} from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/alurakutCommons.js'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

function ProfileSidebar(props){
  return(
  <Box as="aside">
    <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}} />
    <hr/>
    <a className="box" href={`https://github.com/${props.githubUser}`}>
      @{props.githubUser}
    </a>
    <AlurakutProfileSidebarMenuDefault />
  </Box>)
}
export default function Home() {
  const [comunidades,setComunidades]=useState([]);
  const githubUser = "RhaynerRS"
  const pessoasFavoritas=["tetzdesen","juunegreiros","omariosouto"]

  return (
  <>
  <AlurakutMenu githubUser={githubUser}/>
  <MainGrid>
    <div className="profileArea" style={{ gridArea: 'profileArea' }}>
      <ProfileSidebar githubUser={githubUser}/>
    </div>
    <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
      <Box><h1 className="title">Bem-Vindo</h1>
      <OrkutNostalgicIconSet/>
      </Box>
      <Box><h2 className="subTitle">O que você deseja fazer</h2>
        <form onSubmit={ function handleSubmit(e){
          e.preventDefault()
          const dadosDoForm=new FormData(e.target)
          const comunidade={
            id:new Date().toISOString(),
            image:dadosDoForm.get('image'),
            title:dadosDoForm.get('title')
          }
          setComunidades([...comunidades,comunidade])
          console.log(comunidades)
        }}>
          <div>
            <input type="text" placeholder="Qual vai ser o nome da sua comunidade?" 
            name="title" 
            aria-label="Qual vai ser o nome da sua comunidade?"/>
          </div>
          <div>
            <input type="text" placeholder="Coloque a URL para usarmos de capa" 
            name="image" 
            aria-label="Coloque a URL para usarmos de capa"/>
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
      <ProfileRelationsBoxWrapper><h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

        <ul>
        {comunidades.map((itemAtual)=>{return(
        <li key={itemAtual.id}><a href={`https://github.com/${itemAtual.title}`} >
          <img src={itemAtual.image}/>
          <span>{itemAtual.title}</span>
        </a></li>
        )})}
        </ul>

      </ProfileRelationsBoxWrapper>
      <ProfileRelationsBoxWrapper><h2 className="smallTitle">Pessoas Favoritas ({pessoasFavoritas.length})</h2>

        <ul>
        {pessoasFavoritas.map((itemAtual)=>{return(
        <li key={itemAtual}><a href={`https://github.com/${itemAtual}`} >
          <img src={`https://github.com/${itemAtual}.png`}/>
          <span>{itemAtual}</span>
        </a></li>
        )})}
        </ul>

      </ProfileRelationsBoxWrapper>
    </div>
  </MainGrid></>)
}
