document.addEventListener("DOMContentLoaded", () => {

    const themeSwitcher = document.getElementById("themeSwitcher");
    const themeButtons = document.querySelectorAll(".theme-btn");

    // Tema default
    const defaultTheme = "pagi";

    // Ambil tema terakhir
    const savedTheme =
        localStorage.getItem("website-theme") || defaultTheme;


    // ================================
    // GANTI TEMA
    // ================================

    function setTheme(theme) {

        // Terapkan tema ke body
        document.body.dataset.theme = theme;


        // Update tombol
        themeButtons.forEach(button => {

            const isActive =
                button.dataset.theme === theme;

            button.classList.toggle(
                "is-active",
                isActive
            );

            button.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );

        });


        // Simpan tema
        localStorage.setItem(
            "website-theme",
            theme
        );


        // Setelah memilih,
        // kembali ke mode ringkas
        if (themeSwitcher) {
            themeSwitcher.classList.remove("is-open");
        }


        // Event agar bagian lain
        // bisa mengetahui tema berubah
        window.dispatchEvent(
            new CustomEvent("theme-change", {
                detail: {
                    theme: theme
                }
            })
        );

    }


    // ================================
    // KLIK TOMBOL
    // ================================

    themeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const isActive =
                button.classList.contains("is-active");


            // Kalau tombol aktif diklik,
            // buka/tutup semua pilihan
            if (isActive && themeSwitcher) {

                themeSwitcher.classList.toggle(
                    "is-open"
                );

                return;
            }


            // Kalau tombol lain diklik,
            // langsung ganti tema
            setTheme(
                button.dataset.theme
            );

        });

    });


    // ================================
    // TERAPKAN TEMA SAAT WEBSITE DIBUKA
    // ================================

    setTheme(savedTheme);

});
