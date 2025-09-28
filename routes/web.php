<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;


// Route::post('/register', [AuthController::class, 'register'])
//     ->middleware('guest');

// Route::post('/login', [AuthController::class, 'login'])
//     ->middleware('guest');

// Route::post('/logout', [AuthController::class, 'logout'])
//     ->middleware('auth');

Route::get('/{any}', [AppController::class, 'index'])->where('any', '.*');
