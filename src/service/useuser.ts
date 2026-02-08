import { useEffect, useState } from "react";
import { authupdatepassword, getapprovedshops, getproducts, getuserbyemail } from "../api/auth.api";
import type { UpdatePasswordPayload } from "../type/model";

export const useuser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shops, setShops] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const fetchUserByEmail = async (email: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await getuserbyemail(email);
      setUser(res.data);
      return res;
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Fetching user failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (data: UpdatePasswordPayload) => {
    setLoading(true);
    setError("");
    try {
      const res = await authupdatepassword(data);
      return res;
    } catch (err: any) {
      const msg =
        err.message ||
        "Password update failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const [shopsRes, productsRes] = await Promise.allSettled([
        getapprovedshops(),
        getproducts()
      ]);

      if (shopsRes.status === "fulfilled" && shopsRes.value?.data) {
        console.log("Shops data:", shopsRes.value.data);
        setShops(Array.isArray(shopsRes.value.data) ? shopsRes.value.data : []);
      } else {
        setShops([]);  // always fallback to array
      }

      if (productsRes.status === "fulfilled") {
        setProducts(Array.isArray(productsRes.value.data) ? productsRes.value.data : []);
        console.log("Products data:", productsRes.value.data);
      } else {
        setProducts([]);  // always fallback to array
        console.error(productsRes.reason);
      }

      setLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 300000);

    return () => clearInterval(interval);
  }, []);


  return {
    user,
    loading,
    error,
    shops,
    fetchUserByEmail,
    updatePassword,
    products
  };
};
