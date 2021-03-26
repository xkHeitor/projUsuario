# CRMALLCrud

Este é um projeto contendo o código de um CRUD feito em NodeJS e Docker/Docker-compose.

Um CRUD montado com:
* [NodeJS v14.15.4                                  ](https://nodejs.org/en/).
* [Docker version 20.10.5, build 55c4c88            ](https://www.docker.com).
* [docker-compose version 1.28.5, build c4eb3a1f8   ]().

## Instalação

Clone o repositório.

```bash
git clone https://github.com/xkHeitor/projUsuario.git
```

## Utilização

Ao fazer o clone do projeto, agora precisa startar o docker para que ele baixe todas depêndencias e suba o servidor.

```bash
docker-compose up --build -d
```

Se por acaso não subir a imagem bastar usar o:

```bash
docker-compose start
```

A partir deste momento, o projeto está pronto para ser utilizado em:

```bash
"http://localhost/4000"
```

Qualquer dúvida entrar em contato que estou a disposição.


## Documentação e Código fonte

O código elaborado com base no curso da udemy: https://www.udemy.com/share/101tWeAEAbc1dSRXUB/

## License

Código elaborado por Heitor Carvalho Rodrigues.