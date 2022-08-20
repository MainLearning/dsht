import { PageContainer, DrawerForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, Input, Col, Row, Button, message, Table } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import { useState, useEffect } from 'react';
import styles from './index.less';
import './index.less';
import { getUserList, addUser } from '@/services/api';

const columns = [
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

type UserInfo = {
  query: string;
  pagenum: number;
  pagesize: number;
};

export default function Users() {
  const intl = useIntl();

  const [queryInfo, setQueryInfo] = useState<UserInfo>({
    query: '',
    pagenum: 1,
    pagesize: 5,
  });

  const [userList, setUserList] = useState<any[]>([]);

  const RequestEvent = async () => {
    const { data: res } = await getUserList(queryInfo);
    // console.log(res);
    if (res.meta.status !== 200) return message.error('获取用户数据失败');

    setUserList(res.data.users);
  };

  useEffect(() => {
    RequestEvent();
    console.log('11');
  }, [queryInfo]);

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
        <Table
          columns={columns}
          bordered
          className={styles.table}
          rowKey="id"
          dataSource={userList}
        />
      </Card>
    </PageContainer>
  );
}
