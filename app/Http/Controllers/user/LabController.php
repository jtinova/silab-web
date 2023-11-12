<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Lab;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class LabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->cari;
        $categories = Category::all();

        if ($search === null) {
            $datas = Lab::get()->shuffle();
        } else {
            $datas = Lab::where('nama_lab', 'like', '%' . $search . '%')->get();
        }

        if ($datas->isEmpty()) {
            return view('auth.user.produk', ['title' => 'Silab | Sewa Lab'], compact('datas', 'categories'))
                ->with('message', 'Tidak Ada Data Yang Sesuai Dengan Pencarian Anda');
        } else {
            return view('auth.user.produk', compact('datas', 'categories'))->with('title', 'Silab | Sewa Lab');
        }
    }


    public function show($slug)
    {
        $datas = Lab::where('slug', $slug)->first();
        $categories = Category::all();
        return view('auth.user.detail', compact('datas', 'categories'))->with('title', 'Silab | Detail');
    }

    public function kategori($category)
    {
        $categories = Category::all();
        $datas = Lab::whereHas('category', function ($query) use ($category) {
            $query->where('category', $category);
        })->get();

        if ($datas->isEmpty()) {
            abort(404);
        }

        return view('auth.user.produk', compact('datas', 'category', 'categories'))->with('title', 'Category - ' . $category);
    }
    public function tanggalCari(Request $request)
    {
        $tanggalCari = $request->input('tanggal');
        $tanggalCari = Carbon::parse($tanggalCari, 'Asia/Jakarta')->toDateString();

        $status = Order::where('order', $tanggalCari)->value('status === tersedia');
        $response = view('auth.user.produk', ['tanggal' => $tanggalCari, 'status' => $status])->render();

        return response()->json(['partialView' => $response]);
    }
}
