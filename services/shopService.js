import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query"
import { baseUrl } from "../firebase/database"

export const shopApi = createApi({
    baseQuery:fetchBaseQuery({baseUrl}),

    endpoints: builder =>({

        getProducts:builder.query({
            query:()=>"products.json"
        }),
        getCategories:builder.query({
            query:()=>"categories.json"
        }),
        getPoductsByCategory: builder.query({
            query:(category)=>{
                `products.json?orderBy="category"&equalTo="${category}"`
            }
        })

    })
});


export const { useGetProductsQuery,  useGetCategoriesQuery } = shopApi