<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pobieranie danych z formularza
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // reCAPTCHA weryfikacja
    $recaptchaSecret = '6LcXKawqAAAAADRB9Qqj6-XTWzli4dI80occAonw';
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Wykonaj zapytanie do API reCAPTCHA
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        // Walidacja nieudana
        echo 'Please complete the CAPTCHA.';
    } else {
        // Walidacja udana - przetwarzaj formularz
        echo 'CAPTCHA verified successfully. Form submitted!';
        // Możesz teraz przetwarzać dane formularza, np. wysyłać e-mail
        // mail($email, "New contact message", $message, "From: $name <$email>");
    }
}
?>
