<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarController extends Controller
{
    public function index()
    {
        $cars = DB::table('cars')->get();
        return response()->json(['success'=>true, 'data' => $cars],200);
    }

    public function show($id)
    {
        $car = DB::table('cars')->where('id', $id)->get();
        return response()->json(['success'=>true, 'data' => $car],200);
    }



     public function store(Request $request)
    {
        // Validate the request data including file validation
        $validatedData = $request->validate([
            'brand' => 'required',
            'model' => 'required',
            'fuelType' => 'required',
            'price' => 'required',
            'gearbox' => 'required',
            'available' => 'required',
            'frontPhoto' => 'required|image',
            'backPhoto' => 'required|image',
        ]);

        // Handle file uploads
        if ($request->hasFile('frontPhoto') && $request->hasFile('backPhoto')) {
            $file1 = $request->file('frontPhoto');
            $file2 = $request->file('backPhoto');
            $filename1 = Str::uuid() . '.' . $file1->getClientOriginalExtension();
            $filename2 = Str::uuid() . '.' . $file2->getClientOriginalExtension();
            $file1->move(public_path('images'), $filename1);
            $file2->move(public_path('images'), $filename2);
            $validatedData['frontPhoto'] = $filename1;
            $validatedData['backPhoto'] = $filename2;
        }



        $validatedData['available'] = $validatedData['available'] == 'true' ? 1 : 0;


        // Create a new car instance
        $car = new Car();
        $car->brand = $validatedData['brand'];
        $car->model = $validatedData['model'];
        $car->fuel_type = $validatedData['fuelType'];
        $car->price = $validatedData['price'];
        $car->gearbox = $validatedData['gearbox'];
        $car->available = $validatedData['available'];
        $car->photo1 = $validatedData['frontPhoto'];
        $car->photo2 = $validatedData['backPhoto'];
        $car->save();

        // Return a response or redirect as desired
        return response($car,200);
    }


    // update a car info
    public function update(Request $request,$id)
    {
        $car = Car::find($id);
        if(!$car){
            $res =  ['message' => 'id car not found'];
            return response($res, 402);
        }
        // Validate the request data including file validation
        $validatedData = $request->validate([
            'brand' => 'required',
            'model' => 'required',
            'fuel_type' => 'required',
            'price' => 'required',
            'gearbox' => 'required',
            'available' => 'required'
        ]);

        // Handle file uploads
        if ($request->hasFile('photo1') && $request->hasFile('photo2')) {
            $file1 = $request->file('photo1');
            $file2 = $request->file('photo2');
            $filename1 = Str::uuid() . '.' . $file1->getClientOriginalExtension();
            $filename2 = Str::uuid() . '.' . $file2->getClientOriginalExtension();
            $file1->move(public_path('images'), $filename1);
            $file2->move(public_path('images'), $filename2);
            $validatedData['photo1'] = $filename1;
            $validatedData['photo2'] = $filename2;
        }



        if($validatedData['available'] == 'true'){
            $validatedData['available'] = 1;
        }else{
            $validatedData['available'] = 0;
        }


        // Update a car instance
        $car->update($validatedData);

        // Return a response or redirect as desired
        return response($car, 200);
    }

    public function destroy($id){
        $car = Car::find($id);
        if(!$car){
            $res =  ['message' => 'id car not found'];
            return response($res,402);
        }

        return $car->delete();
    }
}
