import React from 'react'
import MenuList from './components/MenuList.tsx'
import { Layout } from 'antd'
import 'antd/dist/reset.css'

const { Content } = Layout

const App: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-8 max-w-7xl mx-auto w-full">
        <MenuList />
      </Content>
    </Layout>
  )
}

export default App