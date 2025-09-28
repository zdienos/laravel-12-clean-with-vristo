// test-login.mjs (Versi 2 - Lebih Eksplisit)
import axios from "axios";

// Konfigurasi dasar
const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        Accept: "application/json",
    },
    // Penting agar axios tidak error pada status 3xx, 4xx, 5xx
    validateStatus: () => true,
});

async function testLogin() {
    try {
        console.log("--- LANGKAH 1: Mendapatkan CSRF Cookie ---");
        const csrfResponse = await api.get("/sanctum/csrf-cookie");

        // Ambil semua cookie dari response header
        const cookies = csrfResponse.headers["set-cookie"];
        if (!cookies) {
            console.error(
                "FATAL: Tidak ada cookie yang diterima dari /sanctum/csrf-cookie."
            );
            return;
        }

        // Gabungkan semua cookie menjadi satu string untuk dikirim di request berikutnya
        const cookieHeader = cookies.join("; ");
        console.log("✅ Cookie berhasil didapatkan.");

        // Ekstrak nilai XSRF-TOKEN untuk header
        const xsrfTokenCookie = cookies.find((cookie) =>
            cookie.startsWith("XSRF-TOKEN=")
        );
        const xsrfToken = decodeURIComponent(
            xsrfTokenCookie.split(";")[0].split("=")[1]
        );

        console.log("\n--- LANGKAH 2: Mencoba Login ---");
        const loginResponse = await api.post(
            "/api/login",
            {
                email: "admin@admin.com", // Ganti dengan email Anda
                password: "password", // Ganti dengan password Anda
            },
            {
                headers: {
                    Cookie: cookieHeader, // Kirim semua cookie yang kita dapatkan
                    "X-XSRF-TOKEN": xsrfToken, // Kirim header XSRF
                },
            }
        );

        if (loginResponse.status !== 200) {
            console.error("FATAL: Login Gagal!");
            console.error("Status:", loginResponse.status);
            console.error("Data:", loginResponse.data);
            return;
        }

        console.log("✅ Login berhasil. Data:", loginResponse.data);

        // Ambil cookie sesi baru yang mungkin diberikan setelah login
        const loginCookies = loginResponse.headers["set-cookie"];
        const finalCookieHeader = loginCookies
            ? loginCookies.join("; ")
            : cookieHeader;

        console.log(
            "\n--- LANGKAH 3: Mengambil Data User (Terautentikasi) ---"
        );
        const userResponse = await api.get("/api/user", {
            headers: {
                Cookie: finalCookieHeader, // Kirim cookie sesi yang sudah terautentikasi
            },
        });

        if (userResponse.status !== 200) {
            console.error("FATAL: Gagal mengambil data user!");
            console.error("Status:", userResponse.status);
            console.error("Data:", userResponse.data);
            return;
        }

        console.log("\n✅ SUKSES! Data User:", userResponse.data);
    } catch (error) {
        console.error("\n--- TERJADI ERROR TAK TERDUGA ---");
        console.error(error.message);
    }
}

testLogin();
