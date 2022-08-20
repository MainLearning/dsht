import {
  PageContainer,
  ProTable,
  DrawerForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Card, Input, Col, Row, Button, message } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import { useState } from 'react';
import styles from './index.less';
import './index.less';
import { getUserList, addUser } from '@/services/api';

type TableList = {
  id: number;
  username: string;
  email: string;
  mobile: string;
  role_name: string;
};

const columns: ProColumns<TableList>[] = [
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '电话',
    dataIndex: 'mobile',
  },
  {
    title: '角色权限',
    dataIndex: 'role_name',
  },
  {
    title: '操作',
    dataIndex: 'tags',
    render: () => (
      <Row gutter={16}>
        <Col>
          <Button type="primary" shape="circle" icon={<FormOutlined />} size="large" />
        </Col>
        <Col>
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} size="large" />
        </Col>
      </Row>
    ),
  },
];

export default function Users() {
  const intl = useIntl();

  const [queryInfo, setQueryInfo] = useState<object>({
    query: '',
    pagenum: 1,
    pagesize: 5,
  });

  const FromChange = async (value: any) => {
    // console.log(value);
    const { data: res } = await addUser(value);
    // console.log(res);
    if (res.meta.status !== 201) return message.error(res.meta.msg);
    message.success('添加成功');
  };

  return (
    <PageContainer>
      <Card className={styles.borderRadius}>
        <Row gutter={16}>
          <Col span={8}>
            <Input.Search
              size="large"
              placeholder={intl.formatMessage({
                id: 'users.search.placeholder',
              })}
              onSearch={value => {
                setQueryInfo({ ...queryInfo, query: value });
              }}
              enterButton
              allowClear
            />
          </Col>
          <Col>
            <DrawerForm
              trigger={
                <Button type="primary" size="large">
                  <PlusOutlined />
                  添加用户
                </Button>
              }
              title="添加用户"
              onFinish={async value => {
                FromChange(value);
              }}
            >
              <ProForm.Group>
                <ProFormText
                  name="username"
                  width="md"
                  label="用户名"
                  placeholder="请输入用户名"
                  rules={[{ required: true, message: '请输入用户名' }]}
                />
                <ProFormText.Password
                  width="md"
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[{ required: true, message: '请输入密码' }]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  width="md"
                  name="email"
                  label="邮箱账号"
                  placeholder="请输入邮箱账号"
                  rules={[{ required: true, message: '请输入邮箱账号' }]}
                />
                <ProFormText
                  width="md"
                  name="mobile"
                  label="电话号码"
                  placeholder="请输入电话号码"
                  rules={[{ required: true, message: '请输入电话号码' }]}
                />
              </ProForm.Group>
            </DrawerForm>
          </Col>
        </Row>
        <ProTable
          columns={columns}
          bordered
          search={false}
          rowKey="id"
          params={queryInfo}
          request={async params => {
            // console.log(params);
            const { data: res } = await getUserList(params);
            console.log(res);
            return {
              data: res.data.users,
              total: res.data.total,
              success: true,
            };
          }}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </PageContainer>
  );
}
