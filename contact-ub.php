<?php 

include 'php/lib/PHPMailer/PHPMailerAutoload.php';

if(isset($_REQUEST['g-recaptcha-response']) && !empty($_REQUEST['g-recaptcha-response'])):
	$to = "aneeshbh@buffalo.edu"
	$from = "no-reply@buffalo.edu";
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
		$mail = new PHPMailer;
		$mail->isSMTP();                                      // Set mailer to use SMTP
	    $mail->Host = 'hobbes.cse.buffalo.edu';  // Specify main and backup SMTP servers
	    $mail->SMTPAuth = false;                               // Enable SMTP authentication
	    $mail->Port = 587;                                    // TCP port to connect to

	    $mail->setFrom($from, 'Aneesh Bhatnagar');
	    $mail->isHTML(true); 
	    $mail->addReplyTo($email, $from_name);
	    $mail->addCustomHeader('MIME-Version: 1.0');
	    $mail->addCustomHeader('Content-Type: text/html; charset=ISO-8859-1');
	    $mail->Subject = $subject;

	    $mail->addAddress($to);
	    $mail->Body = $message;
    	if(!$mail->send()){
    		echo -1;
    	}else{
    		echo 1;
    	}
	else:
		echo 0;
	endif;
else:
	echo -1;
endif;

?>
