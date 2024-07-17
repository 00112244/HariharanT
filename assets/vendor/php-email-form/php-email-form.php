<?php

class PHP_Email_Form {
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $messages = array();
    public $ajax;

    public function add_message($message, $name, $priority = 10) {
        $this->messages[] = array('message' => $message, 'name' => $name, 'priority' => $priority);
    }

    public function send() {
        // Prepare the email headers
        $headers = 'From: ' . $this->from_name . ' <' . $this->from_email . '>' . "\r\n";
        $headers .= 'Reply-To: ' . $this->from_email . "\r\n";
        $headers .= 'X-Mailer: PHP/' . phpversion();

        // Prepare the email body
        $body = '';
        foreach ($this->messages as $msg) {
            $body .= $msg['name'] . ": " . $msg['message'] . "\n";
        }

        // Send the email
        return mail($this->to, $this->subject, $body, $headers);
    }
}
