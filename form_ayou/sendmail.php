<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

//От кого письмо
$mail->setFrom('dcTOUCH website');
//Кому отправить
$mail->addAddress('support@dcconstructions.ru');
//Тема письма
$mail->Subject = 'Заявка с сайта';


//Тело письма
$body = '<h1>Заявка с сайта dcTOUCH</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
}

$mail->Body = $body;

//Отправлем 
if (!$mail->send()) {
    $message = 'Ошибка улюлю';
} else {
    $message = 'Данные отправлены!улюлю';
}

$responce = ['message => $message'];

header('Content-type: application/json');
echo json_encode($responce);
?>