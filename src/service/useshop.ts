import { useEffect, useState } from "react";

import {
  addProduct,
  deleteproduct,
  getProductsByShop,
  getshopdetails,
  updatepassword,
  updateshop,
} from "../api/auth.api";
import type { ProductRequest } from "../type/model";

export const useShop = () => {
  const [shopDetails, setShopDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  const fetchShopDetails = async (id: number) => {
    try {
      setLoading(true);
      const res = await getshopdetails(id);
      setShopDetails(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch shop details");
    } finally {
      setLoading(false);
    }
  };

  const updateShopInfo = async (id: number) => {
    try {
      setLoading(true);
      const res = await updateshop(id);
      setShopDetails(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Shop update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: any) => {
    try {
      setLoading(true);
      const res = await updatepassword(data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Password update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const fetchProducts = async (shopId: number) => {
    try {
      setLoading(true);
      const res = await getProductsByShop(shopId);
      setProducts(res.data);
      return res.data;
    } catch (err: any) {
      console.log(err.message || "Fetching products failed");
      setError(err.message || "Fetching products failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to upload/add a product
  const uploadProduct = async (shopId: number, product: ProductRequest, file: File) => {
    try {
      const res = await addProduct(shopId, product, file);
      setProducts(prev => [...prev, res.data]); // update local state
      return res.data;
    } catch (err: any) {
      console.log(err.message || "Uploading product failed");
      throw err;
    }
  };
  const deleteProductById = async (productId: number) => {
    try {
      const res = await deleteproduct(productId);
      console.log(res.data);
      setProducts(prev => prev.filter(product => product.id !== productId));
      return res.data;
    } catch (err: any) {
      setError(err.message || "Deleting product failed");
      console.log(err.message || "Deleting product failed");
      throw err;
    }
  }

  useEffect(() => {
    if (!shopDetails?.id) return;

    const loadProducts = () => {
      fetchProducts(shopDetails.id);
    };

    loadProducts(); // initial call
    const productsInterval = setInterval(loadProducts, 300000); 

    return () => clearInterval(productsInterval);
  }, [shopDetails?.id]);

  return {
    shopDetails,
    fetchProducts,
    uploadProduct,
    loading,
    products,
    error,
    fetchShopDetails,
    updateShopInfo,
    changePassword,
    setError,
    deleteProductById
  };
};