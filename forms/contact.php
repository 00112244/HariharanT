<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $receiving_email_address = 'contact@thiruhari444@gmail.com';
    $php_email_form = '../assets/vendor/php-email-form/php-email-form.php';

    if (file_exists($php_email_form)) {
        include($php_email_form);
    } else {
        die('Unable to load the "PHP Email Form" Library!');
    }

    $contact = new PHP_Email_Form;
    $contact->ajax = true;

    $contact->to = $receiving_email_address;
    $contact->from_name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $contact->from_email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $contact->subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);

    $contact->add_message($contact->from_name, 'From');
    $contact->add_message($contact->from_email, 'Email');
    $contact->add_message(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING), 'Message', 10);

    if ($contact->send()) {
        echo 'OK';
    } else {
        echo 'Could not send the email.';
    }
} else {
    echo 'Invalid request method: ' . $_SERVER["REQUEST_METHOD"];
}
?>
