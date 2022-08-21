import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Card, Row, Col, Button, Space, Tag } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { categoriesList } from '@/services/api';

type QueryInfo = {
  type: number;
  pagenum: number;
  pagesize: number;
};

export default function Categories() {
  const [queryInfo, setQueryInfo] = useState<QueryInfo>({
    type: 1,
    pagenum: 1,
    pagesize: 5,
  });

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
            <Tag color="green">二级</Tag>
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
          request={async () => {
            const {
              data: { data },
            } = await categoriesList(queryInfo);
            // console.log(data);
            return {
              data: data.result,
              total: data.total,
            };
          }}
        />
      </Card>
    </PageContainer>
  );
}
