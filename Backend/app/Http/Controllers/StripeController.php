<?php

/** @noinspection ALL */

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Rent;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class StripeController extends Controller
{
 
    public function checkout($id)
    {
        $rents = Rent::where('user_id', $id)->orderBy('id', 'desc')->get();
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $lineItems = [];
        foreach ($rents as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'mad',
                    'product_data' => [
                        'name' => $item->cars->brand,
                    ],
                    'unit_amount' => $item-> price * 100,
                ],
                'quantity' => 1,
            ];
        }

        $checkout_session = \Stripe\Checkout\Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('success') . "?session_id={CHECKOUT_SESSION_ID}",
            'cancel_url' => route('cancel'),
        ]);

        return $checkout_session->url;
    }
    
    public function success(Request $request)
    {
        // \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        // $sessionId = $request->get('session_id');

        // try {
        //     $session = \Stripe\Checkout\Session::retrieve($sessionId);
        //     if (!$session) {
        //         throw new NotFoundHttpException;
        //     }
        //     $customer = \Stripe\Customer::retrieve($session->customer);

        //     return view('checkout.success', compact('customer'));
        // } catch (\Exception $e) {
        //     throw new NotFoundHttpException();
        // }

        
        return view('checkout.success');

     
    }


    public function cancel()
    {
        return view('checkout.cancel');
    }
}
