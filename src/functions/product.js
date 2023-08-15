import axios from "axios";

// create product
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product/`, product, {
    headers: {
      authtoken: authtoken,
    },
  });

// get all subcategories  associated with selected (parent) category 81
export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

// 99 delete product
export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  });

// get all product details for product update 102
export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

// update the product
export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken: authtoken,
    },
  });

// new arrivals
export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort: sort,
    order: order,
    page: page,
  });

// pagination count
export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

// update the rating
export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );

// get related products
export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

// get all products by filter
export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
