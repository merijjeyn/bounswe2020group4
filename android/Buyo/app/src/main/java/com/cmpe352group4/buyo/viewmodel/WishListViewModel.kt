package com.cmpe352group4.buyo.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import com.cmpe352group4.buyo.api.Resource
import com.cmpe352group4.buyo.datamanager.repositories.WishListRepository
import com.cmpe352group4.buyo.util.livedata.AbsentLiveData
import com.cmpe352group4.buyo.vo.WishListProducts
import javax.inject.Inject


class WishListViewModel @Inject constructor(
    val repository: WishListRepository
): ViewModel() {

    private val _wishListProduct = MutableLiveData<Int>()

    val wishListProducts: LiveData<Resource<WishListProducts>> =
        Transformations.switchMap(_wishListProduct) { Id ->
            if (Id == null)
                AbsentLiveData.create()
            else
                repository.getWishListPorducts(Id)
        }

    fun onFetchWishListProducts(customerId: Int) {
        _wishListProduct.value = customerId
    }

}