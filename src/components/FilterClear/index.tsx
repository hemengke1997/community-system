import React from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.less';

interface PropPrams {
  onClick: () => void;
}

/**
 * Table 清空筛选
 * @param props
 */
const FilterClear: React.FC<PropPrams> = (props) => {
  const { onClick } = props;

  return (
    <Tooltip placement="top" title="清空筛选">
      <DeleteOutlined className={styles.clearIcon} onClick={onClick} />
    </Tooltip>
  );
};

export default FilterClear;
