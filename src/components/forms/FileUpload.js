import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { UploadOutlined } from "@ant-design/icons";
function FileUpload({ values, setValues, setLoading }) {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    //
    // console.log(e.target.files);
    // resize images
    let files = e.target.files;
    let allUploadedFiles = values.images; //90
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOADED RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY ERR UPLOAD");
              });
          },
          "base64"
        );
      }
    }

    // send back to server to upload to cloudinary
    // set url to images[] in parent component state- ProductCreate
  };
  const handleImageRemove = (public_id) => {
    setLoading(true);
    console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id: public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        //
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        //
        setLoading(false);
        console.log("IMAGE REMOVE ERR", err);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3 mb-3"
              />
            </Badge>
          ))}
      </div>

      <div className="row">
        <label className="btn btn-info btn-raised">
          <UploadOutlined className="mr-3" />
          Click to Upload Images
          {/* 88 */}
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
}

export default FileUpload;
