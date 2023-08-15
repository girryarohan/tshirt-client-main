import React, { useState } from "react";
import { Select } from "antd";
import { storage } from "../../firebase";

const { Option } = Select;

function ProductCreateForm({
  handleChange,
  handleSubmit,
  values,
  setValues,
  handleCategoryChange,
  subOptions,
  showSub,
}) {
  // destructuring values
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  // const [progress, setProgress] = useState(0);
  // const formHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   const file = e.target.files[0];
  //   uploadFiles(file);
  // };
  // // Create the file metadata
  // var metadata = {
  //   contentType: "cdr",
  // };

  // const uploadFiles = (file) => {
  //   const uploadTask = storage.ref(`files/${file.name}`).put(file, metadata);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       //
  //       const prog = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(prog);
  //     },
  //     (error) => console.log(error),
  //     () => {
  //       storage
  //         .ref("files")
  //         .child(file.name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           console.log(url);
  //         });
  //     }
  //   );
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      {/* <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div> */}
      {/* <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div> */}
      <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Type</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Please Select Category</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {/* 85 below */}
      {showSub && (
        <div className="form-group">
          <label>Subcategories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option value={s._id} key={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      {/* <input type="file" className="input" onChange={(e) => formHandler(e)} /> */}

      <button className="btn btn-outline-info">Save</button>
      {/*<hr />
      <h2>Uploading done {progress}%</h2>
      <div className="form-group">
        <label>Upload Design File</label>
        <br />
        <input
          type="file"
          name="fileURL"
          className="btn btn-info btn-raised"
          onChange={(e) => formHandler(e)}
        />
        {progress >= 0 && progress && (
          <label>Upload progress {progress}% </label>
        )}
      </div>
      {progress < 100 && (
        <p>Save button will remain disabled until you upload a design file</p>
      )}
      <button disabled={progress < 100} className="btn btn-outline-info">
        Save
      </button> */}
    </form>
  );
}

export default ProductCreateForm;
