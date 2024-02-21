export const firstAccessMailHtml = (newPassword: string) => `<!DOCTYPE html>
<html>
<head>
</head>
<style>
	body {
  font-family: 'Roboto', sans-serif;
}
</style>
<body>
	<div style="background-color: #e9ecef; width: 100%; height: 720px; display: flex; flex-direction: column; align-items: center;">
    	<img src="https://i.imgur.com/QiSEbPT.png" alt="NotemauaLogo" style="width: 200px; height: 64px; object-fit: contain; margin-top: 40px;"/>
    	<div style="background-color: #fff; width: 88%; height: 440px; margin-top: 40px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); padding-left: 20px; padding-right: 20px;">
        	<h1 style="font-size: 27px; margin-top: 40px; margin-bottom: 52px">Bem vindo ao seu primeiro acesso 💻</h1>
            <p style="font-size: 18px; font-weight: 300; margin-right: 20px;">Geramos uma senha aleatória para você!</p>
            <p style="font-size:24px; font-weight: bold; text-align: center; margin-top: 80px">${newPassword}</p>
            <p style="font-size: 18px; font-weight: 300; margin-right: 20px; margin-top: 80px">É <strong>ESTRITAMENTE</strong> importante que você troque o quanto antes esta senha! Isso evita possíveis falhas e maior segurança em relação a sua senha!</p>
        </div>
        <p style="font-size: 12px; font-weight: 300; margin-right: 20px; text-align: center; padding-left: 28px; padding-right: 28px; margin-top: 32px">Você recebeu este email porquê recebemos um pedido para que seja realizado o seu primeiro acesso. Se você nõo requisitou o seu primeiro acesso você pode ignorar este email.</p>
        <p style="font-size: 12px; font-weight: 300; margin-right: 20px; text-align: center; padding-left: 28px; padding-right: 28px;">&#9400; Todos os direitos são reservados.</p>
    </div>
</body>
</html>
`

export const forgotPasswordMailHtml = (code: string) => `<!DOCTYPE html>
<html>
<head>
</head>
<style>
	body {
  font-family: 'Roboto', sans-serif;
}
</style>
<body>
	<div style="background-color: #e9ecef; width: 100%; height: 720px; display: flex; flex-direction: column; align-items: center;">
    	<img src="https://i.imgur.com/QiSEbPT.png" alt="NotemauaLogo" style="width: 200px; height: 64px; object-fit: contain; margin-top: 40px;"/>
    	<div style="background-color: #fff; width: 88%; height: 440px; margin-top: 40px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); padding-left: 20px; padding-right: 20px;">
        	<h1 style="font-size: 27px; margin-top: 40px; margin-bottom: 52px">Recupere sua sua senha ⚠️</h1>
            <p style="font-size: 18px; font-weight: 300; margin-right: 20px;">Geramos um código para você!</p>
            <p style="font-size:24px; font-weight: bold; text-align: center; margin-top: 80px">${code}</p>
            <p style="font-size: 18px; font-weight: 300; margin-right: 20px; margin-top: 80px">É <strong>importante</strong> que você saiba que este código é único para esse pedido de troca de senha! Então caso precise reenviar o pedido de troca de senha, será gerado um novo código e este desse email não será mais válido.</p>
        </div>
        <p style="font-size: 12px; font-weight: 300; margin-right: 20px; text-align: center; padding-left: 28px; padding-right: 28px; margin-top: 32px">Você recebeu este email porquê recebemos um pedido para que seja realizado o seu primeiro acesso. Se você nõo requisitou o seu primeiro acesso você pode ignorar este email.</p>
        <p style="font-size: 12px; font-weight: 300; margin-right: 20px; text-align: center; padding-left: 28px; padding-right: 28px;">&#9400; Todos os direitos são reservados.</p>
    </div>
</body>
</html>`