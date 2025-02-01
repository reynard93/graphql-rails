import React from 'react'
import MenuList from './components/MenuList'
import { Layout } from 'antd'
import 'antd/dist/reset.css'

const { Content } = Layout

const App: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
        <MenuList />
      </Content>
    </Layout>
  )
}

export default App