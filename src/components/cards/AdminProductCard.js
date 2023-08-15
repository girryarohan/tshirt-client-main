import React from "react";
import { Card } from "antd";
import noimage from "../../images/noimage.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

function AdminProductCard({ product, handleRemove }) {
  // destructure
  const { title, description, images, slug } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          src={images && images.length ? images[0].url : noimage}
          alt={title}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-info" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug, title)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
}

export default AdminProductCard;
