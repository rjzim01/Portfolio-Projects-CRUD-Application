<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectController;

Route::get('/', function () {
    //return Inertia::render('welcome');
    return redirect()->route('projects.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


// Route::resource('projects', ProjectController::class);

// Index - list all projects
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');

// Create - show create form
Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');

// Store - handle form submission for creating a new project
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');

// Show - display a single project
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

// Edit - show edit form for a project
Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');

// Update - handle form submission for updating a project
Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');

// Destroy - delete a project
Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

