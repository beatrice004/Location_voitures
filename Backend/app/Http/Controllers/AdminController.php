<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;


class AdminController extends Controller
{
    public function signup(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string|unique:admins,username',
            'password' => 'required|string'
        ]);

        $admin = Admin::create([
            'username' => $fields['username'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $admin->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $admin,
            'admin_token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check username
        $admin = Admin::where('username', $fields['username'])->first();

        // Check password
        if (!$admin || !Hash::check($fields['password'], $admin->password)) {
            return response([
                'message' => 'uncorrect email or password '
            ], 401);
        }

        $token = $admin->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $admin,
            'admin_token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return [
            'message' => 'Admin Logged out'
        ];
    }

}
