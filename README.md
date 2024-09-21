# Welcome to Todo List App

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

Info :

<!-- COntext -->

- Context API: State management dilakukan melalui React Context (AgendaContext), yang memfasilitasi akses dan manipulasi state lintas komponen tanpa perlu prop-drilling yang berlebihan.

<!-- Hooks -->

- Custom Hooks: mengimplementasikan custom hooks seperti useAgenda dan useModal untuk mengenkapsulasi logika state dan efek samping, sehingga komponen utama lebih fokus pada tugas rendering UI.

<!-- Styling -->

- Styling diimplementasikan dengan Tailwind CSS menggunakan tailwind-react-native-classnames, yang menyediakan utilitas yang konsisten dan cepat

<!-- Calendat -->

- Aplikasi ini menampilkan navigasi berbasis tanggal menggunakan komponen seperti Calendar dan AgendaList dari react-native-calendars, yang memudahkan pengguna dalam melihat dan mengelola tugas berdasarkan hari tertentu.

<!-- Validasi FOrmulir -->

- menggunakan react-hook-form bersama dengan zod untuk validasi schema

<!-- NOtifikasi -->

- mengintegrasikan notifikasi untuk meningkatkan interaktivitas
