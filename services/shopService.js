// shopService.js

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
        })
    })
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi;
