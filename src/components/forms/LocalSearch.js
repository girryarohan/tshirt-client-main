import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

function LocalSearch({ keyword, setKeyword }) {
  // step 3 handle searched keyword
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Input
      size="large"
      allowClear
      placeholder="Search ..."
      prefix={<SearchOutlined />}
      value={keyword}
      onChange={handleSearchChange}
    />
  );
}

export default LocalSearch;
