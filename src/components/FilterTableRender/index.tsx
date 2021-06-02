/*
 * @Description:
 * @Author: Gavin
 * @version:
 * @Date: 2021-02-08 10:39:10
 * @LastEditTime: 2021-03-03 11:56:07
 */
import React from 'react';
import classNames from 'classnames';
import { Card } from 'antd';
import styles from './index.module.less';

type PropsParams = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Table 自定义头部筛选内容区
 * @param props
 */
const FilterTableRender: React.FC<PropsParams> = (props) => {
  const { children, className } = props;

  return <Card className={classNames(styles.container, className)}>{children}</Card>;
};

export default FilterTableRender;
