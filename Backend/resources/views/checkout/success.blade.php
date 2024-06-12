<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Stripe success</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

</head>
<body>
    <div class="container">
        <div class="px-4" >
               <div class="d-flex justify-content-center align-items-center mt-5">
                   <svg xmlns="http://www.w3.org/200/svg" class="h-16 w-16 text-success" viewBox="0 0 20 20" fill="currentColor" width="300px" height="300px">
                       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                   </svg>
               </div>
               <h1 class="text-2xl font-bold text-center text-success mt-4">Payment Success</h1>
   
               <p class="text-center mt-2">Thank you {{$customer->name}}</p>
               <p class="text-center mt-2">Your payment has been processed successfully.</p>
               <div class="mt-6 d-flex justify-content-center">
                   <a href="http://localhost:3000/profile" 
                   class="text-center text-bold">Go back to your profile</a>
               </div>
       </div>
    </div>
</body>
</html>