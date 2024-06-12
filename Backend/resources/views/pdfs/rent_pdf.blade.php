<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rent Facture</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        
        h1 {
            font-size: 20px;
            margin-bottom: 10px;
            text-align: center;
            text-decoration: underline;
        }
        
        span.label {
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
        }
        
        img.car-photo {
            border: 1px solid #ccc;
            border-radius: 4px;
            object-fit: cover;
            width: 200px !important;
            height: 200px !important;
            margin: 10px auto;
        }
        
        div.info-container {
            margin-bottom: 10px;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Rent Facture</h1>
    
    <div class="info-container">
        <span>Rental ID:</span>
        <span>{{ $obj['id'] }}</span>
    </div>

        
    <div class="info-container">
        <span>Photo:</span>
        <div>
            <img src="./images/{{ $obj['photo'] }}" alt="Car Photo" class="car-photo">
        </div>
    </div>
    
    
    <div class="info-container">
        <span>Car ID:</span>
        <span>{{ $obj['car_id'] }}</span>
    </div>
    
    <div class="info-container">
        <span>Brand:</span>
        <span>{{ $obj['brand'] }}</span>
    </div>
    
    <div class="info-container">
        <span>Price:</span>
        <span>{{ $obj['price'] }} MAD</span>
    </div>

    <div class="info-container">
        <span>Fuel Type:</span>
        <span>{{ $obj['fuel_type'] }}</span>
    </div>
    
    <div class="info-container">
        <span>User ID:</span>
        <span>{{ $obj['user_id'] }}</span>
    </div>
    
    <div class="info-container">
        <span>Firstname:</span>
        <span>{{ $obj['firstname'] }}</span>
    </div>
    
    <div class="info-container">
        <span>Telephone:</span>
        <span>{{ $obj['telephone'] }}</span>
    </div>
    
    <div class="info-container">
        <span>Total:</span>
        <span>{{ $obj['total'] }} MAD</span>
    </div>
    
    <div class="info-container">
        <span>Rental Date:</span>
        <span>{{ $obj['rental_date'] }}</span>
    </div>
    
    <div class="info-container">
        <span>Return Date:</span>
        <span>{{ $obj['return_date'] }}</span>
    </div>
</body>
</html>
