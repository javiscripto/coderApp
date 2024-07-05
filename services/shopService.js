
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../firebase/database";

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    refetchOnFocus:true,
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
        //para cada recurso que queramos crear, modificar o eliminar en la bd (verbos http)
        postOrder: builder.mutation({
            query: order => ({
                url: `orders.json`,
                method: `POST`,
                body: order,
            })
        }),
        getOrders:builder.query({
            query:user=>`orders.json?orderBy="user"&equalTo="${user}"`// recibe elLocalId
        }),
        getOrderById:builder.query({
            query:orderId=>`orders/${orderId}.json`
        })
        ,
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

    })
});

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    usePostOrderMutation,
    useGetOrdersQuery,
    useSaveProfileImageMutation,
    useGetProfileImageQuery } = shopApi;

