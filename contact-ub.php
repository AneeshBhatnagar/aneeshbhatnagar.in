<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *"); 

if(isset($_REQUEST['g-recaptcha-response']) && !empty($_REQUEST['g-recaptcha-response'])):
	$to = "aneesh.bhatnagar93@gmail.com";
	$from = "no-reply@aneeshbhatnagar.com";
	$email = $_REQUEST['emailId'];
	$from_name = $_REQUEST['senderName'];
	$subject = "Contact Form Submitted from Personal Website";
	$msg = stripcslashes(nl2br($_REQUEST['msg']));
	$secret = '6LfihC0UAAAAAGiDoLWAP2kKuG4Wo-6TfDPufwiw';
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_REQUEST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    include 'php/lib/PHPMailer/PHPMailerAutoload.php';
	$mail = new PHPMailer;

    if($responseData->success):
		$mail->isSMTP();                                      // Set mailer to use SMTP
	    $mail->Host = 'hobbes.cse.buffalo.edu';  // Specify main and backup SMTP servers
	    $mail->SMTPAuth = false;                               // Enable SMTP authentication
	    $mail->Port = 587;                                    // TCP port to connect to

	    $mail->setFrom('no-reply@buffalo.edu', $from_name);

	    $mail->isHTML(true); 
	    $mail->addReplyTo($email, $from_name);
	    $mail->addCustomHeader('MIME-Version: 1.0');
	    $mail->addCustomHeader('Content-Type: text/html; charset=ISO-8859-1');
	    $mail->Subject = $subject;

		$message = "Hey,<br/> Someone sent an email to you with the following details: <br/><br/>
		Name: $from_name<br/>
		Email: $email<br/>
		Message: $msg<br/>
		EOM";
	    $mail->addAddress($to);
	    $mail->Body    = $message;
	    $mail->send();
	    echo 1;
	else:
		echo 0;
	endif;
else:
	echo -1;
endif;

?>