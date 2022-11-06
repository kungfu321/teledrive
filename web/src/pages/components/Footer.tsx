import { Divider, Layout, Typography } from 'antd'
import React from 'react'

interface Props {
  me?: any
}

const Footer: React.FC<Props> = () => {
  return <>
    <Layout.Footer style={{ background: '#f0f2f5', paddingTop: '50px' }}>
      <Divider />
      <Typography.Paragraph style={{ textAlign: 'center' }}>
        Copyright &copy; {new Date().getFullYear()}
      </Typography.Paragraph>
    </Layout.Footer>
  </>
}

export default Footer
