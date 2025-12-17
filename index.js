
(function () {
    emailjs.init("PUBLIC_KEY");
    // ضع الـ Public Key هنا
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "SERVICE_ID",   // Service ID
        "TEMPLATE_ID",  // Template ID
        this
    )
        .then(function () {
            alert("SEE SOON");
        }, function (error) {
            alert("something wrong ❌");
            console.log(error);
        });
});
