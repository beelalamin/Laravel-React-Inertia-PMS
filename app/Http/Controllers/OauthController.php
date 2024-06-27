<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OauthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }


    public function callback($provider)
    {
        try {

            $socialUser = Socialite::driver($provider)->user();
            if (User::where('email', $socialUser->email)->exists()) {
                return  redirect('/login')->with('errorMessage', 'Email uses different method to login.');
            }

            $user = User::where([
                'provider_id' => $socialUser->id,
                'provider' => $provider
            ])->first();


            if (!$user) {
                $user = User::create([
                    'name' => $socialUser->name,
                    'email' => $socialUser->email,
                    'provider' => $provider,
                    'provider_id' => $socialUser->id,
                    'provider_token' => $socialUser->token,
                    'email_verified_at' => now(),


                ]);
            }

            Auth::login($user);
            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['email' => $e->getMessage()]);
        }
    }
}
