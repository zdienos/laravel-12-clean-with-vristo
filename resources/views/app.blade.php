<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel React</title>

    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    {{-- Menggunakan directive @vite untuk memuat aset --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/App.tsx'])

</head>
<body class="antialiased">
    {{-- Ini adalah tempat aplikasi React Anda akan di-mount --}}
    <div id="app"></div>
</body>
</html>
