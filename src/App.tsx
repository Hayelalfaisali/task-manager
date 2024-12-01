import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TaskBoard } from './components/TaskBoard'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.header`
  background: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`

const Title = styled.h1`
  margin: 0;
  color: #1a1a1a;
  font-size: 1.5rem;
`

const MainContent = styled.main`
  flex: 1;
  overflow: hidden;
  position: relative;
`

function App() {
  return (
    <AppContainer>
      <Header>
        <Title>Task Manager</Title>
      </Header>
      <MainContent>
        <TaskBoard />
      </MainContent>
    </AppContainer>
  )
}

export default App
