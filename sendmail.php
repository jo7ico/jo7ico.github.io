<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title   = htmlspecialchars($_POST['title']);
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to      = "lafachoi@icloud.com";
    $subject = "New Form Submission: $title";
    $body    = "Title: $title\nName: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Sorry, something went wrong... D:";
    }
}
?>