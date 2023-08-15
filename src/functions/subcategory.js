import axios from "axios";
// get all subcategories
export const getSubcategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subcategories`);

// get single requested subcategory
export const getSubcategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);

// remove subcategory
export const removeSubcategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  });

// update subcategory
export const updateSubcategory = async (slug, subcategory, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,
    subcategory,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );

// create subcategory
export const createSubcategory = async (subcategory, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/subcategory/`, subcategory, {
    headers: {
      authtoken: authtoken,
    },
  });
