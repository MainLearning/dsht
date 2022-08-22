import { PageContainer, ProTable, ModalForm, ProFormText } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Card, Row, Col, Button, Space, Tag } from 'antd';
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { categoriesList } from '@/services/api';
import './index.less';

export default function Categories() {
  const columns: ProColumns<any>[] = [
    {
      title: '分类名称',
      dataIndex: 'cat_name',
    },
    {
      title: '排序',
      dataIndex: 'cat_level',
      render: (_, record) => (
        <Space>
          {record.cat_level === 0 ? (
            <Tag color="success">一级</Tag>
          ) : record.cat_level === 1 ? (
            <Tag color="blue">二级</Tag>
          ) : (
            <Tag color="yellow">三级</Tag>
          )}
        </Space>
      ),
    },
    {
      title: '操作',
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

  return (
    <PageContainer>
      <Card>
        <ProTable
          columns={columns}
          search={false}
          bordered
          rowKey="cat_id"
          pagination={{
            pageSize: 5,
            current: 1,
          }}
          request={async ({ current, pageSize }) => {
            const {
              data: { data },
            } = await categoriesList({ type: 3, pagenum: current, pagesize: pageSize });
            // console.log(data);
            return {
              data: data.result,
              total: data.total,
            };
          }}
          toolBarRender={() => [
            <ModalForm
              key="form"
              title="添加分类"
              trigger={
                <Button key="button" icon={<PlusOutlined />} type="primary">
                  添加分类
                </Button>
              }
            >
              <ProFormText width="md" name="name" placeholder="请输入分类名称" />
            </ModalForm>,
          ]}
        />
      </Card>
    </PageContainer>
  );
}
