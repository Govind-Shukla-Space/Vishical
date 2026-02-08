import type { AuthPayload, Payload, ProductRequest, ShopSignUpPayload, UpdatePasswordPayload } from "../type/model";
import { api } from "./api";

export const login = (data: Payload) => {//done
    return api.post("auth/login", data);
};
export const logout = async () => {
  return api.post("/auth/logout");
};
//admin apis
export const adminsignup = (data: Payload) => {//done
    return api.post("admin/register", data);
}
export const getshops = () => {//done
    return api.get("admin/shops");
}
export const getapproved = (id: number) => {//done
    return api.put(`admin/approve/${id}`);
}
export const getallusers = () => {//done
    return api.get("admin/users");
}
export const getpendingshops = () => {//done
    return api.get("admin/pending");
}
export const deleteuser = (email: string) => {//done
    return api.delete(`admin/delete/user/${email}`);
}
export const deleteshop = (email: String) => {//done
    return api.delete(`admin/delete/shop/${email}`);
}
export const adminupdatepassword = (data: UpdatePasswordPayload) => {//done
    return api.put("admin/update-password", data);
}
export const updateadminimage = (id: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.put(`admin/${id}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getAdminById = (id: number) => {
    return api.get(`admin/image/${id}`);
};
export const getproducts = () => {
    return api.get('admin/products');
}
export const deleteproduct = (productId: number) => {
    return api.delete(`api/products/delete/${productId}`);
};

//shop api
export const shopsignup = (data: ShopSignUpPayload) => {//done
    return api.post("api/shop/register", data);
}
export const getshopdetails = (id: number) => {//done
    return api.get(`api/shop/${id}`);
} // ye exits hi nhi karti hai 
export const getapprovedshops = () => {//done
    return api.get("api/shop/approved");
}
export const updateshop = (id: number) => {//done
    return api.put(`api/shop/update/${id}`);
}
export const updatepassword = (data: UpdatePasswordPayload) => {//done
    return api.put("api/shop/update-password", data);
}

export const addProduct = (shopId: number, product: ProductRequest, file: File) => {
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    formData.append("file", file);

    return api.post(`api/products/${shopId}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Get all products of a shop
export const getProductsByShop = (shopId: number) => {
    return api.get(`api/products/shop/${shopId}`);
};


//user api
export const authsign = (data: AuthPayload) => {//done
    return api.post("auth/register/user", data);
}
export const authupdatepassword = (data: UpdatePasswordPayload) => {
    return api.put("auth/update-password", data);
}
export const getuserbyemail = (email: string) => {
    return api.get(`auth/user/${email}`);
}