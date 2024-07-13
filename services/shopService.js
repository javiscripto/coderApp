import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../firebase/database";

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    refetchOnFocus: true,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "products.json"
        }),
        getCategories: builder.query({
            query: () => "categories.json"
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
        }),
        postOrder: builder.mutation({
            query: order => ({
                url: `orders.json`,
                method: `POST`,
                body: order,
            })
        }),
        getOrders: builder.query({
            query: user => `orders.json?orderBy="user"&equalTo="${user}"`
        }),
        getOrderById: builder.query({
            query: orderId => `orders/${orderId}.json`
        }),
        saveProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: { image },
            })
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
        }),
        addWishListItem: builder.mutation({
            query: ({ localId, product }) => ({
                url: `wishlist/${localId}/products/${product.id}.json`,
                method: "PUT",
                body: {
                    id: product.id,
                    img: product.img,
                    price: product.price,
                    brand: product.brand

                },
            })
        }),
        getWishList: builder.query({
            query: localId => `wishlist/${localId}/products.json`,
        }),
        deleteWishListItem: builder.mutation({
            query: ({ localId, productId }) => ({
                url: `wishlist/${localId}/products/${productId}.json`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    usePostOrderMutation,
    useGetOrdersQuery,
    useSaveProfileImageMutation,
    useGetProfileImageQuery,
    useAddWishListItemMutation,
    useGetWishListQuery,
    useDeleteWishListItemMutation,
} = shopApi;
