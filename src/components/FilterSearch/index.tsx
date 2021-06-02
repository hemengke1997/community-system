/*
 * @Description:
 * @Author: Gavin
 */
import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { FilterSearchProps } from './data.d';
import styles from './index.module.less';

const { Search } = Input;
const { Option } = Select;

/**
 * Table 关键字搜索
 * @param props
 */
const FilterSearch: React.FC<FilterSearchProps> = (props) => {
  const {
    value = '',
    loading = false,
    enterButton = '搜索',
    selectOptions = [],
    placeholder = '请输入搜索关键字',
    onSearch,
    selectVal = '',
  } = props;

  const [selectValue, setSelectValue] = useState(
    selectOptions.length ? selectOptions[0].value : '',
  );
  const [inputPlaceholder, setInputPlaceholder] = useState<string>(placeholder);
  const [inputValue, setInputValue] = useState<any>('');

  useEffect(() => {
    // 清空筛选时判断
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (selectVal) {
      setSelectValue(selectVal);
    } else if (selectOptions[0]) {
      setSelectValue(selectOptions[0].value);
    }
  }, [selectVal]);

  useEffect(() => {
    // 如果有选择字段搜索，设置初始值
    if (selectOptions.length) {
      const firstItem = selectOptions[0];
      setSelectValue(firstItem.value);
      setInputPlaceholder(`请输入${firstItem.label}`);
    }
  }, [selectOptions]);

  /**
   *
   * @param e
   */
  const onSelectChange = (val: string) => {
    const t = selectOptions.find((item) => {
      return item.value === val;
    });

    setSelectValue(val);
    setInputPlaceholder(`请输入${t?.label}`);
  };

  // 输入框change
  const onChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };

  // 搜索
  const handleOnSearch = (val: any) => {
    if (!val && !inputValue) return; // 如果没有搜索值，且进行搜索前的值也为空则不进行后续操作

    if (typeof onSearch === 'function') {
      if (selectOptions.length) {
        onSearch({
          value: val,
          key: selectValue,
        });
      } else {
        onSearch({ value: val });
      }
    }
  };

  return (
    <div className={styles.container}>
      <Input.Group compact>
        {selectOptions.length ? (
          <Select onChange={onSelectChange} value={selectValue}>
            {selectOptions.map((item) => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        ) : null}

        <Search
          value={inputValue}
          placeholder={inputPlaceholder}
          loading={loading}
          enterButton={enterButton}
          allowClear
          onChange={onChangeInput}
          onSearch={handleOnSearch}
        />
      </Input.Group>
    </div>
  );
};

export default FilterSearch;
