// test-login.mjs (Versi 3 - Penggabungan Cookie yang Benar)
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: { Accept: "application/json" },
    validateStatus: () => true, // Terima semua status code
});

// Fungsi untuk mengubah array cookie dari header menjadi objek
const parseCookies = (cookies) => {
    const cookieObj = {};
    cookies.forEach((cookie) => {
        const [key] = cookie.split(";")[0].split("=");
        cookieObj[key] = cookie.split(";")[0];
    });
    return cookieObj;
};

async function testLogin() {
    try {
        console.log("--- LANGKAH 1: Mendapatkan CSRF Cookie ---");
        const csrfResponse = await api.get("/sanctum/csrf-cookie");
        const csrfCookiesHeader = csrfResponse.headers["set-cookie"];
        if (!csrfCookiesHeader) {
            console.error("FATAL: Tidak ada cookie dari /sanctum/csrf-cookie.");
            return;
        }
        console.log("✅ Cookie CSRF berhasil didapatkan.");

        const xsrfToken = decodeURIComponent(
            csrfCookiesHeader
                .find((c) => c.startsWith("XSRF-TOKEN="))
                .split(";")[0]
                .split("=")[1]
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
                    Cookie: csrfCookiesHeader.join("; "),
                    "X-XSRF-TOKEN": xsrfToken,
                },
            }
        );

        if (loginResponse.status !== 204) {
            // Cek untuk status 204 No Content
            console.error("FATAL: Login Gagal!");
            console.error("Status:", loginResponse.status);
            console.error("Data:", loginResponse.data);
            return;
        }

        console.log("✅ Login berhasil (Status 204 No Content).");

        // GABUNGKAN COOKIE LAMA DAN BARU
        const initialCookies = parseCookies(csrfCookiesHeader);
        const sessionCookies = parseCookies(
            loginResponse.headers["set-cookie"] || []
        );
        const finalCookies = { ...initialCookies, ...sessionCookies }; // Cookie sesi baru akan menimpa yang lama jika ada
        const finalCookieHeader = Object.values(finalCookies).join("; ");

        console.log(
            "\n--- LANGKAH 3: Mengambil Data User (Terautentikasi) ---"
        );
        console.log("Mengirim cookies:", finalCookieHeader);

        const userResponse = await api.get("/api/user", {
            headers: { Cookie: finalCookieHeader },
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
