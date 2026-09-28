//=======================
// LOGIN VALIDATION
// =========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {        
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const userError = document.getElementById("usernameError");
        const passError = document.getElementById("passwordError");

        userError.style.display = username ? "none" : "block";
        passError.style.display = password ? "none" : "block";

        if (username && password) {
        window.location.href="../index.html";
        }
    });
}
//======================
// CREATE ACCOUNT
// =========================
const showSignup = document.getElementById("showSignup");
const signupForm = document.getElementById("signupForm");
const createBtn = document.getElementById("createBtn");

if (showSignup) {
    showSignup.onclick = e => {
        e.preventDefault();
        signupForm.style.display = "block";
    };
}
if (createBtn) {
    createBtn.onclick = function () {
        const username = document.getElementById("newUsername").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("newPassword").value.trim();

        const userError = document.getElementById("newUsernameError");
        const emailError = document.getElementById("emailError");
        const passError = document.getElementById("newPasswordError");

        userError.style.display = username ? "none" : "block";
        emailError.style.display =
            email && email.includes("@") ? "none" : "block";
        passError.style.display =
            password.length >= 4 ? "none" : "block";

        if (username && email.includes("@") && password.length >= 6)
            alert("Account created successfully!");
    };
}
//=========================
// AJAX MODAL DETAILS
// =========================
$(".details-btn").click(function () {

    const productName = $(this).data("name");

    $.ajax({
        url: "../data/products.json",
        method: "GET",
        dataType: "json",

        success: function (products) {

            const product = products.find(
                item => item.name === productName );

            if (product) {

                $("#modalContent").html(`
                    <div class="text-center">
                        <img src="${product.image}"
                             class="img-fluid rounded mb-3"
                             width="220">

                        <h3>${product.name}</h3>

                        <p>${product.desc}</p>

                        <h5>Price: ${product.price}</h5>

                        <button class="order-btn">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Order Now
                        </button>
                    </div>
                `);

                new bootstrap.Modal(
                    document.getElementById("productModal")
                ).show();
            }},

        error: function () {
            $("#modalContent").html(
                "<p>Unable to load product details.</p>"
            );
        }
    });
});
//==================
// ORDER
// =========================
$(document).on("click", ".order-btn", function () {
    toastr.success("Your order has been placed successfully!☕");
});