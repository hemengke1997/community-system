interface selectOptions {
  label: string;
  value: string;
}

export interface FilterSearchProps {
  selectVal?: string;
  value?: string | number; // 输入框value
  loading: boolean; // 按钮loading
  enterButton?: string; // 按钮文字
  selectOptions?: selectOptions[]; // 下拉options，默认为空
  placeholder?: string; // input placeholder
  onSearch: ({ value, key }: { value: string; key?: string }) => void; // 点击搜索图标、清除图标，或按下回车键时的回调
}
