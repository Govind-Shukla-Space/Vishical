import { useEffect, useState } from 'react';
import {
    adminupdatepassword,
    deleteproduct,
    deleteshop,
    deleteuser,
    getallusers,
    getapproved,
    getpendingshops,
    getproducts,
    getshops,
} from '../api/auth.api';
import type { UpdatePasswordPayload } from '../type/model';

export const useadmin = () => {
    const [error, setError] = useState("");
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [pendingShops, setPendingShops] = useState<any[]>([]);

    const fetchShops = async () => {
        try {
            const res = await getshops();
            setShops(res.data);
            console.log(res.data);
        } catch (err: any) {
            setError(err.message || "Fetching shops failed");
            console.log(err.message || "Fetching shops failed");
        } finally {
            console.log("done");
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await getproducts();
            console.log(res.data);
            setProducts(res.data);
        } catch (err: any) {
            setError(err.message || "Fetching products failed");
            console.log(err.message || "Fetching products failed");
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await getallusers();
            console.log(res.data);
            setUsers(res.data);
        } catch (err: any) {
            setError(err.message || "Fetching users failed");
        } finally {
            console.log("done");
        }
    }

    const fetchPendingShops = async () => {
        try {
            const res = await getpendingshops();
            setPendingShops(res.data);
            console.log(res.data);
        } catch (err: any) {
            setError(err.message || "Fetching pending shops failed");
            console.log(err.message || "Fetching pending shops failed");
        } finally {
            console.log("done");
        }
    }

    const approveShop = async (id: number) => {
        try {
            const res = await getapproved(id);
            console.log(res.data);
            setPendingShops(prev => prev.filter(shop => shop.id !== id));
            setShops((prev) =>
                prev.map((shop) =>
                    shop.id === id ? { ...shop, approved: true } : shop
                )
            );
        } catch (err: any) {
            setError(err.message || "Approving shop failed");
            console.log(err.message || "Approving shop failed");
        }
    }

    const deleteUser = async (email: string) => {
        try {
            const res = await deleteuser(email);
            console.log(res.data);
            setUsers(prev => prev.filter(user => user.email !== email));
        } catch (err: any) {
            setError(err.message || "Deleting user failed");
            console.log(err.message || "Deleting user failed");
        }
    }

    const deleteShop = async (email: string) => {
        try {
            const res = await deleteshop(email);
            console.log(res.data);
            setShops(prev => prev.filter(shop => shop.email !== email));
        } catch (err: any) {
            setError(err.message || "Deleting shop failed");
            console.log(err.message || "Deleting shop failed");
        }
    }

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

    const updatepassword = async (data: UpdatePasswordPayload) => {
        try {
            const res = await adminupdatepassword(data);
            console.log(res.data);
            return res;
        } catch (err: any) {
            setError(err.message || "Updating password failed");
            console.log(err.message || "Updating password failed");
        }
    }

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const [
                pendingRes,
                shopsRes,
                usersRes,
                productsRes
            ] = await Promise.allSettled([
                fetchPendingShops(),
                fetchShops(),
                fetchUsers(),
                fetchProducts()
            ]);
            //attach the errors to the previous as there can be multiple api falls fails 
            // Pending Shops Error
            if (pendingRes.status === "rejected") {
                console.error("Pending shops failed:", pendingRes.reason);
                setError(prev => prev + " | Pending shops failed");
            }

            // Shops Error
            if (shopsRes.status === "rejected") {
                console.error("Shops failed:", shopsRes.reason);
                setError(prev => prev + " | Shops failed");
            }

            // Users Error
            if (usersRes.status === "rejected") {
                console.error("Users failed:", usersRes.reason);
                setError(prev => prev + " | Users failed");
            }

            // Products Error
            if (productsRes.status === "rejected") {
                console.error("Products failed:", productsRes.reason);
                setError(prev => prev + " | Products failed");
            }

            setLoading(false);
        };

        load();
        const interval = setInterval(load, 300000);

        return () => clearInterval(interval);
    }, []);

    return {
        shops,
        pendingShops,
        users,
        error,
        loading,
        approveShop,
        deleteUser,
        deleteShop,
        updatepassword,
        products,
        deleteProductById
    };
}