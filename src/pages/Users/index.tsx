import { PageContainer, DrawerForm, ProFormText } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Card, Input, Col, Row, Button, message, Table, Popconfirm } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './index.less';
import './index.less';
import { getUserList, addUser, deleteUser } from '@/services/api';

type QueryInfo = {
  query: string;
  pagenum: number;
  pagesize: number;
};

type Pagination = {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
};

export default function Users() {
  const intl = useIntl();

  const [queryInfo, setQueryInfo] = useState<QueryInfo>({
    query: '',
    pagenum: 1,
    pagesize: 5,
  });

  const [total, setTotal] = useState<number>(0);

  const [userList, setUserList] = useState<any[]>([]);

  const restFormRef = useRef<ProFormInstance>();

  // 获取用户信息
  const RequestEvent = async () => {
    const { data: res } = await getUserList(queryInfo);
    // console.log(res);
    if (res.meta.status !== 200) return message.error('获取用户数据失败');

    setUserList(res.data.users);
    setTotal(res.data.total);
  };

  // 分页
  const handlePageChange = useCallback(
    page => {
      setQueryInfo({ ...queryInfo, pagenum: page });
      RequestEvent();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryInfo],
  );

  // 删除用户新
  const handleDeleteChange = async (record: any) => {
    const { data: res } = await deleteUser(record.id);
    // console.log(res);
    if (res.meta.status !== 200) return message.error(res.meta.msg);
    RequestEvent();
    message.success(res.meta.msg);
  };

  // 添加用户信息
  const FromAddChange = async (value: any) => {
    // console.log(value);
    const { data: res } = await addUser(value);
    // console.log(res);
    if (res.meta.status !== 201) return message.error(res.meta.msg);
    RequestEvent();
    restFormRef.current?.resetFields();
    message.success('添加成功');
  };

  // 设置分页
  const pagination: Pagination = {
    current: queryInfo.pagenum,
    pageSize: queryInfo.pagesize,
    total,
    onChange: page => handlePageChange(page),
  };

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
      render: (_: any, record: any) => (
        <Row gutter={16}>
          <Col>
            <DrawerForm
              width={500}
              trigger={
                <Button type="primary" shape="circle" icon={<FormOutlined />} size="large" />
              }
            >
              <ProFormText width="md" label="用户名" />
            </DrawerForm>
          </Col>
          <Col>
            <Popconfirm
              title="是否删除"
              okText="删除"
              cancelText="取消"
              onConfirm={() => {
                handleDeleteChange(record);
              }}
            >
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} size="large" />
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    RequestEvent();
    // console.log('11');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInfo, total]);

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
              formRef={restFormRef}
              trigger={
                <Button type="primary" size="large">
                  <PlusOutlined />
                  添加用户
                </Button>
              }
              title="添加用户"
              onFinish={async value => {
                FromAddChange(value);
              }}
              width={500}
            >
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
            </DrawerForm>
          </Col>
        </Row>
        <Table
          columns={columns}
          bordered
          className={styles.table}
          rowKey="id"
          dataSource={userList}
          pagination={pagination}
        />
      </Card>
    </PageContainer>
  );
}
