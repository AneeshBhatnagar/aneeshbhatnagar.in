<?php 

if(isset($_REQUEST['g-recaptcha-response']) && !empty($_REQUEST['g-recaptcha-response'])):
	$to = "aneesh.bhatnagar93@gmail.com"
	$from = "no-reply@aneeshbhatnagar.com";
	$email = $_REQUEST['emailId'];
	$from_name = $_REQUEST['senderName'];
	$subject = "Contact Form Submitted";
	$msg = stripcslashes(nl2br($_REQUEST['msg']));
	/*$message = "From: {$from_name}<{$email}>\r\n\nMessage: {$msg}";*/
	$message = "
		<h1>Contact request details</h1>
		<p><b>Name: </b>".$from_name."</p>
		<p><b>Email: </b>".$email."</p>
		<p><b>Message: </b>".$msg."</p>
	";
	$secret = '6LfihC0UAAAAAGiDoLWAP2kKuG4Wo-6TfDPufwiw';
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_REQUEST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    if($responseData->success):
		$headers = "From: {$from_name} <{$email}>" . "\r\n\\";
		$headers .= "Reply-To: {$email}\r\n";
		/*$headers .= "Return-Path: {$from}\r\n";*/
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";
		echo mail($to, $subject, $message, $headers);
	else:
		echo 0;
	endif;
else:
	echo -1;
endif;

?>