
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../firebase/database";

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
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
        //para crear informacion dentro del servidor es necesario agregar al builder el método .mutation 
        //para cada recurso que queramos crear, modificar o eliminar en la bd (verbos http)
        postOrder: builder.mutation({
            query:order=>({
                url:`orders.json`,
                method:`POST`,
                body:order,
            })
        })
    })
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery , usePostOrderMutation } = shopApi;
