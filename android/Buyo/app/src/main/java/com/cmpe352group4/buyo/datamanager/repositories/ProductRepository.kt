package com.cmpe352group4.buyo.datamanager.repositories

import androidx.lifecycle.LiveData
import com.cmpe352group4.buyo.api.Api
import com.cmpe352group4.buyo.api.ApiResponse
import com.cmpe352group4.buyo.api.NetworkServiceWrapper
import com.cmpe352group4.buyo.api.Resource
import com.cmpe352group4.buyo.base.AppExecutors
import com.cmpe352group4.buyo.base.ConnectionManager
import com.cmpe352group4.buyo.util.livedata.InitialLiveData
import com.cmpe352group4.buyo.vo.Product
import com.cmpe352group4.buyo.vo.ProductList
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ProductRepository @Inject constructor(
    private val appExecutors: AppExecutors,
    private val api: Api,
    private val connectionManager: ConnectionManager
){

    fun getProductbyId(productId:Int): LiveData<Resource<Product>> {
        return object : NetworkServiceWrapper<Product,Product>(appExecutors,connectionManager){
            override fun loadFromApi(data: Product): LiveData<Product> {
                return InitialLiveData.create(data)
            }
            override fun createCall(): LiveData<ApiResponse<Product>> = api.fetchProductDetail(productId)
        }.asLiveData()
    }


    fun getProductListbyKeyword(keyword:String): LiveData<Resource<ProductList>> {
        return object : NetworkServiceWrapper<ProductList,ProductList>(appExecutors,connectionManager){
            override fun loadFromApi(data: ProductList): LiveData<ProductList> {
                return InitialLiveData.create(data)
            }
            override fun createCall(): LiveData<ApiResponse<ProductList>> = api.fetchProductSearch(keyword)
        }.asLiveData()
    }
}