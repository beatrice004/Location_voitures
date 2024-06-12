<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\StripeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//! Public Routes
    // signup
    Route::post('/signup', [UserController::class, 'signup']);
    // login
    Route::post('/login', [UserController::class, 'login']);
    // list of cars
    Route::get('/cars', [CarController::class, 'index']);
    // show a car
    Route::get('/cars/{id}', [CarController::class, 'show']);

    //! Admin auth
    Route::post('/admin/signup', [AdminController::class, 'signup']);
    Route::post('/admin/login', [AdminController::class, 'login']);

    //! DashBoard =====================================================
    //? users
    // list of users
    Route::get('/users', [UserController::class, 'index']);

    // delete a user
    Route::delete(
        '/users/{id}',
        [UserController::class, 'destroy']
    );

    //? cars
    // add a car
    Route::post('/cars', [CarController::class, 'store']);

    // update a car
    Route::put('/cars/{id}', [CarController::class, 'update']);

    // delete car
    Route::delete('/cars/{id}', [
        CarController::class, 'destroy'
    ]);

    //rents
    Route::resource('/rents', RentController::class);

    // download rent facture
    Route::get('/rents/{id}/download-rent', [RentController::class, 'downloadRent']);

    //! Stripe checkout
    Route::get('/success', [StripeController::class, 'success'])->name('success');
    Route::post('/checkout/{id}', [StripeController::class, 'checkout']);
    Route::get('/cancel', [StripeController::class, 'cancel'])->name('cancel');

   
    
   


//! Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    // !user
    // list of rents for a user
    Route::get('/my-rents/{id}', [RentController::class, 'myRents']);
    // edit a rent
    Route::get('/my-rents/edit/{id}', [RentController::class, 'editRent']);
    // update the user profile
    Route::put('/users/{id}', [UserController::class, 'update']);
    // logout 
    Route::post('/logout', [UserController::class, 'logout']);

    //! admin auth
    Route::post('/admin/logout', [AdminController::class, 'logout']);

    
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


