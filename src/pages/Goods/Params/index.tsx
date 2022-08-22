import { PageContainer, ProFormCascader } from '@ant-design/pro-components';
import { Card, Alert, message } from 'antd';
import styles from './index.less';
import './index.less';
import { categoriesList } from '@/services/api';
import { useState, useEffect } from 'react';

export default function Params() {
  const [dataList, setDataList] = useState<any[]>([]);
  const RequestEvent = async () => {
    const {
      data: { data, meta },
    } = await categoriesList();
    // console.log(data);
    if (meta.status !== 200) return message.error(meta.msg);
    setDataList(data);
  };
  useEffect(() => {
    RequestEvent();
  }, []);
  return (
    <PageContainer>
      <Card>
        <Alert
          className={styles.Alert}
          banner
          message="注意：只允许为第三级分类设置相关参数！"
          type="warning"
          closable
        />
        <div className={styles.selectContainer}>
          <span>选择商品分类：</span>
          <ProFormCascader
            fieldProps={{
              options: dataList,
              fieldNames: {
                label: 'cat_name',
                value: 'cat_id',
              },
            }}
          />
        </div>
      </Card>
    </PageContainer>
  );
}
