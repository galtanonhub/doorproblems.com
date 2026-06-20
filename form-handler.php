<?php
// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

header('Content-Type: application/json');

function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

function send_mail(string $to, string $subject, string $body, string $reply_to = ''): bool {
    $headers  = "From: DoorProblems.com <help@doorproblems.com>\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    if ($reply_to) {
        $headers .= "Reply-To: $reply_to\r\n";
    }
    return mail($to, $subject, $body, $headers);
}

$OWNER_EMAIL = 'galtanon@protonmail.com';
$OWNER_SMS   = '7143106033@tmomail.net';
$form_type   = clean($_POST['form_type'] ?? '');

/* ── Quick Message Form ──────────────────────────────────── */
if ($form_type === 'contact') {
    $name    = clean($_POST['name']    ?? '');
    $email   = clean($_POST['email']   ?? '');
    $phone   = clean($_POST['phone']   ?? '');
    $message = clean($_POST['message'] ?? '');

    if (!$name || !filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) || !$message) {
        http_response_code(400);
        echo json_encode(['success' => false]);
        exit;
    }

    $subject = "New Message from $name — DoorProblems.com";
    $body    = "Name:    $name\n"
             . "Email:   $email\n"
             . "Phone:   $phone\n\n"
             . "Message:\n$message\n";
    $sms     = "DoorProblems.com: msg from $name" . ($phone ? " $phone" : '') . ". Check email.";

/* ── Booking Form ────────────────────────────────────────── */
} elseif ($form_type === 'booking') {
    $first   = clean($_POST['firstName'] ?? '');
    $last    = clean($_POST['lastName']  ?? '');
    $phone   = clean($_POST['phone']     ?? '');
    $email   = clean($_POST['email']     ?? '');
    $address = clean($_POST['address']   ?? '');
    $service = clean($_POST['service']   ?? '');
    $date    = clean($_POST['date']      ?? '');
    $time    = clean($_POST['time']      ?? '');
    $brand   = clean($_POST['brand']     ?? '');
    $source  = clean($_POST['source']    ?? '');
    $notes   = clean($_POST['notes']     ?? '');

    if (!$first || !$last || !$phone || !filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL)
        || !$address || !$service || !$date || !$time) {
        http_response_code(400);
        echo json_encode(['success' => false]);
        exit;
    }

    $name    = "$first $last";
    $subject = "New Booking from $name — DoorProblems.com";
    $body    = "Name:     $name\n"
             . "Phone:    $phone\n"
             . "Email:    $email\n"
             . "Address:  $address\n\n"
             . "Service:  $service\n"
             . "Date:     $date\n"
             . "Time:     $time\n"
             . "Brand:    $brand\n"
             . "Source:   $source\n\n"
             . "Notes:\n$notes\n";
    $sms     = "DoorProblems.com: booking from $name $phone — $service on $date. Check email.";

} else {
    http_response_code(400);
    echo json_encode(['success' => false]);
    exit;
}

// Send email to owner
$ok = send_mail($OWNER_EMAIL, $subject, $body, $email);

// Send SMS alert (no subject needed for SMS gateway)
send_mail($OWNER_SMS, '', $sms);

echo json_encode(['success' => $ok]);
