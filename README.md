# Welcome to Todo List App

![image](https://github.com/user-attachments/assets/5879aca3-59d2-4805-aca2-cd3a3135462f)


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

- Context APIState
  management dilakukan melalui React Context (AgendaContext), yang memfasilitasi akses dan manipulasi state lintas komponen tanpa perlu prop-drilling yang berlebihan.

- Filter
  filter dapat dilakukan per tanggal, semua, yangsudah dikonfirmasi, pending dan cancelled.

- Custom Hooks
  mengimplementasikan custom hooks seperti useAgenda dan useModal untuk mengenkapsulasi logika state dan efek samping, sehingga komponen utama lebih fokus pada tugas rendering UI.

- Styling
  diimplementasikan dengan Tailwind CSS menggunakan tailwind-react-native-classnames, yang menyediakan utilitas yang konsisten dan cepat

- Aplikasi  
  menampilkan navigasi berbasis tanggal menggunakan komponen seperti Calendar dan AgendaList dari react-native-calendars, yang memudahkan pengguna dalam melihat dan mengelola tugas berdasarkan hari tertentu.

- validator input
  menggunakan react-hook-form bersama dengan zod untuk validasi schema

- notifikasi
  mengintegrasikan notifikasi untuk meningkatkan interaktivitas
